import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { FormComponent } from './form/form.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: ListeComponent
  },
  {
    path: 'creer-professeur',
    component: FormComponent
  },
  {
    path: ':id',
    component: DetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesseursRoutingModule {}
