import { Component, OnInit } from '@angular/core';
import { catchError, forkJoin, throwError } from 'rxjs';
import {
  AnneeScolaireService,
  ClasseService,
  EtudiantService,
  InscriptionService,
} from 'src/app/core/openapi';
import { handleCsvFile } from 'src/app/core/services/file.service';

const nouvelEtudiantFields = [
  'prenom',
  'nom',
  'naissance',
  'telephone',
  'email',
  'classe',
];

const etudiantExistantFields = ['matricule', 'classe'];

@Component({
  selector: 'inscriptions-importation',
  templateUrl: './importation.component.html',
  styleUrls: ['./importation.component.scss'],
})
export class ImportationComponent implements OnInit {
  file: any = null;
  fileName = '';
  fileInvalid = false;
  inscrits: any[] = [];
  dejaInscrits: any[] = [];
  badFileInput = false;
  inscriptions: any[] = [];
  nouveaux = false;
  anneeScolaires: any[] = [];
  selectedAnneeScolaire: any;
  notifyAnneeScolaire = false;
  Statuts = {
    DEJA_INSCRIT: 0,
    INSCRIT: 1,
    MATRICULE_NON_TROUVE: 2,
    CLASSE_NON_TROUVE: 3,
  };

  constructor(
    private classeService: ClasseService,
    private anneeScolaireService: AnneeScolaireService,
    private etudiantService: EtudiantService,
    private inscriptionService: InscriptionService
  ) {}

  ngOnInit(): void {
    this.anneeScolaireService
      .apiAnneeScolairesGetCollection()
      .subscribe((response: any) => {
        this.anneeScolaires = response['hydra:member'];
      });
  }

  onSelectAnneeSColaire(a: any) {
    this.selectedAnneeScolaire = a;
    this.notifyAnneeScolaire = false;
    if (this.file) this.submitFile();
  }

  onUploadEtudiantsFile(event: Event) {
    this.file = null;
    this.badFileInput = false;
    this.fileName = '';
    const target = event.target as HTMLInputElement;
    this.inscriptions = [];
    this.notifyAnneeScolaire = false;
    if (!this.selectedAnneeScolaire) this.notifyAnneeScolaire = true;
    handleCsvFile(target, this.handleEtudiantsFile, this.whenError);
  }

  private handleEtudiantsFile = (csvContent: string, fileName: string) => {
    this.file = true;
    this.fileName = fileName;
    const lines: string[] = csvContent.split('\n'),
      entetes = lines[0]
        .split(',')
        .map((str) => str.trim())
        .filter((str) => str);

    for (let i = 1; i < lines.length; i++) {
      const columns: any[] = lines[i].split(',').map((str) => str.trim()),
        inscription: any = {};
      if (columns.length != entetes.length) continue;
      for (let j = 0; j < columns.length; j++)
        inscription[entetes[j]] = columns[j];

      this.inscriptions.push(inscription);
    }

    this.submitFile();
  };

  private whenError = () => {
    this.badFileInput = true;
  };

  private submitFile(): void {
    for (const inscription of this.inscriptions) {
      if ('matricule' in inscription) {
        this.nouveaux = false;
        this.fileInvalid = !Object.keys(inscription).every((field) =>
          etudiantExistantFields.includes(field)
        );
      } else {
        this.nouveaux = true;
        this.fileInvalid = !Object.keys(inscription).every((field) =>
          nouvelEtudiantFields.includes(field)
        );
      }
    }

    if (!this.fileInvalid && this.selectedAnneeScolaire) {
      if (this.nouveaux == false) {
        this.inscriptions.forEach((inscription, index) => {
          this.etudiantService
            .apiEtudiantsGetCollection(undefined, inscription.matricule)
            .subscribe((response: any) => {
              if (response['hydra:member'].length === 0)
                this.inscriptions[index].statut =
                  this.Statuts.MATRICULE_NON_TROUVE;
              else {
                const etudiant = response['hydra:member'][0];

                this.classeService
                  .apiClassesGetCollection(undefined, inscription.classe)
                  .subscribe((response: any) => {
                    if (response['hydra:member'].length === 0)
                      this.setStatutInscription(
                        index,
                        this.Statuts.CLASSE_NON_TROUVE
                      );
                    else {
                      this.inscriptionService
                        .apiInscriptionsPost({
                          anneeScolaire: this.selectedAnneeScolaire['@id'],
                          classe: response['hydra:member'][0]['@id'],
                          etudiant: etudiant['@id'],
                        })
                        .pipe(
                          catchError((error) => {
                            console.log(error);
                            this.setStatutInscription(
                              index,
                              this.Statuts.DEJA_INSCRIT
                            );

                            return throwError(() => null);
                          })
                        )
                        .subscribe((response) => {
                          console.log(response);

                          return this.setStatutInscription(
                            index,
                            this.Statuts.INSCRIT
                          );
                        });
                    }
                  });
              }
            });
        });
      }
    }
  }

  private setStatutInscription = (index: number, value: any) => {
    this.inscriptions[index].statut = value;
  };
}
