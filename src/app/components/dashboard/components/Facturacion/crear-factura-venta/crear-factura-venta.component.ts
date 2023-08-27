import { CurrencyPipe } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
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
import { DbService } from 'src/app/components/auth/db.service';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { Notificaciones } from 'src/app/components/auth/permisosUsuario';


@Component({
  selector: 'app-crear-factura-venta',
  templateUrl: './crear-factura-venta.component.html',
  styleUrls: ['./crear-factura-venta.component.css']
})
export class CrearFacturaVentaComponent implements OnInit {

  @ViewChild('content') modalContent: any

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
  public ivaFactura      : number = 0;
  public domicilioFactura: number = 0;
  public totalFactura    : number = 0;

  public filtroTerceroControl: FormControl = new FormControl('');
  public filtroProductoControl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();


  metodos:MetodosShared = new MetodosShared();

  domicilio:boolean;

  clienteSeleccionado:ModelTerceroCompleto;

  formfacturacion = this.formBuilder.group({    
    id: ['',{
      
    }],
    numeracion: ['',{
      validators:[
        Validators.required,
      ]
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
    vendedor: ['',{
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
              // private rutaActiva    : ActivatedRoute,
              private modalService  : NgbModal,
              private auth:SeguridadService,
              // private route         : Router,
              private formBuilder      : FormBuilder,
              private toastr: ToastrService,
              private invoceService:FacturacionService,
              private fire_db:DbService,
           
              private stock:StockService,
           
              private config:ConfiguracionService,
              private tables:TablesBasicService

  ) { }

  ngOnInit() {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    this.obtenerNumeraciones();
    this.obtenerFormaDepago();
    
    this.obtenerVendedores();
    this.obtenerProductos();

    this.InitFiltroTercero();
    this.InitFiltroProducto();
  }

  obtenerNumeraciones(){
    this.invoceService.cargarNumeracion().subscribe((resp:ModelNumeraciones[]) => {
        this.numeraciones = resp;
    });
  }
  obtenerFormaDepago(){
    this.tables.SubjectdataFP.subscribe(resp => {
      this.formasPago = resp;
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
  obtenerClientes(){
    this.config.SubjectdataCliente.subscribe(resp => {
      this.clientes = resp;
      this.filtroClientes = new BehaviorSubject<ModelTerceroCompleto[]>(this.clientes);
    });
  }


  obtenerVendedores(){
    this.config.SubjectdataVendedores.subscribe(resp => {
      this.vendedores = resp;
    })
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
    this.listadoDetalleFactura = [];
    this.calcularTotales(this.listadoDetalleFactura);


    console.log(data.listaPrecios);
    
    this.formfacturacion.get('formaPago').setValue(data.formaPago.id); 
    this.formfacturacion.get('vendedor').setValue(data.vendedor.id); 
  }

  seleccionarProducto(data:Producto){
    this.limpiarDetalle();
    this.producto = data;
    this.valorCompra = data.valorCompra;
    this.obtenerInventario(data.id);
  }




  obtenerExistencias(data:InventarioProducto){
      let unidades = data.unidades
      let cantidadUsada = 0;
      if(this.listadoDetalleFactura.filter(d => d.producto.id === data.idProducto.id && d.lote === data.lote)[0]){
        let detalle = this.listadoDetalleFactura.filter(
          d => d.producto.id === data.idProducto.id
          && d.lote === data.lote
        )[0]
        cantidadUsada = detalle.cantidad;
    }


    unidades  -= cantidadUsada;
    return unidades

  }


  seleccionarInventario(data:InventarioProducto){
    this.listaPrecios = [];
    this.cantidad = 1;
    if(!data.estado){
      return;
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

    this.lote        = data.lote;

    this.vence       = data.vencimiento;
    let cantidadUsada = 0;
    if(this.listadoDetalleFactura.filter(d => d.producto.id === this.producto.id && d.lote === this.lote)[0]){
        let detalle = this.listadoDetalleFactura.filter(
          d => d.producto.id === this.producto.id 
          && d.lote === this.lote
        )[0]
        cantidadUsada = detalle.cantidad;
    }

    if(!data.estado){
      return;
    }


    this.existencia  = data.unidades-cantidadUsada;

    

    if(this.producto.regulado){
      let p:precios = {
        valor:this.metodos.redondearAl50MasCercano(this.producto.valorRegulacion)
      }
      this.listaPrecios.push(p);
      this.valor =  Number(this.listaPrecios[0].valor.toFixed(2));

    }else{

      if(this.clienteSeleccionado.listaPrecios){
        let lista = this.clienteSeleccionado.listaPrecios;
        let p1:precios = {
          valor: this.metodos.redondearAl50MasCercano(this.producto.valorCompra / lista.precio1)
        }
        let p2:precios = {
          valor:this.metodos.redondearAl50MasCercano(this.producto.valorCompra / lista.precio2)
        }
        let p3:precios = {
          valor:this.metodos.redondearAl50MasCercano(this.producto.valorCompra / lista.precio3)
        }
        this.listaPrecios.push(p1);
        this.listaPrecios.push(p2);
        this.listaPrecios.push(p3);

      }else{
          let p1:precios = {
            valor:this.metodos.redondearAl50MasCercano(this.producto.valorCompra / 0.70)
          }
          let p2:precios = {
            valor:this.metodos.redondearAl50MasCercano(this.producto.valorCompra / 0.75)
          }
          let p3:precios = {
            valor:this.metodos.redondearAl50MasCercano(this.producto.valorCompra / 0.80)
          }
          this.listaPrecios.push(p1);
          this.listaPrecios.push(p2);
          this.listaPrecios.push(p3);
      }
     

      this.valor =  Number(this.listaPrecios[0].valor.toFixed(2));

    }

  }



  changeNumeracion(data:ModelNumeraciones){
    if(data.tipoDocumento == "2"){
      this.domicilio = true
      this.obtenerClientesPos();
    }else if(data.tipoDocumento == "1"){
      this.domicilio = false;
      this.obtenerClientesElectronicos();
      this.formfacturacion.get('valorDomicilio').setValue(0);
    }else{
      this.domicilio = false;
      this.obtenerClientes();
      this.domicilio = true
      this.formfacturacion.get('valorDomicilio').setValue(0);
    }
    
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
    this.calcular();
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


    this.listadoDetalleFactura.push(detalle);
    this.calcularTotales(this.listadoDetalleFactura);
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

  eliminarProducto(id:number){
  
    this.listadoDetalleFactura.splice(id, 1);
   

    this.calcularTotales(this.listadoDetalleFactura);
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
    this.domicilioFactura = 0;
    this.ivaFactura       = 0;
    this.totalFactura     = 0;

    if(detalle.length > 0){
      
      for(let x of detalle){
        if(x.cantidad && x.total){
          this.subtotalFactura  += x.subtotal;
          this.descuentoFactura += x.descuento * x.cantidad;
          this.ivaFactura       += x.iva * x.cantidad;
          this.totalFactura     += x.total  
          
        }
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


    
    this.formfacturacion.get('subtotal').setValue(this.subtotalFactura);
    this.formfacturacion.get('valorRetenciones').setValue(this.retencionFactura);
    this.formfacturacion.get('valorIva').setValue(this.ivaFactura);
    this.formfacturacion.get('descuento').setValue(this.descuentoFactura);
    this.formfacturacion.get('valor').setValue(this.totalFactura);
  }

  async mostrarOpcionesDomicilio() {
    const { value: selectedValue } = await Swal.fire({
      title: 'Selecciona el valor del domicilio',
      icon: 'warning',
      html: `
        <select class="form-control" id="swal-select">
          <option value="0">$0</option>
          <option value="4000">$4000</option>
          <option value="5000">$5000</option>
          <option value="6000">$6000</option>
          <option value="7000">$7000</option>
          <option value="8000">$8000</option>
          <option value="9000">$9000</option>
        </select>`,
      showCancelButton: false,
      allowOutsideClick: false,
      inputPlaceholder: 'Selecciona una opción',
      preConfirm: () => {
        const selectElement = document.getElementById('swal-select') as HTMLSelectElement;
        return selectElement.value;
      },
    });
  
    if (selectedValue !== undefined) {
      this.formfacturacion.get('valorDomicilio').setValue(parseFloat(selectedValue));
      this.domicilioFactura = parseFloat(selectedValue);
    } else {
      this.formfacturacion.get('valorDomicilio').setValue(0);
      this.domicilioFactura = 0;
    }
  }


  

  cancelarGuardado(){

    Swal.fire({
      icon: 'warning',
      title: 'Sarp Soft',
      text: 'esta seguro de cancelarla venta?',
      showCancelButton: true,
      confirmButtonText: 'SI',
      
    }).then((result) => {
 
      if (result.isConfirmed) {
        this.resetformFactura();
      } 
    })
  }


  resetformFactura(){
    $("#formFacturacion").trigger("reset");
    this.listadoDetalleFactura = []
    this.formfacturacion.get('fecha').setValue(moment(new Date()).format("YYYY-MM-DD"));
    this.calcularTotales(this.listadoDetalleFactura)
    this.clienteSeleccionado = null;
  }

  guardarFactura(){
    this.mostrarOpcionesDomicilio().then(() => {
      Swal.fire({
        icon: 'info',
        title: 'Sarp Soft',
        text: 'esta seguro de guardar La venta?',
        showCancelButton: true,
        confirmButtonText: 'SI',
        
      }).then((result) => {
        if (result.isConfirmed) {
  
  
          if(this.listadoDetalleFactura.length <= 0){
            Swal.fire({
              icon: 'info',
              title: 'Sarp Soft',
              text: 'ingrese un producto'
            });
            return;
          }
  
  
          // Verificar si al menos un elemento necesita permiso
          const necesitaPermiso = this.listadoDetalleFactura.some(item => item.estado === false);
  
  
          if (necesitaPermiso) {
          
            new MetodosShared().AlertQuestion('Lo sentimos, pero para acceder a los precios bajos y poder facturar, se requieren permisos adicionales. ¿Desea solicitar el permiso?').then((result) => {
              if (result.isConfirmed) {
                let id = this.fire_db.getId();
  
                let data = {
                  id:id,
                  estado: false,
                  cliente: this.clienteSeleccionado.nombreComercial,
                  factura:this.formfacturacion.value,
                  detalle:this.listadoDetalleFactura,
                  usuario:{avatar:this.auth.currentUser.getAvatar(),nombre:this.auth.currentUser.getNombreCorto(),username:this.auth.currentUser.getUsername()},
                  autorizado:''
  
                  
                }
  
               
  
                this.fire_db.createDoc(data,'autorizacionFacturas/',id).then(() =>{
                  new MetodosShared().permisoPreciosBajos(
                    this.generarMensajePermisosHTML(this.listadoDetalleFactura,id),
                    this.generarMensajePermisos(this.listadoDetalleFactura,id,this.auth.currentUser.getUsername(),this.clienteSeleccionado.nombreComercial),
                  id);
                  
  
  
                  
  
                  let notify:Notificaciones = {
                    id:'',
                    usuario:{avatar:this.auth.currentUser.getAvatar(),nombre:this.auth.currentUser.getNombreCorto(),username:this.auth.currentUser.getUsername()},
                    mensaje:`<p>Solicito permiso para facturar a precios bajos a: 
                    ${this.clienteSeleccionado.nombreComercial} \n codigo: <span class="badge badge-soft-success">${id}</span></p>`,
                    fecha:new Date().getTime(),
                    sender_user:this.auth.currentUser.getUsername(),
                    data:{'codigo':id},
                    receiver_users:[],
                    tipo:'PRECIOS_BAJOS',
                    grupo:'CONTABILIDAD',
                    vistas:[]
                  }
                  
                  this.fire_db.crearNotificacion(notify);
  
  
                  let msj = `Solicito permiso para facturar a precios bajos a: ${this.clienteSeleccionado.nombreComercial}`
                  this.fire_db.crearNotificacionPush(msj,this.auth.currentUser,"CONTABILIDAD");
  
                  this.obtenerNumeraciones();
                  this.resetformFactura();
                  this.resetTable();
  
                });
              }
            });
  
  
          } else {
            
            
            Swal.fire({
              allowOutsideClick: false,
              icon: 'info',
              title: 'Guardando..',
              text:'Espere por favor..'
            });
            Swal.showLoading();
      
            this.invoceService.saveFactura(this.formfacturacion,this.listadoDetalleFactura).subscribe((resp:any) => {
              
              console.log(resp);
              Swal.close();
      
              Swal.fire({
                icon: 'success',
                title: 'Sarp Soft',
                text: `Factura ${resp} registrada con exito`
              });
              this.obtenerNumeraciones();
              this.resetformFactura();
              this.resetTable();
      
            
      
      
      
              
      
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
  
  
        } 
      })
    });

    
  }

  resetTable(){
   
    this.invoceService.cargarFacturas();
  }

  validarDescuento(){
    if(this.descuentoPorcentaje){
        if(this.descuento > 100){
            this.descuento = 100; 
        }
    }
    this.calcular();
  }

  generarMensajePermisos(detalleFacturas: DetalleFactura[], id: string,usuario:string,cliente:string): string {
    
    let currency = new CurrencyPipe('en-US');
    let mensaje = `El usuario *${usuario}* requiere permiso para poder facturar a precios bajos al cliente *${cliente}* los siguientes productos:\n\n`;
  
    detalleFacturas.forEach(detalle => {
      if (detalle.estado === false) {
        mensaje += `• COD: *${detalle.producto.codigoDeBarra}*\n`;
        mensaje += `  Producto: *${detalle.producto.nombre}*\n`;
        mensaje += `  Laboratorio: *${detalle.producto.laboratorio}*\n`;
        mensaje += `  Lote: *${detalle.lote}*\n`;
        mensaje += `  Cantidad: *${detalle.cantidad}*\n`;
        mensaje += `  Valor de Compra: *${currency.transform(detalle.valorCompra)}*\n`;
        mensaje += `  Valor de Venta: *${currency.transform(detalle.valor)}*\n\n`;
      }
    });
  
    mensaje += "Codigo para autorizar: *" + id + "*";
  
    return mensaje;
  }
  generarMensajePermisosHTML(detalleFacturas: DetalleFactura[], id: string): string {
    let mensaje = '<div class="container">';
    let currency = new CurrencyPipe('en-US');
    mensaje += '<div class="alert alert-info" role="alert">Se requiere permiso para poder facturar a precios bajos los siguientes productos:</div>';
    
    mensaje += '<table class="table table-bordered">';
    mensaje += '<thead class="thead-dark">';
    mensaje += '<tr>';
    mensaje += '<th scope="col">COD</th>';
    mensaje += '<th scope="col">Valor de Compra</th>';
    mensaje += '<th scope="col">Valor de Venta</th>';
    mensaje += '</tr>';
    mensaje += '</thead>';
    mensaje += '<tbody>';
    detalleFacturas.forEach(detalle => {
      if (detalle.estado === false) {
        mensaje += '<tr>';
        mensaje += `<td>${detalle.producto.codigoDeBarra}</td>`;
        mensaje += `<td>${currency.transform(detalle.valorCompra)}</td>`;
        mensaje += `<td>${currency.transform(detalle.valor)}</td>`;
        mensaje += '</tr>';
      }
    });
    mensaje += '</tbody>';
    mensaje += '</table>';
    
    mensaje += `<div style="text-aling: left;" class="alert alert-primary" role="alert">Código para autorizar: ${id}</div>`;
    mensaje += '</div>';
  
    return mensaje;
  }

  // facturarFacturaAprobada(){
//     this.toastr.show(`
   
//     <a href="" class="text-reset notification-item">
//     <div class="d-flex  align-items-start" style="background-color: white;" >
//         <div class="flex-shrink-0">
//             <img src="assets/images/users/avatar-3.jpg" class="me-3 rounded-circle avatar-md" alt="user-pic">
//         </div>
//         <div class="flex-grow-1">
//             <h6 class="mb-1">Justin Verduzco</h6>
//             <div class="text-muted">
//                 <p  style ="max-width: 200px" class="mb-1 font-size-13">Your task changed an issue from "In Progress" Your task changed an issue from "In Progress" to <span class="badge badge-soft-success">Review</span></p>
//                 <p class="mb-0 font-size-10 text-uppercase fw-bold"><i class="mdi mdi-clock-outline"></i> 1 hours ago</p>
//             </div>
//         </div>
//     </div>
// </a>`, '', {
      
//       enableHtml: true,
//       positionClass: 'toast-top-right',
//       toastClass: 'toast-custom',
//       titleClass: 'toast-title',
//       messageClass: 'toast-message'
//     });
    

   
  // }
  facturarFacturaAprobada(){
    Swal.fire({
      icon:'warning',
      title: 'Ingrese el codigo',
      input: 'text',
      inputPlaceholder: 'Escribe aquí...',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        const textoIngresado = result.value;
        if(textoIngresado == undefined || textoIngresado == ''){
          Swal.fire('Cancelado', 'No se ingresó ningún texto', 'error');
        }else{
          const condiciones = [
            { parametro: 'id', condicion: '==', busqueda: textoIngresado },
            { parametro: 'estado', condicion: '==', busqueda: true }
          ];
          

          let collectionSubscription: Subscription = this.fire_db.getCollectionQueryVariosParametros<any>('autorizacionFacturas',condiciones).subscribe( resp => {
            
            if(resp.length > 0){

              let obj = resp[0];

              Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                title: 'Guardando..',
                text:'Espere por favor..'
              });
              Swal.showLoading();
        
              this.invoceService.saveFacturaPermitida(obj.factura,obj.detalle).subscribe((resp:any) => {
        
                Swal.close();
               
        
                Swal.fire({
                  icon: 'success',
                  title: 'Sarp Soft',
                  text: `Factura ${resp} registrada con exito`
                });
                this.obtenerNumeraciones();
                this.resetformFactura();
                this.resetTable();
        
              
        
        
        
                
        
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
            

            }else{
              new MetodosShared().AlertError('Lo sentimos, no se encontró ningún documento con el código proporcionado o aún no ha sido aprobado.');
            }
            collectionSubscription.unsubscribe();
          });

          
        }
        
      } else {
        Swal.fire('Cancelado', 'No se ingresó ningún texto', 'error');
      }
    });
  }

  facturarProforma(){
    Swal.fire({
      icon:'info',
      title: 'FACTURAR PROFORMAS',
      html: `
      
      <div class="alert alert-info alert-dismissible fade show" role="alert">
          <i class="fas fa-info me-2"></i>
          ESCRIBA EL NÚMERO DE PROFORMA Y PRESIONE LA TECLA ENTER.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="swal-input-container">
        <input type="text" id="input" class="swal2-input mb-3" placeholder="AÑADE UN NUMERO DE PROFORMA" />
      </div>
      <div class="swal-radios-container">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="type" id="radioElectronica" value="ELECTRONICA" checked>
          <label class="form-check-label" for="radioElectronica">
            Electrónica
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="type" id="radioPOS" value="POS">
          <label class="form-check-label" for="radioPOS">
            POS
          </label>
        </div>
      </div>
      <div id="words" class="swal-words-container"></div>
    
      `,
      showCancelButton: true,
      preConfirm: () => {
        const values = Array.from(document.getElementsByClassName('swal-word')).map(el => el.textContent.trim());
        const typeElement = document.querySelector('input[name="type"]:checked') as HTMLInputElement;
        const type = typeElement.value;

        if (values.length === 0) {
          Swal.showValidationMessage('Ingrese al menos un numero de proforma');
          return false; // Evita que se cierre la alerta si no hay palabras ingresadas
        }

        console.log("valores:", values);
        console.log("Tipo seleccionado:", type);


        const data = {
          values: values,
          type: type
        };
        
        const jsonData = JSON.stringify(data);
        
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title:'Espere por favor..'
        
        });
        Swal.showLoading();
        this.invoceService.proformaAFactura(jsonData).subscribe(
          (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Sarp Soft',
              text: `Factura ${resp} registrada con exito`
            });
            Swal.close();

          },
          (ex) => {
            let error = "";
            for(let x of ex.error){
              error += x;
            }
            Swal.close();
            new MetodosShared().AlertError(error,'left');
            
          }
        )
      },
      didOpen: () => {
        const input = document.getElementById('input') as HTMLInputElement;
        const wordsContainer = document.getElementById('words');
        
        

        input.addEventListener('input', () => {
          const word = input.value.trim().toUpperCase(); // Convierte el valor a mayúsculas
          input.value = word; // Asigna el valor en mayúsculas de vuelta al input
        });
    
        input.addEventListener('keydown', event => {
          if (event.key === 'Enter') {
            event.preventDefault();
            

  
            const word = input.value.trim();
            if (word !== '') {
              
                
              Swal.resetValidationMessage();
                
               
             


              const wordElement = document.createElement('span');
              wordElement.classList.add('swal-word', 'badge', 'rounded-pill', 'badge-outline-primary', 'mr-3');
              wordElement.textContent = word;
              wordElement.style.marginRight = '5px'; // Aplica el margen derecho de 3px
              wordElement.style.marginBottom = '5px'; // Aplica el margen derecho de 3px
  
              
  
              const deleteIcon = document.createElement('span');
              deleteIcon.classList.add('swal-word-delete','mr-3');
              deleteIcon.style.marginLeft = '5px';
              deleteIcon.style.cursor = 'pointer'; // Aplica el cursor pointer a la etiqueta <i>
              deleteIcon.innerHTML = '<i class="fas fa-trash-can text-danger"></i>';
              deleteIcon.addEventListener('click', () => {
                wordsContainer.removeChild(wordElement);
              });
  
              // wordElement.appendChild(separator);
              wordElement.appendChild(deleteIcon);
              wordsContainer.appendChild(wordElement);
  
              input.value = '';
            }
          }
        });
      },
    });
  }



  




}

interface DetalleFactura{
  producto         : Producto;
  valorCompra      : number;
  valor            : number;
  cantidad         : number;
  vence            : string;
  lote             : string;
  iva              : number;
  descuento        : number;
  subtotal         : number;
  total            : number;
  estado?          : boolean;
}

interface laboratorio{
  nombre:string
}

interface precios{
  valor:number
}
