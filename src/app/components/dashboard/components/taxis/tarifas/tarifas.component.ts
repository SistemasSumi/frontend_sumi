import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ConductorService } from '../conductores/conductor.service';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { TaxisService } from '../taxis/taxis.service';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from '../../nomina/empresas/empresa.service';
import Swal from 'sweetalert2';
import { TarifasService } from './tarifas.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarifas } from '../../../../../interfaces/interfaces';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.css']
})
export class TarifasComponent implements OnInit,AfterViewInit {

  bancos = [
    { "nombre": "Aportes en Línea" },
    { "nombre": "Asopagos" },
    { "nombre": "Banco Agrario de Colombia" },
    { "nombre": "Banco AV Villas" },
    { "nombre": "Banco BBVA" },
    { "nombre": "Banco BCSC" },
    { "nombre": "Banco Citibank" },
    { "nombre": "Banco Coopcentral" },
    { "nombre": "Banco Davivienda" },
    { "nombre": "Banco de Bogotá" },
    { "nombre": "Banco de la República" },
    { "nombre": "Banco de Occidente" },
    { "nombre": "Banco Falabella" },
    { "nombre": "Banco Finandina" },
    { "nombre": "Banco GNB Sudameris" },
    { "nombre": "Banco Itaú Corpbanca Colombia S.A." },
    { "nombre": "Banco Mundo Mujer" },
    { "nombre": "Banco Pichincha" },
    { "nombre": "Banco Popular" },
    { "nombre": "Banco Credifinanciera" },
    { "nombre": "Banco Santander de Negocios Colombia S.A." },
    { "nombre": "Bancamia S.A." },
    { "nombre": "Banco Serfinanza" },
    { "nombre": "Bancoldex" },
    { "nombre": "Bancolombia" },
    { "nombre": "Bancoomeva" },
    { "nombre": "BNP Paribas" },
    { "nombre": "Coltefinanciera" },
    { "nombre": "Compensar" },
    { "nombre": "Confiar Cooperativa Financiera" },
    { "nombre": "Coofinep Cooperativa Financiera" },
    { "nombre": "Cooperativa Financiera Cotrafa" },
    { "nombre": "Cooperativa Financiera de Antioquia" },
    { "nombre": "Deceval" },
    { "nombre": "Dirección del Tesoro Nacional  - Regalias" },
    { "nombre": "Dirección del Tesoro Nacional" },
    { "nombre": "Enlace Operativo S.A." },
    { "nombre": "Financiera Juriscoop" },
    { "nombre": "Banco JP Morgan Colombia" },
    { "nombre": "Mibanco S.A" },
    { "nombre": "Red Multibanca Colpatria" },
    { "nombre": "Simple S.A" },
    { "nombre": "FOGAFIN" }

]

  totalBanco:number = 0;
  totalEfectivo:number = 0;
  totalEgreso:number = 0;
  total:number = 0;
  mostrarToltip:boolean = true;

  @ViewChild('tooltip') tooltip: MatTooltip;
  @ViewChild("ReportePdf", {static: false}) ReportePdf: TemplateRef<any>
 
  moviReport:any = null;
  taxisList:any[];

  turnosActuales:any[];
  ListConductores:any[];
  ListTarifasPagadas:Tarifas[];
  ListTarifasSaldo:Tarifas[];
  ListTaxisTotales:any[];
  currentDay = new Date();

  public page: number = 0;
  public search: string = '';

  formTarifa = this.formBuilder.group({
    id: ['',{
      validators:[

      ]
    }], 
    taxi: ['',{
      validators:[
        Validators.required,
      ]
    }],  
    turno: ['',{
      validators:[
        Validators.required,
      ]
    }],
    conductor: ['',{
      validators:[
        Validators.required,
      ]
    }],
    valor: ['',{
      validators:[
        Validators.required,
      ]
    }],
    saldo: ['',{
      validators:[
      
      ]
    }],
    fecha_creacion: ['',{
      validators:[
      
      ]
    }],
  });

  formMovimiento = this.formBuilder.group({
    id: ['',{
      validators:[

      ]
    }], 
    taxi: ['',{
      validators:[
        Validators.required,
      ]
    }],  
    concepto: ['',{
      validators:[
        Validators.required,
      ]
    }],
    banco: ['Bancolombia',{
      validators:[
        Validators.required,
      ]
    }],
    tipo: ['',{
      validators:[
        Validators.required,
      ]
    }],
    valor: ['',{
      validators:[
      
      ]
    }],
  });

  constructor(config: NgbModalConfig,private modalService: NgbModal,private tarifas:TarifasService, private conductor:ConductorService,private taxis:TaxisService,private auth:SeguridadService,private formBuilder: FormBuilder,private  toastr: ToastrService,private empresa:EmpresaService) { }
  
  
  ngAfterViewInit(): void {
    this.tooltip.show();
    setTimeout(() => this.tooltip.hide(10000));
  }
  
  
  
  mostrarAyudas(){
    if(this.mostrarToltip){
      this.tooltip.show();
    }else{
      this.tooltip.hide();
    }
    this.mostrarToltip = !this.mostrarToltip;
  }

  openReport() {
    this.modalService.open(this.ReportePdf, { windowClass: 'my-class' ,size: 'xl', }).result.then((result) => {
      
    }, (reason) => {
      this.downloadPDF();
    });
  }

  guardarMovi(){
    Swal.fire({
      title: 'Guardando movimiento',
      html: 'Espere porfavor...',
      allowEscapeKey: false,
      allowOutsideClick: false,
     });
    Swal.showLoading();
    
    this.tarifas.saveMovimiento(this.formMovimiento).subscribe(resp => {
      // console.log(resp);
      this.moviReport = resp;
      this.cargar();
      this.resetFormMovimiento();
      Swal.close();
      Swal.fire({
        title: 'SUMIPROD-INTRANET',
        icon: 'success',
        text: "El movimiento se registro con exito!",
        
      })
      this.openReport();
   
    })
  }


  eliminarTarifa(id:number){
    this.tarifas.deleteTarifa(id).subscribe(resp => {
      // console.log(resp);
      Swal.fire({
        title: 'SUMIPROD-INTRANET',
        icon: 'success',
        text: "la tarifa se elimino con exito!",
        
      })
      this.cargar();
    })
  }


  downloadPDF() {
    Swal.fire({
      title: 'Generando PDF',
      html: 'Espere porfavor...',
      allowEscapeKey: false,
      allowOutsideClick: false,
     });
    Swal.showLoading();
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
      docResult.save(`${new Date().toISOString()}_movimiento.pdf`);
      this.modalService.dismissAll();
      Swal.close();
    });
  }
  ngOnInit() {



    this.cargar();
    this.conductor.getConductores().subscribe((resp:any) => {
      this.ListConductores = resp;
    });
    this.taxis.getTaxis().subscribe((resp:any) => {
      // for(let x in resp){
      //   this.taxisList.push(x);
      // }
       this.taxisList = resp;
       // console.log(this.taxisList);
       
    })
  
  }



mostrarTodos(){
  this.tarifas.getTarifas('PAGADAS','todos').subscribe(resp => {
    // console.log(resp);
    
    this.ListTarifasPagadas = resp;
})
}


cargar(){
  this.tarifas.getTarifas('PAGADAS','cinco').subscribe(resp => {
      this.ListTarifasPagadas = resp;
  })
  this.tarifas.getTarifas('SALDO','').subscribe(resp => {
    this.ListTarifasSaldo = resp;
  })
  this.tarifas.getTarifas('TOTALES','').subscribe((resp:any) => {


  for(let i = 0; i < resp.length; i++) {
      this.totalEfectivo += parseFloat(resp[i].totalEfectivo);
      this.totalBanco += parseFloat(resp[i].totalBanco);
      this.totalEgreso += parseFloat(resp[i].totalEgreso);
  }
    
    this.total = this.totalEfectivo + this.totalBanco;
    this.ListTaxisTotales = resp;
 
    

    


    
  })
}

  resetFormTarifa(){
    // this.editarTurnos = false;
   $("#formTarifa").trigger("reset");
  }
  resetFormMovimiento(){
    // this.editarTurnos = false;
   $("#formMovimiento").trigger("reset");
  }

  guardar(){

    let turno:any = this.turnosActuales.filter(p => p.id_turno === this.formTarifa.value.turno);
    let saldo = parseFloat(turno[0].tarifa) - parseFloat(this.formTarifa.value.valor);
    // console.log(saldo);
  
    this.formTarifa.get('saldo').setValue(saldo);
    
    this.tarifas.saveTarifa(this.formTarifa).subscribe(resp => {
      // console.log(resp);
      this.cargar();
      this.resetFormTarifa();
      Swal.fire({
        title: 'SUMIPROD-INTRANET',
        icon: 'success',
        text: "La tarifa se registro con exito!",
        
      })
    })
  }

  onChangeTaxi(e){
    this.turnosActuales = null;
    // console.log(e);
    let taxi:any = this.taxisList.filter(p => p.taxi.id_taxi === e);
    // console.log(taxi);
    this.turnosActuales = taxi[0].turnos;
    
    
  }
  onChangeTurno(e){
    let turno:any = this.turnosActuales.filter(p => p.id_turno === e);
    this.formTarifa.get('conductor').setValue(turno[0].conductor);
  }

  nextPage() {
    this.page += 5;
  }

  prevPage() {
    if ( this.page > 0 )
      this.page -= 5;
  }

  onSearchPokemon( search: string ) {
    this.page = 0;
    this.search = search;
  }


   

}
