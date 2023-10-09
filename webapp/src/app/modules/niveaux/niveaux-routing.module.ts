import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NiveauxComponent } from './page/niveaux.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: NiveauxComponent,
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
