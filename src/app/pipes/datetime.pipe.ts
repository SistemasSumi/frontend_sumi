import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('es')


@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(value).format('MMMM DD YYYY, h:mm a');
  }

}
