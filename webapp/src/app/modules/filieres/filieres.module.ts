import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilieresComponent } from './liste/liste.component';
import { FilieresRoutingModule } from './filieres-routing.module';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilieresComponent, DetailsComponent, FormComponent],
  imports: [CommonModule, FilieresRoutingModule, SharedModule, ReactiveFormsModule],
})
export class FilieresModule {}
