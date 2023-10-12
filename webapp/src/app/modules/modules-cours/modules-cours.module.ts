import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModulesCoursRoutingModule } from './modules-cours-routing.module';
import { ListeComponent } from './liste/liste.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    ListeComponent,
    FormComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, ModulesCoursRoutingModule, SharedModule],
})
export class ModulesCoursModule {}
