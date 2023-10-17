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
  ouvertures!: any[];
  classes!: ListeBlockItem[];
  touched = false;
  classesOuvertes: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private anneeScolaireService: AnneeScolaireService,
    private ouvertureService: OuvertureService,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  moveClasse({ value, id }: { value: boolean; id: string }): void {
    if (value) {
      if (!this.classesOuvertes.find((co) => co == id))
        this.classesOuvertes.push(id);
    } else {
      this.classesOuvertes = this.classesOuvertes.filter((co) => co != id);
    }
    this.touchIfClassesOuvertesChanges();
  }

  save(): void {
    const ouvertures = (this.data['ouvertures'] as Array<string>).map(
      (ouverture) => extractId(ouverture)
    );
    const newClasses = this.classesOuvertes
        .filter((co) => !this.ouvertures.some((ouv) => ouv.id == co))
        .map((co) =>
          this.ouvertureService.apiOuverturesPost({
            anneeScolaire: this.data['@id'],
            classe: '/classes/' + co,
          })
        ),
      oldClasses = ouvertures
        .filter(
          (ouverture) =>
            !this.ouvertures
              .filter((ouv) => this.classesOuvertes.some((co) => co == ouv.id))
              .some((ouv) => ouv.ouvId == ouverture)
        )
        .map((ouverture) =>
          this.ouvertureService.apiOuverturesIdDelete(ouverture)
        );

    this.requestPending = true;
    forkJoin([...newClasses, ...oldClasses])
      .pipe(
        catchError((error) => {
          this.requestPending = false;
          return throwError(() => null);
        })
      )
      .subscribe((response) => {
        this.requestPending = false;
        this.loadData();
      });
  }

  private loadData(): void {
    this.requestPending = true;

    this.route.params.subscribe((params) => {
      this.anneeScolaireService
        .apiAnneeScolairesIdGet(params['id'])
        .pipe(
          catchError((error) => {
            if (error.status !== 0) this.notFound = true;
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
          this.touched = false;
        });
    });
  }

  private loadClassesOuvertes(): void {
    const obs$ = this.ouvertures.map((ouv) =>
      this.ouvertureService.apiOuverturesIdGet(ouv.id)
    );

    forkJoin(obs$).subscribe((response: any[]) => {
      this.ouvertures = response.map((r, index) => {
        const classeId = extractId(r['classe']['@id']);
        return {
          id: classeId,
          content: r['classe']['libelle'],
          state: true,
          ouvId: this.ouvertures[index].id,
        };
      });

      this.classesOuvertes = this.ouvertures.map((ouv) => ouv.id);
      this.loadClasses();
    });

    if (obs$.length === 0) this.loadClasses();
  }

  private loadClasses(): void {
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

  private touchIfClassesOuvertesChanges(): void {
    this.touched =
      this.classesOuvertes.some(
        (co) => !this.ouvertures.some((ouv) => ouv.id == co)
      ) ||
      this.ouvertures.some(
        (ouv) => !this.classesOuvertes.some((co) => ouv.id == co)
      );
  }
}
