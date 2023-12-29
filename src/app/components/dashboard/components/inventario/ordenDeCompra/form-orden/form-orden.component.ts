import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { PermisosUsuario } from 'src/app/components/auth/permisosUsuario';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { ModelFormasPago } from '../../../configuracion/models/ModelFormasPago';


import { ModelNumeraciones } from '../../../configuracion/models/ModelNumeraciones';
import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';
import { TablesBasicService } from '../../../configuracion/TablesBasic/tablesBasic.service';
import { Producto } from '../../stock/models/producto';
import { StockService } from '../../stock/stock.service';
import { PurchaseOrder } from '../models/purchaseOrder';
import { OrdenDeCompraService } from '../ordenDeCompra.service';



@Component({
  selector: 'app-form-orden',
  templateUrl: './form-orden.component.html',
  styleUrls: ['./form-orden.component.css']
})
export class FormOrdenComponent implements OnInit {
  permisos:PermisosUsuario;

  filtroValor$ = new Subject<string>();
  filtroSubscription: Subscription | undefined;
  actualizacion:boolean = false;



  columnFiltroProducto:string = 'nombreymarcaunico';  
  tipoProducto:string;  

  terceroSeleccionado:ModelTerceroCompleto;

  modalProducto: NgbModalRef;

  proveedores: ModelTerceroCompleto[] = [];


  public filtroTerceroControl: FormControl = new FormControl('');
  public filtroProductoControl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();


  metodos:MetodosShared = new MetodosShared();

  formasPago: ModelFormasPago[] = [];
  productos: Producto[] = [];
  public filtroProveedores: BehaviorSubject<ModelTerceroCompleto[]>;
  public filtroProductos: BehaviorSubject<Producto[]>;

  public detalleSubject: BehaviorSubject<DetailPurchaseOrder[]> = new BehaviorSubject<DetailPurchaseOrder[]>(null);



  formOrden = this.formBuilder.group({    
    id: ['',{
      
    }],
    numeracion: ['',{
      validators:[
        Validators.required,
      ]
    }],
    proveedor: ['',{
      validators:[
        Validators.required,
      ]
    }],
    formaPago: ['',{
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
    
    fecha: [new Date(),{
      validators:[
        
      ]
    }],
   
   
   
  });

  public detalleOrden:DetailPurchaseOrder[] = [];

  // TOTALES DE LA ORDEN DE COMPRA A CREAR
  public subtotalOrden:    number = 0;
  public retencionOrden:   number = 0;
  public descuentoOrden:   number = 0;
  public ivaOrden:         number = 0;
  public totalOrden:       number = 0;




  
  // DETALLE DE LA ORDEN DE COMPRA A CREAR
  public cantidad:    number = 0;
  public valorUnidad: number = 0;
  public descuento:   number = 0;
  public iva:         number = 0;
  public total:       number = 0;
  public producto:    Producto;


  constructor(
    private rutaActiva: ActivatedRoute,
    private modalService: NgbModal,
    private stock:StockService,
    private formBuilder: FormBuilder,
    private ordenService:OrdenDeCompraService, 
    private config:ConfiguracionService,
    private tables:TablesBasicService,
    private auth:SeguridadService
    ) {
    this.permisos = this.auth.currentUser.getPermisos()
  }


  numeraciones:ModelNumeraciones[] = [];

  ngOnInit() {
    this.setupFiltroSubscription();


    this.InitFiltroTercero();
    this.InitFiltroProducto();
    this.obtenerNumeraciones();
    this.obtenerProveedores();
    this.obtenerFormaDepago();
 

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
          this.actualizacion = true;
          Swal.close();
          this.numeraciones = [];
          this.detalleOrden = [];

          this.formOrden.get('id').setValue(resp.id);
          this.formOrden.get('numeracion').setValue(resp.numeracion.id);
          this.formOrden.get('proveedor').setValue(resp.proveedor.id);
          this.formOrden.get('formaPago').setValue(resp.formaPago.id);
          this.formOrden.get('observacion').setValue(resp.observacion);
          this.formOrden.get('subtotal').setValue(resp.subtotal);
          this.formOrden.get('retencion').setValue(resp.retencion);
          this.formOrden.get('iva').setValue(resp.iva);
          this.formOrden.get('descuento').setValue(resp.descuento);
          this.formOrden.get('total').setValue(resp.total);
          this.formOrden.get('usuario').setValue(resp.usuario);
          this.formOrden.get('fecha').setValue(resp.fecha);
          
          resp.numeracion.numero = resp.numero;
          this.numeraciones.push(resp.numeracion)

          

          this.filtroProveedores.subscribe((proveedor:ModelTerceroCompleto[]) => {
                this.terceroSeleccionado = proveedor.filter(p => p.id === resp.proveedor.id)[0];


                for(let x of resp.productos){

                  let subtotal  = x.valorUnidad * x.cantidad;
                  let descuento = x.descuento * x.cantidad;
                  let iva       = x.iva * x.cantidad;
                
                  subtotal -= descuento; 
      
                  let producto:Producto = {
                    id:x.producto.id,
                    nombreymarcaunico: x.producto.nombre,
                    codigoDeBarra: x.producto.codigo,
                    unidad: x.producto.unidad
                  }
                  
                  let detalle:DetailPurchaseOrder = {
                    cantidad:x.cantidad,
                    descuento:x.descuento,
                    iva:x.iva,
                    subtotal:subtotal,
                    producto:producto,
                    valorUnidad:x.valorUnidad,
                    total:subtotal + iva
                  }
                  // console.log(this.detalleOrden);
                  this.detalleOrden.push(detalle);
                  this.detalleSubject.next(this.detalleOrden);
      
                }
                
                
                this.calcularTotales(this.detalleOrden);
          });
         
         
       

        });
    }


    
    
    
  }

  private setupFiltroSubscription(): void {
    if (this.filtroSubscription) {
      this.filtroSubscription.unsubscribe();
    }

    this.filtroSubscription = this.filtroValor$
      .pipe(debounceTime(300))
      .subscribe((valor: string) => {
        this.filtrarProductos(valor);
      });
  }
  obtenerNumeraciones(){
    this.ordenService.cargarNumeracion().subscribe((resp:ModelNumeraciones[]) => {
        this.numeraciones = resp;
    });
  }
  obtenerFormaDepago(){
    this.tables.SubjectdataFP.subscribe(resp => {
      this.formasPago = resp;
    });
  }

  obtenerProveedores(){
    this.config.SubjectdataProveedorCompras.subscribe(resp => {
      this.proveedores = resp;
      this.filtroProveedores = new BehaviorSubject<ModelTerceroCompleto[]>(this.proveedores);
    });
  }

  refreshProveedor(){
    this.config.obtenerProveedorCompras();
  }

  obtenerProductos(event){
    console.log(event)
    if(event == 'consumo'){
        if(this.permisos){
          if(this.permisos.inventario.consumo || this.permisos.superusuario){
              console.log(this.tipoProducto)
              this.stock.SubjectdataProductosConsumo.subscribe(resp => {
     
        
                this.productos = resp;
                this.filtroProductos = new BehaviorSubject<Producto[]>(this.productos);
              });
              return true;
          
          }else{
              this.metodos.AlertDenegado('NO TIENE LOS PERMISOS ADECUADOS');
              // this.tipoProducto = 'institucional';
          
          }

      }else{

          this.metodos.AlertDenegado('NO TIENE LOS PERMISOS ADECUADOS');
          // return false;
      }
    }else{
      console.log(this.tipoProducto)

      this.stock.SubjectdataProductos.subscribe(resp => {
     
        
        this.productos = resp;
        this.filtroProductos = new BehaviorSubject<Producto[]>(this.productos);
      });
    }
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


  filtraTerceros(busqueda:string){
      let filtro:ModelTerceroCompleto[] = this.metodos.filtrarArray<ModelTerceroCompleto>(this.proveedores,'nombreComercial',busqueda);
      this.filtroProveedores.next(filtro);
  }

  filtrarProductos(busqueda:string){
      let filtro:Producto[] = this.metodos.filtrarArray<Producto>(this.productos,this.columnFiltroProducto,busqueda);
      this.filtroProductos.next(filtro);
  }



  formaPagoDefault(event){
      this.terceroSeleccionado = event;
      this.formOrden.get('formaPago').setValue(event.formaPago.id)
  }

  openModalProductos(content) {
		this.modalProducto = this.modalService.open(content, { size: 'xl',centered: true });
  }

  cerrarModalPRoducto(){
    this.modalProducto.close();
    this.limpiarDetalle();
  }



  // METODOS DETALLE ORDEN

  keyPress(){
      if(this.cantidad <= 0 || this.cantidad == undefined){
        Swal.fire({
     
          icon: 'error',
          title: 'Sarp Soft',
          text:'Ingrese una cantidad..'
        });
        this.valorUnidad = 0;
        return;
      }
      let subtotal = this.valorUnidad * this.cantidad ;

      
      let descuento = this.descuento * this.cantidad;


      

      subtotal -= descuento; 

      if(this.producto.impuesto){
        
          this.iva = (this.valorUnidad - this.descuento)  * this.producto.impuesto.porcentaje / 100;

      }
      let iva = this.iva * this.cantidad;


      this.total = subtotal + iva;
  }
  
  agregarProducto(){
    if(!this.terceroSeleccionado){
      Swal.fire({
   
        icon: 'error',
        title: 'Sarp Soft',
        text:'Seleccione un proveedor..'
      });
      return;
    }
    if(!this.producto){
      Swal.fire({
   
        icon: 'error',
        title: 'Sarp Soft',
        text:'Seleccione un producto..'
      });
      return;
    }
    if(this.cantidad <= 0 || this.cantidad == undefined){
      Swal.fire({
   
        icon: 'error',
        title: 'Sarp Soft',
        text:'Ingrese una cantidad..'
      });
      return;
    }
    if(this.valorUnidad <= 0 || this.valorUnidad == undefined){
      Swal.fire({
   
        icon: 'error',
        title: 'Sarp Soft',
        text:'Ingrese una valor..'
      });
      return;
    }


    if(this.detalleOrden.filter(d => d.producto.id === this.producto.id)[0]){
      Swal.fire({
   
        icon: 'warning',
        title: 'Sarp Soft',
        text:'Este producto ya existe, ¿Desea sumar la cantidad. ?',
        showDenyButton: true,
        denyButtonText: `cancelar`,
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          

          let detalle = this.detalleOrden.filter(d => d.producto.id === this.producto.id)[0];

          this.detalleOrden = this.detalleOrden.filter(d => d.producto.id != this.producto.id);

          detalle.cantidad += this.cantidad;


          let subtotal = detalle.valorUnidad * detalle.cantidad ;

      
          let descuento = detalle.descuento * detalle.cantidad;


          

          subtotal -= descuento; 

          if(detalle.producto.impuesto){
            
              this.iva = (detalle.valorUnidad - detalle.descuento)  * detalle.producto.impuesto.porcentaje / 100;

          }

          let iva = this.iva * detalle.cantidad;


          detalle.total = subtotal + iva;

          this.total = detalle.total;

          this.detalleOrden.push(detalle);
          this.detalleSubject.next(this.detalleOrden);

          this.calcularTotales(this.detalleOrden);

        } else if (result.isDenied) {
          return;
        }
      })
      
    }else{

      let detalle:DetailPurchaseOrder = {
        cantidad:this.cantidad,
        descuento:this.descuento,
        iva:this.iva,
        subtotal:this.valorUnidad * this.cantidad, 
        producto:this.producto,
        valorUnidad:this.valorUnidad,
        total:this.total
      }
  
      this.detalleOrden.push(detalle);
      this.detalleSubject.next(this.detalleOrden);

      this.calcularTotales(this.detalleOrden);
  
      this.limpiarDetalle();
      this.cerrarModalPRoducto();

    }


    
  }

  eliminarProducto(id:number){
  
    this.detalleOrden.splice(id, 1);
    this.detalleSubject.next(this.detalleOrden);

    this.calcularTotales(this.detalleOrden);
  }



  calcularTotales(detalle:DetailPurchaseOrder[]){
    this.subtotalOrden   = 0;
    this.retencionOrden = 0;
    this.descuentoOrden = 0;
    this.ivaOrden       = 0;
    this.totalOrden     = 0;

    for(let x of detalle){
      this.subtotalOrden  +=  x.valorUnidad * x.cantidad;
      this.descuentoOrden += x.descuento * x.cantidad;
      this.ivaOrden += x.iva * x.cantidad;
      this.totalOrden += x.total  
    }

    if(this.terceroSeleccionado){
      if(this.terceroSeleccionado.isRetencion){
      
            let subtotal = this.subtotalOrden - this.descuentoOrden;
            // console.log(subtotal);
            
            for(let x of this.terceroSeleccionado.retencionProveedor){
                if(x.fija){
              
                    this.retencionOrden += subtotal * x.retencion.porcentaje / 100;
                  

                }else{
                  
                  if(subtotal >= x.retencion.base){
                    this.retencionOrden += subtotal * x.retencion.porcentaje / 100;
                  }
                }

            }

            this.totalOrden -= this.retencionOrden;
        }

    }
  
    this.formOrden.get('subtotal').setValue(this.subtotalOrden);
    this.formOrden.get('retencion').setValue(this.retencionOrden);
    this.formOrden.get('iva').setValue(this.ivaOrden);
    this.formOrden.get('descuento').setValue(this.descuentoOrden);
    this.formOrden.get('total').setValue(this.totalOrden);
  }

  resetformOrden(){
    const valoresIniciales = {
      subtotal: 0,
      retencion: 0,
      iva: 0,
      descuento: 0,
      total: 0,
      usuario: '',
      fecha: new Date()
    };


    //  $("#formOrden").trigger("reset");
     // Restablecer los valores del formulario a los valores por defecto
    this.formOrden.reset();

    // Marcar el formulario como "pristine" (no modificado) y "untouched" (no tocado)
    this.formOrden.markAsPristine();
    this.formOrden.markAsUntouched();

    this.formOrden.patchValue(valoresIniciales);
  }
  

  limpiarDetalle(){
    this.cantidad    = 0;
    this.valorUnidad = 0;
    this.descuento   = 0;
    this.iva         = 0;
    this.total       = 0;
    this.producto    = null;
  }



  cancelarGuardado(){
    Swal.fire({
      icon: 'warning',
      title: 'Sarp Soft',
      text: 'esta seguro de cancelar la Orden?',
      showCancelButton: true,
      confirmButtonText: 'SI',
      
    }).then((result) => {
 
      if (result.isConfirmed) {
          this.limpiarOrden();
      } 
    })
  }

  limpiarOrden(){

    this.resetformOrden();
    this.subtotalOrden  = 0;
    this.descuentoOrden = 0;
    this.ivaOrden       = 0;
    this.retencionOrden = 0;
    this.totalOrden     = 0;

    this.terceroSeleccionado = null;
    this.detalleOrden = [];
    this.detalleSubject.next(this.detalleOrden);
    this.calcularTotales(this.detalleOrden);
  
  }
  hoveredData: any; // Variable para rastrear la opción sobre la que el usuario ha pasado el mouse

  setHoveredData(data: any) {
    // console.log("hola")
      this.hoveredData = data;
  }
  guardarOrden(){
    

    if(this.detalleOrden.length <= 0){
      Swal.fire({
        icon: 'error',
        title: 'Sarp Soft',
        text:'Ingrese un producto..'
      });
    }

    Swal.fire({
      icon: 'info',
      title: 'Sarp Soft',
      text: 'esta seguro de guardar la Orden?',
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


        this.ordenService.saveOrdenes(this.formOrden,this.detalleOrden, this.actualizacion).subscribe((resp:PurchaseOrder) => {
          
          Swal.close();
          let textResult = "";
          if(this.actualizacion){
             textResult ='Orden actualizada con exito';
          }else{
             textResult ='Orden registrada con exito';
          }

          Swal.fire({
            icon: 'success',
            title: 'Sarp Soft',
            text: textResult
          });
          this.obtenerNumeraciones();
          this.limpiarOrden();

          this.ordenService.imprimir(resp); 
          this.ordenService.cargarOdenes();


          

        },(ex) => {
          // console.log(ex);
          
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

}



export interface DetailPurchaseOrder {
  cantidad:    number;
  valorUnidad: number;
  descuento:   number;
  iva:         number;
  total:       number;
  subtotal:    number;
  producto:    Producto;
}






