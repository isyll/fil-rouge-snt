import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanifierComponent } from './planifier/planifier.component';
import { CoursComponent } from './cours/cours.component';

const routes: Routes = [
  {
    path: '',
    component: PlanifierComponent,
  },
  {
    path: 'cours',
    component: CoursComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsCoursRoutingModule {}
