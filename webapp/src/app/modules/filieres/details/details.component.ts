import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { FiliereService } from 'src/app/core/openapi';

@Component({
  selector: 'filiere-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  data: any;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private filiereService: FiliereService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.filiereService
        .apiFilieresIdGet(params['id'])
        .pipe(
          catchError((error) => {
            if (error.status !== 0) {
              this.notFound = true;
            }
            return throwError(() => null);
          })
        )
        .subscribe((response: any) => {
          this.data = response;
        });
    });
  }
}
