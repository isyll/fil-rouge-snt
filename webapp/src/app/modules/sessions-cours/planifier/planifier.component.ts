import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  AnneeScolaireService,
  CoursService,
  ModuleService,
  SalleService,
  SessionCoursService,
} from 'src/app/core/openapi';
import { ParamsService, difference, formatDate } from 'src/app/core/services';
import { validateTime } from 'src/app/core/validators';
import { time2Number } from 'src/app/core/services';

@Component({
  selector: 'app-planifier',
  templateUrl: './planifier.component.html',
  styleUrls: ['./planifier.component.scss'],
})
export class PlanifierComponent implements OnInit {
  selectedAnneeScolaire: any;
  cours: any[] = [];
  salles: any[] = [];
  noSalles: any;
  noAnneeEnCours: any = null;
  selectedCours: any = false;
  sessionModal?: BsModalRef | null;
  sessionForm = this.fb.group({
    date: ['', [Validators.required]],
    salle: [null, [Validators.required]],
    heureDebut: ['', [Validators.required]],
    heureFin: ['', [Validators.required]],
    duree: [''],
  });
  DOM = {
    sessionRequestPending: false,
    coursRequestPending: false,
  };
  validations = {
    salleOccupe: false,
    salleTropPetite: false,
  };

  constructor(
    private fb: FormBuilder,
    private coursService: CoursService,
    private paramsService: ParamsService,
    private anneeScolaireService: AnneeScolaireService,
    private moduleService: ModuleService,
    private salleService: SalleService,
    private sessionCoursService: SessionCoursService,
    private modalService: BsModalService
  ) {
    this.sessionForm.valueChanges.subscribe(this.validateSessionForm);
  }

  ngOnInit(): void {
    this.loadAnneeEnCours();
    this.loadSalles();
  }

  onCreateSession() {
    const heureDebut = this.sessionForm.get('heureDebut')?.value ?? '',
      heureFin = this.sessionForm.get('heureFin')?.value ?? '',
      duree = difference(heureDebut, heureFin),
      date = this.sessionForm.get('date')?.value ?? new Date();

    const data: any = {
      ...this.sessionForm.value,
      duree: duree,
      date: formatDate(date as Date),
      cours: this.selectedCours['@id'],
    };

    this.DOM.sessionRequestPending = true;
    this.sessionCoursService.apiSessionCoursPost(data).subscribe((response) => {
      this.DOM.sessionRequestPending = false;
      this.sessionForm.reset();
      this.sessionModal?.hide();
      this.loadSessionCours();
    });
  }

  onSelectCours(cours: any) {
    this.selectedCours = cours;
    this.loadSessionCours();
  }

  openModal(template: TemplateRef<any>) {
    this.sessionModal = this.modalService.show(template, {
      class: 'modal-md modal-dialog-centered modal custom-modal',
    });
  }

  private loadAnneeEnCours() {
    this.paramsService.getAnneeEnCours(
      (param) =>
        this.anneeScolaireService
          .apiAnneeScolairesGetCollection(undefined, param.value)
          .subscribe((response: any) => {
            if (response['hydra:member'].length !== 0) {
              this.selectedAnneeScolaire = response['hydra:member'][0];
              this.noAnneeEnCours = false;
            } else this.noAnneeEnCours = true;
            this.loadCours();
          }),
      () => null
    );
  }

  private loadCours() {
    this.DOM.coursRequestPending = true;
    this.coursService
      .apiCoursGetCollection(
        undefined,
        undefined,
        undefined,
        this.selectedAnneeScolaire.libelle
      )
      .subscribe((response: any) => {
        this.cours = response['hydra:member'];
        this.DOM.coursRequestPending = false;
      });
  }

  private loadSalles() {
    this.salleService.apiSallesGetCollection().subscribe((response: any) => {
      if (response['hydra:member'].length !== 0)
        this.salles = response['hydra:member'];
      else this.noSalles = true;
    });
  }

  private loadSessionCours() {
    this.DOM.sessionRequestPending = true;
    if (this.selectedCours) {
      this.sessionCoursService
        .apiSessionCoursGetCollection(undefined, this.selectedCours['@id'])
        .subscribe((response: any) => {
          this.DOM.sessionRequestPending = false;
          this.selectedCours.sessionCours = response['hydra:member'];
        });
    }
  }

  private validateSessionForm = () => {
    const t1 = this.sessionForm.get('heureDebut')?.value ?? '',
      t2 = this.sessionForm.get('heureFin')?.value ?? '';

    const heureDebut = time2Number(t1),
      heureFin = time2Number(t2);

    if (!validateTime(t1))
      this.sessionForm.get('heureDebut')?.setErrors({ exact: true });
    if (!validateTime(t2))
      this.sessionForm.get('heureFin')?.setErrors({ exact: true });
    else {
      if (heureFin <= heureDebut)
        this.sessionForm.get('duree')?.setErrors({ exact: true });
      else this.sessionForm.get('duree')?.setErrors(null);
    }

    if (
      !this.sessionForm.invalid ||
      this.sessionForm.get('salle')?.hasError('salleOccupe') ||
      this.sessionForm.get('salle')?.hasError('salleOccupe')
    ) {
      this.checkSalleDisponibilite();
      this.checkTailleSalle();
    }
  };

  private checkSalleDisponibilite() {
    const salle = this.sessionForm.get('salle')?.value!,
      date = formatDate(new Date(this.sessionForm.get('date')?.value!));

    this.sessionForm.get('salle')?.setErrors(null);
    this.sessionCoursService
      .apiSessionCoursGetCollection(
        undefined,
        undefined,
        undefined,
        salle,
        undefined,
        date
      )
      .subscribe((response: any) => {
        if (response['hydra:member'].length === 0) return;

        const heureDebut = time2Number(
            this.sessionForm.get('heureDebut')?.value!
          ),
          heureFin = time2Number(this.sessionForm.get('heureFin')?.value!);

        for (const s of response['hydra:member']) {
          const heureDebutSessionCours = time2Number(s.heureDebut),
            heureFinSessionCours = time2Number(s.heureFin);

          if (
            (heureDebutSessionCours <= heureDebut &&
              heureDebut <= heureFinSessionCours) ||
            (heureDebut <= heureDebutSessionCours &&
              heureDebutSessionCours <= heureFin)
          )
            this.sessionForm.get('salle')?.setErrors({ salleOccupe: true });
        }
      });
  }

  private checkTailleSalle() {
    const salle = this.sessionForm.get('salle')?.value!,
      classe = this.selectedCours.classe;
    this.sessionForm.get('salle')?.setErrors(null);

    this.salles.forEach((s) => {
      if (s['@id'] === salle) {
        if (s['places'] < classe.nbEtudiants)
          this.sessionForm.get('salle')?.setErrors({ salleTropPetite: true });
      }
    });
  }

  setHeure(event: Event, data: 'hour' | 'minute', target: 'debut' | 'fin') {
    const value = (event.target as HTMLInputElement).value;
    const heure = this.sessionForm.get(
      target === 'debut' ? 'heureDebut' : 'heureFin'
    )!.value;
    let result = '';

    if (data === 'hour') {
      if (heure) {
        const oldValues = heure?.split(':');
        result = `${value}:${oldValues[1]}`;
      } else result = `${value}:00`;
    } else {
      if (heure) {
        const oldValues = heure?.split(':');
        result = `${oldValues[0]}:${value}`;
      } else result = `00:${value}`;
    }

    this.sessionForm
      .get(target === 'debut' ? 'heureDebut' : 'heureFin')
      ?.setValue(result);
  }
}
