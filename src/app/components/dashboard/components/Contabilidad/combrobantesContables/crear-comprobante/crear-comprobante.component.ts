import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReportesService } from 'src/app/components/dashboard/reportes/reportes.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { ModelNumeraciones } from '../../../configuracion/models/ModelNumeraciones';
import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';
import { ModelPuc } from '../../models/ModelPuc';
import { PucService } from '../../puc/puc.service';
import { MovimientoContable } from 'src/app/components/dashboard/reportes/reportesContabilidad/MovimientoContable';

@Component({
  selector: 'app-crear-comprobante',
  templateUrl: './crear-comprobante.component.html',
  styleUrls: ['./crear-comprobante.component.css']
})
export class CrearComprobanteComponent implements OnInit {

  @Input()  
  numeroEdit?: string = ''; 


  @Input()  
  duplicar?: string = ''; 


  Edit?: boolean = false; 

  numeraciones:ModelNumeraciones[] = [];
  detalleComprobante:detalle[] = [];

  listCuentas:ModelPuc[] = [];

  public filtroCuentasControl: FormControl = new FormControl('');
  public filtroTerceroControl: FormControl = new FormControl('');
  
  protected _onDestroy = new Subject<void>();


  metodos:MetodosShared = new MetodosShared();
  public filtroCuentas: BehaviorSubject<ModelPuc[]> = new BehaviorSubject<ModelPuc[]>([]) ;
  public filtroTerceros: BehaviorSubject<ModelTerceroCompleto[]> = new BehaviorSubject<ModelTerceroCompleto[]>([]) ;

  terceros:ModelTerceroCompleto[] = [];


  modalAdd: NgbModalRef;

  textBuscarTercero:string = "";


  idMovi:number;
  numeracion = null;
  fechaRegistro   = new Date();
  fechaMovimiento = new Date();
  docReferencia:string = "";
  concepto:string  = "";
  tipoMovimiento:string  = "";
  cuenta:ModelPuc;
  cuentaID:number;
  naturaleza:string  = "";
  tercero:ModelTerceroCompleto;
  terceroID:number;
  valor:number  = 0;
  


  totalCredito = 0;
  totalDebito = 0;

  listaDeGrupos:grupos[] = [];

  constructor(private reporte:ReportesService, private config:ConfiguracionService,private pucService:PucService,private modalService: NgbModal) { }

  ngOnInit() {

    



    this.config.SubjectdataTerceros.subscribe(resp => {
      this.terceros = resp;
      this.filtroTerceros.next(resp);
    
    });
    this.InitFiltroTercero();

    this.pucService.getCuentas().subscribe((resp:ModelPuc[])=>{
      this.listCuentas = resp;

      this.filtroCuentas.next(resp);

    
    });
    this.InitFiltroPuc();
    
    this.filtroCuentas.subscribe(resp => {
      this.listaDeGrupos = [];

      for(let x of resp){
        if(x.codigo.toString().length < 6 && x.codigo.toString().length >= 4 ){
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
   
    });
    this.cargarNumeracion();
    this.MetodoEditar();
    this.MetodoDuplicar();

  }


  MetodoEditar(){
    if(this.numeroEdit != ''){
      this.pucService.imprimirMovi(this.numeroEdit).subscribe(resp => {
        console.log(resp);
        this.numeraciones = [];
        resp.numeracion.numero = resp.numero
        this.numeracion = resp.numeracion.id
        this.numeraciones.push(resp.numeracion);

        this.fechaRegistro = resp.fechaRegistro;
        this.tipoMovimiento = resp.tipo.valor;

        for(let x of resp.detalle){
          let d:detalle = new detalle();
          d.tercero = x.tercero;
          d.cuenta = x.cuenta;
          d.naturaleza = x.naturaleza

      
          d.debito = x.debito;
          

    
          d.credito = x.credito;

        

          d.fechaMovimiento = moment( x.fechaMovi).format("YYYY-MM-DD");
          d.concepto = x.concepto;
          d.docReferencia = x.docReferencia;

          this.detalleComprobante.push(d)


          
        }
        this.totalCredito = 0;
          this.totalDebito  = 0;
          for(let x of this.detalleComprobante){
              this.totalCredito += x.credito;
              this.totalDebito += x.debito;
          }
          this.idMovi = resp.id;
          this.Edit = true;
      }); 
    }
  }

  MetodoDuplicar(){
    if(this.duplicar != ''){
      this.pucService.imprimirMovi(this.duplicar).subscribe(resp => {
        console.log(resp);
      
        this.tipoMovimiento = resp.tipo.valor;

        for(let x of resp.detalle){
          let d:detalle = new detalle();
          d.tercero = x.tercero;
          d.cuenta = x.cuenta;
          d.naturaleza = x.naturaleza
          d.debito = x.debito;
          d.credito = x.credito;
          d.fechaMovimiento = moment( x.fechaMovi).format("YYYY-MM-DD");
          d.concepto = x.concepto;
          d.docReferencia = x.docReferencia;

          this.detalleComprobante.push(d)


          
        }
        this.totalCredito = 0;
          this.totalDebito  = 0;
          for(let x of this.detalleComprobante){
              this.totalCredito += x.credito;
              this.totalDebito += x.debito;
          }
      }); 
    }
  }


  InitFiltroPuc(){
    this.filtroCuentasControl.valueChanges
      .pipe(takeUntil (this._onDestroy))
      .subscribe(() => {
        this.filtrarPuc(this.filtroCuentasControl.value);
      });
  }

  filtrarPuc(busqueda:string){
    let filtro:ModelPuc[] = this.metodos.filtrarArrayPuc<ModelPuc>(this.listCuentas,'codigo',busqueda);
    this.filtroCuentas.next(filtro);
  }


  InitFiltroTercero(){
    this.filtroTerceroControl.valueChanges
      .pipe(takeUntil (this._onDestroy))
      .subscribe(() => {
      
        
        this.filtraTerceros(this.filtroTerceroControl.value);
      });
  }

  filtraTerceros(busqueda:string){
    let filtro:ModelTerceroCompleto[] = this.metodos.filtrarArray<ModelTerceroCompleto>(this.terceros,'nombreComercial',busqueda);
    console.log(filtro)
    this.filtroTerceros.next(filtro);
  }






  seleccionarTercero(e){
    let tercero = this.terceros.filter(d => d.nombreComercial === e);
    if(tercero.length > 0){

       return tercero[0];
    }


  }

  agregar(content) {
		this.modalAdd = this.modalService.open(content, { centered: true });
	}

  close(){
    this.modalAdd.close();
  }


  capturarDatos(){
    // this.formComprobante.fecha = this.fecha;
    // this.formComprobante.observaciones = this.observaciones;
    // this.formComprobante.referencia = this.referencia;
    // this.formComprobante.detalle = this.detalleComprobante;
  }

  capturarDetalle(){
    let d:detalle = new detalle();

    if(this.tercero == null || this.tercero == undefined){
      new MetodosShared().AlertError('Seleccione un tercero');
      return;
    }
    if(this.cuenta == null || this.cuenta == undefined){
      new MetodosShared().AlertError('Seleccione una cuenta');
      return;
    }
    if(this.concepto == '' || this.concepto == undefined){
      new MetodosShared().AlertError('Ingrese un concepto');
      return;
    }
    if(this.naturaleza == '' || this.naturaleza == undefined){
      new MetodosShared().AlertError('Seleccione una naturaleza');
      return;
    }
    if(this.valor == 0 || this.valor == undefined){
      new MetodosShared().AlertError('Ingrese un valor');
      return;
    }

    d.tercero = this.tercero;
    d.cuenta = this.cuenta;
    d.naturaleza = this.naturaleza

    if(d.naturaleza == 'D'){
      d.debito = this.valor;
      d.credito = 0;

    }else{
      d.debito = 0;
      d.credito = this.valor;

    }

    d.fechaMovimiento = moment( this.fechaMovimiento).format("YYYY-MM-DD");
    d.concepto = this.concepto;
    d.docReferencia = this.docReferencia;

    this.detalleComprobante.push(d)


    this.totalCredito = 0;
    this.totalDebito  = 0;
    for(let x of this.detalleComprobante){
        this.totalCredito += x.credito;
        this.totalDebito += x.debito;
    }

    // this.capturarDatos();
    this.limpiarDetalle();
  }


  limpiarDetalle(){
    this.tercero = null;
    this.cuenta = null;
    this.cuentaID = null;
    this.terceroID = null;
    this.valor = 0;
    this.docReferencia = '';
    this.naturaleza = '';
    this.fechaMovimiento = new Date();
 

  }

  limpiarFormulario(){
    this.limpiarDetalle();
    this.idMovi = null;
    this.cargarNumeracion();
    this.tipoMovimiento = null;
    this.fechaRegistro = null;
    this.detalleComprobante = [];
    
    this.totalCredito = 0;
    this.totalDebito  = 0;
    for(let x of this.detalleComprobante){
        this.totalCredito += x.credito;
        this.totalDebito += x.debito;
    }
  
    
    
  }

  editarlinea(item, index){
    this.tercero = item.tercero;
    this.cuenta = item.cuenta;
    this.terceroID = item.tercero.id;
    this.cuentaID  = item.cuenta.id;
    if(item.debito > 0){
      
      this.valor   =  item.debito;
    }else{
      this.valor   =  item.credito;

    }
    this.docReferencia =item.docReferencia;
    this.naturaleza = item.naturaleza;
    this.concepto = item.concepto;
    this.fechaMovimiento = item.fechaMovimiento+1;

    this.detalleComprobante.splice(index, 1);
  }


  cargarNumeracion(){
    this.pucService.cargarNumeracion().subscribe(resp => {
      this.numeraciones = resp;
    })
  }


  guardar(){
    
    if(!this.fechaRegistro){
      new MetodosShared().AlertError('debe ingresar una fecha de registro!');
      return;
    }
    if(this.detalleComprobante.length <= 0){
      new MetodosShared().AlertError('debe existir almenos un detalle!');
      return;
    }
    if(this.tipoMovimiento == '' || this.tipoMovimiento == undefined){
      new MetodosShared().AlertError('debe existir almenos un detalle!');
      return;
    }
    if(this.numeracion == '' || this.numeracion == undefined){
      new MetodosShared().AlertError('debe seleccionar almenos una numeracion!');
      return;
    }
    
    if((this.totalCredito - this.totalDebito) != 0){
      new MetodosShared().AlertError('El movimiento no contiene sumas iguales!');
      return;
    }

    let movi = {
      "id":this.idMovi,
      "numeracion":this.numeracion,
      "tipoMovimiento":this.tipoMovimiento,
      "fechaRegistro": moment(this.fechaRegistro).format("YYYY-MM-DD")
    }

    let data = {
      "movi": movi,
      "detalle":this.detalleComprobante
    }



    if(this.Edit){

      new MetodosShared().AlertQuestion(
        '¿ SEGURO DESEA ACTUALIZAR EL MOVIMIENTO ?'
      ).then((result) => {
        if (result.isConfirmed) {
  
  
           
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'ACTUALIZANDO..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
  
          this.pucService.updateMovimiento(data).subscribe(resp => {
            Swal.close();
            new MetodosShared().AlertOK('Movimiento actualizado!');
            this.limpiarFormulario();
            let reporte = new MovimientoContable();
      
            let report = reporte.ReporteMovimientoContable(resp);
            window.open(report.output('bloburl'), '_blank');
          });
         
        } 
      });
  



       
    }else{

      new MetodosShared().AlertQuestion(
        '¿ SEGURO DESEA GUARDAR EL MOVIMIENTO ?'
      ).then((result) => {
        if (result.isConfirmed) {
          
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'GUARDANDO..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
          this.pucService.saveMovimiento(data).subscribe(resp => {
            Swal.close();
            new MetodosShared().AlertOK('Movimiento registrado!');
            this.limpiarFormulario();
            let reporte = new MovimientoContable();
            let report = reporte.ReporteMovimientoContable(resp);
            window.open(report.output('bloburl'), '_blank');
          });
        } 
      });

    }


   




     
  }

  
  

  Delete(id){
    this.detalleComprobante.splice(id, 1);
    this.totalCredito = 0;
    this.totalDebito  = 0;
    for(let x of this.detalleComprobante){
        this.totalCredito += x.credito;
        this.totalDebito += x.debito;
    }
  }

}



export class detalle {


  tercero:ModelTerceroCompleto;
  cuenta:ModelPuc;
  naturaleza:string;
  debito:number;
  credito:number;
  docReferencia:string;
  fechaMovimiento:string;
  concepto:string;
  
  constructor(){}
}

interface grupos {
  nombre: string;
  codigo: string;
  cuentas: cuentas[];
}

interface cuentas {
  id: number
  codigo: string;
  nombre: string;
  
}
