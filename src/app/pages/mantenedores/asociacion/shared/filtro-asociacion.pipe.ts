import { Pipe, PipeTransform } from '@angular/core';
import { IAsociacion } from '@app/models/backend';

@Pipe({
  name: 'filtroAsociacion'
})
export class FiltroAsociacionPipe implements PipeTransform {

  transform(value: IAsociacion[], filtro: string): IAsociacion[] {
    if(filtro === '' || filtro === undefined){
      return value;
    }
    return value.filter(asociacion => asociacion.nombre.toLocaleUpperCase().indexOf(filtro.toLocaleUpperCase()) != -1);
  }

}
