import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NiveauxComponent } from './page/niveaux.component';

const routes: Routes = [
  {
    path: '',
    component: NiveauxComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NiveauxRoutingModule {}
