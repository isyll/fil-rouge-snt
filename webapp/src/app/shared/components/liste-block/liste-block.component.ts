import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListeBlockItem } from '../../interfaces/ListeBlockItem';

@Component({
  selector: 'app-liste-block',
  templateUrl: './liste-block.component.html',
  styleUrls: ['./liste-block.component.scss'],
})
export class ListeBlockComponent {
  @Input()
  items!: ListeBlockItem[];
  @Input()
  title!: string;
  @Output('onItemStateChange')
  itemChange = new EventEmitter<{ value: boolean; id: string }>();

  onItemClick(event: Event, id: string) {
    const target = event.target as HTMLInputElement;
    if (target.checked) this.items.find((item) => item.id === id)!.state = true;
    else this.items.find((item) => item.id === id)!.state = false;

    this.itemChange.emit({ value: target.checked, id: id });
  }
}
