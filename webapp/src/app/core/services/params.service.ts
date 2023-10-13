import { Injectable } from '@angular/core';
import { AnneeScolaireService, ParamService } from '../openapi';

@Injectable({
  providedIn: 'root',
})
export class ParamsService {
  constructor(
    private paramService: ParamService,
    private anneeScolaireService: AnneeScolaireService
  ) {}

  getParam(
    name: string,
    ifExists: (param: any) => void,
    ifNotExists: () => void
  ) {
    return this.paramService
      .apiParamsGetCollection(undefined, name)
      .subscribe((response: any) => {
        if (response['hydra:member'].length === 0) ifNotExists();
        else ifExists(response['hydra:member'][0]);
      });
  }

  getAnneeEnCours(ifExists: (param: any) => void, ifNotExists: () => void) {
    return this.getParam('annee-en-cours', ifExists, ifNotExists);
  }
}
