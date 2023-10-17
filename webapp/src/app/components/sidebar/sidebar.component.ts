import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { UserService } from 'src/app/core/services';

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

  constructor(private userService: UserService) {}

  logout() {
    this.userService.logout();
  }
}
