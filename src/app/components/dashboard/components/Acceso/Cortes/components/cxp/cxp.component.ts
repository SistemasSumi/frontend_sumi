import { Component, OnInit } from '@angular/core';
import { CortesService } from '../../cortes.service';
import { ToastrService } from 'ngx-toastr';
import { SeguridadService } from '../../../../../../auth/seguridad.service';
import { TablasBasicasService } from '../../../../tablas-basicas/tablas-basicas.service';
import { CortesModel } from '../../../../../../../models/cortes.model';
import { environment } from '../../../../../../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

declare var $;

@Component({
  selector: 'app-cxp',
  templateUrl: './cxp.component.html',
  styleUrls: ['./cxp.component.css']
})
export class CxpComponent implements OnInit {

  table:any = $('').DataTable({});
  public dataBarber$: Observable<any>;

  public idBarbeero = 0;

  public totalDeuda = 0;


  constructor(public tablasBasicas:TablasBasicasService,private auth:SeguridadService,private  toastr: ToastrService,private cortes:CortesService,private formBuilder: FormBuilder) {
    this.getDataBarber();
   }

  ngOnInit() {
     this.llenarCxp(0);
  }

  getDataBarber(): void {
    this.dataBarber$ = this.tablasBasicas.getBarberos();
  }



  onChange(deviceValue) {
    // this.tipoServicio = deviceValue;
   
    this.llenarCxp(deviceValue);




    // I want to do something here with the new selectedDevice, but what I
    // get here is always the last selection, not the one I just selected.
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
          orderable: false,
          render: function(data,type,row){
              return '';
          }
        },
        {
            targets:[-1],
            class:'text-center',
            orderable: false,
            render: function(data,type,row){
                // console.log(data);
                
               let cadena = '';
                if(data){
                  cadena = '<a class="btn btn-xs btn-green fs-10px ps-2 pe-2" style="color:white;">PAGADO</a>';
                }
                else{
                  cadena = '<a class="btn btn-xs btn-warning fs-10px ps-2 pe-2" style="color:white;">PENDIENTE</a>';
                }
                return cadena;
                
            }
        },
    ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
        // deprecated in favor of `off` and `on`

        /* BOTON EDITAR  */
        $('#editar'+idtable, row).off('click');
        $('#editar'+idtable, row).on('click', () => {
          // this.registrar = true;
          // this.editar = true;
          // this.selectItemBarber(data);

          
          
        });

          /* BOTON ELIMINAR  */
        $('#eliminar'+idtable, row).off('click');
        $('#eliminar'+idtable, row).on('click', () => {
          if (idtable === "Cargo") {
           console.log(data['cargo']+"eliminado");
           
          }else if (idtable === "Color"){
           
          }else if (idtable === "Labores"){
            // this.selectItemLabor(data);
          }
         
        });
        return row;
      }
  });
  }

  llenarCxp(idBarbero:number){
    this.table.destroy();
    this.cortes.getCxp(idBarbero).subscribe(resp => {
      console.log(resp);
      this.totalDeuda = resp;
      this.llenarTable(
        "Cxp",
        this.cortes.cxpData,
        
        [
        {"data":"id"},
        {"data":"corte"},
        {"data":"barbero.nombres"},
        {"data":"fecha_creacion"},
        {"data":"total"},
        {"data":"estado"},     
        ],
        "Cxp");

        this.table.columns.adjust()
    }) 
  }



}
