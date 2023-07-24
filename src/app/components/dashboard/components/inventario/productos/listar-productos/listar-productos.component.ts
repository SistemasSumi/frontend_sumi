import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import Swal from 'sweetalert2';
declare var $;
import { StockService } from '../../stock/stock.service';
import { environment } from 'src/environments/environment';
import { CurrencyPipe } from '@angular/common';
import { BooleanPipe } from 'src/app/pipes/Boolean.pipe';
import { DatePipe } from 'src/app/pipes/date.pipe';
import { Router } from '@angular/router';
import { AcortarTextPipe } from 'src/app/pipes/acortarText.pipe';


@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  table:any = $('').DataTable({});
  txtbuscarProducto:string;

  constructor(private route:Router, private cp:CurrencyPipe,private stock:StockService,private auth:SeguridadService) { }

  ngOnInit() {
    this.llenarTableProductos();
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
            targets:[2],
            class:'text-normal',
            orderable: true,
            render: function(data,type,row){
              let acortar = new AcortarTextPipe()  
              return acortar.transform(data,"60");
            }
          },
          
          {
            targets:[4],
         
            orderable: true,
            render: function(data,type,row){
                return data
            }
          },
          {
            targets:[5],
     
            orderable: true,
            render: function(data,type,row){
                return data
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
                let iva = new BooleanPipe().transform(data);
                return iva;
            }
          },
          {
            targets:[9],
         
            orderable: true,
            render: function(data,type,row){
              let iva = new BooleanPipe().transform(data);
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
                
              return data
            }
          },
          {
            targets:[12],
        
            orderable: true,
            render: function(data,type,row){
                
              return data
            }
          },
          {
            targets:[13],
        
            orderable: true,
            render: function(data,type,row){
                
              return data
            }
          },
          {
            targets:[14],
        
            orderable: true,
            render: function(data,type,row){
                
              return data
            }
          },
          {
            targets:[15],
        
            orderable: true,
            render: function(data,type,row){
                if(data){   
                  return "IVA (19%)"
                }else{
                  return "NO"
                }
             
            }
          },
          {
            targets:[16],
        
            orderable: true,
            render: function(data,type,row){
              let datetime = new DatePipe();
                let fecha = datetime.transform(data);
                return fecha;
            }
          },
          {
            targets:[17],
        
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
                
                  if(row.ingresada == false){
                    botonIngresar =  `<a class="dropdown-item" id="ingresar" href="javascript:;" style="margin-right: 5px;"><i class="squire ico-stock" style="margin-right: 5px; color:#41B6FF;"></i> INGRESAR</a> `
                    botonEditar = ``
                  }else{
                    botonIngresar =  `<a class="dropdown-item" href="javascript:;" id="previewIngreso" style="margin-right: 5px;"><i class="fas fa-eye" style="margin-right: 5px;"></i>  INGRESO</a> `
                  }


                  let acciones = `
                  
                  <div class="dropdown mb-0">
                      <a class="btn btn-link text-muted dropdown-toggle p-1 mt-n2" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                          <i class="uil uil-ellipsis-v font-size-20"></i>
                      </a>
                    
                      <div class="dropdown-menu dropdown-menu-end" data-popper-placement="top-end" style="position: absolute; inset: auto 0px 0px auto; margin: 0px; transform: translate(0px, -42px);">
                      <a class="dropdown-item" href="javascript:;" id="editar"><i class="squire ico-editar-blue" style="margin-right: 5px; color:#41B6FF;"></i>  Editar</a>
                      <a class="dropdown-item" href="javascript:;" id="kardex"><i class="mdi mdi-timeline-help" style="margin-right: 5px; color:#41B6FF;"></i>  Kardex</a>
                          
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

        $('#editar', row).off('click');
        $('#editar', row).on('click', () => {
          this.route.navigateByUrl('productos/editar/'+data.id) 
          // this.router.navigateByUrl('terceros/'+data.id) 
          // this.router.navigateByUrl("purchaseOrder/EditPurchaseOrder/"+data.id);
          
        });


          /* BOTON Ingresar  */
        $('#kardex', row).off('click');
        $('#kardex', row).on('click', () => {
          this.route.navigateByUrl('productos/kardex/'+data.id) 
          // this.router.navigateByUrl("purchaseOrder/inventoryEntry/"+data.id);
          
        });


          /* BOTON previewIngreso  */
        $('#previewIngreso', row).off('click');
        $('#previewIngreso', row).on('click', () => {
          // this.router.navigateByUrl('terceros/'+data.id) 
          // this.router.navigateByUrl("purchaseOrder/inventoryEntryPreview/"+data.id);
          
        });

        /* BOTON CORREO  */
        $('#correo', row).off('click');
        $('#correo', row).on('click', () => {


          


          // this.openModalCorreo(this.myModal,data);
          
        });
        return row;
      }
    });
  }


  llenarTableProductos(){
    return this.stock.SubjectdataProductos.subscribe(resp => {
      this.llenarTable(
        "Productos",
        resp,
        [
        
        {"data":"id"},
        {"data":"codigoDeBarra"},
        {"data":"nombreymarcaunico"},
        {"data":"unidad"},
        {"data":"Filtro"},
        {"data":"invima"},
        {"data":"cum"},
        {"data":"valorCompra"},
        {"data":"fv"},
        {"data":"regulado"},
        {"data":"valorRegulacion"},
        {"data":"stock_min"},
        {"data":"stock_max"},
        {"data":"tipoProducto.nombre"},
        {"data":"bodega.nombre"},
        {"data":"impuesto"},
        {"data":"creado"},
        {"data":"usuario"},
        {"data":"usuario"},
        ],
        "Productos",this.cp);

        this.table.columns.adjust();
        $('#TableProductos_filter').html(``);
       
        
        
    });
    
  }
  
  resetTable(){
    // this.table.destroy();
    this.llenarTableProductos();
  }

}
