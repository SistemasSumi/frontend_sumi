import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InformesContabilidadService {

constructor( private http:HttpClient,private auth:SeguridadService) { }



    getBalancePrueba(inicio,fin){
        const  url = environment.BACKEND_DIR+'contabilidad/balancePrueba/?inicio='+inicio+'&final='+fin;
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
    
        return this.http.get<any[]>(url,{headers: httpHeaders});
    }

    getEstadoFinanciero(inicio,fin){
        const  url = environment.BACKEND_DIR+'contabilidad/estadoFinanciero/?inicio='+inicio+'&final='+fin;
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
    
        return this.http.get<any[]>(url,{headers: httpHeaders});
    }

}
