import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { ConfiguracionService } from '../../Configuracion.service';
import { ModalDescuentoProveedorComponent } from '../modals/ModalDescuentoProveedor/ModalDescuentoProveedor.component';

declare var $;


@Component({
  selector: 'app-ListadoProveedores',
  templateUrl: './ListadoProveedores.component.html',
  styleUrls: ['./ListadoProveedores.component.css']
})
export class ListadoProveedoresComponent implements OnInit {
  table:any = $('').DataTable({});



  idProveedor:number;
  modalDescuentos: NgbModalRef;
  modalRetenciones: NgbModalRef;
  modalContactos: NgbModalRef;
  modalBancos: NgbModalRef;

  @ViewChild('contentDescuentos') 
  private myModalDescuento:any;


  @ViewChild('contentRetenciones') 
  private myModalRetenciones:any;


  @ViewChild('contentContactos') 
  private myModalContactos:any;


  @ViewChild('contentBancos') 
  private myModalBancos:any;



  txtbuscarTercero:string;


  constructor(private modalService: NgbModal,public router:Router,private auth:SeguridadService,private config:ConfiguracionService) { }

  ngOnInit() {
    this.llenarTableTerceros();

  }


  llenarTable(idtable:string,data,columns,nameButton){
    var tokenid =  this.auth.currentUser.getTokenUser();
    var beforeSend = function (xhr) {
      xhr.setRequestHeader('Authorization', 'Token ' +tokenid);
    }
    $.ajaxSetup({
      beforeSend: beforeSend
    });

    this.table =  $('#Table'+idtable).DataTable({
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
          {
            targets:[0],
            class:'text-center',
            width: "4%",
            orderable: false,
            render: function(data,type,row){
                return '';
            }
          },
          {
            targets:[1],
            class:'text-center',
            width: "8%",
            orderable: true,
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
            class:'delimitar',
            
            orderable: true,
            render: function(data,type,row){
                return data;
            }
          },
          {
            targets:[4],
            class:'text-left',
           
            orderable: true,
            render: function(data,type,row){
                return data;
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
            targets:[8],
            class:'delimitar',
           
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
                          <a class="dropdown-item"  href="javascript:;" id="editar"><i class="fas fa-edit text-primary" style="margin-right: 5px;color:red;"></i>  Editar</a>
                          <a class="dropdown-item"  href="javascript:;" id="descuento"><i class="fas fa-percent text-warning" style="margin-right: 5px;color:red;"></i>  Descuentos</a>
                          <a class="dropdown-item"  href="javascript:;" id="retencion"><i class="fas fa-chart-pie text-danger" style="margin-right: 5px;color:red;"></i>  Retenciones</a>
                          <a class="dropdown-item"  href="javascript:;" id="contacto"><i class="fas fa-address-book text-success" style="margin-right: 5px;color:red;"></i>  Datos contacto</a>
                          <a class="dropdown-item"  href="javascript:;" id="bancos"><i class="fas fa-dollar-sign text-success" style="margin-right: 6px;color:red;"></i>  Datos bancarios</a>

                      </div>
                  </div>
                  
                  `



              
                  
              
        
                  return acciones;
                  
              }
          },
      ],
      rowCallback: (row: Node, data: any| Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
        // deprecated in favor of `off` and `on`

        /* BOTON EDITAR  */
        $('#editar', row).off('click');
        $('#editar', row).on('click', () => {
          console.log(data);
          
          this.router.navigateByUrl('terceros/'+data.id) 
          
        });

          /* BOTON ELIMINAR  */
        $('#descuento', row).off('click');
        $('#descuento', row).on('click', () => {
          
          this.openModalDescuento(data.id);
         
        });

        $('#retencion', row).off('click');
        $('#retencion', row).on('click', () => {
          
          this.openModalRetenciones(data.id);
         
        });


        $('#contacto', row).off('click');
        $('#contacto', row).on('click', () => {
          
          this.openModalContactos(data.id);
         
        });

        $('#bancos', row).off('click');
        $('#bancos', row).on('click', () => {
          
          this.openModalBancos(data.id);
         
        });

        return row;
      }
    });
  }

  llenarTableTerceros(){
    this.config.SubjectdataProveedor.subscribe(resp => {
      console.log(resp);
      
      this.table.destroy();
      this.llenarTable(
        "Terceros",
        resp,
        [
        
        {"data":"id"},
        {"data":"tipoDocumento"},
        {"data":"documento"},
        {"data":"nombreComercial"},
        {"data":"direccion"},
        {"data":"departamento.departamento"},
        {"data":"municipio.municipio"},
        {"data":"telefonoContacto"},
        {"data":"formaPago.nombre"},
        {"data":"nombreContacto"},
        {"data":"correoContacto"},
        {"data":"tipoPersona"},
        {"data":"regimen"},
        {"data":"obligaciones"},
        {"data":"matriculaMercantil"},
        {"data":"codigoPostal"},
        {"data":"isContabilidad"},
        {"data":"isCompras"},
        {"data":"tipoPersona"},
        
        ],
        "Tercero");

       this.table.columns.adjust();
       $('#TableTerceros_filter').html(``);
    })
  }

  openModalDescuento( idProveedor) {
    this.idProveedor = idProveedor;
		this.modalDescuentos = this.modalService.open(this.myModalDescuento, { size: 'lg',centered: true });
  }

  openModalRetenciones( idProveedor) {
    this.idProveedor = idProveedor;
		this.modalRetenciones = this.modalService.open(this.myModalRetenciones, { size: 'lg',centered: true });
  }

  openModalContactos(idProveedor) {
    this.idProveedor = idProveedor;
		this.modalContactos = this.modalService.open(this.myModalContactos, { size: 'xl',centered: true });
  }

  openModalBancos(idProveedor) {
    this.idProveedor = idProveedor;
		this.modalBancos = this.modalService.open(this.myModalBancos, { size: 'xl',centered: true });
  }

  cerrarModalBancos(){
 
    this.modalBancos.close();
    
  }
  cerrarModalContactos(){
 
    this.modalContactos.close();
    
  }
  cerrarModalDescuento(){
 
    this.modalDescuentos.close();
    
  }
  cerrarModalRetencion(){
 
    this.modalRetenciones.close();
    
  }


}
