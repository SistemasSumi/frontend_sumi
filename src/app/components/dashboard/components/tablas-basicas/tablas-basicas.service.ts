import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { CargosModel } from '../../../../models/acceso/cargo.model';
import * as moment from 'moment';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

moment.locale('es')
import { CurrencyPipe } from '@angular/common'



@Injectable({
  providedIn: 'root'
})
export class TablasBasicasService {

  cargosSubject: BehaviorSubject<any>
  usuarioSubject: BehaviorSubject<any>




  fechaActual: any;

  httpOptions           : any;
  cargosData            : any;
  settingsData          : any;
  barberosData          : any;
  ServicioData          : any;
  usuariosData          : any;
  fincaData             : any;
  coloresData           : any;
  laboresData           : any;
  tipoEmpData           : any;
  semanasAnioData       : any;
  procesosData          : any;
  funcionesEmpleadosData: any;


  constructor(public router:Router, private http:HttpClient, private auth:SeguridadService,private cp:CurrencyPipe) {
    this.cargosSubject = new BehaviorSubject<any>(this.cargosData)
    this.getServicios();
    this.getUsuario();
    // this.getCargos();
    this.getBarberos();
    // this.getColores();
    // this.getLabores();
    // this.getSemanasAnio();
    // this.getTiposEmpleados();
   }

    /* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼  METODOS PARA GESTIONAR MI MODELO BARBERO ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */
 
 
    createNewBarbero(form:FormGroup){
      var url = environment.BACKEND_DIR+"acceso/barberos/"
      const token = this.auth.currentUser.getTokenUser();
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Token '+token
        })
      };
      
      const barberoData = {
          documento: form.value.documento,
          nombres: form.value.nombres,
          apellidos: form.value.apellidos,
          direccion: form.value.direccion,
          porcentaje: form.value.porcentaje,
          telefono: form.value.telefono,
          usuario: form.value.users,  
          // usuario:this.auth.currentUser.getIdUser()
      }
      return this.http.post(url,barberoData,this.httpOptions);
  
  
    } 
  
     editBarbero(form:FormGroup){
      var url = environment.BACKEND_DIR+"acceso/barberos/"
      const token = this.auth.currentUser.getTokenUser();
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Token '+token
        })
      };
      
      const barberoData = {
        id: form.value.id,
        documento: form.value.documento,
        nombres: form.value.nombres,
        apellidos: form.value.apellidos,
        direccion: form.value.direccion,
        porcentaje: form.value.porcentaje,
        telefono: form.value.telefono,
        usuario: form.value.users,  
        // usuario:this.auth.currentUser.getIdUser()
    }
      return this.http.put(url,barberoData,this.httpOptions);
    } 
  

    getBarberos(){
      const  url = environment.BACKEND_DIR+'acceso/barberos/lista/';
      const token = this.auth.currentUser.getTokenUser();
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Token '+token
       })
      };

      return this.http.get(url, this.httpOptions).pipe(
        map(resp => {
          this.barberosData = resp;
          for (let x in resp) {
            this.barberosData[x].porcentaje = resp[x].porcentaje+"%"
            this.barberosData[x].fecha_creacion = moment(resp[x].fecha_creacion).format('MMMM DD YYYY, h:mm a');
           
           
          }

          
          return resp;
        })
      )
    
    }


    getUsuario(){
      const  url = environment.BACKEND_DIR+'auth/users/api/users/';
      const token = this.auth.currentUser.getTokenUser();
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Token '+token
       })
      };

      return this.http.get(url, this.httpOptions).pipe(
        map(resp => {
          this.usuariosData = resp;
          
          return resp;
        })
      )
    
    }
  
  
   /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO BARBERO ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  
   /* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼  METODOS PARA GESTIONAR MI MODELO BARBERO ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */
 
 
   createNewServicio(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/servicios/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const ServicioData = {
        nombres: form.value.nombres,
        valor: form.value.valor,  
        // usuario:this.auth.currentUser.getIdUser()
    }
    return this.http.post(url,ServicioData,this.httpOptions);


  } 

   editServicio(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/servicios/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const ServicioData = {
      id: form.value.id,
      nombres: form.value.nombres,
      valor: form.value.valor,  
      // usuario:this.auth.currentUser.getIdUser()
  }
    return this.http.put(url,ServicioData,this.httpOptions);
  } 


  getServicios(){
    const  url = environment.BACKEND_DIR+'acceso/servicios/lista/';
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
     })
    };

    return this.http.get(url, this.httpOptions).pipe(
      map(resp => {
        this.ServicioData = resp;
        console.log(resp);
        for (let x in resp) {
          this.ServicioData[x].valor = this.cp.transform(parseInt(resp[x].valor));
        }
        return resp;
      })
    )
  
  }





 /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO SERVICIO ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */


  /* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼  METODOS PARA GESTIONAR MI MODELO BARBERO ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */
 
 
  createNewConfiguracion(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/configuracion/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const settings = {

        ConsecutivoDecuento: form.value.ConsecutivoDecuento,  
        codigoActualizar: form.value.codigoActualizar,  
        // usuario:this.auth.currentUser.getIdUser()
    }
    return this.http.post(url,settings,this.httpOptions);


  } 

   editconfiguracion(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/configuracion/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const settings = {
          
      ConsecutivoDecuento: form.value.ConsecutivoDecuento,  
      codigoActualizar: form.value.codigoActualizar,  
      // usuario:this.auth.currentUser.getIdUser()
  }
    return this.http.put(url,settings,this.httpOptions);
  } 


  getConfiguracion(){
    const  url = environment.BACKEND_DIR+'acceso/configuracion/lista/';
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
     })
    };

    return this.http.get(url, this.httpOptions).pipe(
      map(resp => {
        this.settingsData = resp;
        console.log(resp);
        
        return resp;
      })
    )
  
  }





 /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO Configuracion ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */







  /* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼  METODOS PARA GESTIONAR MI MODELO CARGOS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */
 
 
  createNewCargo(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/registrar/cargo/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const CargoData = {
        cargo: form.value.cargo,
        descripcion: form.value.descripcion,
        empresa:1,
        usuario:this.auth.currentUser.getIdUser()
    }
    return this.http.post(url,CargoData,this.httpOptions);


  }

  editCargo(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/registrar/cargo/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const CargoData = {
        id:form.value.id,
        cargo: form.value.cargo,
        descripcion: form.value.descripcion,
        empresa:1,
        usuario:this.auth.currentUser.getIdUser()
    }
    return this.http.put(url,CargoData,this.httpOptions);
  }

  getCargos(){
    const  url = environment.BACKEND_DIR+'acceso/listar/cargo/';
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
     })
    };
    return this.http.get(url, this.httpOptions).subscribe(resp =>{
    
        this.cargosData = resp
        for (let x in resp) {
          
          this.cargosData[x].fecha_creacion = moment(resp[x].fecha_creacion).format('MMMM DD YYYY, h:mm a');
         
         
        }
         this.cargosSubject.next(this.cargosData);
        return this.cargosData;
  
      })
  
  }


 /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO CARGOS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  
  
 /* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO COLORES ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */

   getColores(){
    const  url = environment.BACKEND_DIR+'acceso/listar/color/';
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
     })
    };
    return this.http.get(url, this.httpOptions).pipe(
      map(resp => {
        this.coloresData = resp;
        for (let x in resp) {
          
          
          this.coloresData[x].fecha_creacion = moment(resp[x].fecha_creacion).format('MMMM DD YYYY, h:mm a');
         
         
        }
        return resp;
      })
    )
  
  }

  createNewColor(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/registrar/colores/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const ColresoData = {
        color: form.value.color,
        finca: form.value.finca,
        empresa:1,
        usuario:this.auth.currentUser.getIdUser()
    }
    return this.http.post(url,ColresoData,this.httpOptions);


  }

  editColor(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/registrar/colores/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const ColresData = {
        id:form.value.id,
        color: form.value.color,
        finca: form.value.finca,
        empresa:1,
        usuario:this.auth.currentUser.getIdUser()
    }
    return this.http.put(url,ColresData,this.httpOptions);


  }


  /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO COLORES ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */



  /* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO FINCAS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */

  getFincas(){
    const  url = environment.BACKEND_DIR+'acceso/listar/fincas/';
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
     })
    };
    return this.http.get(url, this.httpOptions);
  }

  /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO FINCAS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */



  /* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO LABORES ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */
    
  getLabores(){
    const  url = environment.BACKEND_DIR+'acceso/listar/labores/';
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
     })
    };
    return this.http.get(url, this.httpOptions).pipe(
      map(resp => {
        this.laboresData = resp;
        for (let x in resp) {
          
          
          this.laboresData[x].fecha_creacion = moment(resp[x].fecha_creacion).format('MMMM DD YYYY, h:mm a');
         
         
        }
        return this.laboresData;
      })
    )
  
  }

  createNewLabor(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/registrar/labor/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const LaborData = {
        labor: form.value.labor,
        descripcion: form.value.descripcion,
        finca: form.value.finca,
        empresa:1,
        usuario:this.auth.currentUser.getIdUser()
    }
    return this.http.post(url,LaborData,this.httpOptions);


  }

  editLabor(form:FormGroup){
    var url = "http://localhost:8000/acceso/registrar/labor/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const LaborData = {
        id:form.value.id,
        labor: form.value.labor,
        descripcion: form.value.descripcion,
        finca: form.value.finca,
        empresa:1,
        usuario:this.auth.currentUser.getIdUser()
    }
    return this.http.put(url,LaborData,this.httpOptions);


  }

  /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO LABORES ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */


   /* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO LABORES ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */
    
   getTiposEmpleados(){
    const  url = environment.BACKEND_DIR+'acceso/listar/tipo-emp/';
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
     })
    };
    return this.http.get(url, this.httpOptions).pipe(
      map(resp => {
        this.tipoEmpData = resp;
        for (let x in resp) {
          
          
          this.tipoEmpData[x].fecha_creacion = moment(resp[x].fecha_creacion).format('MMMM DD YYYY, h:mm a');
         
         
        }
        return this.tipoEmpData;
      })
    )
  
  }

  createNewTipoEmp(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/registrar/tipo-emp/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const tipoEmpData = {
        tipo: form.value.tipo,
        descripcion: form.value.descripcion,
        empresa:1,
        usuario:this.auth.currentUser.getIdUser()
    }
    return this.http.post(url,tipoEmpData,this.httpOptions);


  }

  editTipoEmp(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/registrar/tipo-emp/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const tipoEmpData = {
      id:form.value.id,
      tipo: form.value.tipo,
      descripcion: form.value.descripcion,
      empresa:1,
      usuario:this.auth.currentUser.getIdUser()
  }
    return this.http.put(url,tipoEmpData,this.httpOptions);


  }

  /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO LABORES ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  

     /* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO LABORES ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */
    
     getSemanasAnio(){
      const  url = environment.BACKEND_DIR+'acceso/listar/semanas-anio/';
      const token = this.auth.currentUser.getTokenUser();
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Token '+token
       })
      };
      return this.http.get(url, this.httpOptions).pipe(
        map(resp => {
          this.semanasAnioData = resp;
          for (let x in resp) {
            
            
            this.semanasAnioData[x].fecha_creacion = moment(resp[x].fecha_creacion).format('MMMM DD YYYY, h:mm a');
            this.semanasAnioData[x].fecha_inicial  = moment(resp[x].fecha_inicial).format("MMMM DD YYYY");
            this.semanasAnioData[x].fecha_final    = moment(resp[x].fecha_final).format("MMMM DD YYYY");
           
           
          }
          return this.semanasAnioData;
        })
      )
    
    }
  
    createNewSemanaAnio(form:FormGroup){
      var url = environment.BACKEND_DIR+"acceso/registrar/semana/"
      const token = this.auth.currentUser.getTokenUser();
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Token '+token
        })
      };
      this.fechaActual = Date.now();
      this.fechaActual = moment(this.fechaActual).year();
      const semanaAnioData = {
          semana       : form.value.semana,
          color        : form.value.color,
          year         : this.fechaActual,
          fecha_inicial: form.value.fecha_inicial,
          fecha_final  : form.value.fecha_final,
          finca        : form.value.finca,
          empresa      : 1,
          usuario      : this.auth.currentUser.getIdUser()
      }
      return this.http.post(url,semanaAnioData,this.httpOptions);
  
  
    }
  
    editSemana(form:FormGroup){
      var url = environment.BACKEND_DIR+"acceso/registrar/semana/"
      const token = this.auth.currentUser.getTokenUser();
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Token '+token
        })
      };
      const semanaAnioData = {
          id           : form.value.id,
          semana       : form.value.semana,
          color        : form.value.color,
          fecha_inicial: form.value.fecha_inicial,
          fecha_final  : form.value.fecha_final,
          finca        : form.value.finca,
      }
      return this.http.put(url,semanaAnioData,this.httpOptions);
  
    }
  
    /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO LABORES ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  

/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO LABORES ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */
    
getProcesos(){
  const  url  = environment.BACKEND_DIR+'acceso/listar/procesos/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Token '+token
  })
  };
  return this.http.get(url, this.httpOptions).pipe(
    map(resp => {
      this.procesosData = resp;
      for (let x in resp) {
            
            
        this.procesosData[x].fecha_creacion = moment(resp[x].fecha_creacion).format('MMMM DD YYYY, h:mm a');
       
       
      }
      return this.procesosData;
    })
  )
}
      
createNewProceso(form:FormGroup){
  var   url   = environment.BACKEND_DIR+"acceso/registrar/procesos/"
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
    })
  };
  const processData = {
      proceso    : form.value.proceso,
      descripcion: form.value.descripcion,
      finca      : form.value.finca,
      empresa    : 1,
      usuario    : this.auth.currentUser.getIdUser()
  }
  return this.http.post(url,processData,this.httpOptions);
}

editProcesos(form:FormGroup){
  var url     = environment.BACKEND_DIR+"acceso/registrar/procesos/"
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
    })
  };
  const semanaAnioData = {
      id         : form.value.id,
      proceso    : form.value.proceso,
      descripcion: form.value.descripcion,
      finca      : form.value.finca,
  }
  return this.http.put(url,semanaAnioData,this.httpOptions);

}
      
/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO LABORES ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */


/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO LABORES ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */
    
getFuncionesEmpleados(){
  const  url  = environment.BACKEND_DIR+'acceso/listar/funciones-empleados/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Token '+token
  })
  };
  return this.http.get(url, this.httpOptions).pipe(
    map(resp => {
      this.funcionesEmpleadosData = resp;
      for (let x in resp) {
            
            
        this.funcionesEmpleadosData[x].fecha_creacion = moment(resp[x].fecha_creacion).format('MMMM DD YYYY, h:mm a');
       
       
      }
      return this.funcionesEmpleadosData;
    })
  )
}
      
createNewFuncionEmpleado(form:FormGroup){
  var   url   = environment.BACKEND_DIR+"acceso/registrar/funciones-empleados/"
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
    })
  };
  const funcionData = {
      funcion    : form.value.funcion,
      descripcion: form.value.descripcion,
      finca      : form.value.finca,
      empresa    : 1,
      usuario    : this.auth.currentUser.getIdUser()
  }
  return this.http.post(url,funcionData,this.httpOptions);
}

editFunciones(form:FormGroup){
  var   url   = environment.BACKEND_DIR+"acceso/registrar/funciones-empleados/"
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
    })
  };
  const funcionData = {
      id         : form.value.id,
      funcion    : form.value.funcion,
      descripcion: form.value.descripcion,
      finca      : form.value.finca
  }
  return this.http.put(url,funcionData,this.httpOptions);

}
      
/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO LABORES ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

}
