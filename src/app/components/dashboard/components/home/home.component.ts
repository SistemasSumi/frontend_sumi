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

  constructor(public reporte:ReportesService,public auth:SeguridadService, private home:HomeService,private cp:CurrencyPipe,public formBuilder:FormBuilder) { }

  ngOnInit(): void {
  
    // this.home.getNoticias().subscribe((resp:any) => {
    //     this.articulos = resp.articles;
        
    // });

      
    // this.initFormSemanaAnio();
    // this.home.getReporte(null).subscribe((resp:any) => {
    //   this.dataBarber = [];
    //   this.dataEmpresa = [];
    //   this.dataEmpresa = resp.dataEmp;
      
    //   console.log()
    //   for (let x in resp.data){
 
        
    //     let data = resp["data"]
    //     console.log(data)
        
          
    //       // console.log(this.cp.transform(parseInt(data[j].totalBarbero)));
    //       data[x].totalBarbero = this.cp.transform(parseInt(data[x].totalBarbero));
          
          
    //        console.log(data[x]);
          
    //       // data[j].totalBarbero = this.cp.transform(parseInt(data[j].totalBarbero));
    //       this.dataBarber.push(data[x]);

    //       console.log(this.dataBarber);
        
        
        
    //   }

    //   console.log(this.dataBarber);
      
      
       
      
    // })
    // this.home.getReporteTotales(null).subscribe((resp:any) => {

    //   resp.data.pcrServicio = resp.data.pcrServicio+'%'
    //   resp.data.pcrProducto = resp.data.pcrProducto+'%'
    //   console.log(resp.data.pcrServicio);
      
    //   this.dataTotales = resp.data;

 
      
    // })
  }

  imprimir(){
    let reporte:NotaCreditoComprasReport = new NotaCreditoComprasReport();
    let report = reporte.reporteNotaCreditoCompras();
    window.open(report.output('bloburl'), '_blank');
  }

  onchangeUser(user){
    console.log(user);
    
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
        
        console.log(this.dataEmpresa)
        for (let x in resp.data){
         
          let data = resp["data"]
  
            
            // console.log(this.cp.transform(parseInt(data[j].totalBarbero)));
            data[x].totalBarbero = this.cp.transform(parseInt(data[x].totalBarbero));
            
            
             console.log(data[x]);
            
            // data[j].totalBarbero = this.cp.transform(parseInt(data[j].totalBarbero));
            this.dataBarber.push(data[x]);
          
          
          
        }
  
        console.log(this.dataBarber);
        
      })


      this.home.getReporteTotales(this.formSemanasAnio).subscribe((resp:any) => {
        this.dataTotales = {}; 

        resp.data.pcrServicio = resp.data.pcrServicio+'%'
        resp.data.pcrProducto = resp.data.pcrProducto+'%'
        console.log(resp.data.pcrServicio);
        
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

}
