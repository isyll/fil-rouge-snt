import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './liste/liste.component';
import { ClassesRoutingModule } from './classes-routing.module';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClassesComponent, DetailsComponent, FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClassesRoutingModule,
    SharedModule,
  ],
})
export class ClassesModule {}
