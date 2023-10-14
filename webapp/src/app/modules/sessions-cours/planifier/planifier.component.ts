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
    };

    this.DOM.sessionRequestPending = true;
    this.sessionCoursService.apiSessionCoursPost(data).subscribe((response) => {
      console.log(response);
      this.DOM.sessionRequestPending = false;
      this.sessionModal?.hide();
      this.loadSessionCours();
    });
  }

  onSelectCours(cours: any) {
    this.selectedCours = cours;
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
    this.coursService
      .apiCoursGetCollection(
        undefined,
        undefined,
        undefined,
        this.selectedAnneeScolaire.libelle
      )
      .subscribe((response: any) => (this.cours = response['hydra:member']));
  }

  private loadSalles() {
    this.salleService.apiSallesGetCollection().subscribe((response: any) => {
      if (response['hydra:member'].length !== 0)
        this.salles = response['hydra:member'];
      else this.noSalles = true;
    });
  }

  private loadSessionCours() {}

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

    console.log(this.sessionForm.errors);
  };

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
    console.log(result);
  }
}
