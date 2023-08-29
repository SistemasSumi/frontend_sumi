import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
moment.locale('es')


@Injectable({
  providedIn: 'root'
})
export class TaxisService {
httpOptions: any;


constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) { }





getTaxis(){
  
  const  url = environment.BACKEND_DIR+'taxis/taxis/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.get(url, this.httpOptions).pipe(
    map((resp:any) => {

     
      return resp;

      
    })
  )

}

saveTaxi(form:FormGroup){
  
  const  url = environment.BACKEND_DIR+'taxis/taxis/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  let data = {
    "placa":form.value.placa,
    "modelo":form.value.modelo,
    "soat":moment(form.value.soat).format('YYYY-MM-DD'),
    "tecno":moment(form.value.tecno).format('YYYY-MM-DD'),
  }

  return this.http.post(url,data, this.httpOptions).pipe(
    map(resp => {
      // console.log(resp);
      
      return resp;
    })
  )

}

saveTaxiKm(form:FormGroup){
  
  const  url = environment.BACKEND_DIR+'taxis/taxis/km/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  let data = {
    "id":form.value.id,
    "km":form.value.km,
    "km_fin":form.value.km_fin,
  }

  return this.http.put(url,data, this.httpOptions).pipe(
    map(resp => {
      // console.log(resp);
      
      return resp;
    })
  )

}


updateTurno(form:FormGroup){
  const  url = environment.BACKEND_DIR+'taxis/turnos/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  let data = {
    "id_turno":form.value.id,
    "turno":form.value.turno,
    "tarifa":form.value.tarifa,
    "taxi":form.value.taxi,
    "conductor":form.value.conductor,
  }

  return this.http.put(url,data, this.httpOptions).pipe(
    map(resp => {
      // console.log(resp);
      
      return resp;
    })
  )

}

saveTurno(form:FormGroup){
  const  url = environment.BACKEND_DIR+'taxis/turnos/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  let data = {
    "turno":form.value.turno,
    "tarifa":form.value.tarifa,
    "taxi":form.value.taxi,
    "conductor":form.value.conductor,
  }

  return this.http.post(url,data, this.httpOptions).pipe(
    map(resp => {
      // console.log(resp);
      
      return resp;
    })
  )

}



updateTaxi(form:FormGroup){
  
  const  url = environment.BACKEND_DIR+'taxis/taxis/'
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  let data = {
    "id_taxi": form.value.id,
    "placa":form.value.placa,
    "modelo":form.value.modelo,
    "soat":moment(form.value.soat).format('YYYY-MM-DD'),
    "tecno":moment(form.value.tecno).format('YYYY-MM-DD'),
  }

  return this.http.put(url,data, this.httpOptions).pipe(
    map(resp => {
      // console.log(resp);
      
      return resp;
    })
  )

}

}
