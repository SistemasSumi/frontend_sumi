import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ceros'
})
export class CerosPipe implements PipeTransform {

  transform(value: any, args?: any): any {


  

    return this.cerosAlaIzquierda(value,5);
  }

  cerosAlaIzquierda(number:number,width){
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = numberOutput.toString().length;/* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.valueOf(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
  }

}


