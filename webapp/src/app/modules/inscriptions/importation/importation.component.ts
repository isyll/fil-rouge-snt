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
  noAnneeScolaires = false;
  matriculeInexistants: any[] = [];
  classeInexistants: any[] = [];

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
        this.noAnneeScolaires = response['hydra:member'] ? true : false;
      });
  }

  onSelectAnneeSColaire(a: any) {
    this.selectedAnneeScolaire = a;
  }

  onUploadEtudiantsFile(event: Event) {
    this.file = null;
    this.badFileInput = false;
    this.fileName = '';
    const target = event.target as HTMLInputElement;
    this.inscriptions = [];
    handleCsvFile(target, this.handleEtudiantsFile, this.whenError);
  }

  onSubmit() {
    this.matriculeInexistants = [];
    this.classeInexistants = [];
    this.inscrits = [];
    if (!this.nouveaux) {
      for (const inscription of this.inscriptions) {
        this.inscrireEtudiant(
          inscription,
          (response) => this.inscrits.push(inscription),
          (etudiant) => this.dejaInscrits.push(etudiant)
        );
      }
    }
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

    this.validateFile();
  };

  private whenError = () => {
    this.badFileInput = true;
  };

  private validateFile(): void {
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
  }

  private inscrireEtudiant(
    {
      matricule,
      classe,
    }: {
      matricule: any;
      classe: any;
    },
    insciprionCompleted: (response: any) => void,
    dejaInscrit: (etudiant: any) => void
  ) {
    this.etudiantService
      .apiEtudiantsGetCollection(undefined, matricule)
      .subscribe((response: any) => {
        if (response['hydra:member'].length === 0)
          this.matriculeInexistants.push(matricule);
        else {
          const etudiant = response['hydra:member'][0];
          this.classeService
            .apiClassesGetCollection(undefined, classe)
            .subscribe((response: any) => {
              if (response['hydra:member'].length === 0)
                this.classeInexistants.push(classe);
              else {
                this.inscriptionService
                  .apiInscriptionsPost({
                    anneeScolaire: this.selectedAnneeScolaire['@id'],
                    classe: response['hydra:member'][0]['@id'],
                    etudiant: etudiant['@id'],
                  })
                  .pipe(
                    catchError((error) => {
                      dejaInscrit(etudiant);
                      console.log(error);

                      return throwError(() => null);
                    })
                  )
                  .subscribe(insciprionCompleted);
              }
            });
        }
      });
  }
}
