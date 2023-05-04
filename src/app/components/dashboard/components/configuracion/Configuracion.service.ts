import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { ModelDepartamentos } from './models/modelDepartamentos';
import { ModelNumeraciones } from './models/ModelNumeraciones';
import { ModelPlazosProveedor } from './models/ModelPlazosProveedor';
import { ModelRetencionesTercero } from './models/ModelRetencionesTercero';
import { ModelTerceroCompleto } from './models/ModelTerceroCompleto';
import { ModelVendedor } from './models/ModelVendedor';


@Injectable({
    providedIn: 'root'
})
export class ConfiguracionService {

    SubjectdataDepartamentos      : BehaviorSubject<ModelDepartamentos[]>   = new BehaviorSubject<ModelDepartamentos[]>(null);
    SubjectdataVendedores         : BehaviorSubject<ModelVendedor[]>        = new BehaviorSubject<ModelVendedor[]>(null);
    SubjectdataClienteElectronicos: BehaviorSubject<ModelTerceroCompleto[]> = new BehaviorSubject<ModelTerceroCompleto[]>(null);
    SubjectdataClientePos         : BehaviorSubject<ModelTerceroCompleto[]> = new BehaviorSubject<ModelTerceroCompleto[]>(null);
    SubjectdataCliente            : BehaviorSubject<ModelTerceroCompleto[]> = new BehaviorSubject<ModelTerceroCompleto[]>(null);
    SubjectdataProveedor          : BehaviorSubject<ModelTerceroCompleto[]> = new BehaviorSubject<ModelTerceroCompleto[]>(null);
    SubjectdataProveedorCompras   : BehaviorSubject<ModelTerceroCompleto[]> = new BehaviorSubject<ModelTerceroCompleto[]>(null);
    SubjectdataTerceros           : BehaviorSubject<ModelTerceroCompleto[]> = new BehaviorSubject<ModelTerceroCompleto[]>(null);
    SubjectdataNumeraciones       : BehaviorSubject<ModelNumeraciones[]>    = new BehaviorSubject<ModelNumeraciones[]>(null);
    
    
    constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) { 
        this.getDepartamentos().subscribe(resp => {
              this.SubjectdataDepartamentos.next(resp);
        });
       this.obtenerVendedores();
        this.obtenerProveedorCompras();
        this.obtenerTodos();
        this.obtenerClientes();
        this.obtenerProveedores();
        this.obtenerClientesElectronicos();
        this.obtenerClientesPos();
        this.getNumeraciones().subscribe(resp => {
            this.SubjectdataNumeraciones.next(resp);
            
        })

        
    }



    obtenerVendedores(){
        this.getVendedores().subscribe(resp => {
            this.SubjectdataVendedores.next(resp);
        });
    }
    obtenerTodos(){
        this.getTerceros('TODOS').subscribe(resp => {
            this.SubjectdataTerceros.next(resp);
        });
    }
    obtenerClientes(){
        this.getTerceros('CLIENTE').subscribe(resp => {
            this.SubjectdataCliente.next(resp);
        });
    }
    obtenerProveedores(){
        this.getTerceros('PROVEEDOR').subscribe(resp => {
            this.SubjectdataProveedor.next(resp);
        });
    }


    obtenerProveedorCompras(){
        this.getTercerosCompras().subscribe(resp => {
            this.SubjectdataProveedorCompras.next(resp);
        });
    }

    obtenerClientesPos(){
        this.getClientesPos().subscribe(resp => {
            this.SubjectdataClientePos.next(resp);
        });
    }


    obtenerClientesElectronicos(){
        this.getClientesElectronicos().subscribe(resp => {
            this.SubjectdataClienteElectronicos.next(resp);
        });
    }


    registrarTercero(data){
        const  url = environment.BACKEND_DIR+'settings/terceros/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.post<ModelDepartamentos[]>(url,data,{headers: httpHeaders});
      
    }
    actualizarTercero(data){
        const  url = environment.BACKEND_DIR+'settings/terceros/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.put<ModelDepartamentos[]>(url,data,{headers: httpHeaders});
      
    }

    getTerceros(tipo:string){
        const  url = environment.BACKEND_DIR+'settings/terceros/?tipo='+tipo;
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<ModelTerceroCompleto[]>(url,{headers: httpHeaders});
      
    }

    getTercerosCompras(){
        const  url = environment.BACKEND_DIR+'settings/terceros/proveedores/compras/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<ModelTerceroCompleto[]>(url,{headers: httpHeaders});
      
    }
    getClientesPos(){
        const  url = environment.BACKEND_DIR+'settings/terceros/clientes/pos/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<ModelTerceroCompleto[]>(url,{headers: httpHeaders});
      
    }
    getClientesElectronicos(){
        const  url = environment.BACKEND_DIR+'settings/terceros/clientes/electronicos/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<ModelTerceroCompleto[]>(url,{headers: httpHeaders});
      
    }

    getTercero(id:string){
        const  url = environment.BACKEND_DIR+'settings/terceros/?id='+id;
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<ModelTerceroCompleto>(url,{headers: httpHeaders});
      
    }
    getDatosDeContato(id:string){
        const  url = environment.BACKEND_DIR+'settings/datosContacto/?id='+id;
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<any>(url,{headers: httpHeaders});
      
    }

    getDatosBancarios(id:string){
        const  url = environment.BACKEND_DIR+'settings/datosBancarios/?id='+id;
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<any>(url,{headers: httpHeaders});
      
    }


    saveDatosBancarios(data){
        const  url = environment.BACKEND_DIR+'settings/datosBancarios/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.post<any>(url,data,{headers: httpHeaders});
      
    }


    saveDatosContacto(data){
        const  url = environment.BACKEND_DIR+'settings/datosContacto/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.post<any>(url,data,{headers: httpHeaders});
      
    }

    getDescuentoProveedor(id:string){
        const  url = environment.BACKEND_DIR+'settings/descuentosProveedor/?id='+id;
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<ModelPlazosProveedor>(url,{headers: httpHeaders});
      
    }
    saveDescuentoProveedor(data:ModelPlazosProveedor){
        const  url = environment.BACKEND_DIR+'settings/descuentosProveedor/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.post<any>(url,data,{headers: httpHeaders});
      
    }
    getRetencionesProveedor(id:string){
        const  url = environment.BACKEND_DIR+'settings/retencionesProveedor/?id='+id;
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<ModelRetencionesTercero[]>(url,{headers: httpHeaders});
      
    }
    getRetencionesCliente(id:string){
        const  url = environment.BACKEND_DIR+'settings/retencionesCliente/?id='+id;
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<ModelRetencionesTercero[]>(url,{headers: httpHeaders});
      
    }

    saveRetencionesCliente(data){
        const  url = environment.BACKEND_DIR+'settings/retencionesCliente/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.post<ModelRetencionesTercero[]>(url,data,{headers: httpHeaders});
      
    }
    saveRetencionesProveedor(data){
        const  url = environment.BACKEND_DIR+'settings/retencionesProveedor/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.post<ModelRetencionesTercero[]>(url,data,{headers: httpHeaders});
      
    }

    getDepartamentos(){
        const  url = environment.BACKEND_DIR+'settings/departamentos/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<ModelDepartamentos[]>(url,{headers: httpHeaders});
      
    }





    getVendedores(){
        const  url = environment.BACKEND_DIR+'settings/vendedores/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<ModelVendedor[]>(url,{headers: httpHeaders});
      
    }
    getImpuestos(){
        const  url = environment.BACKEND_DIR+'settings/impuestos/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<any[]>(url,{headers: httpHeaders});
      
    }

    getNumeraciones(tipo?:string){
        const  url = environment.BACKEND_DIR+'settings/numeracion/?tipo='+tipo;
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
      
        return this.http.get<ModelNumeraciones[]>(url,{headers: httpHeaders});
      
    }
    
}


