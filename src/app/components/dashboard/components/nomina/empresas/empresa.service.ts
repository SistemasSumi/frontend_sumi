import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { Empresa } from 'src/app/interfaces/interfaces';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  httpOptions: any;


constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) { }


getEmpresas(){
  
  const  url = environment.BACKEND_DIR+'nomina/empresa/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.get<Empresa[]>(url, this.httpOptions).pipe(
    map(resp => {
      let empresas:Empresa[] = [];


       for(let x in resp ){
          let empresa = resp[x];

          empresas.push(empresa);
       }
     
      return empresas;
    })
  )

}


saveCotizacion(data:any){
  
  const  url = environment.BACKEND_DIR+'acceso/cotizaciones/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.post(url,data, this.httpOptions).pipe(
    map(resp => {
      console.log(resp);
      
      return resp;
    })
  )

}





updateEmpresas(form:FormGroup){
  
  const  url = environment.BACKEND_DIR+'nomina/empresa/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  let data = {
    "id_empresa":form.value.id_empresa,
    "razon_social":form.value.razon_social,
    "slogan":form.value.slogan,
    "correo":form.value.correo,
    "tipo_documento":form.value.tipo_documento,
    "numero_documento":form.value.documento,
    "telefono":form.value.telefono,
    "areas":form.value.areas,
    "cargos":form.value.cargos,
    "frecuencia_pago":form.value.frecuencia_pago,
    "medio_pago":form.value.medio_pago,
    "banco":form.value.banco,
    "tipo_cuenta":form.value.tipo_cuenta,
    "numero_cuenta":form.value.numero_cuenta,
    "operador_pila":form.value.operador_pila,
    "usuario":this.auth.currentUser.getIdUser(),

  }

  return this.http.put<Empresa>(url,data, this.httpOptions).pipe(
    map(resp => {
      let empresas:Empresa[] = [];


       for(let x in resp ){
          let empresa = resp[x];

          empresas.push(empresa);
       }
     
      return empresas;
    })
  )

}

DeleteCargos(id_empresa:number,id_cargo:number){

  const  url = environment.BACKEND_DIR+'nomina/empresa/?id_delete='+id_cargo+'&id_empresa='+id_empresa+'&accion=cargo'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };
  

  return this.http.delete(url,this.httpOptions).pipe(
    map(resp => {
      let empresas:Empresa[] = [];


       for(let x in resp ){
          let empresa = resp[x];

          empresas.push(empresa);
       }
     
      return empresas;
    })
  )

}

DeleteAreas(id_empresa:number,id_area:number){

  const  url = environment.BACKEND_DIR+'nomina/empresa/?id_delete='+id_area+'&id_empresa='+id_empresa+'&accion=area'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };
  

  return this.http.delete(url,this.httpOptions).pipe(
    map(resp => {
      let empresas:Empresa[] = [];


       for(let x in resp ){
          let empresa = resp[x];

          empresas.push(empresa);
       }
     
      return empresas;
    })
  )

}





getTiposDocumentos() {
  return this.http.get('/assets/data/data.json');
}




getproductos(){
  const  url = environment.BACKEND_DIR+'acceso/productos/todos/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };
  return this.http.get(url, this.httpOptions);

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
