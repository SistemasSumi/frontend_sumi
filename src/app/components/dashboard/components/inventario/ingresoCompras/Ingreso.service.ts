import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import * as moment from 'moment';
import { InventoryEntry } from './models/inventoryEntry';
import { IngresoAlmacen } from '../../../reportes/reportesInventario/IngresoAlmacen';


@Injectable({
  providedIn: 'root'
})
export class IngresoService {


  constructor
  (
    public router:Router,
    private http:HttpClient,
    private auth:SeguridadService,
    private settings:ConfiguracionService
  ) { }


  cargarNumeracion(){
    return this.settings.getNumeraciones('ingreso');
  }


  saveIngreso(form:FormGroup,detalle:any[]): Observable<InventoryEntry>{
    const  url = environment.BACKEND_DIR+'inventario/ingreso/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);


    form.get('usuario').setValue(this.auth.currentUser.getIdUser());
    form.get('fecha').setValue(moment(form.value.fecha).format("YYYY-MM-DD"));

    let data = {
        "ingreso":form.value,
        "detalle":detalle
    }



    return this.http.post<InventoryEntry>(url,data,{headers: httpHeaders});
    
    

  }

  buscarEImprimir(id:number): Observable<InventoryEntry>{
    const  url = environment.BACKEND_DIR+'inventario/ingreso/?id='+id;
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.get<InventoryEntry>(url,{headers: httpHeaders}); 

  }



  buscarIngresoSegunOc(id:number){
    const  url = environment.BACKEND_DIR+'inventario/ingreso/?oc='+id;
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.get<InventoryEntry>(url,{headers: httpHeaders}); 
  }

  imprimir(ingreso:InventoryEntry){

    let reporte = new IngresoAlmacen();

    let report = reporte.ReporteIngresoAlmacen(ingreso);
    window.open(report.output('bloburl'), '_blank');

  }



  obtenerContabilidadAsiento(numero:string){
    const  url = environment.BACKEND_DIR+'contabilidad/asiento/?numero='+numero+'&tipo='+'COM';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.get<any>(url,{headers: httpHeaders}); 
  }


}