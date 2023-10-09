import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NiveauxComponent } from './liste/liste.component';
import { NiveauxRoutingModule } from './niveaux-routing.module';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NiveauxComponent, DetailsComponent],
  imports: [CommonModule, NiveauxRoutingModule, SharedModule],
})
export class NiveauxModule {}
