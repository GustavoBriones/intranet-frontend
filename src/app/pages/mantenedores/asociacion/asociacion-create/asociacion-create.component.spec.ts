import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { NotificationService } from '@app/services';
import { InputComponent } from '@app/shared/controls/input/input.component';
import { AsociacionService } from '../shared/asociacion.service';

import { AsociacionCreateComponent } from './asociacion-create.component';

describe('AsociacionCreateComponent', () => {
  let component: AsociacionCreateComponent;
  let fixture: ComponentFixture<AsociacionCreateComponent>;
  let id: ComponentFixture<InputComponent>;
  let nombre: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociacionCreateComponent, InputComponent ],
      imports: [
        MatSnackBarModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([])
      ],
      providers: [
        AsociacionService,
        NotificationService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociacionCreateComponent);
    id = TestBed.createComponent(InputComponent);
    nombre = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
