import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BalanceDePruebaPDF } from '../../../reportes/reportesContabilidad/balanceDePrueba';
import { LibroAuxiliarReporte } from '../../../reportes/reportesContabilidad/libroAuxiliarReporte';
import { InformesContabilidadService } from './InformesContabilidad.service';
import * as moment from 'moment';


@Component({
  selector: 'app-InformesContabilidad',
  templateUrl: './InformesContabilidad.component.html',
  styleUrls: ['./InformesContabilidad.component.css']
})
export class InformesContabilidadComponent implements OnInit {



  constructor(private informeService:InformesContabilidadService) { }

  ngOnInit() {
  }

  fechaInicialBalancePrueba;
  fechaFinalBalancePrueba;

  fechaInicialEstadoFinanciero;
  fechaFinalEstadoFinanciero;

  
  imprimirBalance(){

    Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'CONSULTANDO..',
          text:'Espere por favor..'
        });
    Swal.showLoading()
    this.informeService.getBalancePrueba(
      moment(this.fechaInicialBalancePrueba).format("YYYY-MM-DD"),
      moment(this.fechaFinalBalancePrueba).format("YYYY-MM-DD")

    ).subscribe(resp => {
      Swal.close();
      // console.log(resp)
      let reporte = new BalanceDePruebaPDF();
  
      let report = reporte.GenerarBalanceDePrueba(resp);
      window.open(report.output('bloburl'), '_blank')

    });
  }

  imprimirEstadoFinanciero(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'CONSULTANDO..',
      text:'Espere por favor..'
    });
    Swal.showLoading()
    this.informeService.getEstadoFinanciero(
      moment(this.fechaInicialEstadoFinanciero).format("YYYY-MM-DD"),
      moment(this.fechaFinalEstadoFinanciero).format("YYYY-MM-DD")

    ).subscribe(resp => {
      Swal.close();
      // console.log(resp)
      let reporte = new BalanceDePruebaPDF();

      let report = reporte.GenerarEstadoFinanciero(resp);
      window.open(report.output('bloburl'), '_blank')

    });
  }

}
