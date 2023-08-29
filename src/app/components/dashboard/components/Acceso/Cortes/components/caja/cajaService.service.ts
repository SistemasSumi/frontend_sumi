import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

import * as moment from 'moment';
moment.locale('es')


import { SeguridadService } from '../../../../../../auth/seguridad.service';



@Injectable({
  providedIn: 'root'
})
export class CajaServiceService {
httpOptions    : any;
constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) { 
  this.getReporte();
  this.getReporteCaja();

}


getReporte(){
  const  url = environment.BACKEND_DIR+'acceso/listado/detalle/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };
  var data;

  let fechaActual = Date.now();
  let fecha1 = moment(fechaActual).format('YYYY-MM-DD');
  data = {
    fecha_inicial: fecha1,
    fecha_final  : fecha1,
  }

  return this.http.post<any>(url, data,this.httpOptions).pipe(
    map(resp => {
      // this.clientesData = resp;
      // console.log(resp);
     
      return resp;
    })
  )

}


getReporteCaja(){
  const  url = environment.BACKEND_DIR+'acceso/reporte/cajaDiaria/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };
  
  var data;

  let fechaActual = Date.now();
  let fecha1 = moment(fechaActual).format('YYYY-MM-DD');
  data = {
    fecha_inicial: fecha1,
    fecha_final  : fecha1,
  }


  return this.http.post<any>(url,data,this.httpOptions).pipe(
    map((resp:any) => {
      // this.clientesData = resp;
      resp.data.caja.idCaja = this.cerosAlaIzquierda(resp.data.caja.idCaja,5);
     
      return resp;
    })
  )

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


