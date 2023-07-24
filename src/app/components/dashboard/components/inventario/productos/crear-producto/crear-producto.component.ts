import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { TablesBasicService } from '../../../configuracion/TablesBasic/tablesBasic.service';
import { OrdenDeCompraService } from '../../ordenDeCompra/ordenDeCompra.service';
import { Producto } from '../../stock/models/producto';
import { StockService } from '../../stock/stock.service';
import marcas from './marcas.json';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit,OnDestroy  {

  bodegas:any[] = [];
  tipos:any[] = [];
  impuestos:any[] = [];

  laboratorios:laboratorio[] = marcas;


  actualizar:boolean = false;

  formProducto = this.formBuilder.group({    
  
    id: ['',{
      validators:[
       
      ]
    }],
    nombre: ['',{
      validators:[
        Validators.required,
      ]
    }],
    Filtro: ['',{
      validators:[
        Validators.required,
      ]
    }],
    invima: ['',{
      validators:[
        Validators.required,
      ]
    }],
    cum: ['',{
      validators:[

      ]
    }],
    valorCompra: [0,{
      validators:[

      ]
    }],
    valorVenta: [0,{
      validators:[

      ]
    }],
    valorVenta1: [0,{
      validators:[

      ]
    }],
    valorVenta2: [0,{
      validators:[

      ]
    }],
    fv: [true,{
      validators:[

      ]
    }],
    regulado: [false,{
      validators:[

      ]
    }],
    valorRegulacion: [0,{
      validators:[

      ]
    }],
    stock_inicial: [0,{
      validators:[

      ]
    }],
    stock_min: [0,{
      validators:[

      ]
    }],
    stock_max: [0,{
      validators:[

      ]
    }],
    tipoProducto: ['',{
      validators:[
        Validators.required,
      ]
    }],
    bodega: ['',{
      validators:[
        Validators.required,
      ]
    }],
    impuesto: ['',{
      validators:[

      ]
    }],
    unidad: ['',{
      validators:[

      ]
    }],
    habilitado: [true,{
      validators:[

      ]
    }],
    usuario: ['',{
      validators:[
        
      ]
    }],
    laboratorio: ['',{
      validators:[
        Validators.required,
      ]
    }],
    
    creado: [new Date(),{
      validators:[
        
      ]
    }],
    modificado: [new Date(),{
      validators:[
        
      ]
    }],
   
   
   
  });
  
  private subscription: Subscription;



  constructor(
    private rutaActiva: ActivatedRoute,
    private modalService: NgbModal,
    private stock:StockService,
    private formBuilder: FormBuilder,
    private auth: SeguridadService,
    private ordenService:OrdenDeCompraService, 
    private config:ConfiguracionService,
    private tables:TablesBasicService
  ) { }

  ngOnInit() {
    this.cargarBodegas();
    this.cargarTipos();
    this.cargarImpuestos()


    this.subscription = this.rutaActiva.paramMap.subscribe(params => {
      const id = params.get('id');

      if(id){
        this.obetnerProductoAEditar(parseInt(id));
      }
      



    });

  }


  obetnerProductoAEditar(id:number){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Cargando..',
      text:'Espere por favor..'
    });
    Swal.showLoading();

    this.stock.getProducto(id).subscribe((resp:Producto) => {


      this.formProducto.get('id').setValue(resp.id);
      this.formProducto.get('nombre').setValue(resp.nombre);
      this.formProducto.get('Filtro').setValue(resp.Filtro);
      this.formProducto.get('invima').setValue(resp.invima);
      this.formProducto.get('cum').setValue(resp.cum);
      this.formProducto.get('valorCompra').setValue(resp.valorCompra);
      this.formProducto.get('valorVenta').setValue(resp.valorVenta);
      this.formProducto.get('valorVenta1').setValue(resp.valorventa1);
      this.formProducto.get('valorVenta2').setValue(resp.valorventa2);
      this.formProducto.get('fv').setValue(resp.fv);
      this.formProducto.get('regulado').setValue(resp.regulado);
      this.formProducto.get('valorRegulacion').setValue(resp.valorRegulacion); 
      this.formProducto.get('stock_inicial').setValue(resp.stock_inicial); 
      this.formProducto.get('stock_min').setValue(resp.stock_min); 
      this.formProducto.get('stock_max').setValue(resp.stock_max); 
      this.formProducto.get('tipoProducto').setValue(resp.tipoProducto.id); 
      this.formProducto.get('bodega').setValue(resp.bodega.id); 
      this.formProducto.get('impuesto').setValue(resp.impuesto?.id); 
      this.formProducto.get('unidad').setValue(resp.unidad); 
      this.formProducto.get('laboratorio').setValue(resp.laboratorio); 
      this.formProducto.get('habilitado').setValue(resp.habilitado); 
      this.formProducto.get('usuario').setValue(this.auth.currentUser.getIdUser()); 
      this.formProducto.get('creado').setValue(resp.creado); 
      this.actualizar = true;

      Swal.close();
    });

  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  cargarBodegas(){
    this.stock.bodegasSolas().subscribe(resp => {
      this.bodegas= resp;
    });
  }
  cargarTipos(){
    this.stock.tipoDeProducto().subscribe(resp => {
      this.tipos= resp;
    });
    
  }

  cargarImpuestos(){
    this.config.getImpuestos().subscribe(resp => {
      this.impuestos = resp;
    });
  }

  guardarProducto(){

    if(this.actualizar){
      Swal.fire({
        icon: 'info',
        title: 'Sarp Soft',
        text: 'esta seguro de actualizar el producto?',
        showCancelButton: true,
        confirmButtonText: 'SI',
        
      }).then((result) => {
        if (result.isConfirmed) {
  
           
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Actualizando..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
  
  
          this.stock.updateProducto(this.formProducto).subscribe(resp => {
  
  
            
            Swal.close();
          
  
            Swal.fire({
              icon: 'success',
              title: 'Sarp Soft',
              text: 'Producto actualizado con exito'
            });
      
            this.resetformProducto();
            this.stock.actualizarProductos();
  
  
            
  
          },(ex) => {
            console.log(ex);
            
            let errores ='';
            for(let x in ex.error){
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
      })
    }else{

      Swal.fire({
        icon: 'info',
        title: 'Sarp Soft',
        text: 'esta seguro de guardar el producto?',
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
  
  
          this.stock.saveProducto(this.formProducto).subscribe(resp => {
  
  
            
            Swal.close();
          
  
            Swal.fire({
              icon: 'success',
              title: 'Sarp Soft',
              text: 'Producto guardado con exito'
            });
      
            this.resetformProducto();
            this.stock.actualizarProductos();
  
  
            
  
          },(ex) => {
            console.log(ex);
            
            let errores ='';
            for(let x in ex.error){
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
      })
      
    }
  }

  cancelarGuardado(){
    Swal.fire({
      icon: 'warning',
      title: 'Sarp Soft',
      text: 'esta seguro de cancelar ?',
      showCancelButton: true,
      confirmButtonText: 'SI',
      
    }).then((result) => {
 
      if (result.isConfirmed) {
          this.resetformProducto();
      } 
    })
  }

  resetformProducto(){
    const valoresIniciales = {
      
      valorCompra: 0,
      valorVenta: 0,
      valorVenta1: 0,
      valorVenta2: 0,
      fv: true,
      habilitado:true,
      regulado: false,
      valorRegulacion: 0,
      stock_inicial: 0,
      stock_min: 0,
      stock_max: 0,
    };


    //  $("#formOrden").trigger("reset");
     // Restablecer los valores del formulario a los valores por defecto
    this.formProducto.reset();

    // Marcar el formulario como "pristine" (no modificado) y "untouched" (no tocado)
    this.formProducto.markAsPristine();
    this.formProducto.markAsUntouched();

    this.formProducto.patchValue(valoresIniciales);
  }
 



    
    
}
interface laboratorio{
  nombre:string
}