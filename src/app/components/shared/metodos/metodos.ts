
import { Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { IMGSVG } from "./IMGSVG";

export class MetodosShared {

  
 

    constructor(){}
    


    public redondearAl50MasCercano(valor:number){
      if(valor%50 == 0){
          return valor;
      }else{
        return (Math.floor((valor/50)+1)*50)
      }
    }

    public DiasEntreFechaActualYOTRA(fecha){
      const date1 = new Date(fecha);
      const date2 = new Date();
      const diffInMs = date1.getTime() - date2.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      console.log(diffInDays);  
      return diffInDays;
    }

    public filtrarArray<tipo>(data:tipo[],columnName:string, busqueda:string){
        
        if (!data) {
          return;
        }
      
        let search = busqueda;
        if (!search) {
         return data.slice();
         
        } else {
          search = search.toLowerCase();
        }
    
       return data.filter(data => data[columnName].toLowerCase().indexOf(search) > -1)
    
        
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
                    <div class="`+aling+` mt-4">
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
      
  

}
