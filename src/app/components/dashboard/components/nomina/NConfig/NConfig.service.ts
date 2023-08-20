import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NConfigService {


    SubjectdataConceptos : BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) { 

        this.cargarConceptos();
    }

    

    cargarConceptos(){
        this.getConceptos().subscribe(resp => {
            this.SubjectdataConceptos.next(resp);
        });
    }


    getConceptos(){
        const  url = environment.BACKEND_DIR+'nomina/conceptos/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<any[]>(url,{headers: httpHeaders});
      
    }

    getConceptosEmpleados(){
        const  url = environment.BACKEND_DIR+'nomina/conceptosEmpleados/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<any[]>(url,{headers: httpHeaders});
      
    }


    SaveConcepto(concepto:any){
        const  url = environment.BACKEND_DIR+'nomina/conceptos/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        let data = {
            "concepto":concepto
        }

        return this.http.post<any>(url,data,{headers: httpHeaders});
      
    }

    SaveEps(form){
        const  url = environment.BACKEND_DIR+'nomina/Salud/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        let data = form

        return this.http.post<any>(url,data,{headers: httpHeaders});
      
    }

    SavePension(form){
        const  url = environment.BACKEND_DIR+'nomina/pension/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        let data = form

        return this.http.post<any>(url,data,{headers: httpHeaders});
      
    }

    SaveArl(form){
        const  url = environment.BACKEND_DIR+'nomina/arl/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        let data = form

        return this.http.post<any>(url,data,{headers: httpHeaders});
      
    }

    SaveCaja(form){
        const  url = environment.BACKEND_DIR+'nomina/caja/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        let data = form

        return this.http.post<any>(url,data,{headers: httpHeaders});
      
    }


    SaveCesantias(form){
        const  url = environment.BACKEND_DIR+'nomina/cesantias/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        let data = form

        return this.http.post<any>(url,data,{headers: httpHeaders});
      
    }

    obtenerEps(){
    
            const  url = environment.BACKEND_DIR+'nomina/Salud/';
            const token = this.auth.currentUser.getTokenUser();
            const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
          
         
            return this.http.get<any>(url,{headers: httpHeaders});
       
    }

    obtenerPension(){
    
            const  url = environment.BACKEND_DIR+'nomina/pension/';
            const token = this.auth.currentUser.getTokenUser();
            const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
          
         
            return this.http.get<any>(url,{headers: httpHeaders});
       
    }

    obtenerArls(){
    
            const  url = environment.BACKEND_DIR+'nomina/arl/';
            const token = this.auth.currentUser.getTokenUser();
            const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
          
         
            return this.http.get<any>(url,{headers: httpHeaders});
       
    }

    obtenerCaja(){
    
            const  url = environment.BACKEND_DIR+'nomina/caja/';
            const token = this.auth.currentUser.getTokenUser();
            const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
          
         
            return this.http.get<any>(url,{headers: httpHeaders});
       
    }

    obtenerCesantias(){
    
            const  url = environment.BACKEND_DIR+'nomina/cesantias/';
            const token = this.auth.currentUser.getTokenUser();
            const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
          
         
            return this.http.get<any>(url,{headers: httpHeaders});
       
    }

}
