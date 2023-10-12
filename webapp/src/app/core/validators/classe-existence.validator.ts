import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ClasseService } from '../openapi';

export function classeExistenceValidator(
  classeService: ClasseService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const data = control.value;

    if (!data) {
      return of(null);
    }

    return classeService.apiClassesGetCollection(undefined, data).pipe(
      map((exists: any) =>
        exists['hydra:member']?.length === 0 ? null : { dataNotExist: true }
      ),
      catchError(() => of(null))
    );
  };
}
