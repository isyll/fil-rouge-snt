import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginCheckPostRequest, LoginCheckService } from 'src/app/core/openapi';
import { UserTokenService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials!: LoginCheckPostRequest;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  DOM = {
    invalidCredentials: false,
    isLoading: false,
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginCheckService: LoginCheckService,
    private UserTokenService: UserTokenService,
    private http: HttpClient
  ) {}

  onSubmit() {
    this.credentials = this.form.value as LoginCheckPostRequest;
    this.DOM.invalidCredentials = false;
    this.DOM.isLoading = false;

    this.loginCheckService
      .loginCheckPost(this.credentials)
      .pipe(
        catchError((error) => {
          this.DOM.invalidCredentials = true;
          this.DOM.isLoading = false;

          return throwError(() => null);
        })
      )
      .subscribe((response) => {
        this.UserTokenService.setUserInfos(response.token, this.credentials.email);
        this.DOM.isLoading = false;
      });
  }
}
