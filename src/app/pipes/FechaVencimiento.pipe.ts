import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('es')


@Pipe({
  name: 'FechaVencimiento'
})
export class FechaVencimientoPipe implements PipeTransform {

  transform(value: any,tercero?:any, args?: any): any {
    

    console.log(tercero);

    let dias = 0;

    let  fechaActual = moment(new Date()).format('YYYY-MM-DD')     
    dias = moment(value).diff(fechaActual, 'days');
    

    let resultado = ``;

    if(dias <= 15){
      resultado = `<span class="text-danger">`+value+`</span>`;
    }else if(dias <= 30){
      resultado = `<span class="text-warning">`+value+`</span>`;
    }else{

      resultado = `<span>`+value+`</span>`;
    }

    return resultado;



  }

}
