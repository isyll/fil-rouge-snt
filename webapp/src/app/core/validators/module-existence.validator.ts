import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ModuleService } from '../openapi';

export function moduleExistenceValidator(
  moduleService: ModuleService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const data = control.value;

    if (!data) {
      return of(null);
    }

    return moduleService.apiModulesGetCollection(undefined, data).pipe(
      map((exists: any) =>
        exists['hydra:member']?.length === 0 ? null : { dataNotExist: true }
      ),
      catchError(() => of(null))
    );
  };
}
