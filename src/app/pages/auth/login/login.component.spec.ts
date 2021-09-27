import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICredenciales, IUserResponse } from '@app/models/backend';
import { AuthService, NotificationService } from '@app/services';
import { InputComponent } from '@app/shared/controls/input/input.component';
import { PasswordComponent } from '@app/shared/controls/password/password.component';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';

describe('TEST COMPONENTE LOGIN', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authServiceMock = { login: jasmine.createSpy('login') };
  let notificatioService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error'),
  };
  let RouterMock = { navigate: jasmine.createSpy('navigate') };

  function setForm(credencial: ICredenciales) {
    component.form.controls['username'].setValue(credencial.username);
    component.form.controls['password'].setValue(credencial.password);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, InputComponent, PasswordComponent],
      imports: [
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: Router, useValue: RouterMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: NotificationService, useValue: notificatioService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe ser formulario Valido', () => {
    fixture.detectChanges();
    let credencial: ICredenciales = {
      username: 'gbriones',
      password: 'Pass.1234',
    };
    setForm(credencial);
    fixture.detectChanges();
    expect(component.form.valid).toBeTrue();
  });

  it('Debe ser formulario Invalido', () => {
    fixture.detectChanges();
    expect(component.form.valid).toBeFalse();
  });

  it('Probar Login', () => {
    let credencial: ICredenciales = {
      username: 'gbriones',
      password: 'Pass.1234',
    };

    let uResponse: IUserResponse = {
      username: 'prueba',
      nombre: 'Tests',
      apellidos: 'Karma',
      email: 'karma@karma.cl',
      admin: false,
      id: 'kiskfskdf',
      token: ''
    };
    authServiceMock.login.and.returnValue(of(uResponse));
    setForm(credencial);
    component.loginOn();
    fixture.detectChanges();
    expect(component.form.valid).toBeTrue();
    expect(notificatioService.success).toHaveBeenCalled();
    expect(RouterMock.navigate).toHaveBeenCalledWith(['/static/home/']);
  });

  
  it('Login Erroneo', () => {
    let credencial: ICredenciales = {
      username: 'gbriones',
      password: 'Pass.1234',
    };
    authServiceMock.login.and.returnValue(throwError({}));
    setForm(credencial);
    component.loginOn();
    fixture.detectChanges();
    expect(component.form.valid).toBeTrue();
    expect(notificatioService.error).toHaveBeenCalled();
  });
});
