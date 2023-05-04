import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from '../configuracion/Configuracion.service';
import { ModelFormasPago } from '../configuracion/models/ModelFormasPago';
import { ModelNumeraciones } from '../configuracion/models/ModelNumeraciones';
import { ModelTerceroCompleto } from '../configuracion/models/ModelTerceroCompleto';
import { ModelVendedor } from '../configuracion/models/ModelVendedor';
import { TablesBasicService } from '../configuracion/TablesBasic/tablesBasic.service';
import { InventarioProducto } from '../inventario/stock/models/InventarioProducto';
import { Producto } from '../inventario/stock/models/producto';
import { StockService } from '../inventario/stock/stock.service';
import { FacturacionService } from './facturacion.service';

@Component({
  selector: 'app-Facturacion',
  templateUrl: './Facturacion.component.html',
  styleUrls: ['./Facturacion.component.css']
})
export class FacturacionComponent implements OnInit {

  textProductos:string = "";
  textTerceros:string = "";

  formaDePago:number;
  vendedor:number;

  productosDeVenta: Producto[]             = [];
  clientes        : ModelTerceroCompleto[] = [];
  numeraciones    : ModelNumeraciones[]    = [];
  formasPago      : ModelFormasPago[]      = [];
  vendedores      : ModelVendedor[] = [] ;

  inventarioProductoSeleccionado:InventarioProducto[] = [];
  LoteProductoSeleccionado:InventarioProducto;
  textPrecioProductoSeleccionado:number;
  cantidadProductoSelecionado = 0;
  DescuentoProductoSelecionado = 0;


 constructor(private stock:StockService,private config:ConfiguracionService, private tables:TablesBasicService) { }

  ngOnInit() {
    this.stock.SubjectdataProductosVenta.subscribe(resp => {
        this.productosDeVenta = resp;
    });
    // this.config.SubjectdataCliente.subscribe(resp => {
    //     this.clientes = resp;
    // });
    this.config.SubjectdataNumeraciones.subscribe(resp => {
      this.numeraciones = resp;
    });
    this.tables.SubjectdataFP.subscribe(resp => {
      this.formasPago = resp;
    });
    this.config.SubjectdataVendedores.subscribe(resp => {
      this.vendedores = resp;
    })

    
  }

  validarCantidad(e:number){
    console.log(e);
    
    if(e > this.LoteProductoSeleccionado.unidades){
      this.cantidadProductoSelecionado = this.LoteProductoSeleccionado.unidades
    }
  }

  seleccionarProducto(e){
    let product = this.productosDeVenta.filter(p => p.nombreymarcaunico === e);
    if(product.length > 0){
      this.stock.productosInventario(product[0].id).subscribe(resp => {
        this.inventarioProductoSeleccionado = resp;
        
     })

    }


   
  }
  seleccionarTercero(e){
    let tercero = this.clientes.filter(c => c.nombreComercial === e);
    if(tercero.length > 0){
      this.formaDePago =  tercero[0].formaPago.id;
      this.vendedor = tercero[0].vendedor.id

    }
  }

}
