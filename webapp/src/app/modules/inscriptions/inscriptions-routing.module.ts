import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NouvelEtudiantComponent } from './nouvel-etudiant/nouvel-etudiant.component';
import { EtudiantExistantComponent } from './etudiant-existant/etudiant-existant.component';

const routes: Routes = [
  {
    path: 'nouvel-etudiant',
    component: NouvelEtudiantComponent,
  },
  {
    path: 'etudiant-existant',
    component: EtudiantExistantComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionsRoutingModule {}
