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
export class GastosService {

  SubjectdataPagos   : BehaviorSubject<any[]>    = new BehaviorSubject<any[]>(null);

  constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) { 
    this.actualizarPagos();
  }


  actualizarPagos(){
    this.getListadoPagos().subscribe();
  }
  getCaja(){
    const  url = environment.BACKEND_DIR+'contabilidad/consultar/cajamenor/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<any>(url,{headers: httpHeaders});
  }

  getFondoDisponible(){
    const  url = environment.BACKEND_DIR+'contabilidad/caja/menor/fondo_disponible/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<any>(url,{headers: httpHeaders});
  }


  abrirCaja(){
    const  url = environment.BACKEND_DIR+'contabilidad/caja/menor/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<any>(url,{headers: httpHeaders});
  }

  getListadoPagos(){
    const  url = environment.BACKEND_DIR+'contabilidad/pagos-caja-menor/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<any>(url,{headers: httpHeaders}).pipe(
        map(resp =>  {
            
            this.SubjectdataPagos.next(resp)
        })
    );
  }


  guardarPago(data:any){
    const  url = environment.BACKEND_DIR+'contabilidad/pagos-caja-menor/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.post<any>(url,data,{headers: httpHeaders});
  }

  actualizarPago(data:any,id){
    const  url = environment.BACKEND_DIR+'contabilidad/pagos-caja-menor/'+id+'/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.put<any>(url,data,{headers: httpHeaders});
  }


}
