import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './page/accueil.component';
import { AccueilRoutingModule } from './accueil-routing.module';
import { InfoCardComponent } from './info-card/info-card.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [AccueilComponent, AccueilComponent, InfoCardComponent],
  imports: [AccueilRoutingModule, CommonModule],
  providers: [BsModalService],
})
export class AccueilModule {}
