import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, forkJoin, throwError } from 'rxjs';
import {
  AnneeScolaireService,
  CoursJsonld,
  CoursService,
  ModuleService,
} from 'src/app/core/openapi';

@Component({
  selector: 'app-planifier-cours',
  templateUrl: './planifier-cours.component.html',
  styleUrls: ['./planifier-cours.component.scss'],
})
export class PlanifierCoursComponent implements OnInit {
  anneeScolaires!: any[];
  modules!: any[];
  requestPending = false;
  unknownError = false;
  alreadyExistsError = '';
  submitOk = false;
  submitPending = false;

  form = this.fb.group({
    heures: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    semestre: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    anneeScolaire: [null, [Validators.required]],
    module: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private anneeScolaireService: AnneeScolaireService,
    private moduleService: ModuleService,
    private coursService: CoursService
  ) {}

  ngOnInit(): void {
    this.loadFormData();
  }

  onSubmit() {
    const data = this.form.value as CoursJsonld;
    data.heures = parseInt(String(data.heures));
    data.semestre = parseInt(String(data.semestre));

    if (data) {
      this.submitPending = true;
      this.coursService
        .apiCoursPost(data)
        .pipe(
          catchError((error) => {
            if (error.status === 422) {
              const errorData = error.error;
              this.alreadyExistsError = errorData['hydra:description'];
            } else this.unknownError = true;
            this.form.reset();
            this.submitPending = this.submitOk = false;
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

  private loadFormData() {
    forkJoin([
      this.anneeScolaireService.apiAnneeScolairesGetCollection(),
      this.moduleService.apiModulesGetCollection(),
    ]).subscribe((response: any[]) => {
      this.anneeScolaires = response[0]['hydra:member'];
      this.modules = response[1]['hydra:member'];
    });
  }
}
