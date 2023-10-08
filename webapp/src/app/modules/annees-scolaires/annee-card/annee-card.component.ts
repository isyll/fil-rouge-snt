import { Component, Input } from '@angular/core';

@Component({
  selector: 'annee-card',
  templateUrl: './annee-card.component.html',
  styleUrls: ['./annee-card.component.scss'],
})
export class AnneeCardComponent {
  @Input()
  libelle!: string;
  @Input()
  bg!: string;
}
