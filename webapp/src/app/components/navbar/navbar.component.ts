import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.scss'],
  template: `
    <nav class="navbar navbar-dark navbar-expand-lg bg-primary p-2">
      <div class="container-fluid">
        <a class="navbar-brand active fs-3" aria-current="page" href="#"
          >Sylla-App
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link fs-5 disabled" href="#">Cours</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fs-5" href="#">Absences</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fs-5" href="#">Élèves</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {}
