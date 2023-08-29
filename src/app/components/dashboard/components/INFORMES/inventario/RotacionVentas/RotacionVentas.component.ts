import { Component, OnInit } from '@angular/core';
import { RotacionxCompras } from 'src/app/components/dashboard/reportes/reportesInventario/excel/RotacionXCompras';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { InformesGeneralesService } from '../../InformesGenerales.service';

@Component({
  selector: 'app-RotacionVentas',
  templateUrl: './RotacionVentas.component.html',
  styleUrls: ['./RotacionVentas.component.css']
})
export class RotacionVentasComponent implements OnInit {

  
 

  dateRange:{startDate:Date,endDate:Date};

  metodos:MetodosShared = new MetodosShared();

  constructor(private informes:InformesGeneralesService) { }

  ngOnInit() {
  }

  generarExcel(){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Generando excel..',
        text:'Espere por favor..'
      });
      Swal.showLoading();


      // console.log(this.dateRange)
      this.informes.rotacion_ventas(this.dateRange.startDate,this.dateRange.endDate).subscribe(resp => {

        // console.log(resp);
        
        let reporte = new RotacionxCompras()
        reporte.dowloadExcel(resp,this.dateRange.startDate,this.dateRange.endDate);
        Swal.close()
      
        
      });
    }
}
