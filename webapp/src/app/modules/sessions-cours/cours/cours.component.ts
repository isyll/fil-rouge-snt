import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import {
  AnneeScolaireService,
  ClasseService,
  CoursService,
  ModuleService,
} from 'src/app/core/openapi';
import { ParamsService } from 'src/app/core/services';

@Component({
  selector: 'sessions-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss'],
})
export class CoursComponent implements OnInit {
  anneeScolaires: any[] = [];
  noAnneeEnCours = false;
  selectedAnnee: any = null;
  modules: any[] = [];
  classes: any[] = [];
  submitPending = false;
  submitOk = false;
  requestPending = false;
  unknownError = false;
  coursImpossible = false;
  form = this.fb.group({
    module: [null, [Validators.required]],
    classe: [null, [Validators.required]],
    anneeScolaire: [null],
    semestre: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
    heures: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
  });

  constructor(
    private fb: FormBuilder,
    private moduleService: ModuleService,
    private classeService: ClasseService,
    private anneeScolaireService: AnneeScolaireService,
    private coursService: CoursService,
    private paramsService: ParamsService
  ) {
    this.form.valueChanges.subscribe(() => {
      if (
        this.form.get('module')?.valid &&
        this.form.get('classe')?.valid &&
        this.form.get('semestre')?.valid
      ) {
        this.coursService
          .apiCoursGetCollection(
            undefined,
            this.form.get('module')?.value!,
            undefined,
            this.selectedAnnee['@id'],
            undefined,
            this.form.get('semestre')?.value!
          )
          .subscribe((response: any) => {
            this.coursImpossible = false;
            this.form.setErrors(null);
            if (response['hydra:member'].length !== 0) {
              this.form.setErrors({ coursImpossible: true });
              this.coursImpossible = true;
            }
          });
      }
    });
  }

  ngOnInit(): void {
    this.loadAnneeScolaires();
    this.loadClasses();
    this.loadModules();
    this.loadAnneeEnCours();
  }

  onSubmit() {
    this.form.get('anneeScolaire')?.setValue(this.selectedAnnee['@id']);
    const data: any = this.form.value;
    data.heures = +data.heures;
    data.semestre = +data.semestre;
    this.unknownError = false;
    this.coursImpossible = false;

    this.coursService
      .apiCoursPost(data)
      .pipe(
        catchError((error) => {
          console.log(error);

          if (error.status === 422) {
            this.coursImpossible = true;
          } else this.unknownError = true;
          return throwError(() => {
            console.log(error);
          });
        })
      )
      .subscribe((response) => {
        this.submitOk = true;
      });
  }

  private loadAnneeEnCours() {
    this.paramsService.getAnneeEnCours(
      (param) =>
        this.anneeScolaireService
          .apiAnneeScolairesGetCollection(undefined, param.value)
          .subscribe((response: any) => {
            if (response['hydra:member'].length !== 0) {
              this.selectedAnnee = response['hydra:member'][0];
              this.noAnneeEnCours = false;
            } else this.noAnneeEnCours = true;
          }),
      () => null
    );
  }

  private resetForm() {
    this.form.reset();
    for (const name in this.form.controls) this.form.get(name)!.setErrors(null);
  }

  private loadAnneeScolaires() {
    this.anneeScolaireService
      .apiAnneeScolairesGetCollection()
      .subscribe((respone: any) => {
        this.anneeScolaires = respone['hydra:member'];
      });
  }

  private loadModules() {
    this.moduleService.apiModulesGetCollection().subscribe((respone: any) => {
      this.modules = respone['hydra:member'];
    });
  }

  private loadClasses() {
    this.classeService.apiClassesGetCollection().subscribe((respone: any) => {
      this.classes = respone['hydra:member'];
    });
  }
}
