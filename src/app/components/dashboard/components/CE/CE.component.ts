import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ComprobanteEgreso } from '../../reportes/reportesContabilidad/ComprobanteEgreso';
import { ConfiguracionService } from '../configuracion/Configuracion.service';
import { ModelNumeraciones } from '../configuracion/models/ModelNumeraciones';
import { ModelTerceroCompleto } from '../configuracion/models/ModelTerceroCompleto';
import { ModelPuc } from '../Contabilidad/models/ModelPuc';
import { PucService } from '../Contabilidad/puc/puc.service';
import { StockService } from '../inventario/stock/stock.service';
import * as moment from 'moment';
moment.locale('es')
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-CE',
  templateUrl: './CE.component.html',
  styleUrls: ['./CE.component.css']
})
export class CEComponent implements OnInit {

  modalAbono: NgbModalRef;
  filaAEditar:number;
  descuentoPorcentaje:boolean = false;


  terceroSeleccionado:ModelTerceroCompleto;


  GlobalTerceroSeleccionado:number;
  GlobalFormaDePago:number;
  GlobalNumeracion:number;
  GlobalObservacion:string = '';
  GlobalDiferencia:number = 0;
  fecha:Date =  new Date();


  listaDeGrupos:grupos[] = [];
  pucList:any[] = [];
  detalle:detalle[] = [];
  saldoAFavor:number = 0;
  Diferencia:number = 0;

  // TOTALES DEL EGRESO
  totalAbono:number = 0;
  totalDescuento:number = 0;
  totalSaldoAFavor:number = 0;
  totalSaldo:number = 0;


  // DETALLE ABONOOO

  dTotalAbono    : number = 0;
  dTotalSaldo    : number = 0;
  dTotalDescuento: number = 0;

  proveedores: ModelTerceroCompleto[] = [];
  numeraciones: ModelNumeraciones[] = [];


  public filtroTerceroControl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();


  metodos:MetodosShared = new MetodosShared();
  public filtroProveedores: BehaviorSubject<ModelTerceroCompleto[]>;


  constructor(private auth:SeguridadService,private modalService  : NgbModal,private puc:PucService,private config:ConfiguracionService, private stock:StockService,public currency:CurrencyPipe ) {

    this.totalAbono = 0;
   }

   


   
  
  ngOnInit() {
    this.puc.getEfectivo().subscribe(resp => {
      // console.log(resp);
      
      this.pucList = resp;

      for(let x of resp){
        if(x.codigo.toString().length < 6){
          let c:cuentas[] = [];
          for(let j of resp){
            if(x.codigo.toString() == j.codigo.toString().substring(0, 4) && j.codigo.toString().length >= 6){
              c.push(j)

              if(j.codigo == '11200505'){
                this.GlobalFormaDePago = j.id;
              }
            }
          }

          let g:grupos = {
            codigo: x.codigo,
            nombre:x.nombre,
            cuentas:c
          }

          this.listaDeGrupos.push(g);
        }
      }
    })
    this.obtenerProveedores();
    this.InitFiltroTercero();
    this.cargarNumeracion();
  }


  guardar(){
  

    if(this.GlobalTerceroSeleccionado == undefined ){
      new MetodosShared().AlertError('Seleccione un tercero.');
      return;
    }
    if(this.GlobalNumeracion == undefined ){
      new MetodosShared().AlertError('Seleccione una numeración.');
      return;

    }
    if(this.GlobalFormaDePago == undefined ){
      new MetodosShared().AlertError('Seleccione una forma de pago.');
      return;

    }
    let detalle = this.detalle.filter((d) => d.valorAbono > 0 || d.saldoFavor > 0);
    if(detalle.length <= 0){
      new MetodosShared().AlertError('Debe abonar minimo a una factura.');
      return;

    }

    let global = {
      "proveedor":this.GlobalTerceroSeleccionado,
      "formaPago":this.GlobalFormaDePago,
      "numeracion":this.GlobalNumeracion,
      "observacion":this.GlobalObservacion,
      "diferencia":Number(this.GlobalDiferencia),
      "totalAbono":Number(this.totalAbono),
      "totalSaldoAFavor":Number(this.totalSaldoAFavor),
      "totalDescuento":Number(this.totalDescuento),
      "fecha":moment(this.fecha).format('YYYY-MM-DD'),
      "usuario":this.auth.currentUser.getIdUser()
    }


    let data = {
      global,
      detalle
    };



    new MetodosShared().AlertQuestion(
      '¿ SEGURO DESEA GUARDAR EL COMPROBANTE ?'
    ).then((result) => {
      if (result.isConfirmed) {


         
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Guardando..',
          text:'Espere por favor..'
        });
        Swal.showLoading();

        this.stock.saveEgreso(data).subscribe(resp => {
          Swal.close()
          let reporte = new ComprobanteEgreso();
      
          let report = reporte.ReporteComprobanteEgreso(resp);
          window.open(report.output('bloburl'), '_blank');
          this.getFacturas(this.terceroSeleccionado);
          this.limpiarFormulario();
        });
       
      } 
    });


    
    // console.log(data);

  }

  transform(value:number)
  {
    
    return new CurrencyPipe('en-US').transform(value)
    
  }

  validarDescuento(){
    if(this.descuentoPorcentaje){
        if(this.dTotalDescuento > 100){
            this.dTotalDescuento = 100; 
        }
    }
   
  }
  validarSaldo(){
    if(this.dTotalSaldo > this.saldoAFavor){
      this.dTotalSaldo = this.saldoAFavor;
    }
  }

  getFacturas(tercero:ModelTerceroCompleto){
      this.terceroSeleccionado = tercero;

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Consultando..',
        text:'Espere por favor..'
      });
      Swal.showLoading();

      this.stock.getFacturasXProveedor(tercero.id).subscribe(resp => {
        Swal.close();

        
      this.saldoAFavor = 0;
      
      this.totalAbono       = 0;
      this.totalDescuento   = 0;
      this.totalSaldoAFavor = 0;
      this.totalSaldo       = 0;



      this.detalle = [];
      for(let x of resp.facturas){
        // console.log(x)
        let d:detalle = {
          orden: x.ingreso.orden.numero,
          factura:x.factura,
          fecha:x.fecha,
          vence:x.fechaVencimiento,
          formaPago:x.formaPago,
          descuento:0,
          saldoFavor:0,
          valorAbono:0,
          base:x.base,
          iva:x.iva,
          valorFactura:x.valorTotal,
          saldo:x.valorTotal-x.valorAbono,
          saldoTotal:x.valorTotal-x.valorAbono,
    

          
        };
        this.totalAbono       += d.valorAbono
        this.totalDescuento   += d.descuento
        this.totalSaldoAFavor += d.saldoFavor
        this.totalSaldo       += d.saldoTotal


        // console.log(d)

        this.detalle.push(d);
        
      }
     
      this.saldoAFavor = resp.afavor.saldoAFavor;
      // this.InputSaldoAFavor.nativeElement.focus();
      // console.log(resp);
    });
  }


  limpiarFormulario(){
    this.GlobalFormaDePago  = 372;
    this.GlobalObservacion  = '';
    this.GlobalDiferencia   = 0;
    this.totalAbono         = undefined;
    this.totalSaldoAFavor   = undefined;
    this.totalDescuento     = undefined;
    this.fecha = new Date(),
    this.auth.currentUser.getIdUser()
  }

  obtenerProveedores(){
    this.config.SubjectdataProveedorCompras.subscribe(resp => {
      this.proveedores = resp;
      this.filtroProveedores = new BehaviorSubject<ModelTerceroCompleto[]>(this.proveedores);
    });
  }

  InitFiltroTercero(){
    this.filtroTerceroControl.valueChanges
      .pipe(takeUntil (this._onDestroy))
      .subscribe(() => {
        this.filtraTerceros(this.filtroTerceroControl.value);
      });
  }

  filtraTerceros(busqueda:string){
    let filtro:ModelTerceroCompleto[] = this.metodos.filtrarArray<ModelTerceroCompleto>(this.proveedores,'nombreComercial',busqueda);
    this.filtroProveedores.next(filtro);
  }

  openModalADDAbono(content,fila) {
    this.filaAEditar = fila;
    this.dTotalAbono = this.detalle[this.filaAEditar].saldo;

    let d = this.detalle[this.filaAEditar];
    let descuentos = this.terceroSeleccionado.descuentoProveedor;
    let dias = new MetodosShared().DiasEntreFechaActualYOTRA(d.fecha);
    console.log("diff",dias);
    this.dTotalDescuento = this.calcularDescuento(descuentos[0],dias);
    if(this.dTotalDescuento > 0){
      this.descuentoPorcentaje = true;
    }

		this.modalAbono = this.modalService.open(content, { size: 'xs',centered: true });
  }

  cerrarModalADDAbono(){
   
    this.modalAbono.close();
    this.limpiarDetalle();
  }

  cargarNumeracion(){
    this.stock.cargarNumeracion().subscribe(resp => {
      this.numeraciones = resp;
      this.GlobalNumeracion = resp[0]?.id;
    });
  }

  limpiarDetalle(){
    this.dTotalAbono         = 0;
    this.dTotalDescuento     = 0;
    this.dTotalSaldo         = 0;
    this.descuentoPorcentaje = false;
    this.filaAEditar = null;

  } 

 
  agregar(){
    let d = this.detalle[this.filaAEditar];
    let descuento = 0;


    let totalAbono:number = (Number(this.dTotalAbono) + Number(this.dTotalSaldo));
    // console.log("total Abono  " + totalAbono)
    let calculoPorPago = totalAbono * 100 / d.valorFactura;
    // console.log("calculoPorPago"+calculoPorPago)

    let ivaParcial = d.iva * calculoPorPago / 100;
    // console.log("ivaParcial"+ivaParcial)

    
    if(this.descuentoPorcentaje){
      descuento = (totalAbono - ivaParcial) * this.dTotalDescuento / 100;
    }else{
      descuento =  this.dTotalDescuento ;

    }
    // console.log("descuento"+descuento)

    if (totalAbono > d.valorFactura || totalAbono <= 0) {
      new MetodosShared().AlertError('El valor del pago debe ser igual o menor al Valor de la Factura!');
      this.dTotalAbono = Number(this.dTotalAbono) - Number(this.dTotalSaldo);
      return;
    }
    
    d.valorAbono = Number(this.dTotalAbono) - Number(descuento);
    d.saldoFavor = Number(this.dTotalSaldo);


    d.saldo      = Number(d.saldo) - (Number(d.valorAbono)+Number(descuento)+Number(d.saldoFavor))
    d.descuento  = Number(descuento);
    // console.log(d)
    // this.detalle[this.filaAEditar]  = d;
    this.calcularTotales(this.detalle);
    this.cerrarModalADDAbono();
  }

  limpiar(){
    let d = this.detalle[this.filaAEditar];
    d.valorAbono = 0;
    d.saldoFavor = 0;
    d.descuento  = 0;
    d.saldo      = d.saldoTotal

    this.calcularTotales(this.detalle);
    this.cerrarModalADDAbono();
  }
  calcularTotales(detalle:detalle[]){
    this.totalAbono       = 0;
    this.totalDescuento   = 0;
    this.totalSaldoAFavor = 0;
    this.totalSaldo = 0;
    
    for(let x of detalle){
      this.totalAbono       += x.valorAbono
      this.totalSaldoAFavor += x.saldoFavor
      this.totalDescuento   += x.descuento
      this.totalSaldo       += x.saldo

      this.saldoAFavor -= x.saldoFavor;
    }

  }


  calcularDescuento(descuentos,Dias){
    if(descuentos){

   
        if(Dias <= 15){
          // console.log(descuentos.quince);
          return descuentos.quince;
        }
        else if(Dias > 15 && Dias <= 30){
          // console.log(descuentos.treinta);

          return descuentos.treinta;
        
        }
        else if(Dias > 30 && Dias <= 45){
          return descuentos.cuarentaYcinco;
        }
        else if(Dias > 45 && Dias <= 60){
          return descuentos.sesenta;
        }
        else if(Dias > 60 && Dias <= 90){
          return descuentos.noventa;
        }else{
          return 0;
        }

    }else{
      return 0;
    }
  }


 


}

interface grupos {
  nombre: string;
  codigo: string;
  cuentas: cuentas[];
}

interface cuentas {
  id: number
  nombre: string;
  
}


interface detalle {
  orden       : string;
  factura     : string;
  fecha       : string;
  vence       : string;
  base        : number;
  iva         : number;
  valorFactura: number;
  valorAbono  : number;
  saldoFavor  : number;
  descuento   : number;
  saldo       : number;
  saldoTotal  : number;
  formaPago   : any;
  
}

