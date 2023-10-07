import { Component, Input } from '@angular/core';

@Component({
  selector: 'accueil-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent {
  @Input()
  bg!: string;
  @Input()
  title!: string;
  @Input()
  icon!: string;
  @Input()
  data!: string;
  @Input()
  lastTitle!: string;
  @Input()
  lastData!: string;
}
