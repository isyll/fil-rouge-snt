import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnneesScolairesComponent } from './liste/liste.component';
import { FormComponent } from './form/form.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: AnneesScolairesComponent,
  },
  {
    path: 'creer-annee',
    component: FormComponent,
  },
  {
    path: ':id',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnneesScolairesRoutingModule {}
