import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { TablesBasicService } from '../../../configuracion/TablesBasic/tablesBasic.service';
import { OrdenDeCompraService } from '../../ordenDeCompra/ordenDeCompra.service';
import { StockService } from '../../stock/stock.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  bodegas:any[] = [];
  tipos:any[] = [];
  impuestos:any[] = [];

  formProducto = this.formBuilder.group({    
  
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
    
    creado: [new Date(),{
      validators:[
        
      ]
    }],
    modificado: [new Date(),{
      validators:[
        
      ]
    }],
   
   
   
  });

  constructor(
    private rutaActiva: ActivatedRoute,
    private modalService: NgbModal,
    private stock:StockService,
    private formBuilder: FormBuilder,
    private ordenService:OrdenDeCompraService, 
    private config:ConfiguracionService,
    private tables:TablesBasicService
  ) { }

  ngOnInit() {
    this.cargarBodegas();
    this.cargarTipos();
    this.cargarImpuestos()

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
    $("#formProducto").trigger("reset");
  }
 



    
    
}
