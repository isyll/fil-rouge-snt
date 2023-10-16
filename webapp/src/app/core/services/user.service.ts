import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  setToken(token: string) {
    window.localStorage.setItem('token', token);
  }

  getToken() {
    return window.localStorage.getItem('token');
  }
}
