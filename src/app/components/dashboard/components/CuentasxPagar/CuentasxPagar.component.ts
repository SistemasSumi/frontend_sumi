import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { DatePipe } from 'src/app/pipes/date.pipe';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { IngresoService } from '../inventario/ingresoCompras/Ingreso.service';
import { PurchaseOrder } from '../inventario/ordenDeCompra/models/purchaseOrder';
import { OrdenDeCompraService } from '../inventario/ordenDeCompra/ordenDeCompra.service';
import { StockService } from '../inventario/stock/stock.service';
declare var $;

@Component({
  selector: 'app-CuentasxPagar',
  templateUrl: './CuentasxPagar.component.html',
  styleUrls: ['./CuentasxPagar.component.css']
})
export class CuentasxPagarComponent implements OnInit {

  table:any = $('').DataTable({});
  txtbuscarCXP:string;
  constructor(private route: ActivatedRoute,private ingresoService:IngresoService, private router: Router,private ordenService:OrdenDeCompraService, private auth:SeguridadService, private cp:CurrencyPipe, private stock:StockService) { }

  ngOnInit() {
    this.llenarTableCxp();
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
          { responsivePriority: 4, targets: 2 },
          { responsivePriority: 5, targets: -3 },
          { responsivePriority: 3, targets: -1 },
          { responsivePriority: 6, targets: 3},
          { responsivePriority: 7, targets: 4},
          { responsivePriority: 8, targets: 5},
          { responsivePriority: 9, targets: 6},
          { responsivePriority: 10, targets: 7},
          { responsivePriority: 11, targets: 8},
          { responsivePriority: 12, targets: 9},
          { responsivePriority: 13, targets: 10},
          { responsivePriority: 14, targets: 11},
          
       
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
            targets:[4],
         
            orderable: true,
            render: function(data,type,row){
               return data;
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
              let datetime = new DatePipe();
              let fecha = datetime.transform(data);
              return fecha;
            }
          },
          {
            targets:[7],
        
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
            targets:[8],
        
            orderable: true,
            render: function(data,type,row){
                let iva = cp.transform(data);
                return iva;
            }
          },
          {
            targets:[9],
         
            orderable: true,
            render: function(data,type,row){
              let total = cp.transform(data);
              return total;
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
              let iva = cp.transform(data);
                return iva;
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
                          <a class="dropdown-item"  href="javascript:;" id="imprimirOrden"><i class="squire ico-pdf" style="margin-right: 5px;color:red;"></i>  Imprimir Orden</a>`+
                          `<a class="dropdown-item"  href="javascript:;" id="imprimirIngreso"><i class="squire ico-pdf" style="margin-right: 5px;color:red;"></i>  Imprimir Ingreso</a>`+
                          `<a class="dropdown-item" href="javascript:;" id="previewIngreso" style="margin-right: 5px;"><i class="fas fa-eye" style="margin-right: 5px;"></i>  INGRESO</a> 
                          
                        
                     
                          
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
        $('#imprimirOrden', row).off('click');
        $('#imprimirOrden', row).on('click', () => {
          
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Generando PDF..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
          this.ordenService.buscarEimprimir(data.ingreso.orden.id.toString()).subscribe((resp:PurchaseOrder)=> {
            Swal.close();
            this.ordenService.imprimir(resp); 
         
          },(ex) => {
            
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'SarpSoft',
              text: 'Error al generar el PDF!',
            });




          });



          
        });

        

          /* BOTON Ingresar  */
        $('#imprimirIngreso', row).off('click');
        $('#imprimirIngreso', row).on('click', () => {
          // this.router.navigateByUrl('terceros/'+data.id) 
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Generando PDF..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
          this.ingresoService.buscarEImprimir(data.ingreso.id.toString()).subscribe((resp:any)=> {
            Swal.close();
            this.ingresoService.imprimir(resp); 
         
          },(ex) => {
            
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'SarpSoft',
              text: 'Error al generar el PDF!',
            });




          });
          
        });


          /* BOTON previewIngreso  */
        $('#previewIngreso', row).off('click');
        $('#previewIngreso', row).on('click', () => {
          // this.router.navigateByUrl('terceros/'+data.id) 
          this.router.navigateByUrl("purchaseOrder/inventoryEntryPreview/"+data.ingreso.orden.id);
          
        });

       
        return row;
      }
    });
  }

  llenarTableCxp(){
    return this.stock.getCxp().subscribe(resp => {
      this.llenarTable(
        "cxp",
        resp,
        [
        
        {"data":"id"},
        {"data":"ingreso.orden.numero"},
        {"data":"factura"},
        {"data":"proveedor.nombreComercial"},
        {"data":"formaPago.nombre"},
        {"data":"fecha"},
        {"data":"fechaVencimiento"},
        {"data":"estado"},
        {"data":"base"},
        {"data":"iva"},
        {"data":"ingreso.descuento"},
        {"data":"reteFuente"},
        
        {"data":"valorTotal"},
        {"data":"valorAbono"},
        {"data":"valorAbono"},
    
        ],
        "cxp",this.cp);

        this.table.columns.adjust();
        $('#Tablecxp_filter').html(``);

        
        
    });
    
  }
  
  resetTable(){
    // this.table.destroy();
    this.llenarTableCxp();
  }

}