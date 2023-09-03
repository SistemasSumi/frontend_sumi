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

 }

  getReporteVentasVsCompras(){
    const  url = environment.BACKEND_DIR+'settings/chart_vertical_compras_vs_ventas/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.get<any>(url,{headers: httpHeaders}); 

  }

  getCxp(){
    const  url = environment.BACKEND_DIR+'settings/chart_cxp/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.get<any>(url,{headers: httpHeaders}); 

  }
  
  getCxc(){
    const  url = environment.BACKEND_DIR+'settings/chart_cxc/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.get<any>(url,{headers: httpHeaders}); 

  }



}
