import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input()
  icon!: string;
  @Input()
  title!: string;
  @Input()
  body!: string;
  @Input()
  bg!: string;
}
