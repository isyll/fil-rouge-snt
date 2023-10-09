import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NiveauxComponent } from './page/niveaux.component';
import { NiveauxRoutingModule } from './niveaux-routing.module';

@NgModule({
  declarations: [NiveauxComponent],
  imports: [CommonModule, NiveauxRoutingModule],
})
export class NiveauxModule {}
