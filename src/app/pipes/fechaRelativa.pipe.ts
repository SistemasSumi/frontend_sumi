import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'fechaRelativa'
})
export class FechaRelativaPipe implements PipeTransform {

  transform(timestamp: number): string {
    const fecha = moment(timestamp);
    return fecha.fromNow();
  }

}
