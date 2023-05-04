import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TablasBasicasService } from '../../../components/tablas-basicas/tablas-basicas.service';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { EmpleadosModel } from '../../../../../models/empleados.model';
declare var $;
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit,AfterViewInit,OnChanges {
  table: any;
  
  empleados:any[]=[];

  @Input() DATA    : Observable<any>;
  @Input() CABEZERA: [];
  @Input() NAME    : string;

  @Input() COLUMNS: any;
  @Input() COLUMNS_DEFS: any;

  @Output()
  itemEdit: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  itemDelete: EventEmitter<any> = new EventEmitter<any>();

  column_defs:Object[] = [];
  


  constructor( private auth:SeguridadService) {
    
  }
 
 
 
   ngOnChanges(changes: SimpleChanges): void {
    if (!this.DATA) {
      throw new TypeError("'DATA' LA DATA DE TIPO OBSERVABLE ES REQUERIDA PARA USAR ESTE COMPONENTE")
    }
    if (!this.CABEZERA) {
      throw new TypeError("'CABEZERA' LA CABEZERA O HEAD DE TIPO LISTA O TUPLA PARA LA TABLA ES REQUERIDA PARA USAR ESTE COMPONENTE EJEMPLO ['ID','NOMBRE','ACCIONES']")
    }
    if (!this.COLUMNS) {
      throw new TypeError("'COLUMNS'  COLUMNS DE TIPO TUPLA O LISTA ES REQUERIDA PARA USAR ESTE COMPONENTE")
    }
  }
  
  ngAfterViewInit(): void {

  }

  obtenerColumnsDefs(nombre){
    this.column_defs = [
      {
          targets:[-1],
          class:'text-center botones',
          orderable: false,
          render: function(data,type,row){
              let name = nombre;
              return '<div class="btn-group">'+
              '<button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color: #4caf50;color:#f5f5f5;">'+
                'Acciones <i class="fa fa-caret-down"></i>'+
              '</button>'+
              '<div class="dropdown-menu">'+
              '<a class="dropdown-item" href="#"><i class="fa fa-eye"></i>&nbsp Ver detalle</a>'+
              '<a class="dropdown-item" id="btnEditar" href="javascript:;"><i class="fa fa-edit" ></i>&nbsp Editar  '+name+' </a>'+
              '<div class="dropdown-divider"></div>'+
              '<a class="dropdown-item"  id="btnEliminar" style="color:red;" href="javascript:;"><i class="fa fa-trash-alt"></i>&nbsp; Eliminar '+name+'</a>'+
              '</div>'+
            '</div>'
              
          }
        },
    ];
    if (this.COLUMNS_DEFS) {

      for (let x in this.COLUMNS_DEFS){
        this.column_defs.push(this.COLUMNS_DEFS[x]);
      }

      return this.column_defs;
    }else{

      return this.column_defs;
    }
  }

  obtenerHeaders():any[]{

    var head = [];
    if (this.CABEZERA != null && this.CABEZERA != []) {
      
      head = this.CABEZERA
    }else {
      return null;
    }
   
    return head;
  }


  obtenerName(){
    if (this.NAME) {
      return this.NAME
    }else{
      return "";
    }
  }

  obtenerData(){
    if (this.empleados) {
      return this.empleados
    }else{
      return [];
    }
  }


  ngOnInit(): void {
    this.DATA.subscribe(resp => {
      this.empleados = resp;
      this.llenarTable(this.obtenerData(),this.obtenerColumnsDefs(this.obtenerName()));
    })
    console.log(this.column_defs);
    
   
    

  }
  

    llenarTable(DATA,column_defsl) {
    var tokenid =  this.auth.currentUser.getTokenUser();
    var beforeSend = function (xhr) {
      xhr.setRequestHeader('Authorization', 'Token ' +tokenid);
    }
    $.ajaxSetup({
      beforeSend: beforeSend
    });
    this.table =  $('#DataTable').DataTable({
      responsive: true,
      autoWidth: true,
      pageLength: 5,   
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "Todos"]],
      language: environment.languageDataTable,
      data:DATA,
      columns:this.COLUMNS,
      columnDefs:column_defsl,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
        // deprecated in favor of `off` and `on`

        /* BOTON EDITAR  */
        $('#btnEditar', row).off('click');
        $('#btnEditar', row).on('click', () => {
          // this.editar = true;
          this.itemEdit.emit(data);
          
          
        });

          /* BOTON ELIMINAR  */
        $('#btnEliminar', row).off('click');
        $('#btnEliminar', row).on('click', () => {
        
         
        });
        return row;
      }
  });
  }
}
