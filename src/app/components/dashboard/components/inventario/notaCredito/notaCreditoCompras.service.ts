import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { NotaCreditoCompras } from './models/notaCreditoCompras';
import { NotaCreditoComprasReport } from '../../../reportes/reportesInventario/notaCreditoCompras';
import { ModelAsiento } from '../../Contabilidad/models/ModelAsiento';


@Injectable({
  providedIn: 'root'
})
export class NotaCreditoComprasService {


  SubjectdataNota:BehaviorSubject<NotaCreditoCompras[]> = new BehaviorSubject<NotaCreditoCompras[]>(null);



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
      const  url = environment.BACKEND_DIR+'inventario/notacredito/';
      const token = this.auth.currentUser.getTokenUser();
      const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);


      return this.http.get<NotaCreditoCompras[]>(url,{headers: httpHeaders}).pipe(
          map(resp =>  this.SubjectdataNota.next(resp))
      )

  }


  cargarNumeracion(){
    return this.settings.getNumeraciones('notaCreditoCompras');
  }

  cargarFacturas(id:number){
    const  url = environment.BACKEND_DIR+'inventario/notacredito/?tercero='+id;
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);


    return this.http.get<any>(url,{headers: httpHeaders});
  }


  cargarProductos(idingreso:number){
    const  url = environment.BACKEND_DIR+'inventario/notacredito/?productos='+idingreso;
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);


    return this.http.get<any>(url,{headers: httpHeaders});
  }

  cargarExistencia(idProducto:number,lote:string){
    const  url = environment.BACKEND_DIR+'inventario/notacredito/?existenciaInventario='+true+'&id='+idProducto+'&lote='+lote;
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);


    return this.http.get<any>(url,{headers: httpHeaders});
  }

  
  saveNota(form:FormGroup,detalle:any[]): Observable<any>{
    const  url = environment.BACKEND_DIR+'inventario/notacredito/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    form.get('fecha').setValue(moment(form.value.fecha).format("YYYY-MM-DD"));

    let data = {
        "notaC":form.value,
        "detalle":detalle
    }

      return this.http.post<any>(url,data,{headers: httpHeaders});
    

  } 

  imprimir(data:NotaCreditoCompras){

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


  ContabilizarNota(id:number,numero): Observable<any>{
    const  url = environment.BACKEND_DIR+'inventario/notacredito/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);



    let data = {
        "id":id,
        "numeroNota":numero
    }

      return this.http.put<any>(url,data,{headers: httpHeaders});
    

  } 
  
  obtenerContabilidadAsiento(numero:string){
    const  url = environment.BACKEND_DIR+'contabilidad/asiento/?numero='+numero+'&tipo='+'NOCD';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.get<any>(url,{headers: httpHeaders}); 
  }






}


