import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import { Bodegas } from './models/Bodega';
import { Kardex } from './models/kardex';

import { Producto } from './models/producto';

@Injectable({
    providedIn: 'root'
})
export class StockService {


    SubjectdataCxp    : BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
    SubjectdataCE   : BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
    SubjectdataProductosVenta    : BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>(null);
    SubjectdataProductos         : BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>(null);
    SubjectdataProductosConsumo  : BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>(null);
   

constructor(private settings:ConfiguracionService,public router:Router, private http:HttpClient, private auth:SeguridadService) {
    this.actualizarProductosVentas();
    this.actualizarProductos();
    this.actualizarProductosConsumo();
    this.getPagos().subscribe();
   
}

actualizarProductosVentas(){
    this.productos().subscribe(resp => {
        this.SubjectdataProductosVenta.next(resp);
      
    });
}

actualizarProductos(){
    this.productosFull().subscribe(resp => {
        this.SubjectdataProductos.next(resp);
      
    });
}
actualizarProductosConsumo(){
    this.productosConsumo().subscribe(resp => {
        this.SubjectdataProductosConsumo.next(resp);
      
    });
}

actualizarCxp(){
    this.getCxp().subscribe(resp => {
        this.SubjectdataCxp.next(resp);
    });
}




productos(){
    const  url = environment.BACKEND_DIR+'inventario/getProductos/?getProductosVentas='+'getProductosVentas';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<Producto[]>(url,{headers: httpHeaders});
  
}

productosFull(){
    const  url = environment.BACKEND_DIR+'inventario/getProductos/?getProductos_SinStock='+'getProductos_SinStock';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<Producto[]>(url,{headers: httpHeaders});
  
}


productosConsumo(){
    const  url = environment.BACKEND_DIR+'inventario/getProductos/?consumo='+'consumo';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<Producto[]>(url,{headers: httpHeaders});
  
}


getProducto(id:number){
    const  url = environment.BACKEND_DIR+'inventario/getProductos/?producto='+id;
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<Producto>(url,{headers: httpHeaders});
  
}


productosInventario(id){
    const  url = environment.BACKEND_DIR+'inventario/getProductos/?id='+id;
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<any[]>(url,{headers: httpHeaders});
  
}


bodegas(){
    const  url = environment.BACKEND_DIR+'inventario/bodegas/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<Bodegas[]>(url,{headers: httpHeaders});
}
bodegasSolas(){
    const  url = environment.BACKEND_DIR+'inventario/bodegas/get/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<Bodegas[]>(url,{headers: httpHeaders});
}

tipoDeProducto(){
    const  url = environment.BACKEND_DIR+'inventario/tipos/get/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<any[]>(url,{headers: httpHeaders});
}


productosSegunBodegaAndTipo(bodega:number,tipo:number){
    const  url = environment.BACKEND_DIR+'inventario/bodegas/?bodega='+bodega+'&tipo='+tipo;
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<Producto[]>(url,{headers: httpHeaders});
}


getKardex(producto:number){
    const  url = environment.BACKEND_DIR+'inventario/bodegas/?kardex='+producto;
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<Kardex[]>(url,{headers: httpHeaders});
}

getCxp(){
    const  url = environment.BACKEND_DIR+'inventario/cxp/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<any[]>(url,{headers: httpHeaders});
}

getPagos(){
    const  url = environment.BACKEND_DIR+'inventario/egreso/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<any[]>(url,{headers: httpHeaders}).pipe(
        map(resp =>  this.SubjectdataCE.next(resp))
    );
}

imprimirPagos(numero){
    const  url = environment.BACKEND_DIR+'inventario/egreso/imprimir/?numero='+numero+'&tipo='+'CE';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<any[]>(url,{headers: httpHeaders});
}


getFacturasXProveedor(tercero:number){
    const  url = environment.BACKEND_DIR+'inventario/obtenerFacturas/?tercero='+tercero;
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
    return this.http.get<any>(url,{headers: httpHeaders});
}

    saveProducto(form:FormGroup){
        const  url = environment.BACKEND_DIR+'inventario/productos/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);


        form.get('usuario').setValue(this.auth.currentUser.getIdUser())

        let data = form.value;


        return this.http.post<any>(url,data,{headers: httpHeaders});
    
        

    }

    updateProducto(form:FormGroup){
        const  url = environment.BACKEND_DIR+'inventario/productos/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);


        form.get('usuario').setValue(this.auth.currentUser.getIdUser())

        let data = form.value;


        return this.http.put<any>(url,data,{headers: httpHeaders});
    
        

    }

    cargarNumeracion(){
        return this.settings.getNumeraciones('ce');
    }

    saveEgreso(datos){
        const  url = environment.BACKEND_DIR+'inventario/egreso/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

        let data = datos;


        return this.http.post<any>(url,data,{headers: httpHeaders});
    
    }

    busquedaAvanzadaCE(datos){
        const  url = environment.BACKEND_DIR+'inventario/egreso/busqueda/';
        const token = this.auth.currentUser.getTokenUser();
        const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

      


        return this.http.post<any>(url,datos,{headers: httpHeaders}).pipe(
            map(resp =>  this.SubjectdataCE.next(resp))
        );
    }

}
