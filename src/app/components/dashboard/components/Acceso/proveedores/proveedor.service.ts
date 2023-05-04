import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  ProveedorSubject: BehaviorSubject<any>
  httpOptions    : any;
  proveedorData:any

  constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) { }
  



  createNewProveedor(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/proveedores/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const ProveedorData = {
        documento: form.value.documento,
        nombres: form.value.nombres,
        apellidos: form.value.apellidos,
        telefono: form.value.telefono,
        direccion: form.value.direccion,
        usuario:this.auth.currentUser.getIdUser()
    }
    return this.http.post(url,ProveedorData,this.httpOptions);


  } 

   editProveedor(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/proveedores/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const ProveedorData = {
      id: form.value.id,
      documento: form.value.documento,
      nombres: form.value.nombres,
      apellidos: form.value.apellidos,
      telefono: form.value.telefono,
      direccion: form.value.direccion,
      usuario:form.value.usuario
  }
    return this.http.put(url,ProveedorData,this.httpOptions);
  } 


  getProveedor(){
    const  url = environment.BACKEND_DIR+'acceso/proveedores/lista/';
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
     })
    };

    return this.http.get(url, this.httpOptions).pipe(
      map(resp => {
        this.proveedorData = resp;
        console.log(resp);
       
        return resp;
      })
    )
  
  }
}
