import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { DatePipe } from 'src/app/pipes/date.pipe';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../configuracion/Configuracion.service';
import { ModelFormasPago } from '../configuracion/models/ModelFormasPago';
import { ModelTerceroCompleto } from '../configuracion/models/ModelTerceroCompleto';
import { TablesBasicService } from '../configuracion/TablesBasic/tablesBasic.service';
import { FacturacionService } from '../Facturacion/facturacion.service';
import { CuentasxCobrarService } from './cuentasxCobrar.service';
declare var $;


@Component({
  selector: 'app-CuentasxCobrar',
  templateUrl: './CuentasxCobrar.component.html',
  styleUrls: ['./CuentasxCobrar.component.css']
})
export class CuentasxCobrarComponent implements OnInit {

  years: number[];
  meses: any[];

  table:any = $('').DataTable({});

  txtbuscarCXC:string;
  busquedaAvanzada:boolean = false;

  metodos:MetodosShared = new MetodosShared();

  formasPago: ModelFormasPago[] = [];
  clientes: ModelTerceroCompleto[] = [];

  public filtroClientes: BehaviorSubject<ModelTerceroCompleto[]>;

  filtroAvanzado:filtroBusquedas = {
    estado:null,
    factura:null,
    fechaInicial:null,
    fechaFinal:null,
    formaDePago:null,
    cliente:null,
    year:null,
    mes:null,
  };
  

  constructor(
    private route: ActivatedRoute,
    private InvoceService:FacturacionService,
    private router: Router,
    private auth:SeguridadService, 
    private cp:CurrencyPipe,
    private tables:TablesBasicService,
    private config:ConfiguracionService,
    private cxc:CuentasxCobrarService
  ) { 
    this.setYearsDefault();
  }

  ngOnInit() {
    this.llenarTableCxc();
    this.obtenerFormaDepago();
    this.obtenerClientes();
  }

  setYearsDefault(){
    this.years = this.metodos.generateYears();
  }

  setMesesDefault(year:number){
    this.filtroAvanzado.mes = null;
    this.meses = this.metodos.generateMonths(year);
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
        { responsivePriority: 4, targets: 2 },
        { responsivePriority: 5, targets: -3 },
        { responsivePriority: 6, targets: 6},
        { responsivePriority: 7, targets: 12},
        { responsivePriority: 8, targets: 11},
        { responsivePriority: 9, targets: 13},
       
          { "width": "80%", "targets": 2 },
        


     
         
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
              let datetime = new DatePipe();
              let fecha = datetime.transform(data);
              return fecha;
            }
          },
          {
            targets:[6],
        
            orderable: true,
            render: function(data,type,row){
                
              let result = "";
              if(!data){
                result = `
                
                <div class="d-flex">
                <div class="me-2">
                    <i class="mdi mdi-arrow-left-thin-circle-outline text-warning"></i>
                </div>
                <div>
                    <p class="mb-0">PENDIENTE</p>
                </div>
              </div>
                `
              }else{
                result=`
                <div class="d-flex" >
                <div class="me-2">
                    <i class="mdi mdi-check-circle-outline text-success"></i>
                </div>
                <div>
                    <p class="mb-0">PAGADA</p>
                      </div>
                </div>
                `
              }


              return result
            }
          },
          {
            targets:[7],
        
            orderable: true,
            render: function(data,type,row){
                let iva = cp.transform(data);
                return iva;
            }
          },
          {
            targets:[8],
         
            orderable: true,
            render: function(data,type,row){
              let total = cp.transform(data);
              return total;
            }
          },
          {
            targets:[9],
        
            orderable: true,
            render: function(data,type,row){
              let iva = cp.transform(data);
              return iva;
            }
          },
          {
            targets:[10],
        
            orderable: true,
            render: function(data,type,row){
              let iva = cp.transform(data);
              return iva;
            }
          },
          {
            targets:[11],
        
            orderable: true,
            render: function(data,type,row){
              let iva = cp.transform(data);
              return iva;
            }
          },
          {
            targets:[12],
        
            orderable: true,
            render: function(data,type,row){
              let iva = cp.transform(data);
                return iva;
            }
          },
          {
            targets:[13],
        
            orderable: true,
            render: function(data,type,row){
              let saldo = cp.transform(row.valorTotal - row.valorAbono);
                return saldo;
            }
          },
          {
              targets:[-1],
              class:'text-center',
              orderable: false,
              render: function(data,type,row){
                  
                  let notaCredito = '';
                  let notaDebito = '';
                  if(row.notacredito){
                    notaCredito = `<a class="dropdown-item"  href="javascript:;" id="notaCredito"><i class="squire ico-pdf" style="margin-right: 5px;color:red;"></i> Nota crédito</a>`
                  }
                  if(row.notadebito){
                    notaDebito = `<a class="dropdown-item"  href="javascript:;" id="notaDebito"><i class="squire ico-pdf" style="margin-right: 5px;color:red;"></i> Nota débito</a>`
                  }

                  let acciones = `
                  
                  <div class="dropdown mb-0">
                      <a class="btn btn-link text-muted dropdown-toggle p-1 mt-n2" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                          <i class="uil uil-ellipsis-v font-size-20"></i>
                      </a>
                    
                      <div class="dropdown-menu dropdown-menu-end" data-popper-placement="top-end" style="position: absolute; inset: auto 0px 0px auto; margin: 0px; transform: translate(0px, -42px);">
                          <a class="dropdown-item"  href="javascript:;" id="imprimirFactura"><i class="squire ico-pdf" style="margin-right: 5px;color:red;"></i> Factura</a>`+

                          `<a class="dropdown-item" href="javascript:;" id="verFactura" style="margin-right: 5px;"><i class="fas fa-eye" style="margin-right: 5px;"></i> Factura</a> `+
                          `<div  class="dropdown-divider"></div>`+notaCredito+notaDebito+`
                          
                        
                     
                          
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
        $('#imprimirFactura', row).off('click');
        $('#imprimirFactura', row).on('click', () => {
          
          // console.log(data);

          if(data.cxc.isElectronica){

            this.InvoceService.imprimirFactura(data.cxc.id);
          }else{
            this.InvoceService.imprimirPos(data.cxc.id);

          }



          
        });

        

          /* BOTON Ingresar  */
        $('#imprimirIngreso', row).off('click');
        $('#imprimirIngreso', row).on('click', () => {
          // this.router.navigateByUrl('terceros/'+data.id) 
          // Swal.fire({
          //   allowOutsideClick: false,
          //   icon: 'info',
          //   title: 'Generando PDF..',
          //   text:'Espere por favor..'
          // });
          // Swal.showLoading();
          // this.ingresoService.buscarEImprimir(data.ingreso.id.toString()).subscribe((resp:any)=> {
          //   Swal.close();
          //   this.ingresoService.imprimir(resp); 
         
          // },(ex) => {
            
          //   Swal.close();
          //   Swal.fire({
          //     icon: 'error',
          //     title: 'SarpSoft',
          //     text: 'Error al generar el PDF!',
          //   });




          // });
          
        });


          /* BOTON previewIngreso  */
        $('#verFactura', row).off('click');
        $('#verFactura', row).on('click', () => {
          this.router.navigateByUrl("facturacion/preview/"+data.cxc.id);
        });


          /* BOTON previewIngreso  */
        $('#finiquitar', row).off('click');
        $('#finiquitar', row).on('click', () => {
          // new MetodosShared().AlertQuestion(
          //   '¿ SEGURO DESEA FINIQUITAR LA DEUDA ?'
          // ).then((result) => {
          //   if (result.isConfirmed) {
      
      
               
          //     Swal.fire({
          //       allowOutsideClick: false,
          //       icon: 'info',
          //       title: 'Actualizando..',
          //       text:'Espere por favor..'
          //     });
          //     Swal.showLoading();
      
          //     this.cxp.finiquitar(data.ingreso.id).subscribe((resp:any) => {
                
          //       Swal.close();
          //       new MetodosShared().AlertOK('Cuenta por pagar, Actualizada!');
                
      
               
          //       // this.cxp.actualizarCxp();
      
      
                
      
          //     },(ex) => {
          //       // console.log(ex);
          //       Swal.close();
                
          //       let errores ='';
          //       for(let x of ex.error){
              
          //           errores +=`
          //           <div class="alert alert-danger" role="alert" style="text-align: justify;">
          //             ${x}
          //           </div>
          //           `
                  
                  
          //       }
          //       Swal.fire({
          //         icon: 'error',
          //         title: 'Error al guardar.',
          //         html:errores,
          //         confirmButtonColor: '#4acf50',
              
          //       });
              
          //     });
          //   } 
          // });
          
        });

       
        return row;
      }
    });
  }

  llenarTableCxc(){
    return this.cxc.SubjectdataCxc.subscribe(resp => {
      this.llenarTable(
        "cxc",
        resp,
        [
        
        {"data":"id"},
        {"data":"cxc.numero"},
        {"data":"cliente.nombreComercial"},
        {"data":"formaPago.nombre"},
        {"data":"fecha"},
        {"data":"fechaVencimiento"},
        {"data":"estado"},
        {"data":"base"},
        {"data":"iva"},
        {"data":"valorDescuento"},
        {"data":"reteFuente"},
        
        {"data":"valorTotal"},
        {"data":"valorAbono"},
        {"data":"valorAbono"},
        {"data":"valorAbono"},
    
        ],
        "cxc",this.cp);

        this.table.columns.adjust();
        $('#Tablecxc_filter').html(``);

        
        
    });
    
  }
  
  resetTable(){
    // this.table.destroy();
    this.llenarTableCxc();
  }

  obtenerFormaDepago(){
    this.tables.SubjectdataFP.subscribe(resp => {
      this.formasPago = resp;
    });
  }


  obtenerClientes(){
    this.config.SubjectdataCliente.subscribe(resp => {
      this.clientes = resp;
      this.filtroClientes = new BehaviorSubject<ModelTerceroCompleto[]>(this.clientes);
    });
  }

  filtraTerceros(busqueda:string){
    let filtro:ModelTerceroCompleto[] = this.metodos.filtrarArray<ModelTerceroCompleto>(this.clientes,'nombreComercial',busqueda);
    this.filtroClientes.next(filtro);
  }


  limpiarFiltro(){
    this.filtroAvanzado = {
 
      estado:null,
      factura:null,
      fechaInicial:null,
      fechaFinal:null,
      formaDePago:null,
      cliente:null,
      year:null,
      mes:null,
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
    this.cxc.getCxcBusqueda(this.filtroAvanzado).subscribe(() => {
      Swal.close();
    });
  }
}


interface filtroBusquedas {


  cliente:string,
  factura:string,
  estado:boolean,
  formaDePago:string,
  fechaInicial:string,
  fechaFinal:string,
  year:string,
  mes:string,


}