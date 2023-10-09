import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AnneeScolaireService } from '../openapi';

export function anneeScolaireExistenceValidator(
  anneeScolaireService: AnneeScolaireService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const data = control.value;

    if (!data) {
      return of(null);
    }

    return anneeScolaireService
      .apiAnneeScolairesGetCollection(undefined, data)
      .pipe(
        map((exists: any) =>
          exists['hydra:member']?.length === 0 ? null : { dataNotExist: true }
        ),
        catchError(() => of(null))
      );
  };
}
