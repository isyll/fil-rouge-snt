import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SallesRoutingModule } from './salles-routing.module';
import { ListeComponent } from './liste/liste.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ListeComponent
  ],
  imports: [
    CommonModule,
    SallesRoutingModule,
    SharedModule
  ]
})
export class SallesModule { }
