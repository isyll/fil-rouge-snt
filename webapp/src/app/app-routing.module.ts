import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/accueil/accueil.module').then(
            (m) => m.AccueilModule
          ),
      },
      {
        path: 'annees-scolaires',
        loadChildren: () =>
          import('./modules/annees-scolaires/annees-scolaires.module').then(
            (m) => m.AnneesScolairesModule
          ),
      },
      {
        path: 'classes',
        loadChildren: () =>
          import('./modules/classes/classes.module').then(
            (m) => m.ClassesModule
          ),
      },
      {
        path: 'filieres',
        loadChildren: () =>
          import('./modules/filieres/filieres.module').then(
            (m) => m.FilieresModule
          ),
      },
      {
        path: 'niveaux',
        loadChildren: () =>
          import('./modules/niveaux/niveaux.module').then(
            (m) => m.NiveauxModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
