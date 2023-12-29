import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class AjustesInventarioService {

constructor(private settings:ConfiguracionService, private auth:SeguridadService, private http:HttpClient) { }



  cargarNumeracion(){
    return this.settings.getNumeraciones('ajustes-inventario');
  }

  saveAjuste(data:any): Observable<any>{
    const  url = environment.BACKEND_DIR+'inventario/ajustes/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
   
   
  
  
  
    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    
  
  }


  getAjustes(): Observable<any>{
    const  url = environment.BACKEND_DIR+'inventario/ajustes/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
   
  
    return this.http.get<any>(url,{headers: httpHeaders});
    
    
  
  }
  


}
