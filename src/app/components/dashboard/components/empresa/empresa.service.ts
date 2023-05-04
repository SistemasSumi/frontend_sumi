import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { Injectable } from '@angular/core';


import * as moment from 'moment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Terceros, Departamento, Municipio } from '../configuracion/interfaces';
import { BehaviorSubject } from 'rxjs';
moment.locale('es')



@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  httpOptions    : any;


SubjectdataTerceros    : BehaviorSubject<Terceros[]>    = new BehaviorSubject<Terceros[]>(null);
SubjectdataDepartamentos    : BehaviorSubject<Departamento[]>  = new BehaviorSubject<Departamento[]>(null);
SubjectdataMunicipios   : BehaviorSubject<Municipio[]>  = new BehaviorSubject<Municipio[]>(null);



constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) {
  this.getDepartamentos();
  this.getMunicipios(); 
  this.getTerceros();

 }


getDepartamentos(){
  const  url = environment.BACKEND_DIR+'settings/departamentos/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  this.http.get<Departamento[]>(url,{headers: httpHeaders}).pipe(
    map(resp =>  this.SubjectdataDepartamentos.next(resp))
  ).subscribe();

}
getMunicipios(){
  const  url = environment.BACKEND_DIR+'settings/municipios/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  this.http.get<Municipio[]>(url,{headers: httpHeaders}).pipe(
    map(resp =>  this.SubjectdataMunicipios.next(resp))
  ).subscribe();
}

getTerceros(){
  const  url = environment.BACKEND_DIR+'settings/terceros/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  this.http.get<Terceros[]>(url,{headers: httpHeaders}).pipe(
    map(resp =>  this.SubjectdataTerceros.next(resp))
  ).subscribe();
}


saveEmpresa(form:FormGroup){
  const  url = environment.BACKEND_DIR+'settings/empresa/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };
  var dataEmpresa;
  var dataDatosFE;

  var nit = form.value.nit.split("-")
  dataDatosFE = {
    ambiente: form.value.ambiente,
    nit: nit[0],
    dv: nit[1],
    actividadEconomica: form.value.actividadEconomica,
    nombreComercial: form.value.nombreComercial,
    tipoPersona: form.value.tipoPersona,
    prefijo: form.value.prefijo,
    numeracionMin: form.value.numeracionMin,
    numeracionMax: form.value.numeracionMax,
    resolucionFE: form.value.resolucionFE,
    registroMercantil: form.value.nombreContacto,
    telefonoContacto: form.value.telefonoContacto,
    correoContacto: form.value.correoContacto,
    nombreContacto: form.value.registroMercantil,
    fechaInicioFE: moment(form.value.fechaInicioFE).format('YYYY-MM-DD'),
    fechaFinalFE: moment(form.value.fechaFinalFE).format('YYYY-MM-DD'),
    
  }
  
  dataEmpresa = {
    logo: form.value.logo,
    slogan: form.value.slogan,
    razon_social: form.value.razon_social,
    correo: form.value.correo,
    departamento: form.value.departamento,
    municipio: form.value.municipio,
    nit: form.value.nit,
    telefono: form.value.telefono,
    usuario: this.auth.currentUser.getIdUser(),
    datosFE:dataDatosFE,
  }


  return this.http.post<any>(url, dataEmpresa,this.httpOptions).pipe(
    map(resp => {
 
      console.log(resp);
     
      return resp;
    })
  )

}

}
