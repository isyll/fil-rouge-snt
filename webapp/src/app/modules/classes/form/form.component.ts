import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { classeExistenceValidator } from '../../../core/validators';
import { ClasseService } from '../../../core/openapi';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-form',
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
      [classeExistenceValidator(this.classeService)],
    ],
  });

  constructor(private fb: FormBuilder, private classeService: ClasseService) {
    this.form.get('libelle')?.statusChanges.subscribe((status) => {
      const errors = this.form.get('libelle')?.errors;
      this.alreadyExists = false;
      if (errors && errors['dataNotExist']) {
        this.alreadyExists = true;
      }
    });
  }

  onSubmit() {
    const value = this.form.get('libelle')!.value;
    this.submitPending = true;
    if (value)
      this.classeService
        .apiClassesPost({ libelle: value })
        .pipe(
          catchError((error) => {
            this.submitPending = this.submitOk = false;
            this.unknownError = true;
            return throwError(() => null);
          })
        )
        .subscribe(() => {
          setTimeout(() => {
            this.form.reset();
            this.submitPending = false;
            this.submitOk = true;
          }, 500);
        });
  }
}
