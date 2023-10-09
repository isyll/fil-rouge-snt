import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilieresComponent } from './liste/liste.component';
import { FilieresRoutingModule } from './filieres-routing.module';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FilieresComponent, DetailsComponent],
  imports: [CommonModule, FilieresRoutingModule, SharedModule],
})
export class FilieresModule {}
