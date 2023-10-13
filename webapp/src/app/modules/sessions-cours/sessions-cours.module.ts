import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SessionsCoursRoutingModule } from './sessions-cours-routing.module';
import { PlanifierComponent } from './planifier/planifier.component';

@NgModule({
  declarations: [
    PlanifierComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SessionsCoursRoutingModule,
  ],
})
export class SessionsCoursModule {}
