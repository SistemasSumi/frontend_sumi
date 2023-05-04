import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { OrdenCompraExcel } from 'src/app/components/dashboard/reportes/reportesInventario/excel/OrdenCompraExcel';
import { DatePipe } from 'src/app/pipes/date.pipe';
import { DatetimePipe } from 'src/app/pipes/datetime.pipe';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { BasicPurchaseOrder } from '../models/BasicPurchaseOrder';
import { PurchaseOrder } from '../models/purchaseOrder';
import { OrdenDeCompraService } from '../ordenDeCompra.service';
declare var $;


@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  table:any = $('').DataTable({});
  txtbuscarOrden:string;


  @ViewChild('content') myModal: any;

  asunto:string = "";
  destinatario:string;
  mensaje:string;
  ordenAEnviar:BasicPurchaseOrder;
  correoDistinto:boolean = false;

  modalCorreo: NgbModalRef;

  datetime = new DatetimePipe();

  constructor(private modalService: NgbModal,private route: ActivatedRoute, private router: Router,private ordenService:OrdenDeCompraService, private auth:SeguridadService, private cp:CurrencyPipe) { }

  ngOnInit() {
    this.llenarTableOrdenes();
  }


  newPucharseOrder(){
    this.router.navigate(['addPurchaseOrder'], {relativeTo:this.route});
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
                let datetime = new DatePipe();
                let fecha = datetime.transform(data);
                return fecha;
            }
          },
          {
            targets:[5],
     
            orderable: true,
            render: function(data,type,row){
                let iva = cp.transform(data);
                return iva;
            }
          },
          {
            targets:[6],
        
            orderable: true,
            render: function(data,type,row){
                let iva = cp.transform(data);
                return iva;
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
                
                return data;
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
                    botonEditar = `<a class="dropdown-item" href="javascript:;" id="editar"><i class="squire ico-editar-blue" style="margin-right: 5px; color:#41B6FF;"></i>  Editar</a>`
                  }else{
                    botonIngresar =  `<a class="dropdown-item" href="javascript:;" id="previewIngreso" style="margin-right: 5px;"><i class="fas fa-eye" style="margin-right: 5px;"></i>  INGRESO</a> `
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
                          +botonIngresar+
                          `
                          
                      </div>
                  </div>
                  
                  `
                  
              
        
                  return acciones;
                  
              }
          },
      ],
      rowCallback: (row: Node, data: BasicPurchaseOrder, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
        // deprecated in favor of `off` and `on`

        /* IMPRIMIR  */
        $('#imprimir', row).off('click');
        $('#imprimir', row).on('click', () => {
          
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Generando PDF..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
          this.ordenService.buscarEimprimir(data.id.toString()).subscribe((resp:PurchaseOrder)=> {
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

          /* BOTON EDITAR  */
        $('#editar', row).off('click');
        $('#editar', row).on('click', () => {
          // this.router.navigateByUrl('terceros/'+data.id) 
          this.router.navigateByUrl("purchaseOrder/EditPurchaseOrder/"+data.id);
          
        });


          /* BOTON Ingresar  */
        $('#ingresar', row).off('click');
        $('#ingresar', row).on('click', () => {
          // this.router.navigateByUrl('terceros/'+data.id) 
          this.router.navigateByUrl("purchaseOrder/inventoryEntry/"+data.id);
          
        });


          /* BOTON previewIngreso  */
        $('#previewIngreso', row).off('click');
        $('#previewIngreso', row).on('click', () => {
          // this.router.navigateByUrl('terceros/'+data.id) 
          this.router.navigateByUrl("purchaseOrder/inventoryEntryPreview/"+data.id);
          
        });

        /* BOTON CORREO  */
        $('#correo', row).off('click');
        $('#correo', row).on('click', () => {


          


          this.openModalCorreo(this.myModal,data);
          
        });
        return row;
      }
    });
  }


  llenarTableOrdenes(){
    return this.ordenService.SubjectdataOrdenes.subscribe(resp => {
      this.llenarTable(
        "Ordenes",
        resp,
        [
        
        {"data":"id"},
        {"data":"numero"},
        {"data":"proveedor.nombreComercial"},
        {"data":"formaPago.nombre"},
        {"data":"fecha"},
        {"data":"subtotal"},
        {"data":"iva"},
        {"data":"descuento"},
        {"data":"retencion"},
        {"data":"total"},
        {"data":"usuario"},
        {"data":"usuario"},
        ],
        "Orden",this.cp);

        this.table.columns.adjust();
        $('#TableOrdenes_filter').html(``);

        
        
    });
    
  }
  
  resetTable(){
    // this.table.destroy();
    this.llenarTableOrdenes();
  }


  openModalCorreo(content, orden:BasicPurchaseOrder) {
    this.asunto = "Orden de compra N° "+orden.numero;
    this.destinatario =  orden.proveedor.correo.toLowerCase();
    this.ordenAEnviar = orden;
		this.modalCorreo = this.modalService.open(content, { size: 'lg',centered: true });
  }

  cerrarModalCorreo(){
    this.ordenAEnviar = null;
    this.mensaje = "";
    this.asunto ="";
    this.destinatario ="";
    this.modalCorreo.close();
    this.correoDistinto =false;
  }

  enviarCorreo(){

    let data = this.ordenAEnviar;
    
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Generando PDF..',
      text:'Espere por favor..'
    });
    Swal.showLoading();
    this.ordenService.buscarEimprimir(data.id.toString()).subscribe((resp:PurchaseOrder)=> {
      Swal.close();
      let pdf = this.ordenService.enviar(resp); 
     
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Enviando PDF..',
        text:'Espere por favor..'
      });
      Swal.showLoading(); 


          

      this.ordenService.enviarCorreo(pdf,this.asunto,resp.numero,this.destinatario,this.mensaje).subscribe(resp=>{
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Sarp Soft',
          text:'Correo enviado.'
        });

        this.cerrarModalCorreo();
      },(ex) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Sarp Soft',
          text:'Correo no enviado.'
        });

      }); 

    },(ex) => {
      
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'SarpSoft',
        text: 'Error al generar el PDF!',
      });




    });


  }

  exportarExcel(){
    let reporte = new OrdenCompraExcel();
    this.ordenService.SubjectdataOrdenes.subscribe(resp =>{
      reporte.dowloadExcel(resp);
    });
   

  }
}
