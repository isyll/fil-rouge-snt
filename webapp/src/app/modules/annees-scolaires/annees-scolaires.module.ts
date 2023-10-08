import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnneesScolairesRoutingModule } from './annees-scolaires-routing.module';
import { AnneesScolairesComponent } from './page/annees-scolaires.component';

@NgModule({
  declarations: [
    AnneesScolairesComponent
  ],
  imports: [CommonModule, AnneesScolairesRoutingModule],
})
export class AnneesScolairesModule {}
