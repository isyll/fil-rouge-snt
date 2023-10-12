import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { anneeScolaireExistenceValidator } from '../../../core/validators';
import { AnneeScolaireService } from '../../../core/openapi';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  form = this.fb.group({
    libelle: [
      '',
      [Validators.required],
      [anneeScolaireExistenceValidator(this.anneeScolaireService)],
    ],
    annee1: ['', Validators.pattern(/^[0-9]{4}$/)],
  });
  annee2: number | string = '';
  anneeAlreadyExists = false;
  submitPending = false;
  submitOk = false;
  unknownError = false;

  constructor(
    private fb: FormBuilder,
    private anneeScolaireService: AnneeScolaireService
  ) {
    this.form.get('annee1')?.valueChanges.subscribe((newValue) => {
      this.form.get('libelle')?.setValue('');
      this.annee2 = '';
      if (this.form.get('annee1')?.valid) {
        this.annee2 = parseInt(String(newValue)) + 1;
        this.annee2 = !isNaN(this.annee2) ? this.annee2 : '';
        if (newValue)
          this.form.get('libelle')?.setValue(newValue + '-' + this.annee2);
      }
    });

    this.form.get('libelle')?.statusChanges.subscribe((status) => {
      const errors = this.form.get('libelle')?.errors;
      this.anneeAlreadyExists = false;
      if (errors && errors['dataNotExist']) {
        this.anneeAlreadyExists = true;
      }
    });
  }

  onSubmit() {
    const value = this.form.get('libelle')?.value;
    this.submitPending = true;
    if (value)
      this.anneeScolaireService
        .apiAnneeScolairesPost({ libelle: value })
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
