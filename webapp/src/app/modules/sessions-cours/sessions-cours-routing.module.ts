import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanifierComponent } from './planifier/planifier.component';

const routes: Routes = [
  {
    path: '',
    component: PlanifierComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsCoursRoutingModule {}
