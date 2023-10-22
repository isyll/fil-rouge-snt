import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  AnneeScolaireService,
  CoursService,
  ProfesseurService,
  SalleService,
  SessionCoursService,
} from 'src/app/core/openapi';
import {
  ParamsService,
  UserTokenService,
  difference,
  formatDate,
} from 'src/app/core/services';
import { validateTime } from 'src/app/core/validators';
import { time2Number } from 'src/app/core/services';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-planifier',
  templateUrl: './planifier.component.html',
  styleUrls: ['./planifier.component.scss'],
})
export class PlanifierComponent implements OnInit {
  @ViewChild('template', { read: TemplateRef })
  modalTemplate!: TemplateRef<any>;
  selectedAnneeScolaire: any;
  cours: any[] = [];
  salles: any[] = [];
  professeurs: any = null;
  noSalles: any;
  noAnneeEnCours: any = null;
  selectedCours: any = false;
  sessionModal?: BsModalRef | null;
  sessionForm = this.fb.group({
    date: ['', [Validators.required]],
    salle: [null, [Validators.required]],
    heureDebut: ['', [Validators.required]],
    heureFin: ['', [Validators.required]],
    professeur: [null, [Validators.required]],
    duree: [''],
    presentiel: [true, [Validators.required]],
  });
  professeurPris = false;
  DOM = {
    sessionRequestPending: false,
    coursRequestPending: false,
  };
  edit = {
    heureDebutHour: '',
    heureDebutMinute: '',
    heureFinHour: '',
    heureFinMinute: '',
  };

  constructor(
    private fb: FormBuilder,
    private coursService: CoursService,
    private paramsService: ParamsService,
    private anneeScolaireService: AnneeScolaireService,
    private salleService: SalleService,
    private sessionCoursService: SessionCoursService,
    private professeurService: ProfesseurService,
    private modalService: BsModalService,
    private userTokenService: UserTokenService
  ) {
    this.sessionForm.valueChanges.subscribe(this.validateSessionForm);
    this.sessionForm.get('presentiel')?.valueChanges.subscribe((value) => {
      // if (value)
      //   this.sessionForm.get('salle')?.setValidators(Validators.required);
      // else this.sessionForm.get('salle')?.setValidators(null);
    });
  }

  ngOnInit(): void {
    this.loadAnneeEnCours();
    this.loadSalles();
    this.loadProfesseurs();
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
    this.sessionCoursService
      .apiSessionCoursPost(data)
      .pipe(
        catchError((error) => {
          this.DOM.sessionRequestPending = false;
          this.professeurPris = true;

          return throwError(() => null);
        })
      )
      .subscribe((response) => {
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

  editSessionCours(sc: any) {
    console.log(sc);

    this.sessionForm.patchValue({
      date: new Date(sc.date) as any,
      salle: sc.salle['@id'],
      heureDebut: sc.heureDebut,
      heureFin: sc.heureFin,
      duree: sc.duree,
    });

    this.edit = {
      heureDebutHour: sc.heureDebut.split(':')[0],
      heureDebutMinute: sc.heureDebut.split(':')[1],
      heureFinHour: sc.heureFin.split(':')[0],
      heureFinMinute: sc.heureFin.split(':')[1],
    };

    this.openModal(this.modalTemplate);
  }

  confirmDeleteSessionCours(sc: any) {}

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

  private loadProfesseurs() {
    this.professeurService
      .apiProfesseursGetCollection()
      .subscribe((response: any) => {
        this.professeurs = response['hydra:member'];
      });
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
