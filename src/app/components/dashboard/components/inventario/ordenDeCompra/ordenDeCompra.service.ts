import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { ReportPurchaseOrder } from '../../../reportes/reportesInventario/reportPurchaseOrder';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import { BasicPurchaseOrder } from './models/BasicPurchaseOrder';
import { PurchaseOrder } from './models/purchaseOrder';
import * as moment from 'moment';



@Injectable({
    providedIn: 'root'
})
export class OrdenDeCompraService {



    SubjectdataOrdenes:BehaviorSubject<BasicPurchaseOrder[]> = new BehaviorSubject<BasicPurchaseOrder[]>(null);

    constructor(public router:Router, private http:HttpClient, private auth:SeguridadService,private settings:ConfiguracionService) {
        this.cargarOdenes();
    }

    cargarNumeracion(){
         return this.settings.getNumeraciones('orden');
    }



    buscarEimprimir(id:string){
        const  url = environment.BACKEND_DIR+'inventario/ordenCompra/?id='+id;
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);


        return this.http.get<PurchaseOrder>(url,{headers: httpHeaders});
    }


   

    imprimir(orden:PurchaseOrder){

        // console.log(orden);
        let reporte = new ReportPurchaseOrder();

        let report = reporte.generarOrdenCompra(orden);
     
        
        window.open(report.output('bloburl'), '_blank');
      
    }

    enviar(orden:PurchaseOrder){

      
        let reporte = new ReportPurchaseOrder();

        let report = reporte.generarOrdenCompra(orden);
        let correo = report.output('arraybuffer');
        var base64 = btoa(
            new Uint8Array(correo)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        return base64;
        
    }


    


    cargarOdenes(){
        this.getOrdenes().subscribe();
    }

    getOrdenes(){
        const  url = environment.BACKEND_DIR+'inventario/ordenCompra/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);


        return this.http.get<BasicPurchaseOrder[]>(url,{headers: httpHeaders}).pipe(
            map(resp =>  this.SubjectdataOrdenes.next(resp))
        )

    }

    saveOrdenes(form:FormGroup,detalle:any[], actualizacion?:boolean): Observable<PurchaseOrder>{
        const  url = environment.BACKEND_DIR+'inventario/ordenCompra/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);


        form.get('usuario').setValue(this.auth.currentUser.getIdUser())

        let data = {
            "orden":form.value,
            "detalle":detalle
        }

        if(actualizacion == false){

            return this.http.post<PurchaseOrder>(url,data,{headers: httpHeaders});
        }else{
            return this.http.put<PurchaseOrder>(url,data,{headers: httpHeaders});
        }
        

    }

    enviarCorreo(pdf,asunto,nombre,destinatario,mensaje){
        const  url = environment.BACKEND_DIR+'inventario/ordenCompra/correo/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);


       

        let data = {
            "orden":pdf,
            "asunto":asunto,
            "nombre":nombre,
            "destinatario":destinatario,
            "mensaje":mensaje,
            
        }

     

        return this.http.post<any>(url,data,{headers: httpHeaders}).pipe(
            map(resp => {})
        )
       
        

    }

    busquedaAvanzada(data:any){
        const  url = environment.BACKEND_DIR+'inventario/ordenCompra/busqueda/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

        let datos = {
            fechaInicial:data.fechaInicial,
            fechaFinal:data.fechaFinal,
            proveedor:data.proveedor,
            orden:data.orden,
            formaDePago:data.formaDePago
        } 

        
        if(data.fechaInicial){
            datos.fechaInicial = moment(datos.fechaInicial).format("YYYY-MM-DD")
        }
        if(data.fechaFinal){
            datos.fechaFinal = moment(datos.fechaFinal).format("YYYY-MM-DD")
        }


        

        return this.http.post<BasicPurchaseOrder[]>(url,datos,{headers: httpHeaders}).pipe(
            map(resp =>  this.SubjectdataOrdenes.next(resp))
        )

    }


}
