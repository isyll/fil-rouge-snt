import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import {
  AnneeScolaireService,
  CoursService,
  EtudiantService,
  InscriptionService,
  PresenceService,
  SessionCoursService,
} from 'src/app/core/openapi';
import { ParamsService } from 'src/app/core/services';
import { extractId } from 'src/app/shared/helpers/utils';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.scss'],
})
export class FicheComponent implements OnInit {
  sessionCours: any[] = [];
  selectedSessionCours: any;
  etudiants: any = null;
  anneeScolaire: any;

  constructor(
    private coursService: CoursService,
    private paramsService: ParamsService,
    private anneeScolaireService: AnneeScolaireService,
    private sessionCoursService: SessionCoursService,
    private inscriptionService: InscriptionService,
    private etudiantService: EtudiantService,
    private presenceService: PresenceService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onSelectSessionCours(sc: any) {
    this.selectedSessionCours = sc;
    this.loadEtudiants(sc.classe);
  }

  togglePresence(event: Event, etudiant: any) {
    const target = event.target as HTMLInputElement;
    const data = {
      sessionCours: this.selectedSessionCours['@id'],
      etudiant: etudiant['@id'],
      present: target.checked,
    };

    this.presenceService
      .apiPresencesGetCollection(
        undefined,
        this.selectedSessionCours['@id'],
        undefined,
        etudiant['@id']
      )
      .subscribe((response: any) => {
        if (response['hydra:member'].length === 0) {
          this.presenceService
            .apiPresencesPost(data)
            .subscribe((response) => null);
        } else {
          this.presenceService
            .apiPresencesIdPut(
              extractId(response['hydra:member'][0]['@id']),
              data
            )
            .subscribe((response) => null);
        }
      });
  }

  private loadData() {
    this.paramsService.getAnneeEnCours(
      (annee) => {
        this.anneeScolaireService
          .apiAnneeScolairesGetCollection(undefined, annee.value)
          .subscribe((response: any) => {
            this.anneeScolaire = response['hydra:member'][0];
            this.loadSessionCours();
          });
      },
      () => null
    );
  }

  private loadSessionCours() {
    this.coursService
      .apiCoursGetCollection(
        undefined,
        undefined,
        undefined,
        this.anneeScolaire['@id']
      )
      .subscribe((response: any) => {
        for (const cours of response['hydra:member']) {
          this.sessionCoursService
            .apiSessionCoursGetCollection(undefined, cours['@id'])
            .subscribe((response: any) => {
              for (const sessionCours of response['hydra:member']) {
                sessionCours.classe = cours.classe;
                this.sessionCours.push(sessionCours);
              }
            });
        }
      });
  }

  private loadEtudiants(classe: any) {
    this.etudiants = [];
    this.inscriptionService
      .apiInscriptionsGetCollection(
        undefined,
        this.anneeScolaire['@id'],
        undefined,
        classe['@id']
      )
      .subscribe((response: any) => {
        const obs$ = [];
        for (const i of response['hydra:member']) {
          obs$.push(
            this.etudiantService.apiEtudiantsIdGet(extractId(i.etudiant['@id']))
          );
        }

        forkJoin(obs$).subscribe((response) => {
          this.etudiants = response;
          this.loadPresence();
        });
      });
  }

  private loadPresence() {
    this.etudiants.forEach((etudiant: any, index: number) => {
      this.etudiants[index].presence = false;
      this.presenceService
        .apiPresencesGetCollection(
          undefined,
          this.selectedSessionCours['@id'],
          undefined,
          etudiant['@id']
        )
        .subscribe((response: any) => {
          const p = response['hydra:member'][0];
          this.etudiants[index].presence = p !== undefined ? p.present : false;
        });
    });
  }
}
