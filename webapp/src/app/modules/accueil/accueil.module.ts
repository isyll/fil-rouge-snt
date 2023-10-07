import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './page/accueil.component';
import { AccueilRoutingModule } from './accueil-routing.module';
import { InfoCardComponent } from './info-card/info-card.component';

@NgModule({
  declarations: [AccueilComponent, AccueilComponent, InfoCardComponent],
  imports: [CommonModule, AccueilRoutingModule],
})
export class AccueilModule {}
