import { Component, OnInit } from '@angular/core';
import {
  CoursService,
  ProfesseurService,
  SessionCoursService,
} from 'src/app/core/openapi';
import { ParamsService, UserTokenService } from 'src/app/core/services';

@Component({
  selector: 'app-mes-cours',
  templateUrl: './mes-cours.component.html',
  styleUrls: ['./mes-cours.component.scss'],
})
export class MesCoursComponent implements OnInit {
  cours: any = null;
  professeur: any;
  annee: any;

  constructor(
    private userTokenService: UserTokenService,
    private coursService: CoursService,
    private sessionCoursService: SessionCoursService,
    private professeurService: ProfesseurService,
    private paramsService: ParamsService
  ) {}

  ngOnInit(): void {
    this.professeurService
      .apiProfesseursGetCollection(undefined, this.userTokenService.email!)
      .subscribe((response: any) => {
        this.professeur = response['hydra:member'][0];
        this.loadAnnee();
      });
  }

  private loadAnnee() {
    this.paramsService.getAnneeEnCours(
      (annee) => {
        this.annee = annee;
        this.loadCours();
      },
      () => null
    );
  }

  private loadCours() {
    this.sessionCoursService
      .apiSessionCoursGetCollection(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        this.professeur['@id']
      )
      .subscribe((response: any) => {
        this.cours = response['hydra:member'];
      });
  }
}
