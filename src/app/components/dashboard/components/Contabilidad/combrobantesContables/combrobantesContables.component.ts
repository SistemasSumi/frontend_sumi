import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { DatePipe } from 'src/app/pipes/date.pipe';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { MovimientoContable } from '../../../reportes/reportesContabilidad/MovimientoContable';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import { ModelTerceroCompleto } from '../../configuracion/models/ModelTerceroCompleto';
import { ModelPuc } from '../models/ModelPuc';
import { PucService } from '../puc/puc.service';
declare var $;
@Component({
  selector: 'app-combrobantesContables',
  templateUrl: './combrobantesContables.component.html',
  styleUrls: ['./combrobantesContables.component.css']
})
export class CombrobantesContablesComponent implements OnInit {

  years: number[];
  meses: any[];
  busquedaAvanzada:boolean = false;


  terceros: ModelTerceroCompleto[] = [];
  
  metodos:MetodosShared = new MetodosShared();
  public filtroCuentasControl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();

  
  public filtroCuentas: BehaviorSubject<ModelPuc[]> = new BehaviorSubject<ModelPuc[]>([]) ;
  public filtroTerceros: BehaviorSubject<ModelTerceroCompleto[]>;


  listCuentas:ModelPuc[] = [];
  listaDeGrupos:grupos[] = [];

  filtroAvanzado:filtroBusquedas = {
    numero:null,
    estado:null,
    consecutivo:null,
    fechaInicial:null,
    fechaFinal:null,
    tipoMovimiento:null,
    tercero:null,
    year:null,
    mes:null,
    cuenta:null,
    concepto:null,
    docReferencia:null,
  };


  table:any = $('').DataTable({});
  txtBuscarMovi:string;
  numeroEdit:string = '';
  duplicado:string = '';
  toastr_options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": 3000,
    "hideDuration": 1000,
    "timeOut": 50000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  nuevoComprobante:boolean = false;
  constructor( 
    
    private config:ConfiguracionService,private router:Router, private toast:ToastrService, private auth:SeguridadService,private pucService:PucService) { 
    this.setYearsDefault();
  }

  ngOnInit() {
    this.llenarTablePagos();
    this.obtenerTerceros();
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
  }


  obtenerTerceros(){
    this.config.SubjectdataTerceros.subscribe(resp => {
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
              let datetime = new DatePipe();
              let fecha = datetime.transform(data);
              return fecha;
            }
          },
          {
            targets:[4],
        
            orderable: true,
            render: function(data,type,row){
              let currency = new CurrencyPipe('en-US');

              return currency.transform(data);
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
                          <a class="dropdown-item"  href="javascript:;" id="editar"><i class="fas fa-edit text-primary" style="margin-right: 5px;"></i>  Editar</a>
                          <a class="dropdown-item"  href="javascript:;" id="duplicar"><i class="fas fa-clone text-warning" style="margin-right: 5px;"></i>  Duplicar</a>


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
          this.pucService.imprimirMovi(data.numero.toString()).subscribe((resp:any)=> {
            Swal.close();
            // console.log(resp)
            let reporte = new MovimientoContable();
  
            let report = reporte.ReporteMovimientoContable(resp);
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
        $('#editar', row).off('click');
        $('#editar', row).on('click', () => {
          

          
       
          const numeroEditParam =  data.numero.toString();
          this.router.navigate(['/comprobantes-contables-crear'], { queryParams: { numeroEdit: numeroEditParam } });
          


          
        });
        $('#duplicar', row).off('click');
        $('#duplicar', row).on('click', () => {
          
          const numeroDuplicadoParam =  data.numero.toString();
          this.router.navigate(['/comprobantes-contables-crear'], { queryParams: { duplicar: numeroDuplicadoParam } });
          
         


          
        });


       
        return row;
      }
    });
  }

  llenarTablePagos(){
    
    let t = this.toast.info('Cargando movimientos..','SarpSoft',this.toastr_options )

    this.pucService.SubjectdataMovimientos.subscribe(resp => {
      
      this.llenarTable(
        "Movi",
        resp,
        [
        
        {"data":"id"},
        {"data":"numero"},
        {"data":"tipo.nombre"},
        {"data":"fechaRegistro"},
        {"data":"total"},
        {"data":"usuario"},
      
        
        {"data":"usuario"},
       
        
    
        ],
        "Movi");

        this.table.columns.adjust();
        $('#TableMovi_filter').html(``);

        this.toast.clear();
        
    });
    
  }

  setYearsDefault(){
    this.years = new MetodosShared().generateYears();
  }

  setMesesDefault(year:number){
    this.filtroAvanzado.mes = null;
    this.meses = new MetodosShared().generateMonths(year);
  }


  limpiarFiltro(){
    this.filtroAvanzado = {
      numero:null,
      estado:null,
      consecutivo:null,
      fechaInicial:null,
      fechaFinal:null,
      tipoMovimiento:null,
      tercero:null,
      year:null,
      mes:null,
      cuenta:null,
      concepto:null,
      docReferencia:null,
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
    this.pucService.busquedaAvanzadaComprobantes(this.filtroAvanzado).subscribe(() => {
      Swal.close();


    });
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

}
interface filtroBusquedas {

  numero:string,
  tercero:string,
  consecutivo:string,
  estado:boolean,
  tipoMovimiento:string,
  fechaInicial:string,
  fechaFinal:string,
  year:string,
  mes:string,
  cuenta:string,
  concepto:string,
  docReferencia:string,

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
