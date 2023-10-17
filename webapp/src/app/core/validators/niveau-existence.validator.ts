import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NiveauService } from '../openapi';

export function niveauExistenceValidator(
  niveauService: NiveauService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const data = control.value;

    if (!data) {
      return of(null);
    }

    return niveauService.apiNiveauxGetCollection(undefined, data).pipe(
      map((exists: any) =>
        exists['hydra:member']?.length === 0 ? null : { dataNotExist: true }
      ),
      catchError(() => of(null))
    );
  };
}
