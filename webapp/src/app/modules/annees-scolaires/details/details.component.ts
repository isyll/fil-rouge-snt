import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AnneeScolaireService } from 'src/app/core/openapi';

@Component({
  selector: 'details-annee-scolaire',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  data: any;
  notFound = false;
  requestPending = false;

  constructor(
    private route: ActivatedRoute,
    private anneeScolaireService: AnneeScolaireService
  ) {}

  ngOnInit(): void {
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
          console.log(response);

          this.data = response;
          this.requestPending = false;
        });
    });
  }
}
