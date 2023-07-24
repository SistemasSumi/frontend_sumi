import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CxpService {
  SubjectdataCxp    : BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) {
  this.actualizarCxp();
 }


  actualizarCxp(){
    this.getCxp().subscribe(resp => {
        this.SubjectdataCxp.next(resp);
    });
  }

  getCxp(){
    const  url = environment.BACKEND_DIR+'inventario/cxp/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<any[]>(url,{headers: httpHeaders});
  }

  finiquitar(ingreso:string){
    const  url = environment.BACKEND_DIR+'inventario/cxp/finiquitar/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
    
    
   let  data = {
      ingreso:ingreso
    }


    return this.http.post<any>(url,data,{headers: httpHeaders});
  }

  busquedaAvanzada(data:any){
    const  url = environment.BACKEND_DIR+'inventario/cxp/busqueda/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    let datos = {
        fechaInicial:data.fechaInicial,
        fechaFinal:data.fechaFinal,
        factura:data.factura,
        estado:data.estado,
        proveedor:data.proveedor,
        orden:data.orden,
        formaDePago:data.formaDePago,
        year:data.year,
        mes:data.mes,
    } 

    
    if(data.fechaInicial){
        datos.fechaInicial = moment(datos.fechaInicial).format("YYYY-MM-DD")
    }
    if(data.fechaFinal){
        datos.fechaFinal = moment(datos.fechaFinal).format("YYYY-MM-DD")
    }


    

    return this.http.post<any[]>(url,datos,{headers: httpHeaders}).pipe(
        map(resp =>  this.SubjectdataCxp.next(resp))
    )

}

}



