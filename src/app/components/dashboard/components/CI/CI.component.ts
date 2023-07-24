import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ComprobanteIngreso } from '../../reportes/reportesContabilidad/ComprobanteIngreso';
import { ConfiguracionService } from '../configuracion/Configuracion.service';
import { ModelNumeraciones } from '../configuracion/models/ModelNumeraciones';
import { ModelTerceroCompleto } from '../configuracion/models/ModelTerceroCompleto';
import { ModelPuc } from '../Contabilidad/models/ModelPuc';
import { PucService } from '../Contabilidad/puc/puc.service';
import { FacturacionService } from '../Facturacion/facturacion.service';
import { StockService } from '../inventario/stock/stock.service';

@Component({
  selector: 'app-CI',
  templateUrl: './CI.component.html',
  styleUrls: ['./CI.component.css']
})
export class CIComponent implements OnInit {

  modalAbono: NgbModalRef;
  filaAEditar:number;
  descuentoPorcentaje:boolean = false;
  reteica:boolean = false;
  rtf:boolean = false;

  fecha:Date =  new Date();
  terceroSeleccionado:ModelTerceroCompleto;


  GlobalTerceroSeleccionado:number;
  GlobalFormaDePago:number;
  GlobalNumeracion:number;
  GlobalObservacion:string = '';
  GlobalDiferencia:number = 0;


  listaDeGrupos:grupos[] = [];
  pucList:any[] = [];
  detalle:detalle[] = [];
  saldoAFavor:number = 0;
  Diferencia:number = 0;

  // TOTALES DEL EGRESO
  totalAbono:number = 0;
  totalRetefuente:number = 0;
  totalReteica:number = 0;
  totalDescuento:number = 0;
  totalSaldoAFavor:number = 0;
  totalSaldo:number = 0;


  // DETALLE ABONOOO

  dTotalAbono    : number = 0;
  dTotalSaldo    : number = 0;
  dRetefuente    : number = 0;
  dReteica       : number = 0;
  dTotalDescuento: number = 0;

  proveedores: ModelTerceroCompleto[] = [];
  numeraciones: ModelNumeraciones[] = [];


  public filtroTerceroControl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();


  metodos:MetodosShared = new MetodosShared();
  public filtroProveedores: BehaviorSubject<ModelTerceroCompleto[]>;

  @ViewChild('InputSaldoAFavor') InputSaldoAFavor: ElementRef;

  constructor(private toastr:ToastrService,private auth:SeguridadService,private modalService  : NgbModal,private puc:PucService,private config:ConfiguracionService, private cxc:FacturacionService) { }

  ngOnInit() {
    this.puc.getEfectivo().subscribe(resp => {
      console.log(resp);
      
      this.pucList = resp;

      for(let x of resp){
        if(x.codigo.toString().length < 6){
          let c:cuentas[] = [];
          for(let j of resp){
            if(x.codigo.toString() == j.codigo.toString().substring(0, 4) && j.codigo.toString().length >= 6){
              c.push(j)
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
    this.obtenerClientes();
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
      "cliente":this.GlobalTerceroSeleccionado,
      "formaPago":this.GlobalFormaDePago,
      "numeracion":this.GlobalNumeracion,
      "observacion":this.GlobalObservacion,
      "diferencia":this.GlobalDiferencia,
      "fecha":this.fecha,
      "totalAbono":this.totalAbono,
      "totalSaldoAFavor":this.totalSaldoAFavor,
      "totalRetefuente":this.totalRetefuente,
      "totalReteica":this.totalReteica,
      "totalDescuento":this.totalDescuento,
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

        this.cxc.saveIngreso(data).subscribe(resp => {
            Swal.close();
            let reporte = new ComprobanteIngreso();
    
            let report = reporte.ReporteComprobanteIngreso(resp);
            window.open(report.output('bloburl'), '_blank');
    
            this.cargarNumeracion();
            this.getFacturas(this.terceroSeleccionado);
        });
       
      } 
    });



    
    console.log(data);

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


  validarRTF(){
    // RETEFUENTE = '06'
    // ICA = '07
    let COD_RETEFUENTE = '06';
  
    
    if(this.rtf){
        let retenciones = this.terceroSeleccionado.retencionCliente;

        if(retenciones.length > 0){

          let r  = retenciones.filter((rt) => rt.retencion.tipoRetencion == COD_RETEFUENTE)[0];
          if(r){
            
            this.dRetefuente = (this.detalle[this.filaAEditar].base - this.detalle[this.filaAEditar].descuentoTotal ) * r.retencion.porcentaje / 100;
          }else{
         
            this.toastr.error("Para poder aplicar Retención en la fuente (RETEFUENTE). Primero debe registrarle dicha retención al tercero seleccionado.","Sarp Soft")
          }
        }else{
          this.toastr.warning("Para poder aplicar Retención en la fuente (RETEFUENTE). Primero debe registrarle dicha retención al tercero seleccionado.","Sarp Soft")
        }
    }
   
  }

  validarRETEICA(){
    // RETEFUENTE = '06'
    // ICA = '07
 
    let COD_ICA = '07';
    
    if(this.reteica){
        let retenciones = this.terceroSeleccionado.retencionCliente;

        if(retenciones.length > 0){

          let r  = retenciones.filter((rt) => rt.retencion.tipoRetencion == COD_ICA)[0];
          if(r){
            
            this.dReteica = (this.detalle[this.filaAEditar].base - this.detalle[this.filaAEditar].descuentoTotal ) * r.retencion.porcentaje / 100;
          }else{
         
            this.toastr.error("Para poder aplicar Impuesto de Industria y Comercio (ICA). Primero debe registrarle dicha retención al tercero seleccionado.","Sarp Soft")
          }


        }else{
          this.toastr.warning("Para poder aplicar Impuesto de Industria y Comercio (ICA). Primero debe registrarle dicha retención al tercero seleccionado.","Sarp Soft")
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

      this.cxc.getFacturasXCliente(tercero.id).subscribe(resp => {
        Swal.close();
        this.saldoAFavor = 0;

        this.totalAbono       = 0;
        this.totalDescuento   = 0;
        this.totalSaldoAFavor = 0;
        this.totalSaldo       = 0;



        this.detalle = [];
        for(let x of resp.facturas){
          console.log(x)
          let d:detalle = {
            cxc: x.id,
            factura:x.factura,
            fecha:x.fecha,
            vence:x.fechaVencimiento,
            formaPago:x.formaPago,
            
            descuento:0,
            descuentoTotal:x.valorDescuento,
            saldoFavor:0,
            valorAbono:0,
            base:x.base,
            iva:x.iva,
            valorFactura:x.valorTotal,
            saldo:x.valorTotal-x.valorAbono,
            saldoTotal:x.valorTotal-x.valorAbono,
            retefuente:0,
            reteica:0,
            RTFTotal:x.reteFuente,
            RTITotal:x.reteIca
            

            
          };
          this.totalAbono       += d.valorAbono
          this.totalDescuento   += d.descuento
          this.totalSaldoAFavor += d.saldoFavor
          this.totalSaldo       += d.valorFactura-d.valorAbono


          console.log(d)

          this.detalle.push(d);
        
      }
      this.saldoAFavor = resp.afavor.saldoAFavor;
      this.InputSaldoAFavor.nativeElement.focus();
      console.log(resp);
    });
  }


  obtenerClientes(){
    this.config.SubjectdataCliente.subscribe(resp => {
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
    this.dTotalAbono = this.detalle[this.filaAEditar].valorFactura;

    // let d = this.detalle[this.filaAEditar];
    // let descuentos = this.terceroSeleccionado.descuentoProveedor;
    // let dias = new MetodosShared().DiasEntreFechaActualYOTRA(d.vence);
    
    // this.dTotalDescuento = this.calcularDescuento(descuentos[0],dias);
    // if(this.dTotalDescuento > 0){
    //   this.descuentoPorcentaje = true;
    // }

		this.modalAbono = this.modalService.open(content, { size: 'xs',centered: true });
  }

  cerrarModalADDAbono(){
   
    this.modalAbono.close();
    this.limpiarDetalle();
  }

  cargarNumeracion(){
    this.cxc.cargarNumeracionCI().subscribe(resp => {
      this.numeraciones = resp;
    });
  }

  limpiarDetalle(){
    this.dTotalAbono         = 0;
    this.dTotalDescuento     = 0;
    this.dTotalSaldo         = 0;
    this.dRetefuente         = 0;
    this.dReteica            = 0;
    this.descuentoPorcentaje = false;
    this.filaAEditar = null;

  }

  agregar(){
    let d = this.detalle[this.filaAEditar];
    let descuento = 0;


    let totalAbono:number = (Number(this.dTotalAbono) + Number(this.dTotalSaldo) + Number(this.dRetefuente) + Number(this.dReteica));
    console.log("total Abono  " + totalAbono)
    let calculoPorPago = totalAbono * 100 / d.valorFactura;
    console.log("calculoPorPago"+calculoPorPago)

    let ivaParcial = d.iva * calculoPorPago / 100;
    console.log("ivaParcial"+ivaParcial)

    
    if(this.descuentoPorcentaje){
      descuento = (totalAbono - ivaParcial) *   this.dTotalDescuento / 100;
    }else{
      descuento =  this.dTotalDescuento ;

    }
    console.log("descuento"+descuento)

    if (totalAbono > d.valorFactura || totalAbono <= 0) {
      new MetodosShared().AlertError('El valor del pago debe ser igual o menor al Valor de la Factura!');
      this.dTotalAbono = Number(this.dTotalAbono) - (Number(this.dTotalSaldo) + Number(this.dRetefuente) + Number(this.dReteica));
      return;
    }
    
    
    d.valorAbono = Number(this.dTotalAbono - descuento);
    d.saldoFavor = Number(this.dTotalSaldo);
    d.retefuente = Number(this.dRetefuente);
    d.reteica    = Number(this.dReteica);
    d.saldo      = Number(d.saldo) - (Number(d.valorAbono)+Number(descuento)+Number(d.saldoFavor)+Number(d.retefuente)+Number(d.reteica))
    d.descuento  = Number(descuento);
    console.log(d)

    this.saldoAFavor -=      Number(d.saldoFavor);

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
    this.totalRetefuente  = 0;
    this.totalReteica     = 0;
    this.totalSaldo = 0;
    
    for(let x of detalle){
      this.totalAbono       += Number(x.valorAbono)
      this.totalSaldoAFavor += Number(x.saldoFavor)
      this.totalDescuento   += Number(x.descuento)
      this.totalSaldo       += Number(x.saldo)
      this.totalRetefuente  += Number(x.retefuente)
      this.totalReteica     += Number(x.reteica)
      // this.saldoAFavor -=      Number(x.saldoFavor);
    }

  }


  calcularDescuento(descuentos,Dias){
    
    if(Dias <= 15){
      console.log(descuentos.quince);
      return descuentos.quince;
    }
    else if(Dias > 15 && Dias <= 30){
      console.log(descuentos.treinta);

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
  cxc           : string;
  factura       : string;
  fecha         : string;
  vence         : string;
  base          : number;
  iva           : number;
  valorFactura  : number;
  valorAbono    : number;
  saldoFavor    : number;
  descuento     : number;
  retefuente    : number;
  reteica       : number;
  RTFTotal      : number;
  RTITotal      : number;
  descuentoTotal: number;
  saldo         : number;
  saldoTotal    : number;
  formaPago     : any;
  
}