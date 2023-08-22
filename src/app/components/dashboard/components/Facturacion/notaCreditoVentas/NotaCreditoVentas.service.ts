import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AnyAaaaRecord } from 'dns';
import moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { NotaCreditoComprasReport } from '../../../reportes/reportesInventario/notaCreditoCompras';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import { ModelAsiento } from '../../Contabilidad/models/ModelAsiento';


@Injectable({
    providedIn: 'root'
})
export class NotaCreditoVentasService {

    SubjectdataNota:BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);



    constructor(
      public router:Router, 
      private http:HttpClient, 
      private auth:SeguridadService,
      private settings:ConfiguracionService) {
         this.cargarNotas();
       }
  
  
  
    cargarNotas(){
      this.getNotas().subscribe();
    }
  
    getNotas(){
        const  url = environment.BACKEND_DIR+'facturacion/notacredito/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
  
        return this.http.get<any[]>(url,{headers: httpHeaders}).pipe(
            map(resp =>  this.SubjectdataNota.next(resp))
        )
  
    }
  
  
    cargarNumeracion(){
      return this.settings.getNumeraciones('notacredito');
    }
  
    cargarFacturas(id:number){
      const  url = environment.BACKEND_DIR+'facturacion/notacredito/?tercero='+id;
      const token = this.auth.currentUser.getTokenUser();
      const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
  
      return this.http.get<any>(url,{headers: httpHeaders});
    }
  
  
    cargarProductos(idfactura:number){
      const  url = environment.BACKEND_DIR+'facturacion/notacredito/?productos='+idfactura;
      const token = this.auth.currentUser.getTokenUser();
      const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
  
      return this.http.get<any>(url,{headers: httpHeaders});
    }
  
    
  
    
    saveNota(form:FormGroup,detalle:any[]): Observable<any>{
      const  url = environment.BACKEND_DIR+'facturacion/notacredito/';
      const token = this.auth.currentUser.getTokenUser();
      const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
      form.get('fecha').setValue(moment(form.value.fecha).format("YYYY-MM-DD"));
  
      let data = {
          "notaC":form.value,
          "detalle":detalle
      }
  
        return this.http.post<any>(url,data,{headers: httpHeaders});
      
  
    } 
  
    imprimir(data:any){
  
      if(data.contabilizado){
  
        this.obtenerContabilidadAsiento(data.numero).subscribe((resp:ModelAsiento) => {
  
  
          let reporte:NotaCreditoComprasReport = new NotaCreditoComprasReport();
          let report = reporte.reporteNotaCreditoCompras(data,resp);
          window.open(report.output('bloburl'), '_blank');
        
  
        })
  
      }else{
        let reporte:NotaCreditoComprasReport = new NotaCreditoComprasReport();
        let report = reporte.reporteNotaCreditoCompras(data);
        window.open(report.output('bloburl'), '_blank');
        
      }
  
    }
  
  
    
    
    obtenerContabilidadAsiento(numero:string){
      const  url = environment.BACKEND_DIR+'contabilidad/asiento/?numero='+numero+'&tipo='+'NOC';
      const token = this.auth.currentUser.getTokenUser();
      const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
      return this.http.get<any>(url,{headers: httpHeaders}); 
    }
  
}
