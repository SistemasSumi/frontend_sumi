import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { environment } from '../../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

httpOptions: any;

constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) { }


getConductores(){
  
  const  url = environment.BACKEND_DIR+'taxis/conductores/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.get(url, this.httpOptions).pipe(
    map(resp => {
 
      return resp;
    })
  )

}


saveConductor(form:FormGroup){
  
  const  url = environment.BACKEND_DIR+'taxis/conductores/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  let data = {
    "nombres":form.value.nombres,
    "apellidos":form.value.apellidos,
    "tipo_documento":form.value.tipo_documento,
    "documento":form.value.documento,
    "correo":form.value.correo,
    "direccion":form.value.direccion,
    "telefono":form.value.telefono,
  }

  return this.http.post(url,data, this.httpOptions).pipe(
    map(resp => {
      console.log(resp);
      
      return resp;
    })
  )

}

UpdateConductor(form:FormGroup){
  
  const  url = environment.BACKEND_DIR+'taxis/conductores/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  let data = {
    "id_conductor":form.value.id,
    "nombres":form.value.nombres,
    "apellidos":form.value.apellidos,
    "tipo_documento":form.value.tipo_documento,
    "documento":form.value.documento,
    "correo":form.value.correo,
    "direccion":form.value.direccion,
    "telefono":form.value.telefono,
  }

  return this.http.put(url,data, this.httpOptions).pipe(
    map(resp => {
      console.log(resp);
      
      return resp;
    })
  )

}

}
