import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NotificationModule } from './services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { FocoDirective } from './shared/directives';

const APP_DATE_FORMAT: MatDateFormats = {
  parse: {
    dateInput: {day: 'numeric',month: 'numeric',year: 'numeric'},
  },
  display: {
    dateInput: {day: 'numeric',month: 'numeric',year: 'numeric'},
    monthYearLabel: {year: 'numeric', month: 'long'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuListComponent,
    FocoDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    NotificationModule.forRoot()
  ],
  providers: [
    {provide: MAT_DATE_LOCALE,useValue: 'es-CL'},
    {provide: MAT_DATE_FORMATS,useValue: APP_DATE_FORMAT},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
