import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnneesScolairesRoutingModule } from './annees-scolaires-routing.module';
import { AnneesScolairesComponent } from './page/annees-scolaires.component';
import { AnneeCardComponent } from './annee-card/annee-card.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AnneesScolairesComponent,
    AnneeCardComponent,
    FormComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, AnneesScolairesRoutingModule],
})
export class AnneesScolairesModule {}
