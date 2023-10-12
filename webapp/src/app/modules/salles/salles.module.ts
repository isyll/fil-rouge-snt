import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SallesRoutingModule } from './salles-routing.module';
import { ListeComponent } from './liste/liste.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListeComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SallesRoutingModule,
    SharedModule
  ]
})
export class SallesModule { }
