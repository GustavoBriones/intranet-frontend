import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser, IUserResponse } from '@app/models/backend';
import { AuthService, NotificationService } from '@app/services';
import { InputComponent } from '@app/shared/controls/input/input.component';
import { PasswordComponent } from '@app/shared/controls/password/password.component';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let authServiceMock = {
    registrar: jasmine.createSpy('registrar'),
  };
  let notificatioMock = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error'),
  };
  let routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

  let user: IUser = {
    username: 'prueba',
    nombre: 'Tests',
    apellidos: 'Karma',
    email: 'karma@karma.cl',
    password: 'H!p0dr0m0',
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

  function setForm(user: IUser) {
    component.form.controls['username'].setValue(user.username);
    component.form.controls['nombre'].setValue(user.nombre);
    component.form.controls['apellidos'].setValue(user.apellidos);
    component.form.controls['email'].setValue(user.email);
    component.form.controls['password'].setValue(user.password);
    component.form.controls['passwordRepeat'].setValue(user.password);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroComponent, InputComponent, PasswordComponent],
      imports: [
        MatSnackBarModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: NotificationService, useValue: notificatioMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe ser formulario Valido', () => {
    fixture.detectChanges();
    setForm(user);
    fixture.detectChanges();
    expect(component.form.valid).toBeTrue();
  });

  it('El Spinner debe tene valor falso', () => {
    expect(component.showSpinner).toBeFalse();
  })

  it('Registro Ok', fakeAsync(() => {
    setForm(user);
    authServiceMock.registrar.and.returnValue(of(uResponse));
    component.registroOn();
    fixture.detectChanges();
    expect(component.showSpinner).toBeFalse();
    expect(component.form.valid).toBeTrue();
  }));
});
