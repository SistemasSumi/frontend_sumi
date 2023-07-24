import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { ModelPuc } from '../models/ModelPuc';
import * as moment from 'moment';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';


@Injectable({
    providedIn: 'root'
})
export class PucService {

httpOptions    : any;
PUC:ModelPuc[] = [];
SubjectdataPuc   : BehaviorSubject<ModelPuc[]>    = new BehaviorSubject<ModelPuc[]>(null);
SubjectdataMovimientos  : BehaviorSubject<any[]>    = new BehaviorSubject<any[]>(null);

constructor(public settings:ConfiguracionService, public router:Router, private http:HttpClient, private auth:SeguridadService) {
    this.getCuentas().subscribe((resp:ModelPuc[]) => {
        this.PUC  = resp;
        this.SubjectdataPuc.next(this.PUC)
    });
    this.getMovimientos().subscribe();

}


    getCuentas(){
        const  url = environment.BACKEND_DIR+'contabilidad/puc/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
    
        
        return this.http.get<ModelPuc[]>(url,{headers: httpHeaders});
     
    }

    getEfectivo(){
        const  url = environment.BACKEND_DIR+'contabilidad/efectivo/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
    
        
        return this.http.get<ModelPuc[]>(url,{headers: httpHeaders});
     
    }

    getLibroAux(cuenta,tercero,inicio,fin){
        const  url = environment.BACKEND_DIR+'contabilidad/libroAux/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
        
        inicio = moment(inicio).format("YYYY-MM-DD")
        fin    = moment(fin).format("YYYY-MM-DD")
        

        let data = {
            cuenta,
            tercero,
            inicio,
            fin
        }
        return this.http.post<any>(url,data,{headers: httpHeaders});
     
    }


    agregarCuentas(form:FormGroup){
        const  url = environment.BACKEND_DIR+'contabilidad/puc/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
        
        const data:ModelPuc = form.value;
        
        return this.http.post<ModelPuc>(url,data,{headers: httpHeaders}).pipe(
            map(resp =>  {
                this.PUC.push(resp);
                this.SubjectdataPuc.next(this.PUC)
            })
        )
    
    }
    actualizarCuentas(form:FormGroup){
        const  url = environment.BACKEND_DIR+'contabilidad/puc/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
        
        const data:ModelPuc = form.value;
        
        return this.http.put<ModelPuc>(url,data,{headers: httpHeaders}).pipe(
            map(resp =>  {
                const filtro = this.PUC.filter((item) => item.id !== resp.id)
                filtro.push(resp);
                this.SubjectdataPuc.next(filtro);
            })
        )
    
    }

    cargarNumeracion(){
        return this.settings.getNumeraciones('mc');
    }

    imprimirMovi(movi){
        const  url = environment.BACKEND_DIR+'contabilidad/imprimirMovimiento/?numero='+movi;
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
        
        return this.http.get<any>(url,{headers: httpHeaders});
    }


    getMovimientos(){
        const  url = environment.BACKEND_DIR+'contabilidad/saveMovimiento/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
        
        return this.http.get<any>(url,{headers: httpHeaders}).pipe(
            map(resp =>  {
                
                this.SubjectdataMovimientos.next(resp);
            })
        );
    }


    saveMovimiento(datos){
        const  url = environment.BACKEND_DIR+'contabilidad/saveMovimiento/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
        
        const data = datos;
        
        return this.http.post<any>(url,data,{headers: httpHeaders});
    }

    busquedaAvanzadaComprobantes(datos){
        const  url = environment.BACKEND_DIR+'contabilidad/busquedaAvanzadaCXPM/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
        
      
        
        return this.http.post<any>(url,datos,{headers: httpHeaders}).pipe(
            map(resp =>  {
                
                this.SubjectdataMovimientos.next(resp);
            })
        );
    }

    updateMovimiento(datos){
        const  url = environment.BACKEND_DIR+'contabilidad/saveMovimiento/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
        
        const data = datos;
        
        return this.http.put<any>(url,data,{headers: httpHeaders});
    }



}
