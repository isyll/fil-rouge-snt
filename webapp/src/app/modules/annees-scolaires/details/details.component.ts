import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AnneeScolaireService, OuvertureService } from 'src/app/core/openapi';
import { ListeBlockItem } from 'src/app/shared/interfaces/ListeBlockItem';

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
  title = '';

  constructor(
    private route: ActivatedRoute,
    private anneeScolaireService: AnneeScolaireService,
    private ouvertureService: OuvertureService
  ) {}

  ngOnInit(): void {
    this.loadAnneeScolaire();
  }

  onMoveClasse({ value, id }: { value: boolean; id: string }) {
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
          this.title = `Classes ouvertes pour l'année ${this.data.libelle}`;
          this.ouvertures = this.data['ouvertures'].map((ouv: any) => {
            return { id: ouv, content: '' };
          });
          this.loadClasses();
        });
    });
  }

  private loadClasses() {
    const temp: ListeBlockItem[] = [];
    this.ouvertures.forEach((ouv) => {
      const id = ouv.id.split('/').slice(-1)[0];
      this.ouvertureService
        .apiOuverturesIdGet(id)
        .subscribe((response: any) => {
          temp.push({
            id: response['classe']['@id'],
            content: response['classe']['libelle'],
          });
        });
    });
    this.ouvertures = temp;
  }
}
