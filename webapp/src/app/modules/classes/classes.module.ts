import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './liste/liste.component';
import { ClassesRoutingModule } from './classes-routing.module';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ClassesComponent, DetailsComponent],
  imports: [CommonModule, ClassesRoutingModule, SharedModule],
})
export class ClassesModule {}
