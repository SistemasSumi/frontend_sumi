import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SeguridadService } from '../../../../../auth/seguridad.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from '../empresa.service';
// import { Interface } from 'readline';
// import { DetalleCotizacion } from '../../../../../../interfaces/interfaces';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})


export class CotizacionesComponent implements OnInit {
  formCotizacion:FormGroup;
  @ViewChild("ReportePdf", {static: false}) ReportePdf: TemplateRef<any>
  public dataProducto$: any;

  currentDate = new Date();
  cotizacionGuardada:any;
  id_producto:number;
  precio:number;
  existencia:number;
  cantidad:number;
  codigo:string;
  textBuscar:string;


  descuentoCotizacion:number = 0;
  ivaCotizacion:number = 0;
  subtotalCotizacion:number = 0;
  totalCotizacion:number = 0;

  preciosDeVenta:number[];

  productos:any[]=[];
  productoSeleccionado:any;



  myControl = new FormControl('');
  options: number[] = [];  

  constructor(config: NgbModalConfig,private modalService: NgbModal, private auth:SeguridadService,private formBuilder: FormBuilder,private  toastr: ToastrService,private empresa:EmpresaService) {

    config.backdrop = 'static';
    config.keyboard = false;
   }
  

  openReport() {
    this.modalService.open(this.ReportePdf, { windowClass: 'my-class' }).result.then((result) => {
     
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngOnInit() {
  
    this.formCotizacion = this.formBuilder.group({
      
      cliente: ['',{
        validators:[
          Validators.required,
        ]
      }],   
      observacion: ['',{
        validators:[
        
        ]
      }],

    });
    this.getDataProducto();
  }


  getDataProducto(): void {
    this.empresa.getproductos().subscribe((data:any) => {
      console.log(data);
      
     this.dataProducto$ = data.data;
   });
 }

 onChangeCodigo(deviceValue){
  console.log(deviceValue);
  deviceValue = deviceValue.toString().toUpperCase();
  let producto = this.dataProducto$.filter(p => p.codigodebarra === deviceValue);

  
    if(producto.length > 0){
      console.log(producto[0].id);
      this.id_producto = producto[0].id;
      this.productoSeleccionado = producto[0];
      
      // this.formCotizacion.get('codigo').setValue(producto[0].codigodebarra);
      this.textBuscar = producto[0].nombre;
      this.id_producto = producto[0].id;
      this.existencia = producto[0].unidades;
      this.precio = producto[0].valorventa;

      this.preciosDeVenta = [];      
      this.preciosDeVenta.push(producto[0].valorventa);
      this.preciosDeVenta.push(producto[0].valorventa1);
      this.preciosDeVenta.push(producto[0].valorventa2);
      
        // this.formCotizacion.get('idcliente').setValue(cliente[0]);
    }
}

selectProducto(e){
  console.log(e);
  console.log("-************************");
  console.log(this.id_producto);
  
  
  
}

onChangeProducto(deviceValue){
  console.log("Holaa");
  
  console.log(deviceValue);
  
    let producto = this.dataProducto$.filter(p => p.nombre === deviceValue);
    if(producto.length > 0){
      console.log(producto);
      this.productoSeleccionado = producto[0];

      this.id_producto = producto[0].id;
      this.codigo = producto[0].codigodebarra;
      this.existencia = producto[0].unidades;
      this.precio = producto[0].valorventa;
        // this.formCotizacion.get('idcliente').setValue(cliente[0]);

      this.preciosDeVenta = [];      
      this.preciosDeVenta.push(producto[0].valorventa);
      this.preciosDeVenta.push(producto[0].valorventa2);
      this.preciosDeVenta.push(producto[0].valorventa3);

    }
    // console.log(cliente);


  // this.dataCliente$.subscribe(resp => {
    
    
    
  // });
   
}


nuevo(){
  
  this.id_producto = null;
  this.textBuscar = "";
  this.codigo = "";
  this.existencia = null;
  this.preciosDeVenta = [],
  this.precio = null;
  this.cantidad = null;


}


guardar(){
  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    title: 'Guardando..',
    text:'Espere por favor..'
  });
  Swal.showLoading();
  let c:cotizaciom = new  cotizaciom();
  c.cliente = this.formCotizacion.value.cliente;
  c.observacion = this.formCotizacion.value.observacion;
  c.iva = parseInt(this.ivaCotizacion.toFixed(2));
  c.descuento = this.descuentoCotizacion;
  c.total = parseInt(this.totalCotizacion.toFixed(2));
  c.productos = this.productos;
  c.usuario = parseInt(this.auth.currentUser.getIdUser());
  console.log(c);
  this.empresa.saveCotizacion(c).subscribe(resp => {
    this.nuevo();
    this.productos = [];
    this.calcularTotales();
    this.cotizacionGuardada = resp;
    Swal.close();
    this.toastr.success("Cotizacion registrada.","INTRANET");
    this.openReport();
    
    
    
   
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


calcularTotales(){
  this.ivaCotizacion = 0;
  this.subtotalCotizacion = 0; 
  this.totalCotizacion  = 0;
    for(let data of this.productos){
      console.log(data);
      
      this.ivaCotizacion += data.iva;
      this.subtotalCotizacion += data.total - data.iva 
      this.totalCotizacion +=  data.total;
    }
    console.log(this.totalCotizacion);
    
}

bajarProductos(){
  
  if(this.cantidad == null || this.codigo == "" || this.precio == null ){
    console.log(this.cantidad);
    console.log(this.codigo);
    console.log(this.precio);
    
    return;
  }
  console.log(this.productoSeleccionado.iva);
  
  let  detalle:DetalleCotizacion = new DetalleCotizacion();
  detalle.codigo = this.codigo;
  detalle.id_producto = this.id_producto;
  detalle.producto = this.textBuscar
  detalle.cantidad = parseInt(this.cantidad+"");
  detalle.precio = this.precio;
  detalle.descuento = 0;
  if(this.productoSeleccionado.iva){
    detalle.iva = (detalle.precio * detalle.cantidad )*this.productoSeleccionado.iva/100;
  }else{
    detalle.iva = 0;
  }

  detalle.total = detalle.precio * detalle.cantidad + detalle.iva;
 

  detalle.iva = parseInt(detalle.iva.toFixed(2));
  detalle.total = parseInt(detalle.total.toFixed(2));
  this.productos.push(detalle);
  this.calcularTotales();
  this.nuevo();
 }
 
 eliminarProducto(id:number){

   this.productos.splice(id);
   this.calcularTotales();
   
 }

 downloadPDF() {
  // Extraemos el
  const DATA = document.getElementById('reporte');
  const doc = new jsPDF('p', 'pt', 'a4');
  const options = {
    background: 'white',
    scale: 3
  };
  html2canvas(DATA, options).then((canvas) => {

    const img = canvas.toDataURL('image/PNG');

    // Add image Canvas to PDF
    const bufferX = 15;
    const bufferY = 15;
    const imgProps = (doc as any).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
    return doc;
  }).then((docResult) => {
    docResult.save(`${new Date().toISOString()}_cotizacion.pdf`);
    this.modalService.dismissAll();
  });
}


}



class DetalleCotizacion {
  codigo     : string;
  id_producto: number;
  producto   : string;
  cantidad   : number;
  iva        : number;
  precio      : number;
  total      : number;
  descuento? : number;
}

class cotizaciom {
  cliente     : string;
  observacion     : string;
  iva        : number;
  descuento      : number;
  total      : number;
  usuario    : number;  
  productos:DetalleCotizacion[];
  
}