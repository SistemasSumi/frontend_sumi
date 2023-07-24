import { Component, OnInit } from '@angular/core';
import { Abonos_Recibidos } from 'src/app/components/dashboard/reportes/reportesInventario/excel/Abonos_Recibidos';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { InformesGeneralesService } from '../../InformesGenerales.service';

@Component({
  selector: 'app-AbonosRecibidos',
  templateUrl: './AbonosRecibidos.component.html',
  styleUrls: ['./AbonosRecibidos.component.css']
})
export class AbonosRecibidosComponent implements OnInit {


  fecha_inicial:string;
  fecha_final:string;

  metodos:MetodosShared = new  MetodosShared();
  constructor(private informes:InformesGeneralesService) { }

  ngOnInit() {
  }

  GenerarExcel(){
  
    if(this.fecha_inicial == undefined || this.fecha_inicial == null || this.fecha_inicial == '' ){
      this.metodos.AlertError("Debe seleccionar una fecha inicial.");
      return;
    }

    if(this.fecha_final == undefined || this.fecha_final == null || this.fecha_inicial == '' ){
      this.metodos.AlertError("Debe seleccionar una fecha final.");
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Generando excel..',
      text:'Espere por favor..'
    });
    Swal.showLoading();

    this.informes.Abonos_Recibidos(this.fecha_inicial,this.fecha_final).subscribe(resp => {
  
      
      let reporte = new Abonos_Recibidos()
      reporte.dowloadExcel(resp);
      Swal.close()
    
      
    });
  }

}
