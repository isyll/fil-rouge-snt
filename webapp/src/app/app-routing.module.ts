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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
