import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilieresComponent } from './page/filieres.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: FilieresComponent,
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
export class FilieresRoutingModule {}
