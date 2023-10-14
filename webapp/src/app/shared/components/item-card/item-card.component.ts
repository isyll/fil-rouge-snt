import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
  @Input()
  id: any;
  @Input()
  title!: string;
  @Input()
  icon!: string;
  @Input()
  data!: string;
  @Input()
  footData1!: string;
  @Input()
  footData2!: string;

  @Output('clickItem')
  clickItemEvent = new EventEmitter<any>();
}
