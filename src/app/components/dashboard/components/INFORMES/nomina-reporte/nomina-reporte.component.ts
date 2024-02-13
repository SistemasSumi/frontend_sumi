import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ReporteNomina} from '../../../reportes/reportesNomina/ReporteNomina'
import { ReporteAsopagos } from '../../../reportes/reportesNomina/ReporteAsopagos';
@Component({
  selector: 'app-nomina-reporte',
  templateUrl: './nomina-reporte.component.html',
  styleUrls: ['./nomina-reporte.component.css']
})
export class NominaReporteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  generarPDF(){
    // console.log(this.cliente_id)
    // if(this.cliente_id == undefined || this.cliente_id == null || this.cliente_id == '' ){
    //   this.metodos.AlertError("Debe seleccionar un proveedor.");
    //   return;
    // }

    // if(this.fechaInicio == undefined || this.fechaInicio == null ){
    //   this.metodos.AlertError("Debe seleccionar una fecha.");
    //   return;
    // }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Generando pdf..',
      text:'Espere por favor..'
    });
    
    Swal.showLoading();
      // this.informes.CertificadoRetencionProveedor(this.cliente_id,this.fechaInicio,this.fechaFin).subscribe(resp => {
      //   console.log(resp)
      //  if(resp[0]){
      //   const data = {
      //     base: resp[0].base,
      //     nombre: resp[0].nombreComercial,
      //     porcentaje: resp[0].porcentaje_retencion,
      //     tipo: resp[0].tipo_retencion,
      //     valor:resp[0].valor_retenido,
      //     documento: resp[0].documento,
      //     año: this.selectedYear
      //   }
        // console.log(data)
        let reporte:ReporteNomina = new ReporteNomina();
        let report = reporte.NuevoReporteNomina();
        window.open(report.output('bloburl'), '_blank');
         Swal.close();
    //   }else{
    //     this.metodos.AlertError("Proveedor no cuenta con retención")
    //   }
    // });

  }

  generarPDFASOPAGOS(){ 
    // console.log(this.cliente_id)
    // if(this.cliente_id == undefined || this.cliente_id == null || this.cliente_id == '' ){
    //   this.metodos.AlertError("Debe seleccionar un proveedor.");
    //   return;
    // }

    // if(this.fechaInicio == undefined || this.fechaInicio == null ){
    //   this.metodos.AlertError("Debe seleccionar una fecha.");
    //   return;
    // }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Generando pdf..',
      text:'Espere por favor..'
    });
    
    Swal.showLoading();
      // this.informes.CertificadoRetencionProveedor(this.cliente_id,this.fechaInicio,this.fechaFin).subscribe(resp => {
      //   console.log(resp)
      //  if(resp[0]){
      //   const data = {
      //     base: resp[0].base,
      //     nombre: resp[0].nombreComercial,
      //     porcentaje: resp[0].porcentaje_retencion,
      //     tipo: resp[0].tipo_retencion,
      //     valor:resp[0].valor_retenido,
      //     documento: resp[0].documento,
      //     año: this.selectedYear
      //   }
        // console.log(data)
        let reporte:ReporteAsopagos = new ReporteAsopagos();
        let report = reporte.NuevoReporteAsopagos();
        window.open(report.output('bloburl'), '_blank');
         Swal.close();
    //   }else{
    //     this.metodos.AlertError("Proveedor no cuenta con retención")
    //   }
    // });

  }

}
