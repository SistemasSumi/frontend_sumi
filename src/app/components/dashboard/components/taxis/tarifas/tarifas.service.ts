import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from '../../../../../../src/app/components/auth/seguridad.service';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { map } from 'rxjs/operators';

import * as moment from 'moment';
import { Tarifas } from '../../../../../interfaces/interfaces';
moment.locale('es')


@Injectable({
  providedIn: 'root'
})
export class TarifasService {

httpOptions: any;

listTarifas:Tarifas[];

constructor(public router:Router, private http:HttpClient , private auth:SeguridadService ) { }





getTarifas(accion:string,registros:string){
  
  const  url = environment.BACKEND_DIR+'taxis/tarifas/?accion='+accion+'&registros='+registros;
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.get(url, this.httpOptions).pipe(
    map((resp:any) => {
     



       if(accion != 'TOTALES'){
          this.listTarifas = resp;
        
          return this.listTarifas;
       }else{
         return resp;
       }
      
    })
  )

}



deleteTarifa(pk:number){
  
  const  url = environment.BACKEND_DIR+'taxis/tarifas/?pk='+pk
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };


  return this.http.delete(url, this.httpOptions).pipe(
    map  (resp => {
      // console.log(resp);
      
      return resp;
    })
  )

}



saveTarifa(form:FormGroup){
  
  const  url = environment.BACKEND_DIR+'taxis/tarifas/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  let data = {
    "turno":form.value.turno,
    "taxi":form.value.taxi,
    "conductor":form.value.conductor,
    "valor":form.value.valor,
    "saldo":form.value.saldo, 
    "fecha_creacion":moment(form.value.fecha_creacion).format('YYYY-MM-DD'), 
  }

  return this.http.post(url,data, this.httpOptions).pipe(
    map  (resp => {
      // console.log(resp);
      
      return resp;
    })
  )

}



saveMovimiento(form:FormGroup){
  
  const  url = environment.BACKEND_DIR+'taxis/movimientos/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  let data = {
    "concepto":form.value.concepto,
    "taxi":form.value.taxi,
    "banco":form.value.banco,
    "valor":form.value.valor,
    "tipo":form.value.tipo, 
  }

  return this.http.post(url,data, this.httpOptions).pipe(
    map  (resp => {
      // console.log(resp);
      
      return resp;
    })
  )

}


}
