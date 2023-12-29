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
// import { ComprobanteProforma } from '../../reportes/reportesFacturacion/ComprobanteProforma';
// import { facturaElectronicaReport } from '../../reportes/reportesFacturacion/facturaElectronica';
// import { facturaElectronicaReportSumi } from '../../reportes/reportesFacturacion/facturaElectronicaOriginal';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
// import { CxcMoviModels } from './models/CxcMoviModels';
import { InvoceReport } from '../models/InvoceReport';
import { facturaElectronicaReport } from '../../../reportes/reportesFacturacion/facturaElectronica';


@Injectable({
  providedIn: 'root',
})
export class CotizacionService {
  SubjectdataCotizaciones: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    null
  );

  constructor(
    public router: Router,
    private http: HttpClient,
    private auth: SeguridadService,
    private settings: ConfiguracionService
  ) {
    this.cargarCotizaciones();
  }
  cargarCotizaciones() {
    this.obtenerCotizaciones().subscribe();
  }

  obtenerCotizaciones() {
    const url = environment.BACKEND_DIR +'facturacion/cotizaciones/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set(
      'Authorization',
      'Token ' + token
    );

    return this.http
      .get<any>(url, { headers: httpHeaders })
      .pipe(map((resp) => this.SubjectdataCotizaciones.next(resp)));
  }


  cargarNumeracionCotizaciones() {
    return this.settings.getNumeraciones('cotizacion');
  }
  saveCotizacion(form: FormGroup, detalle: any[]): Observable<any> {
    const url = environment.BACKEND_DIR + 'facturacion/cotizaciones/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set(
      'Authorization',
      'Token ' + token
    );

    let data = {
      cxc: form.value,
      detalle: detalle,
    };

    return this.http.post<any>(url, data, { headers: httpHeaders });
  }
  actualizarListadoCotizaciones() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Consultando...',
      text: 'Espere por favor..',
    });
    Swal.showLoading();

    this.obtenerCotizaciones().subscribe(() => {
      Swal.close();
    });
  }
  // imprimirPos(id: string) {
  //   const url =
  //     environment.BACKEND_DIR + 'facturacion/facturas/invoce/pos/?id=' + id;
  //   window.open(url, '_blank');
  // }

  obtenerCotizacion(id:number){
    const  url = environment.BACKEND_DIR+'facturacion/cotizaciones/report/?id='+id;
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
    
    return this.http.get<InvoceReport>(url,{headers: httpHeaders}); 
  }

  imprimirCotizacion(id){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Generando PDF..',
      text:'Espere por favor..'
    });
    Swal.showLoading();
    this.obtenerCotizacion(id).subscribe(resp => {
      Swal.close();
      let reporte = new facturaElectronicaReport();
      let report = reporte.geerarPDFFacturaSumi(resp);
      window.open(report.output('bloburl'), '_blank');
  
    },(ex) => {
      console.log(ex)
              
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'SarpSoft',
        text: 'Error al generar el PDF!',
      });
    })
  
  
  }
  

  saveFacturaPermitida(factura, detalle: any[]): Observable<any> {
    const url = environment.BACKEND_DIR + 'cotizacion/cotizaciones/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set(
      'Authorization',
      'Token ' + token
    );

    let data = {
      cxc: factura,
      detalle: detalle,
    };

    return this.http.post<any>(url, data, { headers: httpHeaders });
  }

  updateFactura(form: FormGroup): Observable<any> {
    const url = environment.BACKEND_DIR + 'cotizacion/cotizaciones/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set(
      'Authorization',
      'Token ' + token
    );

    let data = {
      cxc: form.value,
    };

    return this.http.put<any>(url, data, { headers: httpHeaders });
  }
}
