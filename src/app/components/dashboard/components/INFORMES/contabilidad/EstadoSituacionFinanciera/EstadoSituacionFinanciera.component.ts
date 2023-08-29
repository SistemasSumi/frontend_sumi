import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { InformesContabilidadService } from '../../../Contabilidad/InformesContabilidad/InformesContabilidad.service';
import * as moment from 'moment';
import { BalanceDePruebaPDF } from 'src/app/components/dashboard/reportes/reportesContabilidad/balanceDePrueba';


@Component({
  selector: 'app-EstadoSituacionFinanciera',
  templateUrl: './EstadoSituacionFinanciera.component.html',
  styleUrls: ['./EstadoSituacionFinanciera.component.css']
})
export class EstadoSituacionFinancieraComponent implements OnInit {
  fechaInicialEstadoFinanciero;
  fechaFinalEstadoFinanciero;


  constructor(private informeService:InformesContabilidadService) { }

  ngOnInit() {
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
