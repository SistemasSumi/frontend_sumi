import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InventarioGeneral } from 'src/app/components/dashboard/reportes/reportesInventario/excel/InventarioGeneral';
import Swal from 'sweetalert2';
import { Bodegas } from '../../../inventario/stock/models/Bodega';

import { StockService } from '../../../inventario/stock/stock.service';
import { InformesGeneralesService } from '../../InformesGenerales.service';

@Component({
  selector: 'app-IV_GENERAL',
  templateUrl: './IV_GENERAL.component.html',
  styleUrls: ['./IV_GENERAL.component.css']
})
export class IV_GENERALComponent implements OnInit {
  bodegas:Observable<Bodegas[]>;
  bodega:Bodegas;


  bodega_id:number = 0;
  tipo_id:number = 0;
  constructor(private stock:StockService,private informes:InformesGeneralesService) { }

  ngOnInit() {
    this. bodegas = this.stock.bodegas();
  }

  SeleccionarBodega(b){
    this.bodega = b;
  }

  generarExcel(){
    
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Generando excel..',
      text:'Espere por favor..'
    });
    Swal.showLoading();

    this.informes.Inventario_general(this.bodega_id,this.tipo_id).subscribe(resp => {
      
      // console.log(resp);
      let reporte = new InventarioGeneral()
      reporte.dowloadExcel(resp);
      Swal.close()
    
      
    });
  }



}
