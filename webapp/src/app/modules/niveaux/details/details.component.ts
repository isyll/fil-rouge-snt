import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NiveauService } from 'src/app/core/openapi';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  notFound = false;
  data: any;
  requestPending = false;

  constructor(
    private route: ActivatedRoute,
    private niveauService: NiveauService
  ) {}

  ngOnInit(): void {
    this.requestPending = true;

    this.route.params.subscribe((params) => {
      this.niveauService
        .apiNiveauxIdGet(params['id'])
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
          this.data = response;
          this.requestPending = false;
        });
    });
  }
}
