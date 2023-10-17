import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {}

  setToken(token: string) {
    window.localStorage.setItem('token', token);
  }

  getToken() {
    return window.localStorage.getItem('token');
  }

  logout() {
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
