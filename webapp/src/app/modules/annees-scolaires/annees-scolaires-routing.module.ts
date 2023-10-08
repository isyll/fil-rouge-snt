import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnneesScolairesComponent } from './page/annees-scolaires.component';

const routes: Routes = [
  {
    path: '',
    component: AnneesScolairesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnneesScolairesRoutingModule {}
