import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SalleService, SalleJsonldWrite } from '../../../core/openapi';
import { catchError, throwError } from 'rxjs';
import {
  nomSalleExistenceValidator,
  numeroSalleExistenceValidator,
} from 'src/app/core/validators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  submitPending = false;
  submitOk = false;
  nomAlreadyExists = false;
  numeroAlreadyExists = false;
  unknownError = false;
  form = this.fb.group({
    nom: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
      [nomSalleExistenceValidator(this.salleService)],
    ],
    numero: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.maxLength(255),
      ],
      [numeroSalleExistenceValidator(this.salleService)],
    ],
    places: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.maxLength(255),
      ],
    ],
  });

  constructor(private fb: FormBuilder, private salleService: SalleService) {
    this.form.get('nom')?.statusChanges.subscribe((status) => {
      const errors = this.form.get('nom')?.errors;
      this.nomAlreadyExists = false;
      if (errors && errors['dataNotExist']) {
        this.nomAlreadyExists = true;
      }
    });

    this.form.get('numero')?.statusChanges.subscribe((status) => {
      const errors = this.form.get('numero')?.errors;
      this.numeroAlreadyExists = false;
      if (errors && errors['dataNotExist']) {
        this.numeroAlreadyExists = true;
      }
    });
  }

  onSubmit() {
    const data = this.form.value as SalleJsonldWrite;
    data.places = +data.places!;

    if (data) {
      this.submitPending = true;
      this.salleService
        .apiSallesPost(data)
        .pipe(
          catchError((error) => {
            this.submitPending = this.submitOk = false;
            this.unknownError = true;
            return throwError(() => null);
          })
        )
        .subscribe(() => {
          this.resetForm();
          this.submitPending = false;
          this.submitOk = true;
        });
    }
  }

  resetForm() {
    this.form.reset();
    for (const name in this.form.controls) this.form.get(name)!.setErrors(null);
  }
}
