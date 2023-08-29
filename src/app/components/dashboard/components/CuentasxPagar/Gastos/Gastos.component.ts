import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CierreCajaMenor } from '../../../reportes/reportesContabilidad/CierreCajaMenor';
import { PagoCajaMenor } from '../../../reportes/reportesContabilidad/PagoCajaMenor';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import { ModelTerceroCompleto } from '../../configuracion/models/ModelTerceroCompleto';
import { GastosService } from './Gastos.service';
declare var $;


@Component({
  selector: 'app-Gastos',
  templateUrl: './Gastos.component.html',
  styleUrls: ['./Gastos.component.css']
})
export class GastosComponent implements OnInit {
  table:any = $('').DataTable({});
  numeroEdit: string  = '';

  cajaActual:Caja;

  fondoDisponible:number = 0;
  

  currentPago:pago_caja_Menor = {
    caja: null,
    tipo_gasto: null,
    numero: null,
    numero_str: null,
    tercero: null,
    fecha: null,
    docReferencia: null,
    concepto: null,
    valor: null,
  };

  terceros: ModelTerceroCompleto[] = [];
  metodos:MetodosShared = new MetodosShared();
  
  public filtroCuentasControl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();


  public filtroTerceros: BehaviorSubject<ModelTerceroCompleto[]>;

  constructor(private gastos:GastosService, private config:ConfiguracionService,private auth:SeguridadService ) { }


  opciones = [
    { cuenta: '512010', parametro: '(ARRIENDOS) CONSTRUCCIONES Y EDIFICACIONES' },
    { cuenta: '513040', parametro: '(ARRIENDOS) FLOTA Y EQUIPO DE TRANSPORTE' },
    { cuenta: '513095', parametro: '(ARRIENDOS) OTROS' },
    { cuenta: '510518', parametro: '(GASTO DEL PERSONAL) COMISIONES' },
    { cuenta: '510548', parametro: '(GASTO DEL PERSONAL) BONIFICACIONES' },
    { cuenta: '510551', parametro: '(GASTO DEL PERSONAL) DOTACION Y SUMINISTRO A TRABAJADORES' },
    { cuenta: '519525', parametro: '(GASTOS DE REPARACION Y RELACIONES PUBLICAS) ELEMENTOS DE ASEO Y CAFETERIA' },
    { cuenta: '519530', parametro: '(GASTOS DE REPARACION Y RELACIONES PUBLICAS) UTILES DE PAPELERIA Y FOTOCOPIA' },
    { cuenta: '519535', parametro: '(GASTOS DE REPARACION Y RELACIONES PUBLICAS) COMBUSTIBLES Y LUBRICANTES' },
    { cuenta: '519545', parametro: '(GASTOS DE REPARACION Y RELACIONES PUBLICAS) TAXIS Y BUSES' },
    { cuenta: '519565', parametro: '(GASTOS DE REPARACION Y RELACIONES PUBLICAS) AGAZAJOS Y EVENTOS' },
    { cuenta: '519595', parametro: '(GASTOS DE REPARACION Y RELACIONES PUBLICAS) OTROS' },
    { cuenta: '515505', parametro: '(GASTOS DE VIAJES) ALOJAMIENTO Y MANUTENCION' },
    { cuenta: '515515', parametro: '(GASTOS DE VIAJES) PASAJES AEREOS' },
    { cuenta: '515520', parametro: '(GASTOS DE VIAJES) PASAJES TERRESTRES' },
    { cuenta: '515595', parametro: '(GASTOS DE VIAJES) OTROS' },
    { cuenta: '511025', parametro: '(HONORARIOS) ASESORIA JURIDICA' },
    { cuenta: '511030', parametro: '(HONORARIOS) ASESORIA FINANCIERA' },
    { cuenta: '511035', parametro: '(HONORARIOS) ASESORIA TECNICA' },
    { cuenta: '511055', parametro: '(HONORARIOS) ASESORIA LABORAL' },
    { cuenta: '511095', parametro: '(HONORARIOS) OTROS' },
    { cuenta: '514520', parametro: '(MANTENIMIENTO Y REPARACION) EQUIPOS DE OFICINA' },
    { cuenta: '514525', parametro: '(MANTENIMIENTO Y REPARACION) EQUIPOS DE COMPUTACION Y COMUNICACION' },
    { cuenta: '220501', parametro: '(PAGO A PROVEEDORES) PROVEEDORES' },
    { cuenta: '513515', parametro: '(SERVICIOS) ASISTENCIA TECNICA' },
    { cuenta: '513525', parametro: '(SERVICIOS) ACUEDUCTO Y ALCANTARILLADO' },
    { cuenta: '513530', parametro: '(SERVICIOS) ENERGIA ELECTRICA' },
    { cuenta: '513535', parametro: '(SERVICIOS) TELEFONOS' },
    { cuenta: '513550', parametro: '(SERVICIOS) TRASPORTE, FLETES Y ACARREOS' },
    { cuenta: '513595', parametro: '(SERVICIOS) OTROS' },
    // Agrega aquí el resto de las opciones
  ];

  ngOnInit() {
    this.obtenerTerceros();
    this.getCaja();
    this.consultarFondo();
    this.llenarTableTraslados();
  }

  AbrirCaja(){

    new MetodosShared().AlertQuestion(
      '¿ SEGURO DESEA ABRIR UNA NUEVA CAJA ?'
    ).then((result) => {
      if (result.isConfirmed) {


         
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
       
          text:'Espere por favor..'
        });
        Swal.showLoading();

        this.gastos.abrirCaja().subscribe(
          (resp) => {
            Swal.close();
            // console.log(resp);
            this.cajaActual = resp;
            this.metodos.AlertOK('Caja N° '+ resp.numero_str)
          },
          (error)=> {
            Swal.close();
            // console.log(error.error);
          }
        );
       
       
      } 
    });

  }



  limpiar(){
    this.currentPago = {
      caja: this.cajaActual.numero,
      tipo_gasto: null,
      numero: null,
      numero_str: null,
      tercero: null,
      fecha: null,
      docReferencia: null,
      concepto: null,
      valor: null,
    };
    this.numeroEdit = null;
  
  }

  getCaja(){
    this.gastos.getCaja().subscribe(
      (resp) => {
        this.cajaActual = resp;
        // console.log(resp)

        this.currentPago.caja = resp.numero;
      }
    );
  }


  consultarFondo(){
    this.gastos.getFondoDisponible().subscribe(
      (resp) => {
        this.fondoDisponible = resp;
        // console.log(resp)
      }
    );
  }




  obtenerTerceros(){
    this.config.SubjectdataProveedor.subscribe(resp => {
      this.terceros = resp;
      this.filtroTerceros = new BehaviorSubject<ModelTerceroCompleto[]>(this.terceros);
    });
  }

  
  filtraTerceros(busqueda:string){
    let filtro:ModelTerceroCompleto[] = new MetodosShared().filtrarArray<ModelTerceroCompleto>(this.terceros,'nombreComercial',busqueda);
    this.filtroTerceros.next(filtro);
  }


  guardar(){
    if(!this.currentPago.tipo_gasto){
      new MetodosShared().AlertError('Seleccione un tipo de gasto.')
      return;
    }

    if(!this.currentPago.fecha){
      new MetodosShared().AlertError('Seleccione una fecha')
      return;
    }
    if(!this.currentPago.docReferencia){
      new MetodosShared().AlertError('Ingrese un N° factura o N° de referencia.')
      return;
    }
    if(!this.currentPago.valor || this.currentPago.valor == 0){
      new MetodosShared().AlertError('Debe introducir un valor mayor a 0.')
      return;
    }
    
    if(!this.currentPago.tercero){
      new MetodosShared().AlertError('Seleccione a quien va dirigido el pago.')
      return; 
    }
    if(!this.currentPago.concepto){
      new MetodosShared().AlertError('Debe introducir un concepto.')
      return; 
    }

    
    if(this.fondoDisponible < this.currentPago.valor || this.currentPago.valor == 0){
      new MetodosShared().AlertError('Disculpa, pero no es posible completar la transacción debido a un saldo insuficiente en la cuenta o el monto supera el saldo actual de la misma. Te recomendamos verificar tus fondos disponibles y asegurarte de contar con el monto necesario para realizar la operación deseada. Si tienes alguna pregunta o inquietud adicional, no dudes en contactarnos para brindarte asistencia.')
      return;
    }


    if(this.numeroEdit != '' && this.numeroEdit != null){
      new MetodosShared().AlertQuestion(
        '¿ SEGURO DESEA ACTUALIZAR EL PAGO ?'
      ).then((result) => {
        if (result.isConfirmed) {
  
  
           
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Actualizando..',
            text:'Espere por favor..'
          });
          Swal.showLoading();

          this.gastos.actualizarPago(this.currentPago,this.numeroEdit).subscribe(
            (resp) => {
              Swal.close();
              new MetodosShared().AlertOK(`El pago N° ${resp.numero_str} fue Actualizado con exito.`);
              // console.log(resp);
              this.limpiar();
              this.consultarFondo();
              this.getCaja(); 
              this.gastos.actualizarPagos();
              
     
      

            },
            (error) => {
              // console.log(error)
              new MetodosShared().AlertError(error.error);
            }
      
          );
        
         
        } 
      });
    }else{

      new MetodosShared().AlertQuestion(
        '¿ SEGURO DESEA GUARDAR EL PAGO ?'
      ).then((result) => {
        if (result.isConfirmed) {
  
  
           
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Guardando..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
  
          this.gastos.guardarPago(this.currentPago).subscribe(
              (resp) => {
                Swal.close();
                new MetodosShared().AlertOK(`El pago N° ${resp.numero_str} fue Registrado con exito.`);
                // console.log(resp);
                this.limpiar();
                this.consultarFondo();
                this.getCaja();
                this.gastos.actualizarPagos();
                
       
                // this.trasladoService.actualizarListado();

              },
              (error) => {
                // console.log(error)
                new MetodosShared().AlertError(error.error);
              }
        
            );
         
        } 
      });
    }



    
    
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
          { responsivePriority: 4, targets: 2 },
          { responsivePriority: 5, targets: -3 },
          { responsivePriority: 3, targets: -1 },
          { responsivePriority: 6, targets: 3},
          
          
       
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
            class:'text-center',
            orderable: false,
            render: function(data,type,row){
                return data;
            }
          },
          {
            targets:[2],
            class:'text-center',
            orderable: true,
            render: function(data,type,row){
                return data;
            } 
          },
          {
            targets:[3],
            class:'text-start',
            orderable: true,
            render: function(data,type,row){
                return data;
            } 
          },
          {
            targets:[4],
            class:'text-center',
            orderable: true,
            render: function(data,type,row){
                return data;
            } 
          },
          {
            targets:[5],
            class:'text-end',
            orderable: true,
            render: function(data,type,row){
             let  cp:CurrencyPipe = new  CurrencyPipe('en_US');

              return cp.transform(data);
            }
          },
          {
            targets:[6],
     
            orderable: true,
            render: function(data,type,row){
              return data
            }
          },

          
         
          
          {
              targets:[-1],
              class:'text-center',
              orderable: false,
              render: function(data,type,row){
                  


                  let acciones = `
                  
                  <div class="dropdown mb-0">
                      <a class="btn btn-link text-muted dropdown-toggle p-1 mt-n2" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                          <i class="uil uil-ellipsis-v font-size-20"></i>
                      </a>
                    
                      <div class="dropdown-menu dropdown-menu-end" data-popper-placement="top-end" style="position: absolute; inset: auto 0px 0px auto; margin: 0px; transform: translate(0px, -42px);">
                          <a class="dropdown-item"  href="javascript:;" id="imprimirPago"><i class="squire ico-pdf" style="margin-right: 5px;color:red;"></i>  Imprimir</a>
                          <a class="dropdown-item"  href="javascript:;" id="editar"><i class="fas fa-pen" style="margin-right: 5px;"></i>  Editar</a>

                      </div>
                  </div>
                  
                  `
                  
              
        
                  return acciones;
                  
              }
          },
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
        // deprecated in favor of `off` and `on`

        /* IMPRIMIR  */
        $('#imprimirPago', row).off('click');
        $('#imprimirPago', row).on('click', () => {
            let reporte = new PagoCajaMenor();
            let report = reporte.ReportePagoCajaMenor(data);
            window.open(report.output('bloburl'), '_blank');
            // let reporte = new CierreCajaMenor();
            // let report = reporte.ReporteCierreCajaMenor(data);
            // window.open(report.output('bloburl'), '_blank');
         



          
        });
        $('#editar', row).off('click');
        $('#editar', row).on('click', () => {
          

          
       
          this.numeroEdit                = data.id;
          this.currentPago.caja          = this.cajaActual.numero;
          this.currentPago.tipo_gasto    = data.tipo_gasto;
          this.currentPago.numero        = data.numero;
          this.currentPago.fecha         = parseDateWithoutTimezone(data.fecha);
          this.currentPago.tercero       = data.tercero.id;
          this.currentPago.docReferencia = data.docReferencia;
          this.currentPago.valor         = data.valor;
          this.currentPago.concepto      = data.concepto;

          // this.router.navigate(['traslados','editar'], { queryParams: { numeroEdit: numeroEditParam } });
          


          
        });


       
        return row;
      }
    });
  }

  llenarTableTraslados(){
    return this.gastos.SubjectdataPagos.subscribe(resp => {
      this.llenarTable(
        "Pagos",
        resp,
        [
        
        {"data":"id"},
        {"data":"numero_str"},
        {"data":"fecha"},
        {"data":"tercero.nombreComercial"},
        {"data":"docReferencia"},
        {"data":"valor"},
        {"data":"concepto"},
        {"data":"concepto"},

        
    
        ],
        "Pagos");

        this.table.columns.adjust();
        $('#TablePagos_filter').html(``);

        
        
    });
    
  }

}


interface Caja {
  
  numero:         string;
  numero_str:         string;
  fecha_apertura: Date;
  fecha_cierre:   Date;
  estado:         boolean;
  saldo_inicial:  number;
  total_gastos?:  number;
  saldo_cierre:   number;
}


interface pago_caja_Menor {
  caja: any | null;
  tipo_gasto: string | null;
  numero: number | null;
  numero_str: string | null;
  tercero: any | null;
  fecha: string | null | Date;
  docReferencia: string | null;
  concepto: string | null;
  valor: number | null;
}

function parseDateWithoutTimezone(dateString) {
  var parts = dateString.split("-");
  var year = parseInt(parts[0]);
  var month = parseInt(parts[1]) - 1; // Restamos 1 porque los meses en JavaScript van de 0 a 11
  var day = parseInt(parts[2]);

  var date = new Date();
  date.setFullYear(year, month, day);
  date.setHours(0, 0, 0, 0);

  return date;
}
