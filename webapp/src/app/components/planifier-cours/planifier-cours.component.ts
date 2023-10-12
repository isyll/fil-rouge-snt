import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AnneeScolaireService, ModuleService } from 'src/app/core/openapi';

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
  submitOk = false;
  submitPending = false;

  form = this.fb.group({
    heures: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    semestre: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    annee_scolaire: [null, [Validators.required]],
    module: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private anneeScolaireService: AnneeScolaireService,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    this.loadFormData();
  }

  onSubmit() {
    const data = this.form.value;
    console.log(data);
    return;

    // if (data) {
    //   this.submitPending = true;
    //   this.professeurService
    //     .apiProfesseursPost(data)
    //     .pipe(
    //       catchError((error) => {
    //         this.submitPending = this.submitOk = false;
    //         this.unknownError = true;
    //         return throwError(() => null);
    //       })
    //     )
    //     .subscribe(() => {
    //       setTimeout(() => {
    //         this.form.reset();
    //         this.submitPending = false;
    //         this.submitOk = true;
    //       }, 500);
    //     });
    // }
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
