import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LibroAuxiliarReporte } from '../../../reportes/reportesContabilidad/libroAuxiliarReporte';
import { ModelPuc } from '../models/ModelPuc';
import { PucService } from '../puc/puc.service';

import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModelTerceroCompleto } from '../../configuracion/models/ModelTerceroCompleto';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import { environment } from 'src/environments/environment';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { CurrencyPipe } from '@angular/common';
import { AcortarTextPipe } from 'src/app/pipes/acortarText.pipe';

declare var $;


@Component({
  selector: 'app-libro-auxiliar',
  templateUrl: './libro-auxiliar.component.html',
  styleUrls: ['./libro-auxiliar.component.css']
})
export class LibroAuxiliarComponent implements OnInit {
  txtBuscar:string = '';

  table:any = $('').DataTable({});

  listCuentas:ModelPuc[] = [];
  terceros:ModelTerceroCompleto[] = [];

  metodos:MetodosShared = new MetodosShared();

  public filtroCuentas: BehaviorSubject<ModelPuc[]> = new BehaviorSubject<ModelPuc[]>([]) ;
  public filtroTerceros: BehaviorSubject<ModelTerceroCompleto[]> = new BehaviorSubject<ModelTerceroCompleto[]>([]) ;

  protected _onDestroy = new Subject<void>();


  saldoAnterior:number = 0;
  saldoActual:number = 0;

  cuentaContable:string;
  inicio:Date = new Date();
  fin:Date = new Date();
  tercero:string = '0';


  listaDeGrupos:grupos[] = [];


  public filtroCuentasControl: FormControl = new FormControl('');
  public filtroTerceroControl: FormControl = new FormControl('');

  libro:LibroAux[];

  constructor(private auth:SeguridadService,private pucService:PucService, private config:ConfiguracionService) { }

  ngOnInit() {
    this.pucService.SubjectdataPuc.subscribe((resp:ModelPuc[])=>{
      this.listCuentas = resp;
   
      this.filtroCuentas.next(resp);
    });
    this.InitFiltroPuc();
    this.filtroCuentas.subscribe(resp => {
      this.listaDeGrupos = [];
    
      if(resp){
        this.tratarCuentas(resp);
      }
     
    });

    this.config.SubjectdataTerceros.subscribe(resp => {
      this.terceros = resp;
      this.filtroTerceros.next(resp);
    
    });
    this.InitFiltroTercero();
    this.llenarTableMovimientos();
  }



  Consultar(){
    if(!this.cuentaContable){
      new MetodosShared().AlertError('Debe seleccionar una cuenta!');
      return;
    }

    if(!this.tercero){
      new MetodosShared().AlertError('Debe seleccionar un tercero!');
      return;
    }


    if(!this.inicio && !this.fin){
      new MetodosShared().AlertError('Debe un rango de fechas!');
      return;
    }





    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Consultando..',
      text:'Espere por favor..'
    });
    Swal.showLoading();
    

    this.pucService.getLibroAux(
      this.cuentaContable,
      this.tercero,
      moment(this.inicio).format("YYYY-MM-DD"),
      moment(this.fin).format("YYYY-MM-DD")).subscribe(resp => {




        Swal.close();
        
        // console.log(resp);
        this.libro = resp.detalle;


        

        this.saldoAnterior = resp.saldoAnterior;
        this.saldoActual   = resp.saldoActual;

        
        // console.log(this.libro)
        this.llenarTableMovimientos();
    },(ex) => {
      Swal.close();
    });
  }

  imprimir(){
    let reporte = new LibroAuxiliarReporte();
  
    let report = reporte.GenerarLibroAux(null);
    window.open(report.output('bloburl'), '_blank');
  }


  tratarCuentas(resp){
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
    // console.log(filtro)
    this.filtroTerceros.next(filtro);
  }



  llenarTable(idtable:string,data,columns,nameButton){
    
    this.table.destroy();
    var tokenid =  this.auth.currentUser.getTokenUser();
    var beforeSend = function (xhr) {
      xhr.setRequestHeader('Authorization', 'Token ' +tokenid);
    }
    $.ajaxSetup({
      beforeSend: beforeSend
    });

    this.table =  $('#Table'+idtable).DataTable({
      retrieve: true,
      responsive: true,
      autoWidth: true,
      pageLength: 5,   
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "Todos"]],
      language: environment.languageDataTable,
      data:data,
      columns:columns,
      columnDefs:[
          { responsivePriority: 1, targets: 0 },
          { responsivePriority: 2, targets: 1 },
          { responsivePriority: 4, targets:4 },
    
          
          
       
          // { "width": "80%", "targets": 2 },
        


     
         
          {
            targets:[0],
            class:'plus-info',
            orderable: false,
            render: function(data,type,row){
                return null;
            }
          },
          {
            targets:[1],
            class:'nowrap-center',
            orderable: true,
            render: function(data,type,row){
                return data;
            }
          },
          
          {
            targets:[2],
            class:'nowrap-center',
            orderable: true,
            render: function(data,type,row){
                return data;
            }
          },
          {
            targets:[3],
            class:'normal',
            orderable: true,
            render: function(data,type,row){
              let acortar = new AcortarTextPipe()
              return acortar.transform(data,'25');
            }
          },
          {
            targets:[4],
            class:'normal',
            orderable: true,
            render: function(data,type,row){
                return data;
            }
          },
          
          {
            targets:[5],
            class:'nowrap-center',
            orderable: true,
            render: function(data,type,row){
              let cuenta =  data+' - '+row.cuenta.nombre;
              return cuenta
            }
          },
          {
            targets:[6],
            class:'nowrap-center',
            orderable: true,
            render: function(data,type,row){
                return data;
            }
          },
          {
            targets:[7],
            class:'ancho',
            orderable: true,
            render: function(data,type,row){
              let currency = new CurrencyPipe('en_US');
              let result = '';
              if(row.cuenta.naturaleza == 'DEUDORA'){
                result= `<span style="color: green; font-weight: bold;">`+currency.transform(data)+`</span>`
              }else{
                result= `<span style="color: red; font-weight: bold;">`+currency.transform(data)+`</span>`

              }
              return result;
            }
          },
          {
            targets:[8],
            class:'ancho',
            orderable: true,
            render: function(data,type,row){
              let currency = new CurrencyPipe('en_US');
              let result = '';
              
              if(row.cuenta.naturaleza == 'DEUDORA'){
                result= `<span style="color: red; font-weight: bold;">`+currency.transform(data)+`</span>`
              }else{
                result= `<span style="color: green; font-weight: bold;">`+currency.transform(data)+`</span>`

              }
              return result;
            }
          },
          
          {
            targets:[9],
            class:'ancho',
            orderable: true,
            render: function(data,type,row){
              let currency = new CurrencyPipe('en_US');
              let result = '';
              
              if(data < 0){
                result= `<span style="color: red; font-weight: bold;">`+currency.transform(data)+`</span>`
              }else{
                result= `<span style="color: green; font-weight: bold;">`+currency.transform(data)+`</span>`

              }
              return result;
            }
          },
          
          
          
          // {
          //   targets:[3],
     
          //   orderable: true,
          //   render: function(data,type,row){
          //     let datetime = new DatePipe();
          //     let fecha = datetime.transform(data);
          //     return fecha;
          //   }
          // },
          // {
          //   targets:[4],
        
          //   orderable: true,
          //   render: function(data,type,row){
          //     let currency = new CurrencyPipe('en-US');

          //     return currency.transform(data);
          //   }
          // },
          
          
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
        // deprecated in favor of `off` and `on`

        /* IMPRIMIR  */
        
        


       
        return row;
      }
    });
  }

  llenarTableMovimientos(){
    
      // this.table.clear();
      this.llenarTable(
        "libro",
        this.libro,
        [
        
        {"data":"id"},
        {"data":"asiento.numero"},
        {"data":"tipo"},
        {"data":"docReferencia"},
        {"data":"tercero.nombreComercial"},
        {"data":"cuenta.codigo"},
        {"data":"fecha"},
        {"data":"debito"},
        {"data":"credito"},
        {"data":"saldo"},
        {"data":"concepto"},
      
  
        ],
        "libro");

        this.table.columns.adjust();
        $('#Tablelibro_filter').html(``);

        
  
    
  }


 
}


 interface LibroAux {
  id:      number;
  cuenta:  Cuenta;
  asiento: Asiento;
  debito:  number;
  credito: number;
  fecha:   Date;
  mes:     string;
  anio:    string;
  tercero: Tercero;
}

 interface Asiento {
  id:           number;
  detalle:      Detalle[];
  numero:       string;
  fecha:        Date;
  mes:          string;
  anio:         string;
  concepto:     string;
  totalDebito:  number;
  totalCredito: number;
  empresa:      number;
  usuario:      number;
}

 interface Detalle {
  id:      number;
  cuenta:  Cuenta;
  debito:  number;
  credito: number;
  fecha:   Date;
  mes:     string;
  anio:    string;
  asiento: number;
  tercero: Tercero;
}

 interface Cuenta {
  id:               number;
  tipoDeCuenta:     string;
  naturaleza:       string;
  nombre:           string;
  codigo:           number;
  estadoFinanciero: boolean;
  estadoResultado:  boolean;
  padre:            null;
}

 interface Tercero {
  id:              number;
  nombreComercial: string;
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
