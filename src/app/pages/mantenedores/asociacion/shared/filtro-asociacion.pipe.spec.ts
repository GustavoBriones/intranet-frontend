import { IAsociacion } from '@app/models/backend';
import { pipe } from 'rxjs';
import { FiltroAsociacionPipe } from './filtro-asociacion.pipe';

describe('FiltroAsociacionPipe', () => {
  const pipe = new FiltroAsociacionPipe();
  let asociaciones: IAsociacion[] = [
    { id: 1, asociacion_id: '001', nombre: 'UNO' },
    { id: 2, asociacion_id: '002', nombre: 'DOS' },
    { id: 3, asociacion_id: '003', nombre: 'TRES' },
    { id: 4, asociacion_id: '004', nombre: 'CUATRO' },
    { id: 5, asociacion_id: '005', nombre: 'CINCO' },
    { id: 6, asociacion_id: '006', nombre: 'SEIS' },
    { id: 7, asociacion_id: '007', nombre: 'SIETE' },
    { id: 8, asociacion_id: '008', nombre: 'OCHO' },
  ];
  let asociacion: IAsociacion = {
    id: 4,
    asociacion_id: '004',
    nombre: 'CUATRO',
  };

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Se verifica funcion del filtro', () => {
    expect(pipe.transform(asociaciones, 'cuatro')).toEqual([asociacion]);
  });
});
