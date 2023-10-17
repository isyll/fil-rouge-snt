import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NiveauxComponent } from './liste/liste.component';
import { NiveauxRoutingModule } from './niveaux-routing.module';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NiveauxComponent, DetailsComponent, FormComponent],
  imports: [CommonModule, NiveauxRoutingModule, SharedModule, ReactiveFormsModule],
})
export class NiveauxModule {}
