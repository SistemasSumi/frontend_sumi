import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class TrasladosService {


SubjectdataTraslado   : BehaviorSubject<any[]>    = new BehaviorSubject<any[]>(null);

constructor(public router:Router, private http:HttpClient, private auth:SeguridadService, private config:ConfiguracionService) { 
  this.actualizarListado();
}



actualizarListado(){
  this.getListado().subscribe();
}

getNumeracion(){
  return this.config.getNumeraciones('tra');
}

getSaldoCuenta(id){

  const  url = environment.BACKEND_DIR+'contabilidad/obtener/saldo/cuentas/?cuenta='+id;
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  
  return this.http.get<any>(url,{headers: httpHeaders});

}

getListado(){
  const  url = environment.BACKEND_DIR+'contabilidad/traslado/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  
  return this.http.get<any>(url,{headers: httpHeaders}).pipe(
      map(resp =>  {
          
          this.SubjectdataTraslado.next(resp)
      })
  )
}

getTraslado(id){
  const  url = environment.BACKEND_DIR+'contabilidad/traslado/'+id+'/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  
  return this.http.get<any>(url,{headers: httpHeaders});
}


crearTraslado(data){
  const  url = environment.BACKEND_DIR+'contabilidad/traslado/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  
  return this.http.post<any>(url,data,{headers: httpHeaders});
}
actualizaTraslado(data,id){
  const  url = environment.BACKEND_DIR+'contabilidad/traslado/'+id+'/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  
  return this.http.put<any>(url,data,{headers: httpHeaders});
}


}
