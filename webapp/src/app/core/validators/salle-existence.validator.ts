import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SalleService } from '../openapi';

export function nomSalleExistenceValidator(
  salleService: SalleService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const data = control.value;

    if (!data) {
      return of(null);
    }

    return salleService.apiSallesGetCollection(undefined, data).pipe(
      map((exists: any) =>
        exists['hydra:member']?.length === 0 ? null : { dataNotExist: true }
      ),
      catchError(() => of(null))
    );
  };
}

export function numeroSalleExistenceValidator(
  salleService: SalleService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const data = control.value;

    if (!data) {
      return of(null);
    }

    return salleService.apiSallesGetCollection(undefined, undefined, undefined, data).pipe(
      map((exists: any) =>
        exists['hydra:member']?.length === 0 ? null : { dataNotExist: true }
      ),
      catchError(() => of(null))
    );
  };
}
