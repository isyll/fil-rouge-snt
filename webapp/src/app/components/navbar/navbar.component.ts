import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  searchBox!: any;
  overlay!: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

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
