import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { DatePipe } from 'src/app/pipes/date.pipe';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ComprobanteEgreso } from '../../../reportes/reportesContabilidad/ComprobanteEgreso';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import { ModelTerceroCompleto } from '../../configuracion/models/ModelTerceroCompleto';
import { ModelPuc } from '../../Contabilidad/models/ModelPuc';
import { StockService } from '../../inventario/stock/stock.service';
declare var $;
@Component({
  selector: 'app-ListadoCE',
  templateUrl: './ListadoCE.component.html',
  styleUrls: ['./ListadoCE.component.css']
})
export class ListadoCEComponent implements OnInit {
  
  busquedaAvanzada:boolean = false;
  years: number[];
  meses: any[];
  filtroAvanzado:filtroBusquedas = {

    numero      : null,
    proveedor   : null,
    consecutivo : null,
    orden       : null,
    observacion : null,
    fechaInicial: null,
    fechaFinal  : null,
    year        : null,
    mes         : null,
    cuenta      : null,
    concepto    : null,
    factura     : null,
    total       : null
  
  }

  terceros: ModelTerceroCompleto[] = [];
  metodos:MetodosShared = new MetodosShared();
  
  public filtroCuentasControl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();

  
  public filtroCuentas: BehaviorSubject<ModelPuc[]> = new BehaviorSubject<ModelPuc[]>([]) ;
  public filtroTerceros: BehaviorSubject<ModelTerceroCompleto[]>;


  listCuentas:ModelPuc[] = [];
  listaDeGrupos:grupos[] = [];



  table:any = $('').DataTable({});
  txtbuscarPago:string;
  constructor( 
    private config:ConfiguracionService, 
    private auth:SeguridadService, 
    private stock:StockService) { 
      this.setYearsDefault();
    }

  ngOnInit() {
      this.llenarTablePagos();
      this.obtenerTerceros();
  }

  setYearsDefault(){
    this.years = new MetodosShared().generateYears();
  }

  setMesesDefault(year:number){
    this.filtroAvanzado.mes = null;
    this.meses = new MetodosShared().generateMonths(year);
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
            orderable: true,
            render: function(data,type,row){
                return data;
            }
          },
          
          {
            targets:[3],
         
            orderable: true,
            render: function(data,type,row){
               return data;
            }
          },
          {
            targets:[4],
     
            orderable: true,
            render: function(data,type,row){
              let datetime = new DatePipe();
              let fecha = datetime.transform(data);
              return fecha;
            }
          },

          {
            targets:[5],
        
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
              
              return data;
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
          
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Generando PDF..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
          this.stock.imprimirPagos(data.numero.toString()).subscribe((resp:any)=> {
            Swal.close();
            // console.log(resp)
            let reporte = new ComprobanteEgreso();
  
            let report = reporte.ReporteComprobanteEgreso(resp);
            window.open(report.output('bloburl'), '_blank');
         
          },(ex) => {
            
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'SarpSoft',
              text: 'Error al generar el PDF!',
            });




          });



          
        });


       
        return row;
      }
    });
  }

  llenarTablePagos(){
    return this.stock.SubjectdataCE.subscribe(resp => {
      
      this.llenarTable(
        "pagos",
        resp,
        [
        
        {"data":"id"},
        {"data":"numero"},
        {"data":"proveedor.nombreComercial"},
        {"data":"cuenta.nombre"},
        {"data":"fecha"},
      
          
        {"data":"total"},
        {"data":"concepto"},
        {"data":"observacion"},
        
    
        ],
        "pagos");

        this.table.columns.adjust();
        $('#Tablepagos_filter').html(``);

        
        
    });
    
  }

  limpiarFiltro(){
    this.filtroAvanzado = {
      numero      : null,
      proveedor   : null,
      consecutivo : null,
      orden       : null,
      observacion : null,
      fechaInicial: null,
      fechaFinal  : null,
      year        : null,
      mes         : null,
      cuenta      : null,
      concepto    : null,
      factura     : null,
      total       : null
    };
  
  }
  BusquedaAvanzada(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Buscando..',
      text:'Espere por favor..'
    });
    Swal.showLoading();
    this.stock.busquedaAvanzadaCE(this.filtroAvanzado).subscribe(() => {
      Swal.close();


    });
  }


}

interface filtroBusquedas {

  numero:string,
  proveedor:string,
  consecutivo:string,
  orden:string,
  observacion:string,
  fechaInicial:string,
  fechaFinal:string,
  year:string,
  mes:string,
  cuenta:string,
  concepto:string,
  factura:string,
  total:number,

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