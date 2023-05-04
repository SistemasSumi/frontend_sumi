import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BalanceDePruebaPDF } from '../../../reportes/reportesContabilidad/balanceDePrueba';
import { LibroAuxiliarReporte } from '../../../reportes/reportesContabilidad/libroAuxiliarReporte';
import { InformesContabilidadService } from './InformesContabilidad.service';

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
  fechaFinalalBalancePrueba;

  imprimirBalance(){

    Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'CONSULTANDO..',
          text:'Espere por favor..'
        });
    Swal.showLoading()
    this.informeService.getBalancePrueba().subscribe(resp => {
      Swal.close();
      console.log(resp)
      let reporte = new BalanceDePruebaPDF();
  
      let report = reporte.GenerarBalanceDePrueba(resp);
      window.open(report.output('bloburl'), '_blank')

    });
  }

  imprimirEstadoFinanciero(){
      let reporte = new BalanceDePruebaPDF();
      console.log("hola")
      let report = reporte.GenerarEstadoFinanciero();
      window.open(report.output('bloburl'), '_blank')
  }

}
