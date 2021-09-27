import { HttpClient, HttpHandler } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@app/services';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let HttpClientMock = { post: jasmine.createSpy('post') };
  let HttpHandlerMock = { handler: jasmine.createSpy('handler') };
  let RouterMock = { navigate: jasmine.createSpy('navigate') };
  let AuthServiceMock: jasmine.SpyObj<AuthService>;
  let spy = jasmine.createSpyObj('AuthService', ['logout']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: Router, useValue: RouterMock },
        { provide: AuthServiceMock, useValue: spy },
        { provide: HttpClient, useValue: HttpClientMock },
        { provide: HttpHandler, useValue: HttpHandlerMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    AuthServiceMock = TestBed.inject(
      AuthService
    ) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Carga si esta logeado (false)', () => {
    expect(component.isLoggedIn).toBeFalse();
  });

  it('Se agrega un logeo', () => {
    AuthServiceMock.isLogged.next(true);
    fixture.detectChanges();
    expect(component.isLoggedIn).toBeTrue();
  });

});
