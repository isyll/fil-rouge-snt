import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NiveauxComponent } from './liste/liste.component';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: NiveauxComponent,
  },
  {
    path:'creer-niveau',
    component: FormComponent
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
export class NiveauxRoutingModule {}
