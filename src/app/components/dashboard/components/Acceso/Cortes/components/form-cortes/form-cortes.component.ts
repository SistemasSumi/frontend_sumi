import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SeguridadService } from '../../../../../../auth/seguridad.service';
import { ProductosService } from '../../../producto/productos.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TablasBasicasService } from '../../../../tablas-basicas/tablas-basicas.service';
import { ClientesService } from '../../../clientes/clientes.service';
import { TipoServicioModel } from '../../../../../../../models/tipoServicios.model';
import { CortesService } from '../../cortes.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { CarshopModel } from '../../../../../../../models/carshop.model';
declare var $;


@Component({
  selector: 'app-form-cortes',
  templateUrl: './form-cortes.component.html',
  styleUrls: ['./form-cortes.component.css']
})
export class FormCortesComponent implements OnInit,AfterViewInit{



  public dataBarber$: Observable<any>;
  public dataCliente$: Observable<any>;
  public dataProducto$: any;
  public dataServicios$: any;
  public dataCarrito$: CarshopModel[];
  
  tipoServicio:number = 0;
  total:number = 0
  subtotal:number = 0
  descuento:number = 0

  table:any = $('').DataTable({});

  


  formCorte: FormGroup;
  formCorteDetalle: FormGroup;


  constructor(public tablasBasicas:TablasBasicasService,private auth:SeguridadService,private formBuilder: FormBuilder,private productoService:ProductosService,private  toastr: ToastrService,private clientesService:ClientesService,private productosService:ProductosService,private cortes:CortesService) {
   
    
    this.inicializarFormCorte();
    this.llenarCarrito();
   
    this.getDataBarber();
    this.getDataCliente();
    this.getDataProducto();
    this.getDataServicios();
   // console.log(tablasBasicas.barberosData);

   }
  ngAfterViewInit(): void {
    
    

  }
  
 

  resetFormDetalle(){
  this.formCorte.get('cantidad').setValue('');
  this.formCorte.get('idServicio').setValue('');
  this.formCorte.get('idProducto').setValue('');
     $("#cantidad").val('');
 }


  onChange(deviceValue) {
    this.tipoServicio = deviceValue;
    
    console.log(deviceValue);
    // I want to do something here with the new selectedDevice, but what I
    // get here is always the last selection, not the one I just selected.
  }
 

  getDataBarber(): void {
    this.dataBarber$ = this.tablasBasicas.getBarberos();
  }

  getDataCliente(): void {
    this.dataCliente$ = this.clientesService.getClientes();
  }

  getDataProducto(): void {
     this.cortes.getproductos().subscribe((data:any) => {
       console.log(data);
       
      this.dataProducto$ = data.data;
    });
  }

  getDataServicios(): void {
    this.tablasBasicas.getServicios().subscribe(data => {
      console.log(data);
      
      this.dataServicios$ = data;
    });
  }


  resetFormCorte(){
    $("#formCortes").trigger("reset");
  }

  inicializarFormCorte(){
    this.formCorte = this.formBuilder.group({
      
      documento: ['',{
        validators:[
          Validators.required,
        ]
      }],
      idcliente: ['',{
        validators:[
          Validators.required,
        ]
      }],  
      formaPago: ['',{
        validators:[
          Validators.required,
        ]
      }],  
      usuario: ['',{
        validators:[
          // Validators.required,
        ]
      }],    
      idProducto: ['',{
        validators:[
        
        ]
      }], 
      cantidad: ['',{
        validators:[
          // Validators.required,
        ]
      }], 
      descuento: [0,{
        validators:[
          // Validators.required,
        ]
      }],
      costo: ['',{
        validators:[
          // Validators.required,
        ]
      }],
      existencia: ['',{
        validators:[
          // Validators.required,
        ]
      }],
      precio: ['',{
        validators:[
          // Validators.required,
        ]
      }],
      codigo: ['',{
        validators:[
          // Validators.required,
        ]
      }],
     

    });
  }



  onChangeCodigo(deviceValue){
    console.log(deviceValue);
    deviceValue = deviceValue.toString().toUpperCase();
    let producto = this.dataProducto$.filter(p => p.codigodebarra === deviceValue);
 
    
      if(producto.length > 0){
        console.log(producto);
        
        // this.formCorte.get('codigo').setValue(producto[0].codigodebarra);
        this.formCorte.get('idProducto').setValue(producto[0].id);
        this.formCorte.get('costo').setValue(producto[0].valorcompra);
        this.formCorte.get('existencia').setValue(producto[0].unidades);
        this.formCorte.get('precio').setValue(producto[0].valorventa);
          // this.formCorte.get('idcliente').setValue(cliente[0]);
      }
  }

  onChangeProducto(deviceValue){
    console.log(deviceValue);
    
      let producto = this.dataProducto$.filter(p => p.id === deviceValue);
      if(producto.length > 0){
        console.log(producto);
        
        this.formCorte.get('codigo').setValue(producto[0].codigodebarra);
        this.formCorte.get('costo').setValue(producto[0].valorcompra);
        this.formCorte.get('existencia').setValue(producto[0].unidades);
        this.formCorte.get('precio').setValue(producto[0].valorventa);
          // this.formCorte.get('idcliente').setValue(cliente[0]);
      }
      // console.log(cliente);


    // this.dataCliente$.subscribe(resp => {
      
      
      
    // });
     
  }
 


  guardarCortes(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Guardando..',
      text:'Espere por favor..'
    });
    Swal.showLoading();
    this.cortes.createNewCorte(this.formCorte).subscribe(resp => {
        this.llenarCarrito();
        Swal.close();
        this.resetFormDetalle();
        this.toastr.success("Corte Agregado.","Sistema");
        this.resetFormCorte();
       
    },(ex) => {
      Swal.close();
      console.log(ex.error);
      
      if(ex.error.documento){
        console.log(ex.error.documento);
        if (ex.error.documento[0] === "Ya existe Cliente con este documento:.") {
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: "Ya existe Cliente con ese documento.",
            
          })
        }else{
            Swal.fire({
              title: 'Error en los datos',
              icon: 'error',
              text: ex.error,
            
            })
          
        }
        
     
          
      }
    });
  }


  capturarDetalle(){
    console.log(this.formCorte.value);
    
    if(this.formCorte.get('idProducto').value == '' && this.formCorte.get('idServicio').value == ''){
      Swal.fire({
        title: 'Error en los datos',
        icon: 'error',
        text: "Debe seleccionar un servicio o producto.",
        
      })
    }

    if(this.formCorte.get('cantidad').value == ''){
      Swal.fire({
        title: 'Error en los datos',
        icon: 'error',
        text: "Debe introducir una cantidad.",
        
      })

      return;
    }

  
    this.cortes.createNewProducto(this.formCorte).subscribe(resp => {
      this.llenarCarrito();
      this.resetFormDetalle();
      this.toastr.success("Producto Agregado.","Sistema");
      // this.resetFormCliente();
    },(ex) => {


      Swal.fire({
        icon: 'error',
        title: 'Error en los datos.',
        html: `
        <div class="alert alert-danger" role="alert" style="text-align: justify;">
           ${ex.error.cantidad}
        </div>
        `,
        confirmButtonColor: '#4acf50',
        footer: '<a href="" style="color:#4acf50;">Contácte a soporte?</a>'
      });
      
      console.log(ex.error);
     
    });
   
  }



  inicializarFormDetalleCorte(){
    this.formCorteDetalle = this.formBuilder.group({
      
      

    });
   
  }


  ngOnInit() {
   
  }

  
  eliminarProducto(id:number){
    this.cortes.deleteProducto(id).subscribe(resp =>{
      this.llenarCarrito();
      this.toastr.success("Producto Eliminado.","Sistema");
    });
    
  }


  llenarCarrito(){

    this.cortes.getCarshop().subscribe(resp =>{
       this.total     = 0;
       this.subtotal  = 0;
       this.descuento = 0;

       console.log(resp);
       
      this.dataCarrito$ = resp;
      for (let x in resp) {
        console.log(resp[x].getSubtotal());
        this.total += Number(resp[x].getSubtotal());
        this.subtotal = this.subtotal + Number(resp[x].getPrecio()*resp[x].getCantidad());
        this.descuento +=  Number(resp[x].getDescuento()*resp[x].getCantidad());
      }

    });
  }

}
