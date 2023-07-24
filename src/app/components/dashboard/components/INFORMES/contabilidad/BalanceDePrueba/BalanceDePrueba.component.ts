import { Component, OnInit } from '@angular/core';
import { BalanceDePruebaPDF } from 'src/app/components/dashboard/reportes/reportesContabilidad/balanceDePrueba';
import Swal from 'sweetalert2';
import { InformesContabilidadService } from '../../../Contabilidad/InformesContabilidad/InformesContabilidad.service';
import * as moment from 'moment';


@Component({
  selector: 'app-BalanceDePrueba',
  templateUrl: './BalanceDePrueba.component.html',
  styleUrls: ['./BalanceDePrueba.component.css']
})
export class BalanceDePruebaComponent implements OnInit {

  constructor(private informeService:InformesContabilidadService) { }


  fechaInicialBalancePrueba;
  fechaFinalBalancePrueba;

  ngOnInit() {
  }

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
      console.log(resp)
      let reporte = new BalanceDePruebaPDF();
  
      let report = reporte.GenerarBalanceDePrueba(resp);
      window.open(report.output('bloburl'), '_blank')

    });
  }


}
