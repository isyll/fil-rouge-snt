import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NiveauxComponent } from './page/niveaux.component';
import { NiveauxRoutingModule } from './niveaux-routing.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [NiveauxComponent, DetailsComponent],
  imports: [CommonModule, NiveauxRoutingModule],
})
export class NiveauxModule {}
