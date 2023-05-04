import { OverlayRef } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/components/dashboard/components/inventario/stock/models/producto';

@Component({
  selector: 'app-tooltip-producto',
  templateUrl: './tooltip-producto.component.html',
  styleUrls: ['./tooltip-producto.component.css']
})
export class TooltipProductoComponent {

  @Input() data:Producto;
  @Input() overlayRef: OverlayRef;


  cerrar(){
    this.overlayRef.detach();
  }

}
