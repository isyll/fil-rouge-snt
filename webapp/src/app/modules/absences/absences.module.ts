import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FicheComponent } from './fiche/fiche.component';
import { AbsencesRoutingModule } from './absences-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    FicheComponent
  ],
  imports: [CommonModule, AbsencesRoutingModule, SharedModule],
})
export class AbsencesModule {}
