import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { catchError, forkJoin, throwError } from 'rxjs';
import {
  AnneeScolaireService,
  ClasseService,
  CoursJsonld,
  CoursService,
  EtudiantService,
  InscriptionService,
  ModuleService,
} from 'src/app/core/openapi';

@Component({
  selector: 'app-nouvel-etudiant',
  templateUrl: './nouvel-etudiant.component.html',
  styleUrls: ['./nouvel-etudiant.component.scss'],
})
export class NouvelEtudiantComponent implements OnInit {
  anneeScolaires!: any[];
  selectedAnneeScolaire: any = null;
  classes!: any[];
  requestPending = false;
  unknownError = false;
  alreadyExistsError = '';
  submitOk = false;
  submitPending = false;

  form = this.fb.group(
    {
      prenom: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      naissance: [null, [Validators.required]],
      telephone: [
        null,
        [Validators.required, Validators.pattern(/^7[0-9]{8}$/)],
      ],
      email: [null, [Validators.required, Validators.email]],
      classe: [null, [Validators.required]],
    },
    { validators: this.validateAnneeScolaire() }
  );

  constructor(
    private fb: FormBuilder,
    private anneeScolaireService: AnneeScolaireService,
    private classeService: ClasseService,
    private inscriptionService: InscriptionService,
    private etudiantService: EtudiantService
  ) {}

  onSubmit() {
    const data: any = this.form.value;
    this.submitPending = true;
    this.etudiantService
      .apiEtudiantsPost(data)
      .pipe(
        catchError((error) => {
          this.submitPending = false;
          return throwError(() => null);
        })
      )
      .subscribe((response: any) => {
        data['etudiant'] = response['@id'];
        data['anneeScolaire'] = this.selectedAnneeScolaire['@id'];
        this.inscrireEtudiant(
          data,
          (response) => {
            console.log(response);
            this.submitPending = false;
            this.submitOk = true;
            this.form.reset();
          },
          (error) => {
            console.log(error);
            this.submitPending = this.submitOk = false;
            this.form.reset();
          }
        );
      });
  }

  onSelectAnneeSColaire(anneeScolaire: any) {
    this.selectedAnneeScolaire = anneeScolaire;
    this.form.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.loadFormData();
  }

  private loadFormData() {
    forkJoin([
      this.classeService.apiClassesGetCollection(),
      this.anneeScolaireService.apiAnneeScolairesGetCollection(),
    ]).subscribe((response: any) => {
      this.classes = response[0]['hydra:member'];
      this.anneeScolaires = response[1]['hydra:member'];
    });
  }

  private validateAnneeScolaire(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.selectedAnneeScolaire) return null;
      return { invalid: true };
    };
  }

  private inscrireEtudiant(
    data: any,
    callback: (response: any) => void,
    onError: (response: any) => void
  ) {
    this.inscriptionService
      .apiInscriptionsPost(data)
      .pipe(
        catchError((error) => {
          onError(error);
          return throwError(() => null);
        })
      )
      .subscribe(callback);
  }
}
