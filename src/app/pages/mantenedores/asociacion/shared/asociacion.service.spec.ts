import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IAsociacion } from '@app/models/backend';
import { environment } from '@src/environments/environment';
import { Observable, of } from 'rxjs';

import { AsociacionService } from './asociacion.service';

describe('AsociacionService', () => {
  let service: AsociacionService;
  let HttpClientMock = {
    post: jasmine.createSpy('post'),
    delete: jasmine.createSpy('delete'),
  };
  let path: string = 'asociacion/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AsociacionService,
        { provide: HttpClient, useValue: HttpClientMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(AsociacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Probar creacion de asociacion', () => {
    const asociacionRes: IAsociacion = {
      id: 1,
      asociacion_id: '001',
      nombre: 'Una Asociacion',
    };

    const asociacionObservable: Observable<IAsociacion> = of(asociacionRes);
    HttpClientMock.post.and.returnValue(asociacionObservable);

    const asociacionN: IAsociacion = {
      asociacion_id: '001',
      nombre: 'Una Asociacion',
    };

    const url: string = `${environment.backendURL}${path}`;

    service.asociacionCreate(asociacionN).subscribe((res) => {
      expect(HttpClientMock.post).toHaveBeenCalledWith(url, asociacionN);
      expect(res).toEqual(asociacionRes);
    });
  });

  it('Probar eliminacion de asociacion', () => {
    const asociacion: IAsociacion = {
      id: 1,
      asociacion_id: '001',
      nombre: 'Una Asociacion',
    };

    const asociacionObservable: Observable<IAsociacion> = of(asociacion);
    HttpClientMock.delete.and.returnValue(asociacionObservable);

    const url: string = `${environment.backendURL}${path}`;

    service.asociacionDelete(asociacion).subscribe((res) => {
      expect(HttpClientMock.delete).toHaveBeenCalledWith(`${url}${asociacion.id}`);
      expect(res).toEqual(asociacion);
    });
  });
});
