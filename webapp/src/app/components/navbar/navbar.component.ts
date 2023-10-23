import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserTokenService } from 'src/app/core/services';

@Component({
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  searchBox!: any;
  overlay!: any;
  isRP = false;
  isProf = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private userTokenService: UserTokenService
  ) {
    this.userTokenService.roles.forEach((role) => {
      if (role === 'ROLE_RP') this.isRP = true;
      if (role === 'ROLE_PROF') this.isProf = true;
    });
  }

  ngOnInit(): void {
    this.searchBox = this.el.nativeElement.querySelector('.search-box');
    this.overlay = this.el.nativeElement.querySelector('.overlay');
  }

  onSearch() {
    this.renderer.setStyle(this.searchBox, 'display', 'block');
    this.renderer.setStyle(this.overlay, 'display', 'block');
  }

  onExit() {
    this.renderer.setStyle(this.searchBox, 'display', 'none');
    this.renderer.setStyle(this.overlay, 'display', 'none');
  }
}
