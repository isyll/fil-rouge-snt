import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilieresComponent } from './page/filieres.component';
import { FilieresRoutingModule } from './filieres-routing.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [FilieresComponent, DetailsComponent],
  imports: [CommonModule, FilieresRoutingModule],
})
export class FilieresModule {}
