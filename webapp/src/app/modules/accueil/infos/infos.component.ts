import { Component } from '@angular/core';
import {
  InfoCardService,
  InfoData,
} from '../../../core/services/info-card.service';

@Component({
  selector: 'accueil-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss'],
})
export class AccueilComponent {
  infoCards!: InfoData[];

  constructor(private service: InfoCardService) {
    this.infoCards = this.service.getDatas();
  }
}
