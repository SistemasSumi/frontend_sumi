import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bodegas } from './models/Bodega';
import { Kardex } from './models/kardex';
import { Producto } from './models/producto';
import { StockService } from './stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  buscarText:string = '';
  buscarPor:string = 'nombre';
  spinner:boolean = false;


  mostrarKardex:boolean = false;
  kardex:Kardex[];



  bodegas:Observable<Bodegas[]>;
  Productos:Producto[];
  constructor(private stock:StockService) { }

  ngOnInit() {
    this. bodegas = this.stock.bodegas();
  }


  buscarProductos(bodega:number,tipo:number){
    this.mostrarKardex = false;
    
    this.spinner = true;
    this.stock.productosSegunBodegaAndTipo(bodega,tipo).subscribe(resp => {
      this.Productos = resp;
      this.spinner = false;
    });
  }

  showKardex(id:number){
    this.stock.getKardex(id).subscribe(resp => {
      this.mostrarKardex = true;
      this.kardex = resp;
      
    });
  }
}
