import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../openapi';

@Injectable({
  providedIn: 'root',
})
export class UserTokenService {
  constructor(private router: Router, private userService: UserService) {}

  loadUserInfos(email: string) {
    this.userService
      .apiUsersGetCollection(undefined, email)
      .subscribe((response: any) => {
        console.log(response);
        this.setUser(response['hydra:member'][0]);
      });
  }

  setToken(token: string) {
    window.localStorage.setItem('token', token);
  }

  getToken() {
    return window.localStorage.getItem('token');
  }

  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('userEmail');
    window.localStorage.removeItem('userRoles');
    this.router.navigateByUrl('/login');
  }

  get roles(): Array<string> {
    return JSON.parse(window.localStorage.getItem('userRoles')!);
  }

  email() {
    return window.localStorage.getItem('userEmail');
  }

  private setUser(user: any) {
    window.localStorage.setItem('userId', user['@id']);
    window.localStorage.setItem('userEmail', user['email']);
    window.localStorage.setItem('userRoles', JSON.stringify(user['roles']));
  }
}
