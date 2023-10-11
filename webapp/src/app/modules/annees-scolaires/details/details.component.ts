import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, forkJoin, throwError } from 'rxjs';
import {
  AnneeScolaireService,
  ClasseService,
  OuvertureService,
} from 'src/app/core/openapi';
import { ListeBlockItem } from 'src/app/shared/interfaces/ListeBlockItem';
import { extractId } from 'src/app/shared/helpers/utils';

@Component({
  selector: 'details-annee-scolaire',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  data: any;
  notFound = false;
  requestPending = false;
  ouvertures!: ListeBlockItem[];
  classes!: ListeBlockItem[];
  touched = false;
  classesOuvertes!: string[];

  constructor(
    private route: ActivatedRoute,
    private anneeScolaireService: AnneeScolaireService,
    private ouvertureService: OuvertureService,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.loadAnneeScolaire();
  }

  moveClasse({ value, id }: { value: boolean; id: string }) {
    if (value) {
      if (!this.findClasseOuverte(id)) this.classesOuvertes.push(id);
    } else {
      this.classesOuvertes = this.classesOuvertes.filter((co) => co != id);
    }
    console.log(this.classesOuvertes);

    this.touchIfClassesOuvertesChanges();
  }

  private loadAnneeScolaire() {
    this.requestPending = true;

    this.route.params.subscribe((params) => {
      this.anneeScolaireService
        .apiAnneeScolairesIdGet(params['id'])
        .pipe(
          catchError((error) => {
            if (error.status !== 0) {
              this.notFound = true;
            }
            this.requestPending = false;
            return throwError(() => null);
          })
        )
        .subscribe((response: any) => {
          this.requestPending = false;
          this.data = response;
          this.ouvertures = this.data['ouvertures'].map((ouv: any) => {
            return { id: extractId(ouv), content: '' };
          });
          this.loadClassesOuvertes();
        });
    });
  }

  private loadClassesOuvertes() {
    const obs$ = this.ouvertures.map((ouv) =>
      this.ouvertureService.apiOuverturesIdGet(ouv.id)
    );

    forkJoin(obs$).subscribe((response: any[]) => {
      this.ouvertures = response.map<ListeBlockItem>((r) => {
        const classeId = extractId(r['classe']['@id']);
        return { id: classeId, content: r['classe']['libelle'], state: true };
      });
      this.classesOuvertes = this.ouvertures.map((ouv) => ouv.id);
      this.loadClasses();
    });
  }

  private loadClasses() {
    this.classeService.apiClassesGetCollection().subscribe((response: any) => {
      const data = response['hydra:member'] as Array<any>;
      this.classes = data
        .map<ListeBlockItem>((classe: any) => {
          return { id: extractId(classe['@id']), content: classe.libelle };
        })
        .filter(
          (classe) => !this.ouvertures.some((ouv) => ouv.id == classe.id)
        );
    });
  }

  private touchIfClassesOuvertesChanges() {
    this.touched =
      this.classesOuvertes.some(
        (co) => !this.ouvertures.some((ouv) => ouv.id == co)
      ) ||
      this.ouvertures.some(
        (ouv) => !this.classesOuvertes.some((co) => ouv.id == co)
      );
  }

  private findClasseOuverte(id: string) {
    return this.classesOuvertes.find((co) => co == id);
  }
}
