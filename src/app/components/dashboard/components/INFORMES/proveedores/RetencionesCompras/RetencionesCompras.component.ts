import { Component, OnInit } from '@angular/core';
import { RetencionEnLaFuenteGeneral } from 'src/app/components/dashboard/reportes/reportesContabilidad/RetencionEnLaFuenteGeneral';
import { RotacionxCompras } from 'src/app/components/dashboard/reportes/reportesInventario/excel/RotacionXCompras';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { InformesGeneralesService } from '../../InformesGenerales.service';

@Component({
  selector: 'app-RetencionesCompras',
  templateUrl: './RetencionesCompras.component.html',
  styleUrls: ['./RetencionesCompras.component.css']
})
export class RetencionesComprasComponent implements OnInit {

  dateRange:{startDate:Date,endDate:Date};

  metodos:MetodosShared = new MetodosShared();

  constructor(private informes:InformesGeneralesService) { }

  ngOnInit() {
  }

  generarPDF(){
    
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Generando excel..',
        text:'Espere por favor..'
      });
      Swal.showLoading();

      this.informes.retencion_compras(this.dateRange.startDate,this.dateRange.endDate).subscribe(resp => {

        console.log(resp);
        
        let reporte:RetencionEnLaFuenteGeneral = new RetencionEnLaFuenteGeneral()
        let report = reporte.ReporteRetencionEnLaFuenteGeneral(resp);
        window.open(report.output('bloburl'), '_blank');
        Swal.close()
      
        
      });
    }
}
