import { Component, OnInit, AfterViewInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { InstitucionalService } from '../institucional/institucional.service';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { CurrencyPipe } from '@angular/common';
import { environment } from '../../../../../../environments/environment.prod';
moment.locale('es')
declare var $;




@Component({
  selector: 'app-comercializado',
  templateUrl: './comercializado.component.html',
  styleUrls: ['./comercializado.component.css']
})
export class ComercializadoComponent implements  OnInit, AfterViewInit,AfterContentChecked {

  dataProductos: any;
  datastock: any;

  table:any = $('').DataTable({});


  constructor(private ref: ChangeDetectorRef,private  toastr: ToastrService,public formBuilder:FormBuilder, public tablasBasicas:InstitucionalService, private auth: SeguridadService,private cp:CurrencyPipe) { }

  ngAfterViewInit(): void {
    this.llenarStockProductos();
  }

  ngAfterContentChecked(): void {
  
    this.ref.detectChanges();

 }

  ngOnInit() {
    // this.llenarStock();
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
          { responsivePriority: 3, targets: 6 },
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
                  let name = nameButton;
                  let cadena = '';
              
                  if(row.estado){
                      cadena = '<div class="alert alert-success"><strong>Habilitado!</strong> </div>'
                  }else{
                      
                      cadena = '<div class="alert alert-warning"><strong>Deshabilitado!</strong> </div>'
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
          // this.editar = true;
          if (idtable === "Barberos") {
            // this.selectItemBarber(data);
          }else if (idtable === "Servicios"){
          //  this.selectItemServicio(data);
          }else if (idtable === "Labores"){
            // this.selectItemLabor(data);
          }else if (idtable === "TipoEmp"){
            // this.selectItemTipoEmp(data);
          }else if (idtable === "SemanaAnio"){
            // this.selectItemSemana(data);
          }else if (idtable === "Procesos"){
            // this.selectItemProceso(data);
          }else if (idtable === "FuncionesEmp"){
            // this.selectItemFuncionesEmpleados(data);
          }

          
          
        });

          /* BOTON ELIMINAR  */
        $('#eliminar'+idtable, row).off('click');
        $('#eliminar'+idtable, row).on('click', () => {
          if (idtable === "Cargo") {
           // console.log(data['cargo']+"eliminado");
           
          }else if (idtable === "Color"){
           
          }else if (idtable === "Labores"){
            // this.selectItemLabor(data);
          }
         
        });
        return row;
      }
  });
  }


  llenarTableProducto(idtable:string,data,columns,nameButton){
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
          { responsivePriority: 3, targets: 4 },
          {
            targets:[0],
            class:'text-center',
            orderable: false,
            render: function(data,type,row){
                return '';
            }
          },
          {
            targets:[4],
            class:'text-center',
            orderable: false,
            render: function(data,type,row){
                let unidades = row.unidades;
                if(unidades > 0){
                  return unidades;
                }else{
                  return '<span class="badge bg-danger rounded-0">Agotado!</span>';
                }
                
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
          // this.editar = true;
          if (idtable === "Barberos") {
            // this.selectItemBarber(data);
          }else if (idtable === "Servicios"){
          //  this.selectItemServicio(data);
          }else if (idtable === "Labores"){
            // this.selectItemLabor(data);
          }else if (idtable === "TipoEmp"){
            // this.selectItemTipoEmp(data);
          }else if (idtable === "SemanaAnio"){
            // this.selectItemSemana(data);
          }else if (idtable === "Procesos"){
            // this.selectItemProceso(data);
          }else if (idtable === "FuncionesEmp"){
            // this.selectItemFuncionesEmpleados(data);
          }

          
          
        });

          /* BOTON ELIMINAR  */
        $('#eliminar'+idtable, row).off('click');
        $('#eliminar'+idtable, row).on('click', () => {
          if (idtable === "Cargo") {
           // console.log(data['cargo']+"eliminado");
           
          }else if (idtable === "Color"){
           
          }else if (idtable === "Labores"){
            // this.selectItemLabor(data);
          }
         
        });
        return row;
      }
  });
  }

  llenarTableCosto(idtable:string,data,columns,nameButton){
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
            targets:[6],
            class:'text-center',
        
          },
          {
            targets:[8],
            class:'text-left',
            orderable: false,
            render: function(data,type,row){
                return '<select class="form-select form-select-lg">'+
                  '<option>'+row.valorventa+'</option>'+
                  '<option>'+row.valorventa2+'</option>'+
                  '<option>'+row.valorventa3+'</option>'+
                '</select>';
                
            }
          },
          {
            targets:[-1],
            class:'text-center',
            orderable: false,
            render: function(data,type,row){
                let name = nameButton;
                let cadena = '';
            
                if(row.estado){
                    cadena = '<div class="alert alert-success"><strong>Habilitado!</strong> </div>'
                }else{
                    
                    cadena = '<div class="alert alert-warning"><strong>Deshabilitado!</strong> </div>'
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
          // this.editar = true;
          if (idtable === "Barberos") {
            // this.selectItemBarber(data);
          }else if (idtable === "Servicios"){
          //  this.selectItemServicio(data);
          }else if (idtable === "Labores"){
            // this.selectItemLabor(data);
          }else if (idtable === "TipoEmp"){
            // this.selectItemTipoEmp(data);
          }else if (idtable === "SemanaAnio"){
            // this.selectItemSemana(data);
          }else if (idtable === "Procesos"){
            // this.selectItemProceso(data);
          }else if (idtable === "FuncionesEmp"){
            // this.selectItemFuncionesEmpleados(data);
          }

          
          
        });

          /* BOTON ELIMINAR  */
        $('#eliminar'+idtable, row).off('click');
        $('#eliminar'+idtable, row).on('click', () => {
          if (idtable === "Cargo") {
           // console.log(data['cargo']+"eliminado");
           
          }else if (idtable === "Color"){
           
          }else if (idtable === "Labores"){
            // this.selectItemLabor(data);
          }
         
        });
        return row;
      }
  });
  }

  tabClick(tab) {
    // this.editar = false;
    if(tab.index === 0){

      this.table.destroy();
      this.llenarTableProducto(
      "Productos",
      this.dataProductos,
      
      [
      {"data":"id"},
      {"data":"codigodebarra"},
      {"data":"nombre"},
      {"data":"marca"},
      {"data":"unidades"},
      {"data":"valorventa"},
      {"data":"valorventa2"},
      {"data":"valorventa3"},
      {"data":"ubicacion"},

      ],
      "Productos");

     

    }else if(tab.index === 1){
     
     this.llenarStock();
     
    }else if(tab.index === 2){
    
      this.llenarStockCosto();  
 
    }else if(tab.index === 3){
    
      // this.llenarTiposEmp();
    }else if(tab.index === 4){
    
      // this.llenarSemanasAnio();
    }else if(tab.index === 5){
       // console.log("pendiente");
       
    }else if(tab.index === 6){
    
      // this.llenarProcesos();
    }else if(tab.index === 7){
    
      // this.llenarFuncionesEmpleados();
    }

  }


llenarStock(){
    this.tablasBasicas.getstockTat().subscribe((resp:any) => {
      this.datastock = resp.data;
      // console.log(this.datastock);
      this.table.destroy();
      this.llenarTable(
        "stockLotes",
        this.datastock,
        [
        {"data":"id"},
        {"data":"codigodebarra"},
        {"data":"nombreymarcaunico"},
        {"data":"marca"},
        {"data":"lote"},
        {"data":"vencimiento"},
        {"data":"unidades"},
        {"data":"ubicacion"},
        {"data":"marca"},
        
        ],
        "stock");

       this.table.columns.adjust();
    })
}

llenarStockCosto(){
  this.tablasBasicas.getstockTat().subscribe((resp:any) => {
    this.datastock = resp.data;
    // console.log(this.datastock);
    this.table.destroy();
    this.llenarTableCosto(
      "stockCosto",
      this.datastock,
      [
      {"data":"id"},
      {"data":"codigodebarra"},
      {"data":"nombreymarcaunico"},
      {"data":"marca"},
      {"data":"lote"},
      {"data":"vencimiento"},
      {"data":"unidades"},
      {"data":"valorcompraunidad"},
      {"data":"valorventa"},
      {"data":"ubicacion"},
      {"data":"marca"},
      
      ],
      "stock");

     this.table.columns.adjust();
  })
}

llenarStockProductos(){
  this.tablasBasicas.getstockProductoComercializado().subscribe((resp:any) => {
    this.dataProductos = resp.data;
    // console.log(this.dataProductos);
    

      this.tabClick({"index":0}); // tabs de cargos 
      this.table.columns.adjust();

  })
}



}
