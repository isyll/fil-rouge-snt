import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfesseursRoutingModule } from './professeurs-routing.module';
import { ListeComponent } from './liste/liste.component';

@NgModule({
  declarations: [
    ListeComponent
  ],
  imports: [CommonModule, SharedModule, ProfesseursRoutingModule],
})
export class ProfesseursModule {}
