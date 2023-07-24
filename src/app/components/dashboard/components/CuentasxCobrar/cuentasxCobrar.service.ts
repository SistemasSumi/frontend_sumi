import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentasxCobrarService {

  SubjectdataCxc    : BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  
constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) {
  
  this.getCxc().subscribe();
}

  getCxc(){
    const  url = environment.BACKEND_DIR+'facturacion/cxc/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.get<any[]>(url,{headers: httpHeaders}).pipe(
      map(resp =>  this.SubjectdataCxc.next(resp))
    )
  }


  getCxcBusqueda(datos){
    const  url = environment.BACKEND_DIR+'facturacion/cxc/busqueda/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.post<any[]>(url,datos,{headers: httpHeaders}).pipe(
      map(resp =>  this.SubjectdataCxc.next(resp))
    )
  }



}
