import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { DatePipe } from 'src/app/pipes/date.pipe';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ComprobanteEgreso } from '../../../reportes/reportesContabilidad/ComprobanteEgreso';
import { ComprobanteIngreso } from '../../../reportes/reportesContabilidad/ComprobanteIngreso';
import { FacturacionService } from '../../Facturacion/facturacion.service';
import { StockService } from '../../inventario/stock/stock.service';
declare var $;


@Component({
  selector: 'app-ListadoCI',
  templateUrl: './ListadoCI.component.html',
  styleUrls: ['./ListadoCI.component.css']
})
export class ListadoCIComponent implements OnInit {

  table:any = $('').DataTable({});
  txtbuscarPago:string;
  constructor(private auth:SeguridadService, private cxc:FacturacionService) { }

  ngOnInit() {
      this.llenarTablePagos();
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
          // { responsivePriority: 6, targets: 3},
          
          
       
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
              
              return data;
            }
          },
          {
            targets:[6],
        
            orderable: true,
            render: function(data,type,row){
              return new CurrencyPipe('en_US').transform(data)
               
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
          this.cxc.imprimirPagos(data.numero.toString()).subscribe((resp:any)=> {
            Swal.close();
            console.log(resp)
            let reporte = new ComprobanteIngreso();
  
            let report = reporte.ReporteComprobanteIngreso(resp);
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
    return this.cxc.getPagos().subscribe(resp => {
      
      this.llenarTable(
        "pagos",
        resp,
        [
        
        {"data":"id"},
        {"data":"numero"},
        {"data":"cliente.nombreComercial"},
        {"data":"cuenta.nombre"},
        {"data":"fecha"},
        {"data":"usuario.username"},
        {"data":"total"},
      
        
      
        {"data":"concepto"},
        {"data":"observacion"},
        
    
        ],
        "pagos");

        this.table.columns.adjust();
        $('#Tablepagos_filter').html(``);

        
        
    });
    
  }

}
