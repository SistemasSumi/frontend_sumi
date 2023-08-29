
import { DatePipe } from "@angular/common";
import { Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { IMGSVG } from "./IMGSVG";
import ClipboardJS from 'clipboard';
import localeEs from "@angular/common/locales/es-CO";
import { registerLocaleData } from "@angular/common";
import { ElementRef } from "@angular/core";
registerLocaleData(localeEs, "es-CO");

export class MetodosShared {

  
 

    constructor(){}
    

    public redondearAl50MasCercano(valor:number){
      if (valor % 1 === 0) {
        return valor;  // El número ya es un entero, no es necesario redondear
      } else {
        return Math.round(valor);  // Redondea al número entero más cercano
      }
    }

    // public redondearAl50MasCercano(valor:number){
    //   if(valor%50 == 0){
    //       return valor;
    //   }else{
    //     return (Math.floor((valor/50)+1)*50)
    //   }
    // }

    public DiasEntreFechaActualYOTRA(fecha){
      const date1 = new Date(fecha);
      const date2 = new Date();
      const diffInMs = date1.getTime() - date2.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      // console.log(diffInDays);  
      return diffInDays;
    }

    public filtrarArray<tipo>(data:tipo[],columnName:string, busqueda:string){
        
      // console.log(columnName)
      // console.log(data)
        if (!data) {

          return;
        }
      
        let search = busqueda;
        if (!search) {
         return data.slice();
         
        } else {
          search = search.toLowerCase();
        }
    
       return data.filter(data => data[columnName].toString().toLowerCase().indexOf(search) > -1)
    
        
    }
    public filtrarArrayPuc<tipo>(data:tipo[],columnName:string, busqueda:string){
     
        if (!data) {
          return;
        }
      
        let search = busqueda;
        if (!search) {
         return data.slice();
         
        } else {
          search = search.toLowerCase();
        }
    
       return data.filter(data => data[columnName].toString().toLowerCase().indexOf(search) > -1)
    
        
    }

    public AlertError(mensaje:string,aling?:string){
      let body = "";
      if(aling != '' || aling != undefined){
        body =  `
          <div class="row">
          <div class="mb-3">
              `+IMGSVG.error+`
          </div>
          <div class="mt-auto">
            <div class="alert alert-danger alert-dismissible fade show mb-0" role="alert">
                
                
      
                <div>
                    <!-- <h5 class="text-info">No hay historial !</h5> -->
                    <div style="text-align:`+aling+`;" class=" mt-4">
                      <p><span class="fw-semibold">`+mensaje+`</span></p>
                      
                    </div>
                </div>
            </div>
        </div>
        </div>
          `
      }else{
       body = `
        <div class="row">
        <div class="mb-3">
            `+IMGSVG.error+`
        </div>
        <div class="mt-auto">
          <div class="alert alert-danger alert-dismissible fade show mb-0" role="alert">
              
              
    
              <div>
                  <!-- <h5 class="text-info">No hay historial !</h5> -->
                  <div class="text-center mt-4">
                    <p><span class="fw-semibold">`+mensaje+`</span></p>
                    
                  </div>
              </div>
          </div>
      </div>
      </div>
        `
      }


      Swal.fire({
    
        confirmButtonColor: '#ff0000',
        html:body
      });
    }

    public AlertDenegado(mensaje:string){
      Swal.fire({
    
        confirmButtonColor: '#ff0000',
        html:`
        <div class="row">
        <div class="mb-3">
            `+IMGSVG.security+`
        </div>
        <div class="mt-auto">
          <div class="alert alert-danger alert-dismissible fade show mb-0" role="alert">
              
              
    
              <div>
                  <!-- <h5 class="text-info">No hay historial !</h5> -->
                  <div class="text-center mt-4">
                    <p><span class="fw-semibold">`+mensaje+`</span></p>
                    
                  </div>
              </div>
          </div>
      </div>
      </div>
        `
      });
    }
    public AlertOK(mensaje:string){
      Swal.fire({
    
        confirmButtonColor: '#41B6FF',
        html:`
        <div class="row">
        <div class="mb-3">
            `+IMGSVG.ok+`
        </div>
        <div class="mt-auto">
          <div class="alert alert-info alert-dismissible fade show mb-0" role="alert">
              
              
    
              <div>
                  <!-- <h5 class="text-info">No hay historial !</h5> -->
                  <div class="text-center mt-4">
                    <p><span class="fw-semibold">`+mensaje+`</span></p>
                    
                  </div>
              </div>
          </div>
      </div>
      </div>
        `
      });
    }

    public AlertQuestion(mensaje:string){


      return Swal.fire({
        confirmButtonColor: '#FFCC00',
        showCancelButton: true,
        cancelButtonText: 'CANCELAR',
        confirmButtonText: 'CONTINUAR',
        html:`
        <div class="row">
        <div class="mb-3">
            `+IMGSVG.Q+`
        </div>
        <div class="mt-auto">
          <div style="background-color:#FFE680" class="alert alert-warning alert-dismissible fade show mb-0" role="alert">
              
              
    
              <div>
                  <!-- <h5 class="text-info">No hay historial !</h5> -->
                  <div class="text-center mt-4">
                    <p><span class="fw-semibold">`+mensaje+`</span></p>
                    
                  </div>
              </div>
          </div>
      </div>
      </div>
        `
      })

    }
      
    public AlertSecurity(mensaje:string){


      return Swal.fire({
        confirmButtonColor: '#41B6FF',
        showCancelButton: true,
        cancelButtonText: 'CANCELAR',
        input: 'password',
        confirmButtonText: 'ENVIAR',
        html:`
        <div class="row">
        <div class="mb-3">
            `+IMGSVG.password+`
        </div>
        <div class="mt-auto">
          <div  class="alert alert-info alert-dismissible fade show mb-0" role="alert">
              
              
    
              <div>
                  <!-- <h5 class="text-info">No hay historial !</h5> -->
                  <div class="text-center mt-4">
                    <p><span class="fw-semibold">`+mensaje+`</span></p>
                    
                  </div>
              </div>
          </div>
      </div>
      </div>
        `
      })

    }
      

    public  generateMonths(startYear: number): meses[] {
      const Meses: meses[] = [];

      const yearActual = new Date().getFullYear();

      let startMonth = 11;

      if(startYear == yearActual){
        startMonth = new Date().getMonth();
      }


      const datePipe:DatePipe = new DatePipe('es-CO');
      const year = new Date().getFullYear();
      for (let i = startMonth; i >= 0; i--) {
        const month = datePipe.transform(new Date(startYear, i), 'MMMM');

        let actual = false;

        if(startYear == yearActual){
          if(new Date().getMonth()==i){
            actual = true;
          }
        }
          

        let mes:meses = {
          id:i+1,
          mes:month.toUpperCase(),
          actual

        }
        Meses.push(mes);
      }
      return Meses;
    }


    public permisoPreciosBajos(html,mensaje:string,id) {
     
      Swal.fire({
        title: 'Información',
        html:html,
        icon: 'info',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Copiar mensaje',
        cancelButtonText: 'Cancelar',
        didOpen: () => {
          const btnCopiar = Swal.getConfirmButton();
          const btnCancelar = Swal.getCancelButton();
    
          btnCopiar.addEventListener('click', () => {
            navigator.clipboard.writeText(mensaje)
              .then(() => {
                Swal.fire('Mensaje copiado', '', 'success');
              })
              .catch(() => {
                Swal.fire('Error al copiar', '', 'error');
              });
          });
    
          btnCancelar.addEventListener('click', () => {
            Swal.close();
          });
        
        }
      });
    }

    public generateYears(): number[]{
      const currentYear = new Date().getFullYear();
      let hasta = currentYear - 2018;
      hasta += 1;
      return Array.from({ length: hasta }, (_, index) => currentYear - index);
    }

    public scrollToElement(elementRef: ElementRef, yOffset: number) {
      if (elementRef && elementRef.nativeElement) {
        elementRef.nativeElement.scrollIntoView();
        window.scrollBy(0, yOffset);
      }
    }

    /**
  * Obtiene un objeto de un array por un valor específico en una columna determinada.
  * @param array - El array de objetos en el que se realizará la búsqueda.
  * @param valor - El valor que se desea buscar en la columna especificada.
  * @param columna - La columna en la que se buscará el valor.
  * @returns El objeto encontrado o undefined si no se encontró ningún objeto con el valor especificado en la columna.
  */
  getObjectByValue<T>(array: T[] , valor: any, columna: keyof T): T | undefined {
    array = array ?? []; 
    return array.find((item) => item[columna] === valor);
  }



  loQueVaDelMes(){
    const currentDate = new Date();

    // Establece la fecha de inicio
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let startDate = firstDayOfMonth;

    // Establece la fecha de fin como la fecha actual
    let endDate = currentDate;

    let data = {
      startDate,
      endDate
    }

    return data;
  }

  mesAnteriorHastaHoy(){
      // Obtén la fecha actual
      const currentDate = new Date();

      // Crea una copia del objeto currentDate
      const calendar2 = new Date(currentDate);
  
      // Resta 1 mes a la fecha
      calendar2.setMonth(calendar2.getMonth() - 1);
      calendar2.setDate(1); // Establece el día en 1
  
      // Establece la fecha de inicio
      let startDate = calendar2;
  
      // Establece la fecha de fin como la fecha actual
      let endDate = currentDate;

      let data = {
        startDate,
        endDate
      }
  
      return data;
  }


  mesAnterior(){
      // Obtén la fecha actual
      const currentDate = new Date();

      // Crea una instancia de Date para la fecha de inicio
      const calendar = new Date();
  
      // Resta 1 mes a la fecha de inicio
      calendar.setMonth(calendar.getMonth() - 1);
      calendar.setDate(1); // Establece el día en 1
  
      // Establece la fecha de inicio
      let startDate = calendar;
  
      // Crea una instancia de Date para la fecha de fin
      const cale = new Date();
      cale.setDate(0); // Establece el día en el último día del mes anterior
  
      // Establece la fecha de fin
      let endDate = cale;

      let data = {
        startDate,
        endDate
      }
  
      return data;
  }

  yearActual(){
     // Obtén la fecha actual
     const currentDate = new Date();

     // Establece la fecha de inicio del año actual
     const startDate = new Date(currentDate.getFullYear(), 0, 1); // Mes 0 representa enero
 
     // Establece la fecha de fin como la fecha actual
     const endDate = currentDate;
 
     let data = {
      startDate,
      endDate
    }

    return data
  }

  yearAnterior(){
     // Obtén la fecha actual
     const currentDate = new Date();

     // Establece la fecha de inicio del año anterior
     const startDate = new Date(currentDate.getFullYear() - 1, 0, 1); // Restamos 1 al año actual
 
     // Establece la fecha de fin como el último día del año anterior
     const endDate = new Date(currentDate.getFullYear() - 1, 11, 31); // Restamos 1 al año actual y establecemos el mes como diciembre (11)
     let data = {
      startDate,
      endDate
    }

    return data
  }

  semanaActual(){
    // Obtén la fecha actual
    const currentDate = new Date();

    // Calcula el primer día de la semana
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Resta los días transcurridos desde el inicio de la semana

    // Calcula el último día de la semana
    const lastDayOfWeek = new Date(currentDate);
    lastDayOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay())); // Suma los días restantes hasta el final de la semana

    const startDate = firstDayOfWeek;
    const endDate = lastDayOfWeek;

    let data = {
      startDate,
      endDate
    }

    return data
  }

  semanaAnterior(){
    // Obtén la fecha actual
    const currentDate = new Date();

    // Calcula el primer día de la semana anterior
    const firstDayOfLastWeek = new Date(currentDate);
    firstDayOfLastWeek.setDate(currentDate.getDate() - currentDate.getDay() - 7); // Resta los días transcurridos desde el inicio de la semana y 7 días más

    // Calcula el último día de la semana anterior
    const lastDayOfLastWeek = new Date(currentDate);
    lastDayOfLastWeek.setDate(currentDate.getDate() - currentDate.getDay() - 1); // Resta los días transcurridos desde el inicio de la semana y 1 día más

    const startDate = firstDayOfLastWeek;
    const endDate = lastDayOfLastWeek;

    let data = {
      startDate,
      endDate
    }

    return data
  }
      
  

}


interface meses  {
  id:number,
  mes:string,
  actual:boolean
}
