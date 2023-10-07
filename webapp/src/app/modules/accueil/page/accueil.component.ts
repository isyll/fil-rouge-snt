import { Component } from '@angular/core';

@Component({
  selector: 'page-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent {
  infoCardsBg = [
    {
      color: '#5453ac',
      icon: 'bi bi-person icon',
      title: "Nombre d'élèves",
      data: '14',
      last: {
        title: 'Ce mois',
        data: '0',
      },
    },
    {
      color: '#A6A8DB',
      icon: 'bi bi-duffle icon',
      title: "Nombre d'employés",
      data: '2',
      last: {
        title: 'Ce mois',
        data: '0',
      },
    },
    {
      color: '#F98D97',
      icon: 'bi bi-arrow-repeat icon',
      title: 'Revenues',
      data: '272344',
      last: {
        title: 'Ce mois',
        data: '0',
      },
    },
    {
      color: '#6C8DF7',
      icon: 'bi bi-currency-exchange icon',
      title: 'Profit',
      data: '272344',
      last: {
        title: 'Ce mois',
        data: '0',
      },
    },
  ];
}
