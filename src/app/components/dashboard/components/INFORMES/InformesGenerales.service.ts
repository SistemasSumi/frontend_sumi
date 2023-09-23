import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { detalle } from '../Contabilidad/combrobantesContables/crear-comprobante/crear-comprobante.component';

@Injectable({
  providedIn: 'root'
})
export class InformesGeneralesService {

constructor(
  public router:Router,
  private http:HttpClient,
  private auth:SeguridadService,
) { }


  EstadoCarteraProveedor(proveedor,fecha_corte): Observable<any>{
    const  url = environment.BACKEND_DIR+'inventario/informes/proveedores/estadoCartera/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "proveedor":proveedor,
        "fecha_corte":fecha_corte,
      
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }

  Abonos_Recibidos(fecha_inicial,fecha_final): Observable<any>{
    const  url = environment.BACKEND_DIR+'contabilidad/informes/clientes/abonosRecibidos/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "fecha_inicial":fecha_inicial,
        "fecha_final":fecha_final,
      
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }
  Cxp_compras(proveedor,fecha_corte): Observable<any>{
    const  url = environment.BACKEND_DIR+'inventario/informes/proveedores/cxp/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "proveedor":proveedor,
        "fecha_corte":fecha_corte,
      
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }
  compras_detalladas(proveedor_id,fecha_inicial,fecha_fin): Observable<any>{
    const  url = environment.BACKEND_DIR+'inventario/informes/inventario/compras/detalladas/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "proveedor":proveedor_id,
        "fecha_inicio":fecha_inicial,
        "fecha_final":fecha_fin,
      
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }
  Inventario_general(bodega_id,tipo_id): Observable<any>{
    const  url = environment.BACKEND_DIR+'inventario/informes/inventario/general/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "bodega":bodega_id,
        "tipo":tipo_id,
      
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }
  Inventario_vencido(bodega_id,tipo_id): Observable<any>{
    const  url = environment.BACKEND_DIR+'inventario/informes/inventario/vencido/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "bodega":bodega_id,
        "tipo":tipo_id,
      
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }
  VentasxVendedor(vendedores,fechaInicio,fechaFin): Observable<any>{
    const  url = environment.BACKEND_DIR+'facturacion/informes/ventas/vendedor/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "vendedores"  : vendedores,

        "fecha_inicio": fechaInicio,
        "fecha_fin"   : fechaFin,
      
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }

  VentasxVendedorIndividual(vendedor,fechaInicio,fechaFin): Observable<any>{
    const  url = environment.BACKEND_DIR+'facturacion/informes/ventas/vendedor/individual';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "vendedor"  : vendedor,

        "fecha_inicio": fechaInicio,
        "fecha_fin"   : fechaFin,
      
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }


  VentasxVendedorGeneral(vendedores,fechaInicio,fechaFin): Observable<any>{
    const  url = environment.BACKEND_DIR+'facturacion/informes/ventas/vendedor/general';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "vendedores"  : vendedores,

        "fecha_inicio": fechaInicio,
        "fecha_fin"   : fechaFin,
      
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }



  VentasDetalladas(cliente_id,tipo,fechaInicio,fechaFin): Observable<any>{
    const  url = environment.BACKEND_DIR+'facturacion/informes/ventas/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "cliente"     : cliente_id,
        "tipo"        : tipo,
        "fecha_inicio": fechaInicio,
        "fecha_fin"   : fechaFin,
      
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }
  rotacion_ventas(fechaInicio,fechaFin): Observable<any>{
    const  url = environment.BACKEND_DIR+'facturacion/informes/inventario/rotacion/ventas/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "fecha_inicio":fechaInicio,
        "fecha_fin":fechaFin,
      
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }
  rotacion_compras(fechaInicio,fechaFin): Observable<any>{
    const  url = environment.BACKEND_DIR+'inventario/informes/inventario/rotacion/compras/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "fecha_inicio":fechaInicio,
        "fecha_fin":fechaFin,
      
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }
  EstadoCarteraCliente(cliente,fecha_corte,retencion): Observable<any>{
    const  url = environment.BACKEND_DIR+'facturacion/clientes/estadoCartera/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "cliente":cliente,
        "fecha_corte":fecha_corte,
        "retencion":retencion,
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }
  CarteraVencidaCliente(cliente): Observable<any>{
    const  url = environment.BACKEND_DIR+'facturacion/clientes/carteraVencida/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    let data = {
        "cliente":cliente,
    }



    return this.http.post<any>(url,data,{headers: httpHeaders});
    
    

  }
  retencion_compras(fecha_inicio,fecha_final){
    const  url = environment.BACKEND_DIR+'inventario/informes/compras/retenciones/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
    
    let data = {
      "fecha_inicio":fecha_inicio,
      "fecha_final":fecha_final,
    }


    return this.http.post<any>(url,data,{headers: httpHeaders});
  
  }

}
