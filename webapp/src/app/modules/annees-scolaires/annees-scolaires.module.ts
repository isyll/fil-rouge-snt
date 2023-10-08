import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnneesScolairesRoutingModule } from './annees-scolaires-routing.module';
import { AnneesScolairesComponent } from './page/annees-scolaires.component';
import { AnneeCardComponent } from './annee-card/annee-card.component';

@NgModule({
  declarations: [
    AnneesScolairesComponent,
    AnneeCardComponent
  ],
  imports: [CommonModule, AnneesScolairesRoutingModule],
})
export class AnneesScolairesModule {}
