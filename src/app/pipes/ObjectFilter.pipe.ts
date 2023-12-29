import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectFilter'
})
export class ObjectFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || items.length === 0) {
      return items; // Devolver la matriz original si está vacía
    }

    if (!searchText || searchText.trim() === '') {
      return items; // Devolver la matriz original si no se proporciona un término de búsqueda
    }

    // Normaliza el texto de búsqueda y conviértelo a minúsculas
    searchText = searchText.toLowerCase();

    // Divide el texto en palabras alfabéticas y numéricas
    const searchWords = searchText.match(/\w+/g) || [];

    const filteredItems = items.map(item => {
      let matchingWords = 0;
      let exactMatch = false;


      for (let key in item) {

        if (item.hasOwnProperty(key)) {
          const value = item[key];
          if (value) {
            const normalizedValue = this.normalizeText(value.toString().toLowerCase());
            if (normalizedValue === searchText) {
              exactMatch = true;
            } 
            else if  (item[key] && this.containsAnyWord(item[key].toString().toLowerCase(), searchWords)) {
               matchingWords++;
            }
          }
        }
      }
      return { item, exactMatch, matchingWords };

    });



    let sortedItems = filteredItems.filter(item => item.exactMatch || item.matchingWords > 0).sort((a, b) =>  {
      if (a.exactMatch && !b.exactMatch) {
        return -1; // Prioriza la coincidencia exacta
      } else if (!a.exactMatch && b.exactMatch) {
        return 1; // Prioriza la coincidencia exacta
      } else  {

        return  b.matchingWords - a.matchingWords;
      }
    });
    sortedItems  = sortedItems;


 
    return sortedItems.map(result => result.item);

  
    

    // if(this.areObjectsEqual(filteredItems,items)){
    //   return [];
    // }

    // return filteredItems;
  }
  customSort(a, b, word) {
    const textA = a.texto.toLowerCase();
    const textB = b.texto.toLowerCase();
  
    // Comprobar si 'prove' está presente en alguna de las columnas de texto
    const containsProveA = textA.includes(word);
    const containsProveB = textB.includes(word);
  
    if ((containsProveA && containsProveB) || (!containsProveA && !containsProveB)) {
      return 0; // Ambos tienen 'prove' o ninguno lo tiene, devuelve 0 (sin cambio de orden)
    } else if (containsProveA) {
      return -1; // Solo 'a' contiene 'prove', coloca 'a' antes de 'b'
    } else {
      return 1; // Solo 'b' contiene 'prove', coloca 'b' antes de 'a'
    }
  }

  containsAnyWord(text: string, words: string[]): boolean {
    return words.some(word => this.normalizeText(text).includes(word.toString()));
  }

  normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toString();
  }

  areObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}