import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../../../auth/seguridad.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

import * as moment from 'moment';
moment.locale('es')

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  httpOptions    : any;
constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) {
  this.getReporte(null);
  this.getReporteTotales(null);

 }

getReporte(form:FormGroup){
  const  url = environment.BACKEND_DIR+'acceso/listado/detalle/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };
  var data;
  if(form != null){
    data = {
      fecha_inicial: moment(form.value.fecha_inicial).format('YYYY-MM-DD'),
      fecha_final  : moment(form.value.fecha_final,).format('YYYY-MM-DD')
    }
  }else{
     let fechaActual = Date.now();
     let fecha1 = moment(fechaActual).format('YYYY-MM-DD');
    data = {
      fecha_inicial: fecha1,
      fecha_final  : fecha1,
    }
  }
  

  return this.http.post<any>(url, data,this.httpOptions).pipe(
    map(resp => {
      // this.clientesData = resp;
      // console.log(resp);
     
      return resp;
    })
  )

}

getReporteTotales(form:FormGroup){
  const  url = environment.BACKEND_DIR+'acceso/reporte/totales/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };
  var data;
  if(form != null){
    data = {
      fecha_inicial: moment(form.value.fecha_inicial).format('YYYY-MM-DD'),
      fecha_final  : moment(form.value.fecha_final,).format('YYYY-MM-DD')
    }
  }else{
     let fechaActual = Date.now();
     let fecha1 = moment(fechaActual).format('YYYY-MM-DD');
    data = {
      fecha_inicial: fecha1,
      fecha_final  : fecha1,
    }
  }
  

  return this.http.post<any>(url, data,this.httpOptions).pipe(
    map(resp => {
 
      // console.log(resp);
     
      return resp;
    })
  )

}

getPermisos(user:number){
  const  url = environment.BACKEND_DIR+'acceso/permisos/users/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };
  var data;
  data = {
    usuario: user
  }
  
  return this.http.post<any>(url, data,this.httpOptions).pipe(
    map(resp => {
 
      // console.log(resp);
     
      return resp;
    })
  )

}


getReportes(){
  const  url = environment.BACKEND_DIR+'inventario/reporte/RetencionGeneral/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };
  
  
  return this.http.get<any>(url,this.httpOptions).pipe(
    map(resp => {
 
      // console.log(resp);
     
      return resp;
    })
  )

}


getNoticias(){
  const  url = 'https://newsapi.org/v2/top-headlines?country=co&category=health&apiKey=a8817be3eb924028a56f0539c5a81085';
  // const token = this.auth.currentUser.getTokenUser();
  // this.httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': 'Token '+token
  //  })
  // };
  // var data;
  // data = {
  //   usuario: user
  // }
  
  return this.http.get<any>(url,this.httpOptions).pipe(
    map((resp:any) => {
       
      for(let data of resp.articles) {
        if(data.author == null){
            data.author = data.source.name
        }
        if(data.content == null){
          data.content = data.description
      }
      }
      
     
      return resp;
    })
  )

}



CreatePermisos(
  user:number,
  institucional:boolean,
  consumo:boolean,
  tat:boolean,
  lista1:boolean,
  lista2:boolean,
  dashboard:boolean,
  proveedores:boolean,
  clientes:boolean,
){
  const  url = environment.BACKEND_DIR+'acceso/permisos/users/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };
  var data;
  data = {
    usuario: user,
    institucional : institucional,
    consumo : consumo,
    tat : tat,
    lista1 : lista1,
    lista2 : lista2,
    dashboard : dashboard,
    proveedores : proveedores,
    clientes : clientes
  }
  
  return this.http.put<any>(url, data,this.httpOptions).pipe(
    map(resp => {
 
      // console.log(resp);
     
      return resp;
    })
  )

}


}
