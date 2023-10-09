import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilieresComponent } from './page/filieres.component';
import { FilieresRoutingModule } from './filieres-routing.module';

@NgModule({
  declarations: [FilieresComponent],
  imports: [CommonModule, FilieresRoutingModule],
})
export class FilieresModule {}
