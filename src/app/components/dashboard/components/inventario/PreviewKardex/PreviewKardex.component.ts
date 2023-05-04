import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Kardex } from '../stock/models/kardex';
import { StockService } from '../stock/stock.service';
@Component({
  selector: 'app-PreviewKardex',
  templateUrl: './PreviewKardex.component.html',
  styleUrls: ['./PreviewKardex.component.css']
})
export class PreviewKardexComponent implements OnInit {
  mostrarKardex =false;
  kardex:Kardex[];
  constructor(private rutaActiva : ActivatedRoute,private stock:StockService) { }

  ngOnInit() {
    this.cargarKardex();
  }

  cargarKardex(){
    if(this.rutaActiva.snapshot.params.id){
      let id = this.rutaActiva.snapshot.params.id;
      this.showKardex(id);
    }
  }
  showKardex(id:number){
    this.stock.getKardex(id).subscribe(resp => {
      this.mostrarKardex = true;
      this.kardex = resp;
      
    });
  }

}
