import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { TrasladoFondos } from 'src/app/components/dashboard/reportes/reportesContabilidad/TrasladoFondos';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TrasladosService } from '../Traslados.service';
declare var $;


@Component({
  selector: 'app-ListadoTraslados',
  templateUrl: './ListadoTraslados.component.html',
  styleUrls: ['./ListadoTraslados.component.css']
})
export class ListadoTrasladosComponent implements OnInit {
  table:any = $('').DataTable({});

  constructor(private router:Router, private trasladoService:TrasladosService, private auth:SeguridadService) { }

  ngOnInit() {
    this.llenarTableTraslados();
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
            orderable: false,
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
            class:'text-center',
            orderable: true,
            render: function(data,type,row){
                return `${data.codigo} - ${data.nombre}`;
            } 
          },
          {
            targets:[4],
            class:'text-center',
            orderable: true,
            render: function(data,type,row){
                return `${data.codigo} - ${data.nombre}`;
            } 
          },
          {
            targets:[5],
            class:'text-end',
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
              return data
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
                          <a class="dropdown-item"  href="javascript:;" id="editar"><i class="fas fa-pen" style="margin-right: 5px;"></i>  Editar</a>

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
            let reporte = new TrasladoFondos();
            let report = reporte.ReporteTrasladoFondos(data);
            window.open(report.output('bloburl'), '_blank');
          // Swal.fire({
          //   allowOutsideClick: false,
          //   icon: 'info',
          //   title: 'Generando PDF..',
          //   text:'Espere por favor..'
          // });
          // Swal.showLoading();
          // this.stock.imprimirPagos(data.numero.toString()).subscribe((resp:any)=> {
          //   Swal.close();
          //   console.log(resp)
          //   let reporte = new ComprobanteEgreso();
  
          //   let report = reporte.ReporteComprobanteEgreso(resp);
          //   window.open(report.output('bloburl'), '_blank');
         
          // },(ex) => {
            
          //   Swal.close();
          //   Swal.fire({
          //     icon: 'error',
          //     title: 'SarpSoft',
          //     text: 'Error al generar el PDF!',
          //   });




          // });



          
        });
        $('#editar', row).off('click');
        $('#editar', row).on('click', () => {
          

          
       
          const numeroEditParam =  data.id.toString();
          this.router.navigate(['traslados','editar'], { queryParams: { numeroEdit: numeroEditParam } });
          


          
        });


       
        return row;
      }
    });
  }

  llenarTableTraslados(){
    return this.trasladoService.SubjectdataTraslado.subscribe(resp => {
      this.llenarTable(
        "Traslados",
        resp,
        [
        
        {"data":"id"},
        {"data":"numero"},
        {"data":"fecha"},
        {"data":"cuenta_origen"},
        {"data":"cuenta_destino"},
        {"data":"monto"},
        {"data":"concepto"},
        {"data":"concepto"},

        
    
        ],
        "Traslados");

        this.table.columns.adjust();
        $('#TableTraslados_filter').html(``);

        
        
    });
    
  }

}
