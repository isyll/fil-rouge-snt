import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SessionsCoursRoutingModule } from './sessions-cours-routing.module';
import { PlanifierComponent } from './planifier/planifier.component';
import {
  BsDatepickerConfig,
  BsDatepickerModule,
} from 'ngx-bootstrap/datepicker';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CoursComponent } from './cours/cours.component';

@NgModule({
  declarations: [PlanifierComponent, CoursComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SessionsCoursRoutingModule,
    BsDatepickerModule,
    ModalModule,
    TimepickerModule,
  ],
  providers: [BsDatepickerConfig, BsModalService],
})
export class SessionsCoursModule {}
