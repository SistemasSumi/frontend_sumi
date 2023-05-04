import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acortarText'
})
export class AcortarTextPipe implements PipeTransform {

  transform(value: any, limite: string): any {
    var puntosSuspensivos = "...";

    if(value){
      if(value.length > limite){
        value = value.substring(0,limite) + puntosSuspensivos;
      }
    }
    
  
    return value;
  }

 

}
