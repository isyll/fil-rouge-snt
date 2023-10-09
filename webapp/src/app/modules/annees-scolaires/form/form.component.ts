import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { anneeScolaireExistenceValidator } from '../../../core/validators/anneeScolaire-existence.validator';
import { AnneeScolaireService } from '../../../core/openapi';

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
  anneeAlreadyExists: boolean = false;

  constructor(
    private fb: FormBuilder,
    private anneeScolaireService: AnneeScolaireService
  ) {
    this.form.get('annee1')?.valueChanges.subscribe((newValue) => {
      this.form.get('libelle')?.setValue('');
      this.annee2 = '';
      if (this.form.get('annee1')?.valid) {
        this.annee2 = parseInt(String(newValue)) + 1;
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

  onSubmit() {}
}
