import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAsociacion } from '@app/models/backend';

import { AsociacionDeleteComponent } from './asociacion-delete.component';

describe('AsociacionDeleteComponent', () => {
  let component: AsociacionDeleteComponent;
  let fixture: ComponentFixture<AsociacionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociacionDeleteComponent ],
      providers: [
        {provide: MatDialogRef, useValue:{}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociacionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
