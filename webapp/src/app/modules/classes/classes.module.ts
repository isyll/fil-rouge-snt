import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './liste/liste.component';
import { ClassesRoutingModule } from './classes-routing.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ClassesComponent, DetailsComponent],
  imports: [CommonModule, ClassesRoutingModule],
})
export class ClassesModule {}
