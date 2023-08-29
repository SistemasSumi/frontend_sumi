import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  clientesSubject: BehaviorSubject<any>
  httpOptions    : any;

  clientesData:any;

  constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) {
    this.getClientes();

   }



  createNewCliente(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/clientes/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const clientesData = {
        documento: form.value.documento,
        nombres: form.value.nombres,
        apellidos: form.value.apellidos,
        telefono: form.value.telefono,
        direccion: form.value.direccion,
        usuario:this.auth.currentUser.getIdUser()
    }
    return this.http.post(url,clientesData,this.httpOptions);


  } 

   editCliente(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/clientes/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const clientesData = {
      id: form.value.id,
      documento: form.value.documento,
      nombres: form.value.nombres,
      apellidos: form.value.apellidos,
      telefono: form.value.telefono,
      direccion: form.value.direccion,
      usuario:form.value.usuario
  }
    return this.http.put(url,clientesData,this.httpOptions);
  } 


  getClientes(){
    const  url = environment.BACKEND_DIR+'acceso/clientes/lista/';
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
     })
    };

    return this.http.get(url, this.httpOptions).pipe(
      map(resp => {
        this.clientesData = resp;
       
        return resp;
      })
    )
  
  }

}
