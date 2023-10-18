import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';
import { PlanifierCoursComponent } from './components/planifier-cours/planifier-cours.component';
import { LoginComponent } from './components/login/login.component';
import { MesCoursComponent } from './components/mes-cours/mes-cours.component';
import { MesElevesComponent } from './components/mes-eleves/mes-eleves.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'mes-cours',
        component: MesCoursComponent,
      },
      {
        path: 'mes-eleves',
        component: MesElevesComponent,
      },
      {
        path: 'planifier-cours',
        component: PlanifierCoursComponent,
      },
      {
        path: 'inscriptions',
        loadChildren: () =>
          import('./modules/inscriptions/inscriptions.module').then(
            (m) => m.InscriptionsModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./modules/accueil/accueil.module').then(
            (m) => m.AccueilModule
          ),
      },
      {
        path: 'annee_scolaires',
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
      {
        path: 'professeurs',
        loadChildren: () =>
          import('./modules/professeurs/professeurs.module').then(
            (m) => m.ProfesseursModule
          ),
      },
      {
        path: 'salles',
        loadChildren: () =>
          import('./modules/salles/salles.module').then((m) => m.SallesModule),
      },
      {
        path: 'modules',
        loadChildren: () =>
          import('./modules/modules-cours/modules-cours.module').then(
            (m) => m.ModulesCoursModule
          ),
      },
      {
        path: 'sessions',
        loadChildren: () =>
          import('./modules/sessions-cours/sessions-cours.module').then(
            (m) => m.SessionsCoursModule
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
