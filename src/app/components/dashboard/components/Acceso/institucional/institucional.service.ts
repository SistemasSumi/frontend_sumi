import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { CurrencyPipe } from '@angular/common';

import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
moment.locale('es')
@Injectable({
  providedIn: 'root'
})
export class InstitucionalService {


  httpOptions  : any;
  productosData: any;
  stockData: any ;
  stockDataConsumo: any ;
  stockDataTat: any ;

  fechaActualizacion:any;

constructor(public router:Router, private http:HttpClient, private auth:SeguridadService,private cp:CurrencyPipe) { 
  this.getstock();

}

getstock(){
  const  url = environment.BACKEND_DIR+'acceso/inventario/producto/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.get(url, this.httpOptions).pipe(
    map(resp => {
      this.stockData = resp;
      for (let x in this.stockData.data) {
        //  this.productosData[x].porcentaje = resp[x].porcentaje+"%"
        //  console.log(this.stockData.data[x].vencimiento);
         this.stockData.data[x].vencimiento = moment(this.stockData.data[x].vencimiento).format('MMMM DD YYYY');
         this.stockData.data[x].fecha_actualizacion = moment(this.stockData.data[x].vencimiento,'MMMM DD YYYY').fromNow();
        
         
       
       } 

      
      return resp;
    })
  )

}


getstockConsumo(){
  const  url = environment.BACKEND_DIR+'acceso/inventario/producto/consumo/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.get(url, this.httpOptions).pipe(
    map(resp => {
      this.stockDataConsumo = resp;
      for (let x in this.stockDataConsumo.data) {
        //  this.productosData[x].porcentaje = resp[x].porcentaje+"%"
        //  console.log(this.stockData.data[x].vencimiento);
         this.stockDataConsumo.data[x].vencimiento = moment(this.stockDataConsumo.data[x].vencimiento).format('MMMM DD YYYY');
         
       
       } 

      
      return resp;
    })
  )

}

getstockTat(){
  const  url = environment.BACKEND_DIR+'acceso/inventario/producto/tat/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.get(url, this.httpOptions).pipe(
    map(resp => {
      this.stockDataTat = resp;
      for (let x in this.stockDataTat.data) {
        //  this.productosData[x].porcentaje = resp[x].porcentaje+"%"
        //  console.log(this.stockData.data[x].vencimiento);
         this.stockDataTat.data[x].vencimiento = moment(this.stockDataTat.data[x].vencimiento).format('MMMM DD YYYY');
         
       
       } 

      
      return resp;
    })
  )

}





getstockProductoInstitucional(){
  const  url = environment.BACKEND_DIR+'acceso/institucional/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.get(url, this.httpOptions).pipe(
    map(resp => {
      this.productosData = resp;
       for (let x in this.productosData.data) {
        //  this.productosData[x].porcentaje = resp[x].porcentaje+"%"
         this.productosData.data[x].valorventa  = this.cp.transform(parseInt(this.productosData.data[x].valorventa));
         this.productosData.data[x].valorventa2 = this.cp.transform(parseInt(this.productosData.data[x].valorventa2));
         this.productosData.data[x].valorventa3 = this.cp.transform(parseInt(this.productosData.data[x].valorventa3));
       }       
         
      return this.productosData;
    })
  )

}

getstockProductoConsumo(){
  const  url = environment.BACKEND_DIR+'acceso/consumo/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.get(url, this.httpOptions).pipe(
    map(resp => {
      this.productosData = resp;
       for (let x in this.productosData.data) {
        //  this.productosData[x].porcentaje = resp[x].porcentaje+"%"
         this.productosData.data[x].valorventa  = this.cp.transform(parseInt(this.productosData.data[x].valorventa));
         this.productosData.data[x].valorventa2 = this.cp.transform(parseInt(this.productosData.data[x].valorventa2));
         this.productosData.data[x].valorventa3 = this.cp.transform(parseInt(this.productosData.data[x].valorventa3));
        //  console.log(this.productosData[x].vencimiento);
       
       }       
         
      return this.productosData;
    })
  )

}

getstockProductoComercializado(){
  const  url = environment.BACKEND_DIR+'acceso/comercializado/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.get(url, this.httpOptions).pipe(
    map(resp => {
      this.productosData = resp;
       for (let x in this.productosData.data) {
        //  this.productosData[x].porcentaje = resp[x].porcentaje+"%"
         this.productosData.data[x].valorventa  = this.cp.transform(parseInt(this.productosData.data[x].valorventa));
         this.productosData.data[x].valorventa2 = this.cp.transform(parseInt(this.productosData.data[x].valorventa2));
         this.productosData.data[x].valorventa3 = this.cp.transform(parseInt(this.productosData.data[x].valorventa3));
        //  console.log(this.productosData[x].vencimiento);
       
       }       
         
      return this.productosData;
    })
  )

}






}
