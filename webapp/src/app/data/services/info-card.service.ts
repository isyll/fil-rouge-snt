import { Injectable } from '@angular/core';

export interface InfoData {
  id: number;
  color: string;
  icon: string;
  title: string;
  data: string;
  last: {
    title: string;
    data: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class InfoCardService {
  constructor() {}

  getDatas(): InfoData[] {
    return [
      {
        id: 1,
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
        id: 1,
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
        id: 1,
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
        id: 1,
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
}
