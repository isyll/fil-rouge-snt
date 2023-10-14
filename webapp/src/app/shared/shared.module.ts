import { NgModule } from '@angular/core';
import { LoadingComponent } from './components/loading/loading.component';
import { ItemComponent } from './components/item/item.component';
import { ListeBlockComponent } from './components/liste-block/liste-block.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoadingComponent,
    ItemComponent,
    ListeBlockComponent,
    ItemCardComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoadingComponent,
    ItemComponent,
    ListeBlockComponent,
    ItemCardComponent,
  ],
})
export class SharedModule {}
