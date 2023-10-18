import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { classeExistenceValidator } from '../../../core/validators';
import {
  ClasseService,
  FiliereService,
  NiveauService,
} from '../../../core/openapi';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  alreadyExists = false;
  submitPending = false;
  submitOk = false;
  unknownError = false;
  form = this.fb.group({
    libelle: [
      '',
      [Validators.required, Validators.minLength(2)],
      [classeExistenceValidator(this.classeService)],
    ],
    filiere: [null, Validators.required],
    niveau: [null, Validators.required],
  });
  filieres: any = null;
  niveaux: any = null;

  constructor(
    private fb: FormBuilder,
    private classeService: ClasseService,
    private niveauService: NiveauService,
    private filiereService: FiliereService
  ) {
    this.form.get('libelle')?.statusChanges.subscribe((status) => {
      const errors = this.form.get('libelle')?.errors;
      if (errors && errors['dataNotExist']) {
        this.alreadyExists = true;
      } else this.alreadyExists = false;
    });
  }

  ngOnInit(): void {
    this.loadNiveaux();
    this.loadFilieres();
  }

  onSubmit() {
    const value: any = this.form.value;

    this.submitPending = true;
    if (value)
      this.classeService
        .apiClassesPost(value)
        .pipe(
          catchError((error) => {
            this.submitPending = this.submitOk = false;
            this.unknownError = true;
            return throwError(() => null);
          })
        )
        .subscribe(() => {
          this.form.reset();
          this.submitPending = false;
          this.submitOk = true;
        });
  }

  private loadNiveaux() {
    this.niveauService.apiNiveauxGetCollection().subscribe((response: any) => {
      this.niveaux = response['hydra:member'];
    });
  }

  private loadFilieres() {
    this.filiereService
      .apiFilieresGetCollection()
      .subscribe((response: any) => {
        this.filieres = response['hydra:member'];
      });
  }
}
