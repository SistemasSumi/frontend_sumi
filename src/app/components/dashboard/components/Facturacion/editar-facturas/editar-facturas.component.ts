import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import { ModelFormasPago } from '../../configuracion/models/ModelFormasPago';
import { ModelNumeraciones } from '../../configuracion/models/ModelNumeraciones';
import { ModelTerceroCompleto } from '../../configuracion/models/ModelTerceroCompleto';
import { ModelVendedor } from '../../configuracion/models/ModelVendedor';
import { TablesBasicService } from '../../configuracion/TablesBasic/tablesBasic.service';
import { InventarioProducto } from '../../inventario/stock/models/InventarioProducto';
import { Producto } from '../../inventario/stock/models/producto';
import { StockService } from '../../inventario/stock/stock.service';
import { FacturacionService } from '../facturacion.service';

import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { CxcMoviModels } from '../models/CxcMoviModels';
import { ToastrService } from 'ngx-toastr';
import { Cliente, InvoceReport } from '../models/InvoceReport';


@Component({
  selector: 'app-editar-facturas',
  templateUrl: './editar-facturas.component.html',
  styleUrls: ['./editar-facturas.component.css']
})
export class EditarFacturasComponent implements OnInit {

  formasPago        : ModelFormasPago[]      = [];
  clientes          : ModelTerceroCompleto[] = [];
  numeraciones      : ModelNumeraciones[]    = [];
  vendedores        : ModelVendedor[]        = [];
  productos         : Producto[]             = [];
  inventarioProducto: InventarioProducto[]   = [];
  listaPrecios      : precios[]   = [];
  
  
  listadoDetalleFactura:DetalleFactura[] = [];

  modalProducto: NgbModalRef;
  columnFiltroProducto:string = 'nombreymarcaunico';  

  // VARIABLES DEL DETALLE FACTURACIÓN
  productoSeleccionado:DetalleFactura;

  filaAEditar: number;
  cantidad   : number = null;
  valorCompra: number;
  existencia : number;
  iva        : number;
  valor      : number;
  descuento  : number = 0;
  vence      : Date;
 
  lote       : string = "";
  producto   : Producto;
  inventario : number;
  subtotal   : number;
  descuentoPorcentaje:boolean = false;
  // TOTALES DE la factura A CREAR
  public subtotalFactura : number = 0;
  public retencionFactura: number = 0;
  public descuentoFactura: number = 0;
  public domicilioFactura: number = 0;
  public ivaFactura      : number = 0;
  public totalFactura    : number = 0;

  public filtroTerceroControl: FormControl = new FormControl('');
  public filtroProductoControl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();


  metodos:MetodosShared = new MetodosShared();

  domicilio:boolean;

  facturaSeleccionada:InvoceReport;
  

  clienteSeleccionado:ModelTerceroCompleto;

  formfacturacion = this.formBuilder.group({    
    id: ['',{
      
    }],
   
    cliente: ['',{
      validators:[
        Validators.required,
      ]
    }],

    fecha: [moment(new Date()).format("YYYY-MM-DD"),{
      validators:[
        Validators.required,
        
      ]
    }],

    valor: ['',{
      validators:[
    
      ]
    }],
    descuento: ['',{
      validators:[
  
      ]
    }],
    valorDomicilio: [0,{
      validators:[
     
      ]
    }],
    valorLetras: ['',{
      validators:[
 
      ]
    }],
    observacion: ['',{
      validators:[

      ]
    }],
    formaPago: ['',{
      validators:[

      ]
    }],
   
    subtotal: [0,{
      validators:[

      ]
    }],
    valorRetenciones: [0,{
      validators:[

      ]
    }],
    valorIva: [0,{
      validators:[

      ]
    }],
    
   
  });  

  public filtroClientes: BehaviorSubject<ModelTerceroCompleto[]>;
  public filtroProductos: BehaviorSubject<Producto[]>;


  constructor(
              private rutaActiva    : ActivatedRoute,
              private modalService  : NgbModal,
              private toast: ToastrService,
              private route         : Router,
              private formBuilder      : FormBuilder,
           
              private invoceService:FacturacionService,
              
           
              private stock:StockService,
           
              private config:ConfiguracionService,
              private tables:TablesBasicService

  ) { }

  ngOnInit() {

    // new MetodosShared().mensajeOK();
    this.obtenerFormaDepago();
    // this.obtenerClientes();
 
    this.obtenerProductos();

    this.InitFiltroTercero();
    this.InitFiltroProducto();

    this.cargarFactura();
  }

  
  obtenerFormaDepago(){
    this.tables.SubjectdataFP.subscribe(resp => {
      this.formasPago = resp;
    });
  }

  obtenerTodos(){
    this.config.SubjectdataCliente.subscribe(resp => {
      this.clientes = resp;
      this.filtroClientes = new BehaviorSubject<ModelTerceroCompleto[]>(this.clientes);
    });
  }
  obtenerClientesPos(){
    this.config.SubjectdataClientePos.subscribe(resp => {
      this.clientes = resp;
      this.filtroClientes = new BehaviorSubject<ModelTerceroCompleto[]>(this.clientes);
    });
  }
  obtenerClientesElectronicos(){
    this.config.SubjectdataClienteElectronicos.subscribe(resp => {
      this.clientes = resp;
      this.filtroClientes = new BehaviorSubject<ModelTerceroCompleto[]>(this.clientes);
    });
  }


  InitFiltroTercero(){
    this.filtroTerceroControl.valueChanges
      .pipe(takeUntil (this._onDestroy))
      .subscribe(() => {
        this.filtraTerceros(this.filtroTerceroControl.value);
      });
  }
  InitFiltroProducto(){
    this.filtroProductoControl.valueChanges
      .pipe(takeUntil (this._onDestroy))
      .subscribe(() => {
        this.filtrarProductos(this.filtroProductoControl.value);
      });
  }


  obtenerProductos(){
    this.stock.SubjectdataProductosVenta.subscribe(resp => {
   
      
      this.productos = resp;
      this.filtroProductos = new BehaviorSubject<Producto[]>(this.productos);
    });
  }
  obtenerInventario(idProducto){
    this.stock.productosInventario(idProducto).subscribe(resp => {
   
      
      this.inventarioProducto = resp;
      
    });
  }


  filtraTerceros(busqueda:string){
    let filtro:ModelTerceroCompleto[] = this.metodos.filtrarArray<ModelTerceroCompleto>(this.clientes,'nombreComercial',busqueda);
    this.filtroClientes.next(filtro);
  }
  
  filtrarProductos(busqueda:string){
      let filtro:Producto[] = this.metodos.filtrarArray<Producto>(this.productos,this.columnFiltroProducto,busqueda);
      this.filtroProductos.next(filtro);
  }
  
  seleccionarTercero(data:ModelTerceroCompleto){
    this.clienteSeleccionado = data;
    this.calcularTotales(this.listadoDetalleFactura);
    this.formfacturacion.get('formaPago').setValue(data.formaPago.id); 
    // this.formfacturacion.get('vendedor').setValue(data.vendedor.id); 
  }

  seleccionarProducto(data:Producto){
    this.limpiarDetalle();
    this.producto = data;
    this.valorCompra = data.valorCompra;
    this.obtenerInventario(data.id);
  }

  seleccionarInventario(data:InventarioProducto){
    this.listaPrecios = [];

    this.lote        = data.lote;
    
    this.vence       = data.vencimiento;

    let cantidadUsada = 0;
    if(this.listadoDetalleFactura.filter(d => d.producto.id === this.producto.id && d.lote === this.lote )[0]){
        let detalle = this.listadoDetalleFactura.filter(
          d => d.producto.id === this.producto.id 
          && d.lote === this.lote
         
        )[0]
        cantidadUsada = detalle.cantidad;
    }

    if(this.inventarioProducto){
      const fechaVenceSelected = data.vencimiento;
      for(let x of this.inventarioProducto){
        if(x.vencimiento < fechaVenceSelected){
          Swal.fire({
            icon: 'warning', // Icono de advertencia
            title: '¡Advertencia!',
            text: 'Nos gustaría señalar que entre los lotes disponibles existen aquellos cuyas fechas de vencimiento están próximas a la del lote que has seleccionado. Esta información reviste relevancia, ya que refleja la alta calidad y frescura de nuestros productos. Te instamos a tener en consideración esta valiosa información al momento de tomar tu decisión final. La excelencia en cada detalle es nuestro compromiso contigo.',
            confirmButtonText: 'Aceptar'
          });

          // Salir del bucle for una vez que se muestra la alerta
          break;
        }
      }
    }


    this.existencia  = data.unidades-cantidadUsada;

    if(this.producto.regulado){
      let p:precios = {
        valor:this.metodos.redondearAl50MasCercano(this.producto.valorRegulacion)
      }
      this.listaPrecios.push(p);
      this.valor =  Number(this.listaPrecios[0].valor.toFixed(2));

    }else{

      if(this.facturaSeleccionada.cliente.listaPrecios){
        let lista = this.facturaSeleccionada.cliente.listaPrecios;
        let p1:precios = {
          valor: this.metodos.redondearAl50MasCercano(this.producto.valorCompra / lista.precio1)
        }
        let p2:precios = {
          valor: this.metodos.redondearAl50MasCercano(this.producto.valorCompra / lista.precio2)
        }
        let p3:precios = {
          valor: this.metodos.redondearAl50MasCercano(this.producto.valorCompra / lista.precio3)
        }
        this.listaPrecios.push(p1);
        this.listaPrecios.push(p2);
        this.listaPrecios.push(p3);

      }else{
          let p1:precios = {
            valor: this.metodos.redondearAl50MasCercano(this.producto.valorCompra / 0.70)
          }
          let p2:precios = {
            valor: this.metodos.redondearAl50MasCercano(this.producto.valorCompra / 0.75)
          }
          let p3:precios = {
            valor: this.metodos.redondearAl50MasCercano(this.producto.valorCompra / 0.80)
          }
          this.listaPrecios.push(p1);
          this.listaPrecios.push(p2);
          this.listaPrecios.push(p3);
      }
     

      this.valor =  Number(this.listaPrecios[0].valor.toFixed(2));
    }

  }


  eliminar(id:number){
    new MetodosShared().AlertQuestion(
      '¿ SEGURO DESEA ELIMINAR EL PRODUCTO ?'
    ).then((result) => {
      if (result.isConfirmed) {


         
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Guardando..',
          text:'Espere por favor..'
        });
        Swal.showLoading();

        this.invoceService.EliminarDetalle(id).subscribe((resp:any) => {
          
          Swal.close();
          this.toast.success("PRODUCTO ELIMINADO DE LA FACTURA")
          

         
          this.cargarFactura();


          

        },(ex) => {
          console.log(ex);
          Swal.close();
          
          let errores ='';
          for(let x of ex.error){
        
              errores +=`
              <div class="alert alert-danger" role="alert" style="text-align: justify;">
                ${x}
              </div>
              `
            
            
          }
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar.',
            html:errores,
            confirmButtonColor: '#4acf50',
        
          });
        
        });
      } 
    });
  

  }

  agregar(id:number,detalle:DetalleFactura){
    new MetodosShared().AlertQuestion(
      '¿ SEGURO DESEA AGREGAR EL PRODUCTO ?'
    ).then((result) => {
      if (result.isConfirmed) {


         
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Guardando..',
          text:'Espere por favor..'
        });
        Swal.showLoading();

        this.invoceService.AgregarDetalle(id,detalle).subscribe((resp:any) => {
          
          Swal.close();
          this.toast.success('PRODUCTO AGREGADO A LA FACTURA')
          this.cargarFactura();
          

          

        },(ex) => {
          console.log(ex);
          Swal.close();
          
          let errores ='';
          for(let x of ex.error){
            
              errores +=`
              <div class="alert alert-danger" role="alert" style="text-align: justify;">
                ${x}
              </div>
              `
            
            
          }
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar.',
            html:errores,
            confirmButtonColor: '#4acf50',
        
          });
        
        });
      } 
    });
  }

  validarDescuento(){
    if(this.descuentoPorcentaje){
        if(this.descuento > 100){
            this.descuento = 100; 
        }
    }
    this.calcular();
  }


  openModalProductos(content) {
		this.modalProducto = this.modalService.open(content, { size: 'xl',centered: true });
  }

  cerrarModalPRoducto(){
    this.modalProducto.close();
    this.limpiarDetalle();
    this.inventarioProducto = [];
  }

  
  transform(value:number)
  {
    return new CurrencyPipe('en-US').transform(value)
  }

  setDetalle(){
    if(this.cantidad <= 0 || this.cantidad == undefined){
      Swal.fire({
   
        icon: 'error',
        title: 'Sarp Soft',
        text:'Ingrese una cantidad..'
      });
      
      return;
    }

    if(this.listadoDetalleFactura.filter(d => d.producto.id === this.producto.id && d.lote === this.lote )[0]){
      new MetodosShared().AlertError('PRODUCTO YA EXISTE');
      return;
    }


    let vence = moment(this.vence).format("YYYY-MM-DD");
    let descuento = 0;

    if(this.descuentoPorcentaje){
      descuento = this.valor * this.descuento / 100;
    }else{
      descuento = this.descuento;
    }

    let total = this.subtotal - (descuento * this.cantidad);
    total = total + (this.iva * this.cantidad);

    let estado:boolean = true;


    let precioMinimo = 0.75;     
    if(this.clienteSeleccionado.listaPrecios){
      precioMinimo = this.valorCompra / this.clienteSeleccionado.listaPrecios.precioMinimo;     
    }   
    if((this.valor-descuento) < precioMinimo){
      estado=false;
    }

    let detalle:DetalleFactura = {
      producto: this.producto,
      cantidad:this.cantidad,
      lote:this.lote,
      descuento:descuento,
      iva:this.iva,
      subtotal:this.subtotal,
      valor:this.valor,
      valorCompra:this.valorCompra,
      vence:vence,
      total:total,
      estado:estado
    }


    if(detalle.estado){
      this.agregar(this.facturaSeleccionada.id,detalle);

    }else{

      new MetodosShared().AlertSecurity("VALOR NO AUTORIZADO, INGRESE CODIGO DE SEGURIDAD!").then((result) => {
   
          if (result.value == "1082018728") {
            this.agregar(this.facturaSeleccionada.id,detalle);
          }else{
            new MetodosShared().AlertError("CODIGO INCORRECTO!");
          } 
      });
     
    }

    this.cerrarModalPRoducto();
   
    
  }
  limpiarDetalle(){
    this.cantidad    = null;
    this.valorCompra = null;
    this.existencia  = null;
    this.iva         = null;
    this.valor       = null;
    this.descuento   = null;
    this.vence       = null;

    this.lote        = null;
    this.producto    = null;
    this.inventario  = null;
    this.subtotal    = null;
  }


  calcular(){
    if(this.producto == undefined || this.producto == null){
      Swal.fire({
   
        icon: 'error',
        title: 'Sarp Soft',
        text:'seleccione un producto..'
      });

      return;
    }
    if(this.lote == undefined){
      Swal.fire({
   
        icon: 'error',
        title: 'Sarp Soft',
        text:'seleccione un lote..'
      });
        
      return;
    }

    if(this.producto.regulado){
      if(this.valor > this.producto.valorRegulacion ){
        this.valor = this.producto.valorRegulacion;
      }
  
      
    }


    if(this.cantidad > this.existencia){
      this.cantidad = this.existencia;
    }

    if(this.descuento == undefined || this.descuento == null){
      this.descuento = 0;
    }

    if(this.descuentoPorcentaje){
      if(this.descuento > 100){
          this.descuento = 100; 
      }
    }

    let descuento = 0;

    if(this.descuentoPorcentaje){
      descuento = this.valor * this.descuento / 100;
    }else{
      descuento = this.descuento;
    }

    this.subtotal   = this.cantidad * this.valor;
    if(this.producto.impuesto){
      this.iva = (this.valor-descuento) * this.producto.impuesto.porcentaje / 100;
      this.iva = Number(this.iva.toFixed(2));
    }else{
      this.iva = 0;
    }

  }
 
  calcularTotales(detalle:DetalleFactura[]){
    this.subtotalFactura  = 0;
    this.retencionFactura = 0;
    this.descuentoFactura = 0;
    this.ivaFactura       = 0;
    this.totalFactura     = 0;

    for(let x of detalle){
      if(x.cantidad && x.total){
        this.subtotalFactura  += x.subtotal;
        this.descuentoFactura += x.descuento * x.cantidad;
        this.ivaFactura       += x.iva * x.cantidad;
        this.totalFactura     += x.total  
        
      }
    }

    if(this.clienteSeleccionado){
     
     
        let subtotal = this.subtotalFactura - this.descuentoFactura;
        console.log(subtotal);
        
        for(let x of this.clienteSeleccionado.retencionCliente){
            if(x.fija){
          
                this.retencionFactura += subtotal * x.retencion.porcentaje / 100;
              

            }else{
              
              if(subtotal >= x.retencion.base){
                this.retencionFactura += subtotal * x.retencion.porcentaje / 100;
              }
            }

        }

        this.totalFactura -= this.retencionFactura;
       

    }
  

    if(this.formfacturacion.value.valorDomicilio > 0){
      if(this.totalFactura < 50000){
        this.domicilioFactura = this.formfacturacion.value.valorDomicilio;
      }else{
        this.formfacturacion.get('valorDomicilio').setValue(0);
        this.domicilioFactura = 0;
      }
    }else{
      if(this.domicilio){
        if(this.totalFactura < 50000){
          this.formfacturacion.get('valorDomicilio').setValue(5000);
          this.domicilioFactura = 5000;
        }else{
          this.formfacturacion.get('valorDomicilio').setValue(0);
          this.domicilioFactura = 0;
        }
        
      }
    }

    this.formfacturacion.get('subtotal').setValue(this.subtotalFactura);
    this.formfacturacion.get('valorRetenciones').setValue(this.retencionFactura);
    this.formfacturacion.get('valorIva').setValue(this.ivaFactura);
    this.formfacturacion.get('descuento').setValue(this.descuentoFactura);
    this.formfacturacion.get('valor').setValue(this.totalFactura);
  }

 

  resetformFactura(){
    $("#formFacturacion").trigger("reset");
    this.listadoDetalleFactura = []
    this.formfacturacion.get('fecha').setValue(moment(new Date()).format("YYYY-MM-DD"));
    this.calcularTotales(this.listadoDetalleFactura)
    this.clienteSeleccionado = null;
  }

  guardarFactura(){
   

    new MetodosShared().AlertQuestion(
      '¿ ESTA SEGURO DE ACTUALIZAR LA VENTA ?'
    ).then((result) => {
      if (result.isConfirmed) {


        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Guardando..',
          text:'Espere por favor..'
        });
        Swal.showLoading();

        this.invoceService.updateFactura(this.formfacturacion).subscribe((resp:any) => {

          Swal.close();

          new MetodosShared().AlertOK('VENTA ACTUALIZADA CON EXITO')
          this.resetformFactura();
          this.invoceService.cargarFacturas();
          this.route.navigateByUrl("facturacion/facturas");

          

        },(ex) => {
          console.log(ex);
          Swal.close();
          let errores ='';
          for(let x of ex.error){
       
              errores +=`
              <div class="alert alert-danger" role="alert" style="text-align: left;">
                ${x}
              </div>
              `
            
            
          }
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar.',
            html:errores,
            confirmButtonColor: '#4acf50',
        
          });
        
        });
      } 
    })
  }


  cargarFactura(){
    if(this.rutaActiva.snapshot.params.id){
      let id = this.rutaActiva.snapshot.params.id;
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Cargando factura..',
        text:'Espere por favor..'
      });
      Swal.showLoading();
      this.invoceService.obtenerFactura(id).subscribe((resp:InvoceReport) => {
        


      this.facturaSeleccionada = resp;

      if(resp.numeracion.tipoDocumento == '1'){
        this.obtenerClientesElectronicos();
        
      }else if(resp.numeracion.tipoDocumento == '2'){
        this.obtenerClientesPos();
        this.domicilio = true;
      }else{
        this.obtenerTodos()
      }

      this.formfacturacion.get('id').setValue(this.facturaSeleccionada.id);
      this.formfacturacion.get('cliente').setValue(this.facturaSeleccionada.cliente.id);
      
      
      this.formfacturacion.get('formaPago').setValue(this.facturaSeleccionada.cliente.formaPago);
      this.formfacturacion.get('observacion').setValue(this.facturaSeleccionada.observacion);
      this.formfacturacion.get('valorDomicilio').setValue(this.facturaSeleccionada.valorDomicilio);
      
      this.config.getTercero(this.facturaSeleccionada.cliente.id.toString()).subscribe(resp => {
        Swal.close();
        this.clienteSeleccionado = resp;
        this.listadoDetalleFactura = this.facturaSeleccionada.productos;
        this.calcularTotales(this.listadoDetalleFactura);
        
      })

      
      
      });
  }

  }
  
}

interface DetalleFactura{
  id?        : number; 
  producto   : Producto;
  valorCompra: number;
  valor      : number;
  cantidad   : number;
  vence      : string;
 
  lote       : string;
  iva        : number;
  descuento  : number;
  subtotal   : number;
  total      : number;
  estado?    : boolean;
}

interface precios{
  valor:number
}
