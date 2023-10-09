import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ClasseService } from 'src/app/core/openapi';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  data: any;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private filiereService: ClasseService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.filiereService
        .apiClassesIdGet(params['id'])
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
