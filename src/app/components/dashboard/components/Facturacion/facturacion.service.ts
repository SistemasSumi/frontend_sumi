import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ComprobanteProforma } from '../../reportes/reportesFacturacion/ComprobanteProforma';
import { facturaElectronicaReport } from '../../reportes/reportesFacturacion/facturaElectronica';
import { facturaElectronicaReportSumi } from '../../reportes/reportesFacturacion/facturaElectronicaOriginal';
import { ConfiguracionService } from '../configuracion/Configuracion.service';
import { CxcMoviModels } from './models/CxcMoviModels';
import { InvoceReport } from './models/InvoceReport';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  SubjectdataFacturas:BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);

constructor(

  public router:Router,
  private http:HttpClient,
  private auth:SeguridadService,
  private settings:ConfiguracionService
) {
  this.cargarFacturas();
 }

cargarNumeracion(){
  return this.settings.getNumeraciones('ventas');
}


saveFactura(form:FormGroup,detalle:any[]): Observable<any>{
  const  url = environment.BACKEND_DIR+'facturacion/facturas/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
 
  let data = {
      "cxc":form.value,
      "detalle":detalle
  }



  return this.http.post<any>(url,data,{headers: httpHeaders});
  
  

}

updateFactura(form:FormGroup): Observable<any>{
  const  url = environment.BACKEND_DIR+'facturacion/facturas/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
 
  let data = {
      "cxc":form.value,
  }

  return this.http.put<any>(url,data,{headers: httpHeaders});
  
}

Despachos(numero:string): Observable<any>{
  const  url = environment.BACKEND_DIR+'facturacion/facturas/despachos/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
 
  let data = {
      "numero":numero,

  }



  return this.http.post<any>(url,data,{headers: httpHeaders});
  
  

}

FirmarInvoce(numero:string): Observable<any>{
  const  url = environment.BACKEND_DIR+'facturacion/facturas/invoce/envio/dian/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
 
  let data = {
      "numero":numero,
  }



  return this.http.post<any>(url,data,{headers: httpHeaders});
  
  

}

obtenerProformas(){
  const  url = environment.BACKEND_DIR+'facturacion/facturas/?tipo='+"proformas";
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  return this.http.get<any>(url,{headers: httpHeaders}); 
}

cargarFacturas(){
  this.obtenerFacturas().subscribe();
}

obtenerFacturas(){
  const  url = environment.BACKEND_DIR+'facturacion/facturas/?tipo='+"ventas";
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  return this.http.get<any>(url,{headers: httpHeaders}).pipe(
    map(resp =>  this.SubjectdataFacturas.next(resp))
  ) 
}

obtenerFactura(id:number){
  const  url = environment.BACKEND_DIR+'facturacion/facturas/invoce/?id='+id;
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  return this.http.get<InvoceReport>(url,{headers: httpHeaders}); 
}

EliminarDetalle(id:number): Observable<any>{
  const  url = environment.BACKEND_DIR+'facturacion/facturas/productos/eliminar/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
 
  let data = {
      "id":id,

  }



  return this.http.post<any>(url,data,{headers: httpHeaders});
  
  

}

AgregarDetalle(id:number,detalle:any): Observable<any>{
  const  url = environment.BACKEND_DIR+'facturacion/facturas/productos/agregar/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
 
  let data = {
      "factura":id,
      "detalle":detalle,
  }



  return this.http.post<any>(url,data,{headers: httpHeaders});
  
  

}
Recontabilizar(numero:string): Observable<any>{
  const  url = environment.BACKEND_DIR+'facturacion/facturas/recontabilizar/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
 
  let data = {
      "numero":numero
  }



  return this.http.post<any>(url,data,{headers: httpHeaders});
  
  

}


imprimirPos(id:string){
  const  url = environment.BACKEND_DIR+'facturacion/facturas/invoce/pos/?id='+id;
  window.open(url, '_blank');
 

}

imprimirProforma(id){
  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    title: 'Imprimiendo..',
    text:'Espere por favor..'
  });
  Swal.showLoading();
  this.obtenerFactura(id).subscribe(resp => {
    Swal.close();
    let reporte = new ComprobanteProforma();
  
    let report = reporte.ReporteComprobanteProforma(resp);
    window.open(report.output('bloburl'), '_blank');
    
  });
}

imprimirFactura(id){
  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    title: 'Generando PDF..',
    text:'Espere por favor..'
  });
  Swal.showLoading();
  this.obtenerFactura(id).subscribe(resp => {
    Swal.close();
    let reporte = new facturaElectronicaReport();
  
    let report = reporte.geerarPDFFacturaSumi(resp);
    window.open(report.output('bloburl'), '_blank');

  },(ex) => {
            
    Swal.close();
    Swal.fire({
      icon: 'error',
      title: 'SarpSoft',
      text: 'Error al generar el PDF!',
    });
  })


}


imprimirFacturaEletronica(id){
  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    title: 'Generando PDF..',
    text:'Espere por favor..'
  });
  Swal.showLoading();
  this.obtenerFactura(id).subscribe(resp => {
    Swal.close();

    if(resp.enviadaDian){
      let reporte = new facturaElectronicaReportSumi();
      let report = reporte.PDFFacturaSumiElectronica(resp);
      window.open(report.output('bloburl'), '_blank');

    }else{
      new MetodosShared().AlertError('ESTA FACTURA AUN NO HA SIDO ENVIADA A LA DIAN.');
    }
  

  },(ex) => {
            
    Swal.close();
    Swal.fire({
      icon: 'error',
      title: 'SarpSoft',
      text: 'Error al generar el PDF!',
    });
  })


}

imprimirFacturaFACTURATECH(id){
  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    title: 'BUSCANDO PDF..',
    text:'Espere por favor..'
  });
  Swal.showLoading();
  this.obtenerFactura(id).subscribe(resp => {
    Swal.close();

    if(resp.enviadaDian){
      const  url = environment.BACKEND_DIR+'facturacion/facturas/invoce/envio/dian/?numero='+resp.numero;
      window.open(url, '_blank');

    }else{
      new MetodosShared().AlertError('ESTA FACTURA AUN NO HA SIDO ENVIADA A LA DIAN.');
    }
  

  },(ex) => {
            
    Swal.close();
    Swal.fire({
      icon: 'error',
      title: 'SarpSoft',
      text: 'Error al generar el PDF!',
    });
  })


}

cargarNumeracionCI(){
  return this.settings.getNumeraciones('ci');
}

saveIngreso(datos){
  const  url = environment.BACKEND_DIR+'facturacion/ingreso/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  let data = datos;


  return this.http.post<any>(url,data,{headers: httpHeaders});

}

getFacturasXCliente(tercero:number){
  const  url = environment.BACKEND_DIR+'facturacion/obtenerFacturas/?tercero='+tercero;
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  return this.http.get<any>(url,{headers: httpHeaders});
}


getPagos(){
  const  url = environment.BACKEND_DIR+'facturacion/ingreso/';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  return this.http.get<any[]>(url,{headers: httpHeaders});
}

imprimirPagos(numero){
  const  url = environment.BACKEND_DIR+'facturacion/ingreso/imprimir/?numero='+numero+'&tipo='+'CI';
  const token = this.auth.currentUser.getTokenUser();
  const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

  return this.http.get<any[]>(url,{headers: httpHeaders});
}


}
