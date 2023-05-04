import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import { ModelNumeraciones } from '../../configuracion/models/ModelNumeraciones';
import { ModelTerceroCompleto } from '../../configuracion/models/ModelTerceroCompleto';
import { TablesBasicService } from '../../configuracion/TablesBasic/tablesBasic.service';
import { PurchaseOrder } from '../ordenDeCompra/models/purchaseOrder';
import { OrdenDeCompraService } from '../ordenDeCompra/ordenDeCompra.service';
import { Producto } from '../stock/models/producto';
import { StockService } from '../stock/stock.service';
import { IngresoService } from './Ingreso.service';
import marcas from './marcas.json';
import * as moment from 'moment';
import { InventoryEntry } from './models/inventoryEntry';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-ingresoCompras',
  templateUrl: './ingresoCompras.component.html',
  styleUrls: ['./ingresoCompras.component.css']
})
export class IngresoComprasComponent implements OnInit {

  modalProducto: NgbModalRef;

  // VARIABLES DEL FORMULARIO

  ordenSeleccionada:PurchaseOrder;
  terceroSeleccionado:ModelTerceroCompleto;
  numeraciones:Observable<ModelNumeraciones[]>;
  public filtroProveedores: BehaviorSubject<ModelTerceroCompleto[]>;
  detalleIngreso:DetalleIngreso[] = [];


  // VARIABLES DEL DETALLE INGRESO
  filaAEditar:number;
  cantidad:number = 1;
  fechaVencimiento:string = "";

  lote:string = "";

  laboratorios:laboratorio[] = marcas;



  // TOTALES DEL INGRESO A CREAR
  public subtotalIngreso : number = 0;
  public retencionIngreso: number = 0;
  public descuentoIngreso: number = 0;
  public ivaIngreso      : number = 0;
  public totalIngreso    : number = 0;
  


  formIngreso = this.formBuilder.group({    
    id: ['',{
      
    }],
    numeracion: ['',{
      validators:[
        Validators.required,
      ]
    }],
    orden: ['',{
      validators:[
        Validators.required,
      ]
    }],
    factura: ['',{
      validators:[
        Validators.required,
      ]
    }],
    proveedor: ['',{
      validators:[
        Validators.required,
      ]
    }],
    observacion: ['',{
      validators:[

      ]
    }],
    subtotal: [0,{
      validators:[

      ]
    }],
    retencion: [0,{
      validators:[

      ]
    }],
    iva: [0,{
      validators:[

      ]
    }],
    descuento: [0,{
      validators:[

      ]
    }],
    total: [0,{
      validators:[

      ]
    }],
    usuario: ['',{
      validators:[

      ]
    }],
    
    fecha: ['',{
      validators:[
        Validators.required,
        
      ]
    }],
   
   
   
  });  



  constructor(private rutaActiva    : ActivatedRoute,
              private modalService  : NgbModal,
              
              private route         : Router,
              private formBuilder   : FormBuilder,
              private ordenService  : OrdenDeCompraService,
              private ingresoService: IngresoService,
              private config        : ConfiguracionService,
              private tables        : TablesBasicService,

  ) { }

  ngOnInit() {
    this.cargarNumeracion();
    this.obtenerProveedores();
    this.cargarOrden();

 
  }



  cargarOrden(){
    if(this.rutaActiva.snapshot.params.id){
      let id = this.rutaActiva.snapshot.params.id;
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Cargando orden..',
        text:'Espere por favor..'
      });
      Swal.showLoading();
      this.ordenService.buscarEimprimir(id).subscribe(resp => {

        
        this.filtroProveedores.subscribe((proveedor:ModelTerceroCompleto[]) => {7
          let respProveedor:ModelTerceroCompleto[] = [];
          respProveedor = proveedor;

          this.terceroSeleccionado = respProveedor.filter(p => p.id === resp.proveedor.id)[0];
        });
        this.ordenSeleccionada = resp;
        // this.numeraciones = [];
        // this.detalleOrden = [];
        
        this.formIngreso.get('proveedor').setValue(resp.proveedor.id);
        // this.formOrden.get('proveedor').setValue(resp.proveedor.id);
        // this.formIngreso.get('formaPago').setValue(resp.formaPago.id);
        this.formIngreso.get('orden').setValue(resp.id);
        this.formIngreso.get('fecha').setValue(new Date());
        

        for(let x of resp.productos){
          let producto:Producto = {
            id:x.producto.id,
            nombreymarcaunico: x.producto.nombre,
            codigoDeBarra: x.producto.codigo,
            unidad: x.producto.unidad
          }
          let detail:DetalleIngreso = {
            producto:producto,
            cantOrden:x.cantidad,
            valorUnidad:x.valorUnidad,
            descuento:x.descuento,
            iva:x.iva
            
          };
          this.detalleIngreso.push(detail);
        }
        
        Swal.close();
      
       
     

      });
  }

  }

  cargarNumeracion(){
    this.numeraciones = this.ingresoService.cargarNumeracion();
  }

  obtenerProveedores(){
    this.config.SubjectdataProveedorCompras.subscribe(resp => {
      this.filtroProveedores = new BehaviorSubject<ModelTerceroCompleto[]>(resp);
    });
  }

  editarFila(index:number,content){
    this.filaAEditar = index;
    let detalle = this.detalleIngreso[this.filaAEditar];

    this.cantidad = detalle.cantOrden;

    if(detalle.cantidad > 0){
   
      this.cantidad         = detalle.cantidad;
      this.fechaVencimiento = detalle.fechaVencimiento;
   
      this.lote             = detalle.lote;
    }
   

    this.modalProducto = this.modalService.open(content, { size: 'lg',centered: true });
  }


  setInformacionFila(){
    let detalle = this.detalleIngreso[this.filaAEditar];


    let fechaAIngresar = new Date(this.fechaVencimiento);
    let fechaActual = new Date();

    let unAnoDespues = new Date(fechaActual.setFullYear(fechaActual.getFullYear()+1));
    
    if(this.cantidad <= 0 || this.cantidad == undefined){
   
      Swal.fire({
        icon: 'error',
        title: 'Sarp Soft',
        text: 'Ingrese una cantidad!',
      
      });
      return;
    }
    if(this.lote == "" || this.lote == undefined){
   
      Swal.fire({
        icon: 'error',
        title: 'Sarp Soft',
        text: 'Ingrese un lote!',
      
      });
      return;
    }
    
    if(this.fechaVencimiento == "" || this.fechaVencimiento == undefined){
   
      Swal.fire({
        icon: 'error',
        title: 'Sarp Soft',
        text: 'Ingrese una fecha de vencimiento!',
      
      });
      return;
    }
    
    if(detalle.cantidad > 0){
        if(detalle.cantidad < this.cantidad){
            detalle.cantOrden = detalle.cantidad - this.cantidad;
        }
    }
    if(this.cantidad > detalle.cantOrden){
   
      Swal.fire({
        icon: 'error',
        title: 'Sarp Soft',
        text: 'Excede la cantidad de la orden!',
      
      });
      return;
    }


    if(fechaAIngresar < unAnoDespues){
      return Swal.fire({
        title:'Sarp Soft',
        html: `<div class="alert alert-warning" role="alert">
                <p> La fecha de vencimiento es menor a un año.\n 
                <strong> ¿Desea Ingresar de todos modos?</p> </strong>
              </div>`,
        icon:'warning',
        showDenyButton: true,
        confirmButtonText: 'Ingresar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
     
        if (result.isConfirmed) {
          detalle.cantidad         = this.cantidad;
          detalle.cantOrden        = detalle.cantOrden  - this.cantidad;
          detalle.lote             = this.lote;
         
          detalle.fechaVencimiento = moment(this.fechaVencimiento).format("YYYY-MM-DD");
          


          detalle.subtotal = detalle.cantidad * detalle.valorUnidad;

          let descuento = detalle.descuento * detalle.cantidad;
          let iva = detalle.iva * detalle.cantidad;

          detalle.total = (detalle.subtotal - descuento) + iva;

          this.detalleIngreso[this.filaAEditar] = detalle;
          this.limpiarVariablesDetalle();
          this.cerrarModalPRoducto();

          this.calcularTotales(this.detalleIngreso);
        } else if (result.isDenied) {
          return;
        }
      });
    }else{
      detalle.cantidad         = this.cantidad;
      detalle.cantOrden        = detalle.cantOrden  - this.cantidad;
      detalle.lote             = this.lote;
    
      detalle.fechaVencimiento = moment(this.fechaVencimiento).format("YYYY-MM-DD");


      detalle.subtotal = detalle.cantidad * detalle.valorUnidad;

      let descuento = detalle.descuento * detalle.cantidad;
      let iva = detalle.iva * detalle.cantidad;

      detalle.total = (detalle.subtotal - descuento) + iva;

      
      this.detalleIngreso[this.filaAEditar] = detalle;
      this.limpiarVariablesDetalle();
      this.cerrarModalPRoducto();

      this.calcularTotales(this.detalleIngreso);

    }
  }
  
  addLote(index:number){
    let detalleActual = this.detalleIngreso[index];
    if(detalleActual.cantidad < 1 || detalleActual.cantidad == undefined){
      Swal.fire({
        icon: 'error',
        title: 'Sarp Soft',
        text: 'Introduzca la información de la fila para agregar otro lote!',
      
      });
      return;
    }
   
    console.log(detalleActual);
    
    let newDetail:DetalleIngreso = {
      producto   : detalleActual.producto,
      cantOrden  : detalleActual.cantOrden,
      valorUnidad: detalleActual.valorUnidad,
      descuento  : detalleActual.descuento,
      iva        : detalleActual.iva
      
    };

    detalleActual.cantOrden = 0;
    this.detalleIngreso[this.filaAEditar] = detalleActual;

    this.detalleIngreso.push(newDetail);

  }


 


  limpiarVariablesDetalle(){

    this.filaAEditar      = null;
    this.cantidad         = 1;
    this.fechaVencimiento = "";
  
    this.lote             = "";
  }




  cerrarModalPRoducto(){
    this.modalProducto.close();
  }





  calcularTotales(detalle:DetalleIngreso[]){
    this.subtotalIngreso  = 0;
    this.retencionIngreso = 0;
    this.descuentoIngreso = 0;
    this.ivaIngreso       = 0;
    this.totalIngreso     = 0;

    for(let x of detalle){
      if(x.cantidad && x.total){
        this.subtotalIngreso  += x.valorUnidad * x.cantidad;
        this.descuentoIngreso += x.descuento * x.cantidad;
        this.ivaIngreso       += x.iva * x.cantidad;
        this.totalIngreso     += x.total  
        
      }
    }

    if(this.terceroSeleccionado){
      if(this.terceroSeleccionado.isRetencion){
      
            console.log("Subtotal ingreso => "+this.subtotalIngreso );
            console.log("descuento ingreso => "+this.descuentoIngreso);
            let subtotal = this.subtotalIngreso - this.descuentoIngreso;
            console.log(subtotal);
            
            for(let x of this.terceroSeleccionado.retencionProveedor){
                if(x.fija){
              
                    this.retencionIngreso += subtotal * x.retencion.porcentaje / 100;
                  

                }else{
                  
                  if(subtotal >= x.retencion.base){
                    this.retencionIngreso += subtotal * x.retencion.porcentaje / 100;
                  }
                }

            }

            this.totalIngreso -= this.retencionIngreso;
        }

    }
  
    this.formIngreso.get('subtotal').setValue(this.subtotalIngreso);
    this.formIngreso.get('retencion').setValue(this.retencionIngreso);
    this.formIngreso.get('iva').setValue(this.ivaIngreso);
    this.formIngreso.get('descuento').setValue(this.descuentoIngreso);
    this.formIngreso.get('total').setValue(this.totalIngreso);
  }

  guardarIngreso(){
    if(this.ordenSeleccionada.total != this.totalIngreso){
      Swal.fire({
        icon: 'error',
        title: 'Sarp Soft',
        text:'EL TOTAL DEL INGRESO NO ES EL MISMO DE LA ORDEN SELECCIONADA..'
      });
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Sarp Soft',
      text: 'esta seguro de guardar el ingreso?',
      showCancelButton: true,
      confirmButtonText: 'SI',
      
    }).then((result) => {
      if (result.isConfirmed) {


         
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Guardando..',
          text:'Espere por favor..'
        });
        Swal.showLoading();

        this.ingresoService.saveIngreso(this.formIngreso,this.detalleIngreso).subscribe((resp:InventoryEntry) => {
          
          Swal.close();

          Swal.fire({
            icon: 'success',
            title: 'Sarp Soft',
            text: 'Ingreso registrado con exito'
          });
          this.cargarNumeracion();
          this.resetformIngreso();
          this.limpiarIngreso();
          this.limpiarVariablesDetalle();
          this.ordenService.cargarOdenes();

          this.ingresoService.imprimir(resp);
          this.route.navigateByUrl('/purchaseOrder');



          

        },(ex) => {
          console.log(ex);
          
          let errores ='';
          for(let x in ex.error){
            for(let j of ex.error[x]){
              errores +=`
              <div class="alert alert-danger" role="alert" style="text-align: justify;">
                ${j}
              </div>
              `
            }
            
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
  cancelarGuardado(){

    Swal.fire({
      icon: 'warning',
      title: 'Sarp Soft',
      text: 'esta seguro de cancelar el ingreso?',
      showCancelButton: true,
      confirmButtonText: 'SI',
      
    }).then((result) => {
 
      if (result.isConfirmed) {
          this.route.navigateByUrl('/purchaseOrder');
      } 
    })
  }


  resetformIngreso(){
    $("#formIngreso").trigger("reset");
  }
 

  limpiarIngreso(){

    this.resetformIngreso();
    this.subtotalIngreso  = 0;
    this.descuentoIngreso = 0;
    this.ivaIngreso       = 0;
    this.retencionIngreso = 0;
    this.totalIngreso     = 0;

    this.ordenSeleccionada = null;
    this.terceroSeleccionado = null;
    this.detalleIngreso = [];
    this.calcularTotales(this.detalleIngreso);
  
  }


}


interface DetalleIngreso{
  producto         : Producto;
  valorUnidad      : number;
  cantOrden        : number;
  cantidad        ?: number;
  fechaVencimiento?: string;
 
  lote            ?: string;
  iva             ?: number;
  descuento       ?: number;
  subtotal        ?: number;
  total           ?: number;
}

interface laboratorio{
  nombre:string
}


