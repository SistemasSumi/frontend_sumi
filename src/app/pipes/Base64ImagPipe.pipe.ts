import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Base64ImagPipe'
})
export class Base64ImagPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
