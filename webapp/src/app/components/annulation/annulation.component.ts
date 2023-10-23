import { Component, OnInit } from '@angular/core';
import {
  CoursService,
  ProfesseurService,
  SessionCoursService,
} from 'src/app/core/openapi';
import { ParamsService, UserTokenService } from 'src/app/core/services';
import { extractId } from 'src/app/shared/helpers/utils';

@Component({
  selector: 'app-annulation',
  templateUrl: './annulation.component.html',
  styleUrls: ['./annulation.component.scss'],
})
export class AnnulationComponent implements OnInit {
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

  annulerSession(sc: any) {
    this.sessionCoursService
      .annulationSession(extractId(sc['@id']), { annule: true })
      .subscribe((response) => {
        this.cours = [];
        this.loadCours();
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
