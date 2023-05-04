import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('es')


@Pipe({
  name: 'diffTime'
})
export class DiffTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let  fechaActual = moment(new Date()).format('YYYY-MM-DD')     
    return "- " +moment(value).diff(fechaActual, 'days')+ " Dias";
  }

}
