import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productosSubject: BehaviorSubject<any>
  httpOptions     : any;
  productosData:any;

  constructor(public router:Router, private http:HttpClient, private auth:SeguridadService,private cp:CurrencyPipe) {
    this.getproductos();

   }
  
  createNewProducto(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/productos/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const ProductosData = {
        code        : form.value.code,
        nombre      : form.value.nombre,
        marca       : form.value.marca,
        precioCompra: form.value.precioCompra,
        precioVenta : form.value.precioVenta,
        observacion : form.value.observacion
    }
    return this.http.post(url,ProductosData,this.httpOptions);


  } 
  

  createNewCartaCompromiso(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/registrar/carta/compromiso/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const cartaData = {
        producto        : form.value.producto,
        archivo      : form.value.archivo,
        tipoArchivo       : form.value.tipoArchivo,
        observaciones: form.value.observaciones,
        
    }
    return this.http.post(url,cartaData,this.httpOptions);


  } 
  






  editProducto(form:FormGroup){
    var url = environment.BACKEND_DIR+"acceso/productos/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
      })
    };
    
    const ProductosData = {
      idProducto  : form.value.idProducto,
      code        : form.value.code,
      nombre      : form.value.nombre,
      marca       : form.value.marca,
      precioCompra: form.value.precioCompra,
      precioVenta : form.value.precioVenta,
      stock       : form.value.stock,
      observacion : form.value.observacion
  }
    return this.http.put(url,ProductosData,this.httpOptions);
  } 


  getproductos(){
    const  url = environment.BACKEND_DIR+'acceso/productos/todos/';
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
     })
    };
    return this.http.get(url, this.httpOptions).pipe(
      map(resp => {
  
         // console.log(resp);
         
        return resp;
      })
    )
  
  }



  getCartas(){
    const  url = environment.BACKEND_DIR+'acceso/listado/carta/';
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
     })
    };
    return this.http.get(url, this.httpOptions).pipe(
      map(resp => {
  
         // console.log(resp);
         
        return resp;
      })
    )
  
  }
  


}
