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
  setConciliado(row){
    const  url = environment.BACKEND_DIR+'contabilidad/conciliar/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

    return this.http.put<any[]>(url,row,{headers: httpHeaders});
  }


  imprimir(){
    console.log('rnytor')
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Imprimiendo..',
      text:'Espere por favor..'
    });
    Swal.showLoading();
   
      Swal.close();
      let reporte = new ConciliacionBancos();
    
      let report = reporte.ReporteConciliacion(null);
      window.open(report.output('bloburl'), '_blank');
      
  
  }


}
