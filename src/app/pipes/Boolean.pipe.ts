import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(value){
      return 'SI';
    }else{
      return 'NO';
    }
    
  }

}
