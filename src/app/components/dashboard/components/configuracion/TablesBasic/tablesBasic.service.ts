import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';

import { ModelFormasPago } from '../models/ModelFormasPago';
import { ModelImpuestos } from '../models/ModelImpuestos';
import { ModelRetenciones } from '../models/ModelRetenciones';

@Injectable({
    providedIn: 'root'
})
export class TablesBasicService {

    httpOptions    : any;
    FormasPago:ModelFormasPago[] = [];
    IMP:ModelImpuestos[] = [];
    RTF:ModelRetenciones[] = [];

    SubjectdataFP    : BehaviorSubject<ModelFormasPago[]>    = new BehaviorSubject<ModelFormasPago[]>(null);
    SubjectdataIMP   : BehaviorSubject<ModelImpuestos[]>    = new BehaviorSubject<ModelImpuestos[]>(null);
    SubjectdataRTF  : BehaviorSubject<ModelRetenciones[]>    = new BehaviorSubject<ModelRetenciones[]>(null);
    
    constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) {
        this.getFormas().subscribe((resp:ModelFormasPago[]) => {
            this.FormasPago  = resp;
            this.SubjectdataFP.next(this.FormasPago)
        });

        this.getImpuestos().subscribe((resp:ModelImpuestos[])=>{
            this.IMP = resp;
            this.SubjectdataIMP.next(this.IMP);
        });
        this.getRetenciones().subscribe((resp:ModelImpuestos[])=>{
            this.RTF = resp;
            this.SubjectdataRTF.next(this.RTF);
        });
    
    }


    getFormas(){
        const  url = environment.BACKEND_DIR+'settings/formasDePago/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
    
        
        return this.http.get<ModelFormasPago[]>(url,{headers: httpHeaders});
     
    }
    agregarFormas(form:FormGroup,accion:boolean){
        const  url = environment.BACKEND_DIR+'settings/formasDePago/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
        
        const data:ModelFormasPago = form.value;
        
        if(accion){
            return this.http.put<ModelFormasPago>(url,data,{headers: httpHeaders}).pipe(
                map(resp =>  {
                        const filtro = this.FormasPago.filter((item) => item.id !== resp.id)
                        filtro.push(resp);
                        this.SubjectdataFP.next(filtro);
                    })
                )
        }else{
            return this.http.post<ModelFormasPago>(url,data,{headers: httpHeaders}).pipe(
            map(resp =>  {
                this.FormasPago.push(resp);
                this.SubjectdataFP.next(this.FormasPago)
                })
            )
    
        }

       
    }

    getImpuestos(){
        const  url = environment.BACKEND_DIR+'settings/impuestos/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
    
        
        return this.http.get<ModelImpuestos[]>(url,{headers: httpHeaders});
     
    }


    agregarIMP(form:FormGroup,accion:boolean){
        const  url = environment.BACKEND_DIR+'settings/impuestos/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
        
        const data:ModelImpuestos = form.value;
        
        if(accion){
            return this.http.put<ModelImpuestos>(url,data,{headers: httpHeaders}).pipe(
                map(resp =>  {
                        const filtro = this.IMP.filter((item) => item.id !== resp.id)
                        filtro.push(resp);
                        this.SubjectdataIMP.next(filtro);
                    })
                )
        }else{
            return this.http.post<ModelImpuestos>(url,data,{headers: httpHeaders}).pipe(
            map(resp =>  {
                this.IMP.push(resp);
                this.SubjectdataIMP.next(this.IMP)
                })
            )
    
        }

       
    }

    getRetenciones(){
        const  url = environment.BACKEND_DIR+'settings/retenciones/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
    
        
        return this.http.get<ModelRetenciones[]>(url,{headers: httpHeaders});
     
    }


    agregarRTF(form:FormGroup,accion:boolean){
        const  url = environment.BACKEND_DIR+'settings/retenciones/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
        
        const data:ModelRetenciones = form.value;
        
        if(accion){
            return this.http.put<ModelRetenciones>(url,data,{headers: httpHeaders}).pipe(
                map(resp =>  {
                        const filtro = this.RTF.filter((item) => item.id !== resp.id)
                        filtro.push(resp);
                        this.SubjectdataRTF.next(filtro);
                    })
                )
        }else{
            return this.http.post<ModelRetenciones>(url,data,{headers: httpHeaders}).pipe(
            map(resp =>  {
                this.RTF.push(resp);
                this.SubjectdataRTF.next(this.RTF)
                })
            )
    
        }

       
    }


}
