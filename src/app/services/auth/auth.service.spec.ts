import { AuthService } from './auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ICredenciales, IUser, IUserResponse } from '@app/models/backend';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router/';
import { Observable, of } from 'rxjs';
import { environment } from '@src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let HttpClientMock = { post: jasmine.createSpy('post') };
  let HttpHandlerMock = { handler: jasmine.createSpy('handler') };
  let RouterMock = { navigate: jasmine.createSpy('navigate') };
  let path: string = 'usuario/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: RouterMock },
        { provide: HttpClient, useValue: HttpClientMock },
        { provide: HttpHandler, useValue: HttpHandlerMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Probar login', () => {
    const response: IUserResponse = {
      id: 'jidha',
      username: 'administrador',
      nombre: 'admin',
      apellidos: 'administrador',
      admin: true,
      email: 'email@email.com',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpc3RlbWFzQGhpcG9kcm9tb2NoaWxlLmNsIiwibmFtZSI6IlNpc3RlbWFzIiwiZmFtaWx5X25hbWUiOiJIaXBvZHJvbW8gQ2hpbGUiLCJ1c2VybmFtZSI6IkFkbWluaXN0cmFkb3IiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MzI2MjU5OTcsImV4cCI6MTYzMjYzNjgwMSwiaWF0IjoxNjMyNjI1OTk3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAifQ.aHKXRbAe0Mrv5YsQPtPEALuku1dDKpD1iH2KPtwRs0o',
    };

    const userObservable: Observable<IUserResponse> = of(response);
    HttpClientMock.post.and.returnValue(userObservable);

    const credencial: ICredenciales = {
      username: 'administrador',
      password: 'unacontraseña',
    };
    const url: string = `${environment.backendURL}${path}login`;

    service.login(credencial).subscribe((res) => {
      expect(HttpClientMock.post).toHaveBeenCalledWith(url, credencial);
      expect(res).toEqual(response);
    });
  });

  it('Registrar Usuario', () => {
    const response: IUserResponse = {
      id: 'jidha',
      username: 'administrador',
      nombre: 'admin',
      apellidos: 'administrador',
      admin: true,
      email: 'email@email.com',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpc3RlbWFzQGhpcG9kcm9tb2NoaWxlLmNsIiwibmFtZSI6IlNpc3RlbWFzIiwiZmFtaWx5X25hbWUiOiJIaXBvZHJvbW8gQ2hpbGUiLCJ1c2VybmFtZSI6IkFkbWluaXN0cmFkb3IiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MzI2MjU5OTcsImV4cCI6MTYzMjYzNjgwMSwiaWF0IjoxNjMyNjI1OTk3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAifQ.aHKXRbAe0Mrv5YsQPtPEALuku1dDKpD1iH2KPtwRs0o',
    };

    const userObservable: Observable<IUserResponse> = of(response);
    HttpClientMock.post.and.returnValue(userObservable);

    const user: IUser = {
      username: 'Administrador',
      email: 'admin@admin.cl',
      nombre: 'Administrador',
      apellidos: 'Dominios',
      password: 'DF45gf%^%6',
    };
    
    const url: string = `${environment.backendURL}${path}registrar`;

    service.registrar(user).subscribe((res) => {
      expect(HttpClientMock.post).toHaveBeenCalledWith(url, user);
      expect(res).toEqual(response);
    })

  });

  it('Logout y verificacion de token en localStorage', () => {
    service.logout();
    expect(service.checkToken()).toBeFalse();
  })
});
