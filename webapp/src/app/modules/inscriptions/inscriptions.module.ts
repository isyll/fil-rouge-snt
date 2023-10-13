import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NouvelEtudiantComponent } from './nouvel-etudiant/nouvel-etudiant.component';
import { EtudiantExistantComponent } from './etudiant-existant/etudiant-existant.component';
import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ImportationComponent } from './importation/importation.component';

@NgModule({
  declarations: [NouvelEtudiantComponent, EtudiantExistantComponent, ImportationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InscriptionsRoutingModule,
    SharedModule,
    BsDropdownModule,
  ],
  providers: [BsDropdownConfig],
})
export class InscriptionsModule {}
