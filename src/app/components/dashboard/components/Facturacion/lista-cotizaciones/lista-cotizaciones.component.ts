import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { PermisosUsuario } from 'src/app/components/auth/permisosUsuario';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { AcortarTextPipe } from 'src/app/pipes/acortarText.pipe';
import { DatePipe } from 'src/app/pipes/date.pipe';
import { DatetimePipe } from 'src/app/pipes/datetime.pipe';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import { ModelFormasPago } from '../../configuracion/models/ModelFormasPago';
import { ModelTerceroCompleto } from '../../configuracion/models/ModelTerceroCompleto';
import { ModelVendedor } from '../../configuracion/models/ModelVendedor';
import { TablesBasicService } from '../../configuracion/TablesBasic/tablesBasic.service';
import { CotizacionService } from '../cotizacion/cotizacion.service';
declare var $;

@Component({
  selector: 'app-lista-cotizaciones',
  templateUrl: './lista-cotizaciones.component.html',
  styleUrls: ['./lista-cotizaciones.component.css']
})
export class ListaCotizacionesComponent implements OnInit {
  permisos:PermisosUsuario;

  isLoading:boolean = true;
  busquedaAvanzada:boolean = false;

  contador:number = 0;

  clientes:ModelTerceroCompleto[] = [];
  vendedores:ModelVendedor[] = [];
  formasPago:ModelFormasPago[] = [];
  metodos:MetodosShared = new MetodosShared();
  public filtroClientes: BehaviorSubject<ModelTerceroCompleto[]>;

  filtroAvanzado = {
    prefijo:null,
    numero:null,
    cliente:null,
    observacion:null,
    formaPago:null,
    vendedor:null,
    valor:null,
    fechaInicial:null,
    fechaFinal:null,
    estadoDian:null
  };
  @ViewChild('dataTableEl') dataTableEl: ElementRef;
  @ViewChild('imprimir') imprimir: any;
  facturaAImprimir:any;
  modalImprimir: NgbModalRef;

  table:any = $('#TableCotizaciones').DataTable({});
  datetime = new DatetimePipe();
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute, 
    private router: Router,
    private invoceService:CotizacionService, 
    private auth:SeguridadService, 
    private cp:CurrencyPipe,
    private tables:TablesBasicService,
    private config:ConfiguracionService) { }

    ngOnInit() {
      this.permisos = this.auth.currentUser.getPermisos()
      this.llenarTableCotizaciones();
      this.obtenerVendedores();
      this.obtenerClientes();
      this.obtenerFormaDepago();
    }

  llenarTableCotizaciones() {
    return this.invoceService.SubjectdataCotizaciones.subscribe(resp => {
      console.log(resp)
      
      
      this.llenarTable(
        "Cotizaciones",
        resp,
        [
        
        {"data":"id"},
        {"data":"numero"},
        {"data":"cliente.nombreComercial"},
        {"data":"formaPago.nombre"},
        {"data":"fecha"},
        // {"data":"despachado"},
        {"data":"subtotal"},
        {"data":"valorIva"},
        {"data":"descuento"},
        {"data":"valorReteFuente"},
        {"data":"valor"},
        {"data":"usuario"},
        {"data":"usuario"},
        ],
        "Cotizaciones",this.cp);

        this.table.columns.adjust();
        $('#TableFacturas_filter').html(``);
    });
  }



  llenarTable(idtable:string,data,columns,nameButton,cp:CurrencyPipe){
    
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
      scrollX: false,
      autoWidth: true,
      pageLength: 5,   
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "Todos"]],
      language: environment.languageDataTable,
      data:data,
      columns:columns,
      columnDefs:[
         
          
          { responsivePriority: 1, targets: 0 },
          { responsivePriority: 2, targets: 1 },
          { responsivePriority: 3, targets: -1 },
          { responsivePriority: 4, targets: -3 },
          { responsivePriority: 5, targets: 2 },
          { responsivePriority: 6, targets: 5 },
          { responsivePriority: 7, targets: 3 },
          { responsivePriority: 8, targets: 6 },
          { responsivePriority: 9, targets: 8 },
          
          // { "white-space": "nowrap", "targets": 1 },
          // { "width": "100%", "targets": 1 },
          { "width": "100%", "targets": 2 },
        


     
         
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
            class:'text-center text-nowrap',
            orderable: true,
      
            render: function(data,type,row){
              let result = '';
              
              if(row.isElectronica){
                if(row.enviadaDian){
                  result = `<span style="color:green;">`+data+`</span>`;
                }else{
                  result = `<span style="color:red;" class="fw-bold fade-out">`+data+`</span>`;
                }
              }else{
                result = data
              }
              
              return result;
            }
          },
          {
            targets:[2],
            class:'fw-semibold',
            orderable: true,
            render: function(data,type,row){
                // let cortar = new AcortarTextPipe()
                 
                return data;
            }
          },
      
          {
            targets:[3],
            class: 'text-nowrap',
            orderable: true,
            render: function(data,type,row){
               
                return data;
            }
          },
          {
            targets:[4],
            class: 'text-nowrap',
            orderable: true,
            render: function(data,type,row){
              let datetime = new DatePipe();
              let fecha = datetime.transform(data);
              return fecha;
            }
          },
          // {
          //   targets:[5],
          //   class:'text-center text-nowrap',
          //   render: function(data,type,row){
          //     if(data){
          //       // fas fa-truck-moving 
          //       return  ` <i class="fas fa-truck-moving text-success"  style="font-size: 22px; "></i>`
          
          //     }else{

          //       return ` <i class="fas fa-ban text-danger pulse rotate" style="font-size: 22px;"></i>`
          //     }
          //   }
          // },
          {
            targets:[5],
            class:'text-end text-nowrap  fw-semibold',
            orderable: true,
            render: function(data,type,row){
                let iva = cp.transform(data);
                return iva;
            }
          },
          {
            targets:[6],
            class:'text-end text-nowrap  fw-semibold',
            orderable: true,
            render: function(data,type,row){
                let iva = cp.transform(data);
                return iva;
            }
          },
          {
            targets:[7],
            class:'text-end text-nowrap  fw-semibold',
            orderable: true,
            render: function(data,type,row){
                let iva = cp.transform(data);
                return iva;
            }
          },
          {
            targets:[8],
            class:'text-end text-nowrap  fw-semibold',
            orderable: true,
            render: function(data,type,row){
              let total = cp.transform(data);
              return total;
            }
          },
          {
            targets:[9],
            class:'text-end text-nowrap  fw-semibold',
            orderable: true,
            render: function(data,type,row){
                
              let total = cp.transform(data);
              return total;
            }
          },
          {
            targets:[10],
            class: 'text-nowrap',
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
                  let botonIngresar = "";
                  let botonEditar = "";
                  let botonEnviarElectronica = "";

                  if(row.isElectronica){
                    botonEnviarElectronica = `<a class="dropdown-item" href="javascript:;" id="dian"><i  class="fas fa-signature" style="margin-right: 5px; color:green;"></i>  Firmar</a>`
                  }else{
                    botonEnviarElectronica = "";
                  }


                  if(row.despachado == false){
                    botonIngresar =  `<a id="despachado" href="javascript:;" class="dropdown-item"><i  class="mdi mdi-check-circle font-size-16 text-warning me-1">Despachar</i></a> `
                    if(row.enviadaDian != true){
                      botonEditar = `<a class="dropdown-item" href="javascript:;" id="editar"><i class="squire ico-editar-blue" style="margin-right: 5px; color:#41B6FF;"></i>  Editar</a>`
                    }
                  }else{
                    botonIngresar =  `<a id="despachado" href="javascript:;" class="dropdown-item"><i  class="mdi mdi-check-circle font-size-16 text-success me-1">Despachar</i></a> `
                  }


                  let acciones = `
                  
                  <div class="dropdown mb-0">
                      <a class="btn btn-link text-muted dropdown-toggle p-1 mt-n2" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                          <i class="uil uil-ellipsis-v font-size-20"></i>
                      </a>
                    
                      <div class="dropdown-menu dropdown-menu-end" data-popper-placement="top-end" style="position: absolute; inset: auto 0px 0px auto; margin: 0px; transform: translate(0px, -42px);">
                          <a class="dropdown-item"  href="javascript:;" id="imprimir"><i class="squire ico-pdf" style="margin-right: 5px;color:red;"></i>  Imprimir</a>`
                          +botonEditar+
                          
                          `<a class="dropdown-item" href="javascript:;" id="correo"><i class="squire ico-outlook" style="margin-right: 5px;"></i>  Enviar correo</a>`
                          +botonEnviarElectronica+
                          `<a class="dropdown-item" href="javascript:;" id="ver"><i class="fas fa-eye" style="margin-right: 5px;"></i>  Ver factura</a>`
                          +botonIngresar+
                          
                          `
                          
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
        $('#imprimir', row).off('click');
        $('#imprimir', row).on('click', () => {
          
          if(data.isElectronica){

            this.openModalImprimir(this.imprimir,data.id.toString());
          }else{
            this.invoceService.imprimirCotizacion(data.id.toString());
            
          }
         
          
        });

          /* BOTON EDITAR  */
        // $('#editar', row).off('click');
        // $('#editar', row).on('click', () => {
        //   // this.router.navigateByUrl('terceros/'+data.id) 
        //   this.router.navigateByUrl("facturacion/editar/"+data.id);
          
        // });


          /* BOTON Ingresar  */
        // $('#despachado', row).off('click');
        // $('#despachado', row).on('click', () => {
        //   // this.router.navigateByUrl('terceros/'+data.id) 
        //   this.Despachar(data.numero);
          
        // });


          /* BOTON previewIngreso  */
        // $('#ver', row).off('click');
        // $('#ver', row).on('click', () => {
        //   // this.router.navigateByUrl('terceros/'+data.id) 
        //   this.router.navigateByUrl("facturacion/preview/"+data.id);
          
        // });

        /* BOTON CORREO  */
        // $('#correo', row).off('click');
        // $('#correo', row).on('click', () => {


          


          // this.openModalCorreo(this.myModal,data);
          
        // });
        /* BOTON FIRMAR  */
        // $('#dian', row).off('click');
        // $('#dian', row).on('click', () => {

        //   if(data.despachado){

        //       this.FirmarFactura(data.numero);
        //   }else{
        //     new MetodosShared().AlertError('ESTA FACTURA NO HA SIDO DESPACHADA.');
        //   }
          


          // this.openModalCorreo(this.myModal,data);
          
        // });
        return row;
      },
      
    });
  }
  updateListado(){
    this.invoceService.actualizarListadoCotizaciones();
  }
  newCotizacion(){
    this.router.navigateByUrl('facturacion/nueva-cotizacion');
  }
  
  limpiarFiltro(){}
  BusquedaAvanzada(){}
  openModalImprimir(imprimir,id) {
    this.facturaAImprimir = id;
		this.modalImprimir = this.modalService.open(imprimir, { size: 'lg',centered: true });
  }

  cerrarModalImprimir(){
    this.modalImprimir.close()
  }
  imprimirPrefactura(){
    this.invoceService.imprimirCotizacion(this.facturaAImprimir);
  }
  imprimirELECTRONICA(){}
  imprimirFACTURATECH(){}


  obtenerVendedores(){
    this.config.SubjectdataVendedores.subscribe(resp => {
      this.vendedores = resp;
  
    });
  }

  obtenerClientes(){
    this.config.SubjectdataCliente.subscribe(resp => {
      this.clientes = resp;
      this.filtroClientes = new BehaviorSubject<ModelTerceroCompleto[]>(this.clientes);
    });
  }
  obtenerFormaDepago(){
    this.tables.SubjectdataFP.subscribe(resp => {
      this.formasPago = resp;
    });
  }

  

}
