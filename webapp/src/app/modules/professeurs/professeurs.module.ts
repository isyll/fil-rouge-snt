import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfesseursRoutingModule } from './professeurs-routing.module';
import { ListeComponent } from './liste/liste.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    ListeComponent,
    FormComponent,
    DetailsComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, ProfesseursRoutingModule],
})
export class ProfesseursModule {}
