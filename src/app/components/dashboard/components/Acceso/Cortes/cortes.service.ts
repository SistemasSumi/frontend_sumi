import { Injectable } from '@angular/core';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CarshopModel } from '../../../../../models/carshop.model';
import { CurrencyPipe } from '@angular/common';
import { CortesModel } from '../../../../../models/cortes.model';

import * as moment from 'moment';
import { CxpModel } from '../../../../../models/cxp.model';

moment.locale('es')

@Injectable({
  providedIn: 'root'
})
export class CortesService {
  
httpOptions    : any;
cortesData:CortesModel[] = [];
cxpData:CxpModel[] = [];


constructor(public router:Router, private http:HttpClient, private auth:SeguridadService,private cp:CurrencyPipe) {
   this.getCarshop();

 }


dataCarshop:CarshopModel[] = [];




createNewCorte(form:FormGroup){
  var url = environment.BACKEND_DIR+"acceso/registrar/corte/"
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
    })
  };
  
  let FormaPago = '';
  if(form.value.formaPago == 0){
    FormaPago = 'CONTADO';
  }else{
    FormaPago = 'TRANSFERENCIA';
  }

  const corteData = {
      idCliente: form.value.idcliente,
      idBarbero: form.value.idBarbero,
      formaPago: FormaPago,
  }
  return this.http.post(url,corteData,this.httpOptions);


} 



createNewProducto(form:FormGroup){
  // console.log(form.value);
  
  var url = environment.BACKEND_DIR+"acceso/carshop/"
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
    })
  };
  let descuento = 0;
  if(form.value.descuento == null){
      descuento = 0;
  }else{
    descuento = form.value.descuento
  }
  // console.log(form.value.idProducto);
  
  const carshopData = {
      idProducto: form.value.idProducto,
      precio: form.value.precio,
      cantidad: form.value.cantidad,
      descuento: descuento,
      usuario: this.auth.currentUser.getIdUser(),
      total: 0,
  }
  return this.http.post(url,carshopData,this.httpOptions);


} 



deleteProducto(id:number){
  var url = environment.BACKEND_DIR+"acceso/carshop/"
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
    })
  };
  
  const carshopData = {
      id:id
  }
  return this.http.put(url,carshopData,this.httpOptions);
} 

getCarshop(){
  const  url = environment.BACKEND_DIR+'acceso/carshop/list/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.get(url, this.httpOptions).pipe(
    map(resp => {
      this.dataCarshop = [];
      // console.log(resp);
      
      for (const x in resp) {
        
        let producto = new CarshopModel();
        producto.setId(resp[x].id);
        producto.setIdProducto(resp[x].idProducto);
        producto.setDescuento(resp[x].descuento)
        producto.setProducto(resp[x].idProducto.nombre)
        
        producto.setCantidad(resp[x].cantidad);
       
 
        producto.setPrecio(resp[x].precio);
        producto.setSubtotal(resp[x].total);
        
        this.dataCarshop.push(producto);

        
        
      }
      
 
     
      return this.dataCarshop;
    })
  )

}

getCortes(){
  const  url = environment.BACKEND_DIR+'acceso/listado/corte/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.get(url, this.httpOptions).pipe(
    map(resp => {
        this.cortesData = [];
      for (const c in resp){
      
          let corte:CortesModel = new CortesModel();
          // corte.setIdCorte(this.cerosAlaIzquierda(resp[c].idLibro));

           corte.setIdCorte(this.cerosAlaIzquierda(resp[c].idCorte,5));
           corte.setBarbero(resp[c].idBarbero);
           corte.setCliente(resp[c].idCliente);
           corte.setIdCaja(this.cerosAlaIzquierda(resp[c].idCaja,5));
           corte.setTotal(this.cp.transform(parseFloat(resp[c].total)));
           corte.setFecha_creacion(moment(resp[c].fecha_creacion).format('MMMM DD YYYY, h:mm a'));
           corte.setFormaPago(resp[c].formaPago);
            
           this.cortesData.push(corte);

           // console.log(corte);
           
          //  ;
      }

      // this.cortesData = resp;
      // console.log(resp);
     
      return resp;
    })
  )

}


getCxp(idBarbero:number){
  const  url = environment.BACKEND_DIR+'acceso/listado/cxp/'+idBarbero;
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };

  return this.http.get(url, this.httpOptions).pipe(
    map(resp => {

      let totalDeuuda = 0;
        this.cxpData = [];
      for (const c in resp){
      
          let cxp:CxpModel = new CxpModel();
          // corte.setIdCorte(this.cerosAlaIzquierda(resp[c].idLibro));

           cxp.setId(resp[c].id);
           cxp.setBarbero(resp[c].idBarbero);
           cxp.setTotal(this.cp.transform(parseFloat(resp[c].total)));
           cxp.setFecha_creacion(moment(resp[c].fecha_creacion).format('MMMM DD YYYY, h:mm a'));
           cxp.setCorte(this.cerosAlaIzquierda(resp[c].idCorte,5));
           cxp.setEstado(resp[c].estado);
            
          if(resp[c].estado){
    
          }else{
            totalDeuuda += Number.parseFloat(resp[c].total);
          }

           this.cxpData.push(cxp);

           // console.log(cxp);
           
          //  ;
      }

      // this.cortesData = resp;
      // console.log(resp);
     
      return totalDeuuda;
    })
  )

}

getproductos(){
  const  url = environment.BACKEND_DIR+'acceso/productos/todos/';
  const token = this.auth.currentUser.getTokenUser();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token '+token
   })
  };
  return this.http.get(url, this.httpOptions).pipe(
    map(resp => {

       // console.log(resp);
       
      return resp;
    })
  )

}



cerosAlaIzquierda(number:number,width){
  var numberOutput = Math.abs(number); /* Valor absoluto del número */
  var length = numberOutput.toString().length;/* Largo del número */ 
  var zero = "0"; /* String de cero */  
  
  if (width <= length) {
      if (number < 0) {
           return ("-" + numberOutput.toString()); 
      } else {
           return numberOutput.valueOf(); 
      }
  } else {
      if (number < 0) {
          return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
      } else {
          return ((zero.repeat(width - length)) + numberOutput.toString()); 
      }
  }
}

}

