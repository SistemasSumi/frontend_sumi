import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InformesContabilidadService {

constructor( private http:HttpClient,private auth:SeguridadService) { }



    getBalancePrueba(){
        const  url = environment.BACKEND_DIR+'contabilidad/balancePrueba/?inicio=2022-1-1&final=2022-12-31';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
    
        return this.http.get<any[]>(url,{headers: httpHeaders});
    }

}
