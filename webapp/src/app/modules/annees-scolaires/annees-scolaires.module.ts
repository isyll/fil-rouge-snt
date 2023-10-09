import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnneesScolairesRoutingModule } from './annees-scolaires-routing.module';
import { AnneesScolairesComponent } from './liste/liste.component';
import { AnneeCardComponent } from './annee-card/annee-card.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [AnneesScolairesComponent, AnneeCardComponent, FormComponent, DetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AnneesScolairesRoutingModule,
    SharedModule,
  ],
})
export class AnneesScolairesModule {}
