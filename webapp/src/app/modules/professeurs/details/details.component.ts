import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ProfesseurService } from 'src/app/core/openapi';

@Component({
  selector: 'professeur-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  data: any;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private professeurService: ProfesseurService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.professeurService
        .apiProfesseursIdGet(params['id'])
        .pipe(
          catchError((error) => {
            if (error.status !== 0) {
              this.notFound = true;
            }
            return throwError(() => null);
          })
        )
        .subscribe((response: any) => {
          console.log(response);

          this.data = response;
        });
    });
  }
}
