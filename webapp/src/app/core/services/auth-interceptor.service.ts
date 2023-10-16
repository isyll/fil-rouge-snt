import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.userService.getToken();
    let headers: any;

    if (request.url.endsWith('/login') || request.url.endsWith('/login/'))
      headers = {};
    else
      headers = {
        Authorization: `Bearer ${token}`,
      };

    const authReq = request.clone({
      setHeaders: headers,
    });

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) this.router.navigateByUrl('/login');
        }
        return throwError(() => null);
      })
    );
  }
}
