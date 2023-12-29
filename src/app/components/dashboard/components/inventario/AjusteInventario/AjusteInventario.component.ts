import { Component, OnInit } from '@angular/core';
import { AjusteStock } from '../../../reportes/reportesInventario/AjusteStock';
import { AjustesInventarioService } from './AjustesInventario.service';

@Component({
  selector: 'app-AjusteInventario',
  templateUrl: './AjusteInventario.component.html',
  styleUrls: ['./AjusteInventario.component.css']
})
export class AjusteInventarioComponent implements OnInit {

  ajustes:any
  constructor(private ajusteService:AjustesInventarioService) { }

  ngOnInit() {
    this.ajusteService.getAjustes().subscribe(resp=>{
      console.log(resp)
      this.ajustes = resp;
    })
    
  }

  imprimir(item){
    let reporte = new AjusteStock();
    let report = reporte.ReporteAjusteStock(item);
    window.open(report.output('bloburl'), '_blank');
  }

}
