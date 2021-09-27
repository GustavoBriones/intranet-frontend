import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IAsociacion } from '@app/models/backend';
import { NotificationService } from '@app/services';
import { of } from 'rxjs';
import { AsociacionDeleteComponent } from '../asociacion-delete/asociacion-delete.component';
import { AsociacionService } from '../shared/asociacion.service';
import { FiltroAsociacionPipe } from '../shared/filtro-asociacion.pipe';

import { AsociacionListComponent } from './asociacion-list.component';

describe('AsociacionListComponent', () => {
  let component: AsociacionListComponent;
  let fixture: ComponentFixture<AsociacionListComponent>;

  let asociaciones: IAsociacion[] = [
    { id: 1, asociacion_id: '001', nombre: 'Asociacion Uno' },
    { id: 2, asociacion_id: '002', nombre: 'Asociacion Dos' },
    { id: 3, asociacion_id: '003', nombre: 'Asociacion Tres' },
    { id: 4, asociacion_id: '004', nombre: 'Asociacion Cuatro' },
    { id: 5, asociacion_id: '005', nombre: 'Asociacion Cinco' },
    { id: 6, asociacion_id: '006', nombre: 'Asociacion Seis' },
  ];

  let asociacionServiceMock = {
    asociacionAll: jasmine.createSpy('asociacionAll'),
  };
  let notificatioService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AsociacionListComponent,
        FiltroAsociacionPipe,
        AsociacionDeleteComponent,
      ],
      imports: [MatSnackBarModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        { provide: AsociacionService, useValue: asociacionServiceMock },
        { provide: NotificationService, useValue: notificatioService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociacionListComponent);
    component = fixture.componentInstance;
    asociacionServiceMock.asociacionAll.and.returnValue(of(asociaciones));
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('El servicio es llamado al inicio', () => {
    expect(asociacionServiceMock.asociacionAll.calls.any()).toBeTrue();
  });

  it('Llamado a Dialog y verificacion de datos', () => {
    let asociacion: IAsociacion = {
      id: 1,
      asociacion_id: '001',
      nombre: 'Asociacion Uno',
    };
    let data: string = `Desea eliminar la asociación ${asociacion.nombre}?`;
    component.deleteAsociacion(asociacion);
    fixture.detectChanges();
    const parafo = document.getElementsByTagName('p')[0] as HTMLHeadElement;
    expect(parafo.innerText).toEqual(data);
  });
});
