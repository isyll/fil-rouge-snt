import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filiereExistenceValidator } from '../../../core/validators';
import {
  ClasseService,
  FiliereJsonldWrite,
  FiliereService,
  NiveauService,
} from '../../../core/openapi';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'filiere-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  alreadyExists = false;
  submitPending = false;
  submitOk = false;
  unknownError = false;
  form = this.fb.group({
    libelle: [
      '',
      [Validators.required, Validators.minLength(2)],
      [filiereExistenceValidator(this.filiereService)],
    ],
  });

  constructor(private fb: FormBuilder, private filiereService: FiliereService) {
    this.form.get('libelle')?.statusChanges.subscribe((status) => {
      const errors = this.form.get('libelle')?.errors;
      if (errors && errors['dataNotExist']) {
        this.alreadyExists = true;
      } else this.alreadyExists = false;
    });
  }

  onSubmit() {
    const value: any = this.form.value;

    this.submitPending = true;
    this.unknownError = false;
    if (value)
      this.filiereService
        .apiFilieresPost(value)
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
}
