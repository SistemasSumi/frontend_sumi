import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConciliacionBancos } from '../../../reportes/reportesContabilidad/ConciliacionReport';

@Injectable({
  providedIn: 'root'
})
export class ConciliacionService {

  constructor( private http:HttpClient,private auth:SeguridadService) { }

  getConciliacionView(datos){
    const  url = environment.BACKEND_DIR+'contabilidad/conciliar/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.post<any[]>(url,datos,{headers: httpHeaders});
  }


  saveConciliacion(datos){
    const  url = environment.BACKEND_DIR+'contabilidad/conciliacion/save/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.post<any[]>(url,datos,{headers: httpHeaders});
  }


  buscar(numero){
    const  url = environment.BACKEND_DIR+'contabilidad/conciliacion/save/?numero='+numero;
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.get<any[]>(url,{headers: httpHeaders});
  }




  setConciliado(row){
    const  url = environment.BACKEND_DIR+'contabilidad/conciliar/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.put<any[]>(url,row,{headers: httpHeaders});
  }


  imprimir(data){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Imprimiendo..',
      text:'Espere por favor..'
    });
    Swal.showLoading();
   
      Swal.close();
      let reporte = new ConciliacionBancos();
    
      let report = reporte.ReporteConciliacion(data);
      window.open(report.output('bloburl'), '_blank');
      
  
  }

  reporteCierre(mes,year){
    const  url = environment.BACKEND_DIR+'contabilidad/conciliar/?mes='+mes+'&year='+year;
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.get<any[]>(url,{headers: httpHeaders});
  
  }

  reporteCierreInventario(){
    const  url = environment.BACKEND_DIR+'inventario/informes/inventario/cierre/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.get<any[]>(url,{headers: httpHeaders});
  
  }


}
