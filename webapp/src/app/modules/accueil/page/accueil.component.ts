import { Component } from '@angular/core';
import {
  InfoCardService,
  InfoData,
} from '../../../core/services/info-card.service';

@Component({
  selector: 'page-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent {
  infoCards!: InfoData[];

  constructor(private service: InfoCardService) {
    this.infoCards = this.service.getDatas();
  }
}
