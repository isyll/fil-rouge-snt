import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ProfesseurJsonldWrite,
  ProfesseurService,
} from '../../../core/openapi';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  submitPending = false;
  submitOk = false;
  unknownError = false;
  form = this.fb.group({
    prenom: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    ],
    nom: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    ],
    specialite: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    ],
    grade: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    ],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private professeurService: ProfesseurService
  ) {}

  onSubmit() {
    const data = this.form.value as ProfesseurJsonldWrite;

    if (data) {
      this.submitPending = true;
      this.professeurService
        .apiProfesseursPost(data)
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
}
