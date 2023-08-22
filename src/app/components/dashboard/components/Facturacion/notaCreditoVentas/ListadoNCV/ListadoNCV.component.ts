import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { BooleanPipe } from 'src/app/pipes/Boolean.pipe';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NotaCreditoCompras } from '../../../inventario/notaCredito/models/notaCreditoCompras';
import { NotaCreditoComprasService } from '../../../inventario/notaCredito/notaCreditoCompras.service';
import { DatePipe } from 'src/app/pipes/date.pipe';
import { NotaCreditoVentasService } from '../NotaCreditoVentas.service';
declare var $;

@Component({
  selector: 'app-ListadoNCV',
  templateUrl: './ListadoNCV.component.html',
  styleUrls: ['./ListadoNCV.component.css']
})
export class ListadoNCVComponent implements OnInit {

  urlActual:string;

  NotaCreditoAContabilizar:number;
  numeroDeNotaCreditoProveedor:string;
  modalContabilizar: NgbModalRef;

  table:any = $('').DataTable({});
  txtbuscarNota:string;


  @ViewChild('content') myModal: any;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private notaService:NotaCreditoVentasService, 
    private auth:SeguridadService, 
    ) { }

  ngOnInit() {
    this.llenarTableOrdenes();
  }

  newNotaCredito(){
    this.router.navigate(['addNotaCompras'], {relativeTo:this.route});
  }


  llenarTable(idtable:string,data,columns,nameButton){
    

    let cp:CurrencyPipe = new CurrencyPipe('en-US');

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
                let numero = `<p>`+data+`</p>`;;

                if(row.contabilizado){
                numero = `<p style="color: green; font-weight: bold;">`+data+`</p>`;
                }
                if(row.anulada){
                numero = `<p style="color: red; font-weight: bold;">`+data+`</p>`;
                }

                return numero;
            }
          },
          {
            targets:[3],
            class:'text-center',
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
              if(data){

                return "Electrónica";
              } else{
                return "POS";

              } 
            }
          },
          {
            targets:[5],
            class:'text-center',
            orderable: true,
            render: function(data,type,row){
                return data;
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
                let subtotal = cp.transform(data);
                return subtotal;
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
                let rete = cp.transform(data);
                return rete;
            }
          },
          {
            targets:[10],
         
            orderable: true,
            render: function(data,type,row){
              let total = cp.transform(data);
              return total;
            }
          },
          {
            targets:[11],
            class:'text-left',
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
                  let botonConta = "";
                  let botonAnular = "";
                
                  if(row.contabilizado == false){
                    botonConta =  `<a class="dropdown-item" id="contabilizar" href="javascript:;" style="margin-right: 5px;"><i class="fas fa-money-check-alt" style="margin-right: 5px; color:green;"></i> CONTABILIZAR</a> `
                    
                  }
                  if(row.anulada == false){
                    botonAnular =  `<a class="dropdown-item" id="anular" href="javascript:;" style="margin-right: 5px;"><i class="fas fa-window-close" style="margin-right: 5px; color:orange;"></i> ANULAR</a> `
                    
                  }


                  let acciones = `
                  
                  <div class="dropdown mb-0">
                      <a class="btn btn-link text-muted dropdown-toggle p-1 mt-n2" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                          <i class="uil uil-ellipsis-v font-size-20"></i>
                      </a>
                    
                      <div class="dropdown-menu dropdown-menu-end" data-popper-placement="top-end" style="position: absolute; inset: auto 0px 0px auto; margin: 0px; transform: translate(0px, -42px);">
                          <a class="dropdown-item"  href="javascript:;" id="imprimir"><i class="squire ico-pdf" style="margin-right: 5px;color:red;"></i>  Imprimir</a>`
                          +botonAnular+
                          ``

                          +botonConta+
                          `
                          
                      </div>
                  </div>
                  
                  `
                  
              
        
                  return acciones;
                  
              }
          },
      ],
      rowCallback: (row: Node, data: NotaCreditoCompras, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
        // deprecated in favor of `off` and `on`

        /* IMPRIMIR  */
        $('#imprimir', row).off('click');
        $('#imprimir', row).on('click', () => {
          
          this.notaService.imprimir(data);
  
          // Swal.fire({
          //   allowOutsideClick: false,
          //   icon: 'info',
          //   title: 'Generando PDF..',
          //   text:'Espere por favor..'
          // });
          // Swal.showLoading();
          // this.ordenService.buscarEimprimir(data.id.toString()).subscribe((resp:PurchaseOrder)=> {
          //   Swal.close();
          //   this.ordenService.imprimir(resp); 
         
          // },(ex) => {
            
          //   Swal.close();
          //   Swal.fire({
          //     icon: 'error',
          //     title: 'SarpSoft',
          //     text: 'Error al generar el PDF!',
          //   });




          // });



          
        });

          /* BOTON EDITAR  */
        $('#editar', row).off('click');
        $('#editar', row).on('click', () => {
          // this.router.navigateByUrl('terceros/'+data.id) 
          // this.router.navigateByUrl("purchaseOrder/EditPurchaseOrder/"+data.id);
          
        });


          /* BOTON Ingresar  */
        $('#ingresar', row).off('click');
        $('#ingresar', row).on('click', () => {
          // this.router.navigateByUrl('terceros/'+data.id) 
          // this.router.navigateByUrl("purchaseOrder/inventoryEntry/"+data.id);
          
        });


          /* BOTON previewIngreso  */
        $('#previewIngreso', row).off('click');
        $('#previewIngreso', row).on('click', () => {
          // this.router.navigateByUrl('terceros/'+data.id) 
          // this.router.navigateByUrl("purchaseOrder/inventoryEntryPreview/"+data.id);
          
        });

        /* BOTON CORREO  */
        $('#contabilizar', row).off('click');
        $('#contabilizar', row).on('click', () => {


          


          this.openModalContabilizar(this.myModal,data.id);
          
        });
        return row;
      }
    });
  }


  llenarTableOrdenes(){
    return this.notaService.SubjectdataNota.subscribe(resp => {
      this.llenarTable(
        "Notas",
        resp,
        [
        
        {"data":"id"},
        {"data":"numero"},
        {"data":"cliente.nombreComercial"},
        {"data":"cxc.numero"},
        {"data":"isElectronica"},
        {"data":"tipoNota"},
        {"data":"fecha"},
        {"data":"subtotal"},
        {"data":"iva"},
        {"data":"retencion"},
        {"data":"total"},
        {"data":"usuario"},
        {"data":"usuario"},
        ],
        "Nota");

        this.table.columns.adjust();
        $('#TableNotas_filter').html(``);

        
        
    });
    
  }

  openModalContabilizar(content,id:number) {
    this.NotaCreditoAContabilizar = id;
		this.modalContabilizar = this.modalService.open(content, { size: 'sm',centered: true });
  }

  cerrarModalContabilizar(){
    this.NotaCreditoAContabilizar = null;
    this.numeroDeNotaCreditoProveedor = "";
    this.modalContabilizar.close();
 
  }

  contabilizar(){
    if(this.NotaCreditoAContabilizar <= 0){
      Swal.fire({
        icon: 'error',
        title: 'Sarp Soft',
        text:'Error no se ha seleccionado ninguna nota credito..'
      });
    }
    if(this.numeroDeNotaCreditoProveedor == "" || this.numeroDeNotaCreditoProveedor == undefined){
      Swal.fire({
        icon: 'error',
        title: 'Sarp Soft',
        text:'Error debe ingresar el numero de nota proporcionado por su proveedor..'
      });
    }

    // this.notaService.ContabilizarNota(this.NotaCreditoAContabilizar,this.numeroDeNotaCreditoProveedor).subscribe(resp => {
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Sarp Soft',
    //     text:'Contabilizada con exito..'
    //   });
    //   this.cerrarModalContabilizar();
    //   this.notaService.cargarNotas();
    // });
  }


}
