import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { UserTokenService } from 'src/app/core/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class SidebarComponent {
  appName = environment.appName;
  isRP = false;
  isProf = false;
  isAttache = false;

  constructor(private userTokenService: UserTokenService) {
    this.userTokenService.roles.forEach((role) => {
      if (role === 'ROLE_RP') this.isRP = true;
      if (role === 'ROLE_PROF') this.isProf = true;
      if (role === 'ROLE_ATTACHE') this.isAttache = true;
    });
  }

  logout() {
    this.userTokenService.logout();
  }
}
