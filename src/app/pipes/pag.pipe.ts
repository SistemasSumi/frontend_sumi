import { Pipe, PipeTransform } from '@angular/core';
import { Tarifas } from '../interfaces/interfaces';

@Pipe({
  name: 'pag'
})
export class PagPipe implements PipeTransform {

  transform(resp: Tarifas[],page: number = 0, search: string = ''): any {
    if ( search.length === 0 )
    return resp.slice(page, page + 5);
    
    const filteredArray = resp.filter( tarifa => tarifa.taxi.placa.includes( search ) );
    return filteredArray.slice(page, page + 5);
  }

}
