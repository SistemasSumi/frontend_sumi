import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { SeguridadService } from '../../../auth/seguridad.service';
import { ReportesService } from '../../reportes/reportes.service';
import { facturaElectronicaReport } from '../../reportes/reportesFacturacion/facturaElectronica';
import { LibroAuxiliarReporte } from '../../reportes/reportesContabilidad/libroAuxiliarReporte';
import { MovimientoContable } from '../../reportes/reportesContabilidad/MovimientoContable';
import { ComprobanteEgreso } from '../../reportes/reportesContabilidad/ComprobanteEgreso';
import { IngresoAlmacen } from '../../reportes/reportesInventario/IngresoAlmacen';
import { ComprobanteProforma } from '../../reportes/reportesFacturacion/ComprobanteProforma';
import { SalidaConsumo } from '../../reportes/reportesInventario/SalidaConsumo';
import { EstadoCarteraCliente } from '../../reportes/reportesContabilidad/EstadoCarteraCliente';
import { EstadoCarteraProveedor } from '../../reportes/reportesContabilidad/EstadoCarteraProveedor';
import { CarteraVencidaEnGeneral } from '../../reportes/reportesContabilidad/CarteraVencidaEnGeneral';
import { NotaCreditoComprasReport } from '../../reportes/reportesInventario/notaCreditoCompras';
import { ActivatedRoute } from '@angular/router';
import { RetencionEnLaFuenteGeneral } from '../../reportes/reportesContabilidad/RetencionEnLaFuenteGeneral';
import { ComprobanteIngreso } from '../../reportes/reportesContabilidad/ComprobanteIngreso';
import { ComprobanteCotizacion } from '../../reportes/reportesFacturacion/ComprobanteCotizacion';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
// import { CurrencyPipe } from '@angular/common';
// import { logoSumi } from '../logoSumi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fechaInit:any;
  fechaFin:any;
  
  formSemanasAnio    : FormGroup;


  public dataBarber:any= [];
  public dataEmpresa:any= [];
  public dataTotales : any;



  usuariosData$:any;


  usuario:any;
  institucional:boolean = false;
  consumo:boolean = false;
  tat:boolean = false;
  lista1:boolean = false;
  lista2:boolean = false;
  dashboard:boolean = false;
  proveedores:boolean = false;
  clientes:boolean = false;

  articulos:any

  constructor( private route:ActivatedRoute, public reporte:ReportesService,public auth:SeguridadService, private home:HomeService,private cp:CurrencyPipe,public formBuilder:FormBuilder) { }

  ngOnInit(): void {
    // let permisos = this.route.snapshot.data['permisos'];
    // this.auth.setPermisosUser(permisos); 
   
  }

  imprimir(){
    let reporte:RetencionEnLaFuenteGeneral = new RetencionEnLaFuenteGeneral();

    this.home.getReportes().subscribe(resp => {

      let report = reporte.ReporteRetencionEnLaFuenteGeneral(resp);
      window.open(report.output('bloburl'), '_blank');
    });
  }

  onchangeUser(user){
    // console.log(user);
    
    this.home.getPermisos(user).subscribe((resp:any) => {
      this.institucional  = false;
      this.consumo = false;
      this.tat = false;
      this.lista1 = false;
      this.lista2 = false;
      this.dashboard = false;
      this.proveedores = false;
      this.clientes = false;

      if(resp.data.institucional){
        this.institucional = resp.data.institucional
      }
      if(resp.data.consumo){
        this.consumo = resp.data.consumo
      }
      if(resp.data.tat){
        this.tat = resp.data.tat
      }

      if(resp.data.lista1){
        this.lista1 = resp.data.lista1
      }
      if(resp.data.lista2){
        this.lista2 = resp.data.lista2
      }
      if(resp.data.dashboard){
        this.dashboard = resp.data.dashboard
      }
      if(resp.data.proveedores){
        this.proveedores = resp.data.proveedores
      }
      if(resp.data.clientes){
        this.clientes = resp.data.clientes
      }
    },(ex)=>{
      this.institucional  = false;
      this.consumo = false;
      this.tat = false;
      this.lista1 = false;
      this.lista2 = false;
      this.dashboard = false;
      this.proveedores = false;
      this.clientes = false;

    });
  }



guardarPermisos(){
  this.home.CreatePermisos(
    this.usuario,
    this.institucional,
    this.consumo,
    this.tat,
    this.lista1,
    this.lista2,
    this.dashboard,
    this.proveedores,
    this.clientes
  ).subscribe(resp => {
    this.usuario = '';
    this.institucional  = false;
    this.consumo = false;
    this.tat = false;
    this.lista1 = false;
    this.lista2 = false;
    this.dashboard = false;
    this.proveedores = false;
    this.clientes = false;
    
  })
}

  buscar(){
    if(this.formSemanasAnio.valid){
    
      this.home.getReporte(this.formSemanasAnio).subscribe((resp:any) => {
        this.dataBarber = [];
        this.dataEmpresa = [];

        this.dataEmpresa = resp.dataEmp;
        
        // console.log(this.dataEmpresa)
        for (let x in resp.data){
         
          let data = resp["data"]
  
            
            // // console.log(this.cp.transform(parseInt(data[j].totalBarbero)));
            data[x].totalBarbero = this.cp.transform(parseInt(data[x].totalBarbero));
            
            
             // console.log(data[x]);
            
            // data[j].totalBarbero = this.cp.transform(parseInt(data[j].totalBarbero));
            this.dataBarber.push(data[x]);
          
          
          
        }
  
        // console.log(this.dataBarber);
        
      })


      this.home.getReporteTotales(this.formSemanasAnio).subscribe((resp:any) => {
        this.dataTotales = {}; 

        resp.data.pcrServicio = resp.data.pcrServicio+'%'
        resp.data.pcrProducto = resp.data.pcrProducto+'%'
        // console.log(resp.data.pcrServicio);
        
        this.dataTotales = resp.data;
        
      })
    }
    
    
  }

  initFormSemanaAnio(){
    this.formSemanasAnio = this.formBuilder.group({
      fecha_inicial: ['',{
        validators:[
          Validators.required,
        ]
      }],
      fecha_final: ['',{
        validators:[
          Validators.required,
        ]
      }],
      
    });
   
  }

  imprimirNotaCredito(){
    let reporte:NotaCreditoComprasReport = new NotaCreditoComprasReport();
    let report = reporte.reporteNotaCreditoCompras();
    window.open(report.output('bloburl'), '_blank');
  }
  
  COTIZACION(){
    let reporte:ComprobanteCotizacion = new ComprobanteCotizacion();
    let report = reporte.ReporteComprobanteCotizacion(null);
    window.open(report.output('bloburl'), '_blank');
  }
  carteraVencida(){
    let reporte:CarteraVencidaEnGeneral = new CarteraVencidaEnGeneral();
    let report = reporte.ReporteCarteraVencidaEnGeneral(null);
    window.open(report.output('bloburl'), '_blank');
  }

  egreso(){
    let reporte:ComprobanteEgreso = new ComprobanteEgreso();
    let report = reporte.ReporteComprobanteEgreso(null);
    window.open(report.output('bloburl'), '_blank');
  }
  ingreso(){
    let reporte:ComprobanteIngreso = new ComprobanteIngreso();
    let report = reporte.ReporteComprobanteIngreso(null);
    window.open(report.output('bloburl'), '_blank');
  }
  carteraCliente(){
    let reporte:EstadoCarteraCliente = new EstadoCarteraCliente();
    let report = reporte.ReporteEstadoCarteraCliente(null);
    window.open(report.output('bloburl'), '_blank');
  }
  carteraProveedor(){
    let reporte:EstadoCarteraProveedor = new EstadoCarteraProveedor();
    let report = reporte.ReporteEstadoCarteraProveedor(null);
    window.open(report.output('bloburl'), '_blank');
  }

  aux(){
    let reporte:LibroAuxiliarReporte = new LibroAuxiliarReporte();
    let report = reporte.GenerarLibroAux(null);
    window.open(report.output('bloburl'), '_blank');
  }

  movi(){
    let reporte:MovimientoContable = new MovimientoContable();
    let report = reporte.ReporteMovimientoContable(null);
    window.open(report.output('bloburl'), '_blank');
  }
  salidaConsumo(){
    var doc = new jsPDF();
    
    // Definir los datos del ticket
    var productos = [
      ["Producto 1", "$10.00"],
      ["Producto 2", "$15.00"],
      ["Producto 3", "$20.00"],
      // ... agregar más productos según sea necesario
    ];
    
    // Definir las opciones de la tabla
  
    var ancho = 80; // Ancho de 80 mm
    var alturaInicial = doc.internal.pageSize.height;
    
    // Calcular la altura máxima del contenido
   
    
    // Agregar la tabla al documento
    autoTable(doc, {
      head: [
          [
          {
          content: "Descripción",
          styles: {
              halign: 'center'
          }
          },
          {
          content: 'precio',
          styles: {
              halign: 'center'
          }

          },
         
          ]],
      body: productos,
      horizontalPageBreak: true,
      margin: {
          top: 10,
          bottom: 65,
          left: 5,
          right: 5,

      },
      // metodo que se repite en cad pagina
      didDrawPage: ({ pageNumber, doc: jsPDF }) => {
        
      },
      


      theme: 'grid',
      headStyles: {
          fillColor: '#41B6FF',
      },
      
      });
    
    // Obtener la altura de la tabla generada
    // Calcular la altura necesaria para los productos
    var alturaProductos = productos.length * 10; // 10 es un valor de ejemplo para la altura de cada producto

    // Establecer el tamaño de página adecuado
    doc.setPageSize(ancho, alturaInicial + alturaProductos);

    // Guardar el documento PDF
    doc.save('ticket.pdf');
    // let reporte:SalidaConsumo = new SalidaConsumo();
    // let report = reporte.ReporteSalidaConsumo(null);
    // window.open(report.output('bloburl'), '_blank');
  }

}
