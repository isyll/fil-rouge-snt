import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnneesScolairesComponent } from './page/annees-scolaires.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: AnneesScolairesComponent,
  },
  {
    path: 'creer-annee',
    component: FormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnneesScolairesRoutingModule {}
