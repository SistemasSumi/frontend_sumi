import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: string): string {
    var re = / /gi; 
    var slash = '/'; 
    var parent1 = '('; 
    var parent2 = ')'; 
    var punto = '.'; 
    var newstr = value.replace(re, ""); 
    newstr = newstr.replace(slash,"");
    newstr = newstr.replace(parent1,"");
    newstr = newstr.replace(parent2,"");
    newstr = newstr.replace(punto,"");
    newstr = newstr.replace(punto,"");
    newstr = newstr.replace(punto,"");
    newstr = newstr.replace(punto,"");
    newstr = newstr.replace(punto,"");
    return newstr;
  }

}
