import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { ModelNumeraciones } from '../../../configuracion/models/ModelNumeraciones';
import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';
import { NotaCreditoVentasService } from '../NotaCreditoVentas.service';

@Component({
  selector: 'app-CrearNCV',
  templateUrl: './CrearNCV.component.html',
  styleUrls: ['./CrearNCV.component.css']
})
export class CrearNCVComponent implements OnInit {

  // TOTALES DE LA NOTA A CREAR
  public subtotalNota:    number = 0;
  public retencionNota:   number = 0;
  public ivaNota:         number = 0;
  public totalNota:       number = 0;


  producto:number;
  cantidadVendida:number;
  cantidadDevolucion:number;

  productoSeleccionado:Productos;
  terceroSeleccionado:ModelTerceroCompleto;
  facturaSeleccionada:Facturas;

  public filtroProductoControl: FormControl = new FormControl('');

  public filtroTerceroControl: FormControl = new FormControl('');

  public filtroClientes: BehaviorSubject<ModelTerceroCompleto[]>;
  public filtroProductos: BehaviorSubject<Productos[]>;


  metodos:MetodosShared = new MetodosShared();

  facturas : Facturas[]  = [];

  detalleNota:DetailNotaCredito[] = [];

  Productos: Productos[] = [];

  modalProducto: NgbModalRef;

  numeraciones:ModelNumeraciones[] = [];
  clientes: ModelTerceroCompleto[] = [];
  protected _onDestroy = new Subject<void>();

  formNota = this.formBuilder.group({    
    id: ['',{
      
    }],
    numeracion: ['',{
      validators:[
        Validators.required,
      ]
    }],
    tipoNota: ['',{
      validators:[
        Validators.required,
        
      ]
    }],
    cliente: ['',{
      validators:[
        Validators.required,
      ]
    }],
    factura: ['',{
      validators:[
        Validators.required,
      ]
    }],
    
    observacion: ['',{
      validators:[

      ]
    }],
    iva: [0,{
      validators:[

      ]
    }],
    retencion: [0,{
      validators:[

      ]
    }],
    
    subtotal: [0,{
      validators:[

      ]
    }],
    total: [0,{
      validators:[

      ]
    }],
    
    fecha: [new Date(),{
      validators:[
        
      ]
    }],
   
   
   
  });

  constructor(
    private rutaActiva: ActivatedRoute,
    private modalService: NgbModal,
    private notaService:NotaCreditoVentasService,
    private formBuilder: FormBuilder,
    // private ordenService:OrdenDeCompraService, 
    private config:ConfiguracionService,
    // private tables:TablesBasicService
    ) { }

  ngOnInit() {
    this.obtenerNumeraciones();
    this.obtenerclientes();
    this.InitFiltroTercero();
  }

  obtenerNumeraciones(){
    this.notaService.cargarNumeracion().subscribe((resp:ModelNumeraciones[]) => {
        this.numeraciones = resp;
    });
  }
  obtenerclientes(){
    this.config.SubjectdataCliente.subscribe(resp => {
      this.clientes = resp;
      this.filtroClientes = new BehaviorSubject<ModelTerceroCompleto[]>(this.clientes);
    });
  }


  obtenerFacturas(idTercero,cliente){
    this.terceroSeleccionado = cliente;
    this.notaService.cargarFacturas(idTercero).subscribe((resp:Facturas[]) => {
      this.facturas = resp;
      
      // this.filtroClientes = new BehaviorSubject<ModelTerceroCompleto[]>(this.clientes);
    });
  }
  seleciconarProducto(data){
    this.productoSeleccionado = data;
    this.cantidadVendida = data.cantidad;
  }


  obtenerProductos(idfactura, factura){
    this.facturaSeleccionada = factura;
    this.detalleNota = [];
    this.calcularTotales(this.detalleNota);


    this.notaService.cargarProductos(idfactura).subscribe((resp:Productos[]) => {
      // console.log(resp);
      this.Productos = resp;
      
      
    });
  }

  openModalProductos(content) {
		this.modalProducto = this.modalService.open(content, { size: 'lg',centered: true });
  }

  cerrarModalPRoducto(){
    this.modalProducto.close();
  }

  InitFiltroTercero(){
    this.filtroTerceroControl.valueChanges
      .pipe(takeUntil (this._onDestroy))
      .subscribe(() => {
        this.filtraTerceros(this.filtroTerceroControl.value);
      });
  }

  filtraTerceros(busqueda:string){
    let filtro:ModelTerceroCompleto[] = this.metodos.filtrarArray<ModelTerceroCompleto>(this.clientes,'nombreComercial',busqueda);
    this.filtroClientes.next(filtro);
  }

  


  validarCant(){
    if(this.cantidadDevolucion > this.cantidadVendida){
      this.cantidadDevolucion = this.cantidadVendida;
    }
  }

  eliminarProducto(id:number){
  
    this.detalleNota.splice(id, 1);
   

    this.calcularTotales(this.detalleNota);
  }

  agregarProducto(){
    if(this.cantidadDevolucion <= 0 || this.cantidadDevolucion == undefined){
      Swal.fire({
   
        icon: 'error',
        title: 'Sarp Soft',
        text:'Ingrese una cantidad a devolver..'
      });
      return;
    }

    

    if(this.detalleNota.filter(
          d => d.producto === this.productoSeleccionado.producto 
          && d.lote === this.productoSeleccionado.lote
       
        )[0]){
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
          

          let detalle =  this.detalleNota.filter(
            d => d.producto === this.productoSeleccionado.producto 
            && d.lote          === this.productoSeleccionado.lote
          
          )[0];

          
          let detalle_a_quitar =  this.detalleNota.findIndex(
            d => d.producto === this.productoSeleccionado.producto
            && d.lote          === this.productoSeleccionado.lote
          
          );

          if((this.cantidadDevolucion + detalle.cantidad) > this.cantidadVendida){
            new MetodosShared().AlertError('Supera la cantidad vendida, por favor, verifique nuevamente.');
            return;
          }
        
          // console.log(detalle_a_quitar);
          this.detalleNota.splice(detalle_a_quitar, 1);


          detalle.cantidad += this.cantidadDevolucion;


          detalle.subtotal = detalle.valor  * detalle.cantidad;



          // // console.log(detalle);
          

          this.detalleNota.push(detalle);

          // // console.log(this.detalleNota);



          this.calcularTotales(this.detalleNota);
          this.limpiarDetalle();
          this.cerrarModalPRoducto();

        } else if (result.isDenied) {
          return;
        }
      })
      
    }else{

      let detalle:DetailNotaCredito = {
        producto:this.productoSeleccionado.producto,
        valorCompra:this.productoSeleccionado.valorCompra,
        cantidad:this.cantidadDevolucion,
        codigoDeBarra: this.productoSeleccionado.codigoDeBarra,
        nombreymarcaunico: this.productoSeleccionado.nombreymarcaunico,
        iva:this.productoSeleccionado.iva / this.productoSeleccionado.cantidad,
        lote:this.productoSeleccionado.lote,
        valor:(this.productoSeleccionado.valor - this.productoSeleccionado.descuento ),
        subtotal: (this.productoSeleccionado.valor - this.productoSeleccionado.descuento) * this.cantidadDevolucion
      }
  
      this.detalleNota.push(detalle);
      this.calcularTotales(this.detalleNota);
      this.limpiarDetalle();
      this.cerrarModalPRoducto();
     

    }


    
  }

  calcularTotales(detalle:DetailNotaCredito[]){
    this.subtotalNota  = 0;
    this.retencionNota = 0;
    this.ivaNota       = 0;
    this.totalNota     = 0;

    for(let x of detalle){
      this.subtotalNota += x.valor * x.cantidad;
      this.ivaNota      += x.iva * x.cantidad;
    }
    this.totalNota    += this.subtotalNota + this.ivaNota;   
    
    if(this.terceroSeleccionado){
      if(this.facturaSeleccionada.valorReteFuente > 0){
      
            let retefuente = this.facturaSeleccionada.valorReteFuente;
            // console.log(retefuente);
            
            for(let x of this.terceroSeleccionado.retencionCliente){
                if(x.fija){
              
                    this.retencionNota += this.subtotalNota * x.retencion.porcentaje / 100;
                  

                }else{
                  
                  if(retefuente > 0){
                    this.retencionNota += this.subtotalNota * x.retencion.porcentaje / 100;
                  }
                }

            }

            this.totalNota -= this.retencionNota;
        }

    }


    this.formNota.get('retencion').setValue(this.retencionNota);
    this.formNota.get('iva').setValue(this.ivaNota);

    this.formNota.get('subtotal').setValue(this.subtotalNota);
    this.formNota.get('total').setValue(this.totalNota);
  }

  resetformNota(){
    $("#formNota").trigger("reset");
  }
 

  limpiarDetalle(){
    this.cantidadVendida   = null;
    this.cantidadDevolucion = null;
    this.producto           = null;
  }

  limpiarNota(){
    this.obtenerNumeraciones();
    this.resetformNota();
    this.subtotalNota  = 0;
    this.ivaNota       = 0;
    this.retencionNota = 0;
    this.totalNota     = 0;

    this.terceroSeleccionado = null;
    this.detalleNota = [];
    this.calcularTotales(this.detalleNota);
  
  }

  guardarNota(){
    

    if(this.detalleNota.length <= 0){
      Swal.fire({
        icon: 'error',
        title: 'Sarp Soft',
        text:'Ingrese un producto..'
      });
    }

    Swal.fire({
      icon: 'info',
      title: 'Sarp Soft',
      text: 'esta seguro de guardar la Nota crédito?',
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


        this.notaService.saveNota(this.formNota,this.detalleNota).subscribe((resp:any) => {
          
          Swal.close();
      
          Swal.fire({
            icon: 'success',
            title: 'Sarp Soft',
            text: "Nota crédito registrada con exito"
          });
          this.obtenerNumeraciones();
          // console.log(resp);
          this.limpiarNota();
          this.notaService.cargarNotas();

          

        },(ex) => {

          Swal.close();
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

  cancelarGuardado(){
    Swal.fire({
      icon: 'warning',
      title: 'Sarp Soft',
      text: 'esta seguro de cancelar la Nota crédito?',
      showCancelButton: true,
      confirmButtonText: 'SI',
      
    }).then((result) => {
 
      if (result.isConfirmed) {


          this.limpiarNota();
          this.limpiarDetalle();
      } 
    })
  }



}

interface Facturas {
  id:          number;
  numero:      string;
  valorReteFuente:   number;
 
}

interface Productos {
  id               : number;
  producto         : number;
  nombreymarcaunico: number;
  codigoDeBarra    : number;
  lote             : string;
  cantidad         : number;
  valorCompra      : number;
  valor            : number;
  descuento        : number;
  iva              : number;
  
}

// interface Producto {
//   id:                number;
//   tipoProducto:      any;
//   bodega:            any;
//   impuesto:          any;
//   nombre:            string;
//   Filtro:            string;
//   invima:            null;
//   cum:               null;
//   valorCompra:       number;
//   valorVenta:        number;
//   valorventa1:       number;
//   valorventa2:       number;
//   fv:                boolean;
//   regulado:          boolean;
//   valorRegulacion:   number;
//   stock_inicial:     number;
//   stock_min:         number;
//   stock_max:         number;
//   habilitado:        boolean;
//   codigoDeBarra:     string;
//   unidad:            string;
//   creado:            Date;
//   modificado:        Date;
//   nombreymarcaunico: string;
//   usuario:           number;
// }


interface DetailNotaCredito {
  producto:    number;
  nombreymarcaunico: number;
  codigoDeBarra    : number;
  cantidad:    number;
  valorCompra: number;
  valor: number;
  lote:   string;
  iva:         number;
  subtotal:       number;
}


