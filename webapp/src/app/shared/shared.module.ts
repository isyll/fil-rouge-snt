import { NgModule } from '@angular/core';
import { LoadingComponent } from './components/loading/loading.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [LoadingComponent, ItemComponent],
  imports: [],
  exports: [LoadingComponent, ItemComponent]
})
export class SharedModule {}
