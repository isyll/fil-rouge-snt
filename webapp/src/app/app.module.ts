import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ApiModule } from './core/openapi';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlanifierCoursComponent } from './components/planifier-cours/planifier-cours.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './core/services/auth-interceptor.service';
import { MesCoursComponent } from './components/mes-cours/mes-cours.component';
import { MesElevesComponent } from './components/mes-eleves/mes-eleves.component';
import { MesClassesComponent } from './components/mes-classes/mes-classes.component';
import { AnnulationComponent } from './components/annulation/annulation.component'

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    NavbarComponent,
    SidebarComponent,
    PlanifierCoursComponent,
    LoginComponent,
    MesCoursComponent,
    MesElevesComponent,
    MesClassesComponent,
    AnnulationComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    ApiModule,
    SharedModule,
    BsDropdownModule,
    BrowserAnimationsModule,
  ],
  providers: [BsDropdownConfig,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
