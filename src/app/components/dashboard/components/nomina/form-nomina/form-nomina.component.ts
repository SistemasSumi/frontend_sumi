import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { EmpleadosService } from '../NEmpleados/Empleados.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
declare var $;
import moment from 'moment';
import { NovedadesModalComponent } from '../novedades-modal/novedades-modal.component';
import { DeduccionesModalComponent } from '../deducciones-modal/deducciones-modal.component';
import { IngresosModalComponent } from '../ingresos-modal/ingresos-modal.component';

@Component({
  selector: 'app-form-nomina',
  templateUrl: './form-nomina.component.html',
  styleUrls: ['./form-nomina.component.css']
})
export class FormNominaComponent implements OnInit {

  TIPO = '';
  modalNovedades: NgbModalRef;
  modalIngresos: NgbModalRef;
  modalDeducciones: NgbModalRef;

  
  
  

 
 table:any = $('').DataTable({});

  constructor(private router:Router, private EmpService:EmpleadosService, private auth:SeguridadService,private modalService  : NgbModal) { }

  ngOnInit() {
    // this.llenarTableEmpleados();
  }

  // llenarTable(idtable:string,data,columns,nameButton){
    
    
  //   this.table.destroy();
  //   var tokenid =  this.auth.currentUser.getTokenUser();
  //   var beforeSend = function (xhr) {
  //     xhr.setRequestHeader('Authorization', 'Token ' +tokenid);
  //   }
  //   $.ajaxSetup({
  //     beforeSend: beforeSend
  //   });

  //   this.table =  $('#Table'+idtable).DataTable({
  //     retrieve: true,
  //     responsive: true,
  //     autoWidth: true,
  //     pageLength: 5,   
  //     lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "Todos"]],
  //     language: environment.languageDataTable,
  //     data:data,
  //     columns:columns,
  //     columnDefs:[
  //         { responsivePriority: 1, targets: 0 },
  //         { responsivePriority: 2, targets: 2 },
  //         { responsivePriority: 3, targets: 3 },
  //         { responsivePriority: 4, targets: 4 },
  //         { responsivePriority: 5, targets: 7 },
          
          
  //         // { "width": "80%", "targets": 2 },
  //         {
  //           targets:[0],
  //           class:'plus-info',
  //           orderable: false,
  //           render: function(data,type,row){
  //               return null;
  //           }
  //         },
  //         {
  //           "targets":[1],
  //           "class":'text-left text-nowrap',
  //           "orderable": true,
  //           render: function(data,type,row){
  //               return data;
  //           }
  //         },


  //         {
  //           "targets": [2],
  //           "class": "text-left text-nowrap",
  //           "orderable": true,
  //           "render": function(data, type, row) {
  //             return data; // No se aplica tratamiento especial a este campo
  //           }
  //         },
  //         {
  //           targets: [3],
  //           class: "text-left text-nowrap",
  //           orderable: true,
  //           render: function(data, type, row) {
  //             let action = `<a href="javascript:void(0);" class="open-modal">${data}</a>`
  //             return action; // No se aplica tratamiento especial a este campo
  //           }
  //         },
  //         {
  //           "targets": [4],
  //           "class": "text-left text-nowrap",
  //           "orderable": true,
  //           "render": function(data, type, row) {
  //             return data; // No se aplica tratamiento especial a este campo
  //           }
  //         },
  //         {
  //           targets: [5],
  //           class: "text-left text-nowrap",
  //           orderable: true,
  //           render: function(data, type, row) {
  //             let action = `<a href="javascript:void(0);" class="open-modal-ingresos">${data}</a>`
  //             return action; // No se aplica tratamiento especial a este campo
  //           }
  //         },
  //         {
  //           targets: [6],
  //           class: "text-left text-nowrap",
  //           orderable: true,
  //           render: function(data, type, row) {
  //             let action = `<a href="javascript:void(0);" class="open-modal-deducciones">${data}</a>`
  //             return action; // No se aplica tratamiento especial a este campo
  //           }
  //         },
  //         {
  //           "targets": [7],
  //           "class": "text-left text-nowrap",
  //           "orderable": true,
  //           "render": function(data, type, row) {
  //             return data; // No se aplica tratamiento especial a este campo
  //           }
  //         },
  //     ],
      
  //     rowCallback: (row: Node, data: any, index: number) => {
  //       const self = this;
  //       // Unbind first in order to avoid any duplicate handler
  //       // (see https://github.com/l-lin/angular-datatables/issues/87)
  //       // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
  //       // deprecated in favor of `off` and `on`

  //       /* ver  */
  //       if (!$('.open-modal', row).data('events')) {
  //         // Agrega el event listener
  //         $(row).on('click', '.open-modal', function () {
  //           const rowData = self.table.row($(this).closest('tr')).data();
  //           self.openModalNovedades();
  //         });
  //       }
  //       if(!$('.open-modal-ingresos', row).data('events')){
  //         console.log('modal ingresos')
  //         $(row).on('click', '.open-modal-ingresos', function () {
  //           const rowData = self.table.row($(this).closest('tr')).data();
  //           self.openModalIngresos();
  //         });
  //       }
  //       if(!$('.open-modal-deducciones', row).data('events')){
  //         $(row).on('click', '.open-modal-deducciones', function () {
  //           const rowData = self.table.row($(this).closest('tr')).data();
  //           self.openModalDeducciones();
  //         });
  //       }
       
  //       $('#ver', row).off('click');
  //       $('#ver', row).on('click', () => {
      
  //         const ObjEmpleado =  JSON.stringify(data);;
  //         localStorage.setItem('empleadoEdit', ObjEmpleado)
  //         this.router.navigate(['/preview','empleado']);
  //       });
  //       return row;
  //     }
  //   });
  // }
  detalleNomina = [{index:1,nombre:'Nombre Empleado',novedades:25000,basico:1300000,ingresos:20000,deducciones:20000,neto:1300000},
                    {index:1,nombre:'Nombre Empleado2',novedades:25000,basico:1300000,ingresos:20000,deducciones:20000,neto:1300000}
                  ]

  openModalNovedades() {
    // this.TIPO = 'NOVEDAD';
		this.modalNovedades = this.modalService.open(NovedadesModalComponent, { size: 'lg',centered: true });
  }
  openModalIngresos() {
    // this.TIPO = 'NOVEDAD';
		this.modalIngresos = this.modalService.open(IngresosModalComponent, { size: 'lg',centered: true });
  }
  openModalDeducciones() {
    // this.TIPO = 'NOVEDAD';
		this.modalDeducciones = this.modalService.open(DeduccionesModalComponent, { size: 'lg',centered: true });
  }
  

  datosPrueba = [
    {
      id:"id",
      indice:"1",
      nombreEmpleado: "Nombre Ejemplo",
      novedades: "Novedades Ejemplo",
      calculoBasico: "Cálculo Básico Ejemplo",
      ingresos: "Ingresos Ejemplo",
      deducciones: "Deducciones Ejemplo",
      neto: "Neto Ejemplo"
    }
    // Puedes agregar más objetos con datos de prueba aquí
  ];


  // llenarTableEmpleados(){
  //   // return this.EmpService.SubjectdataEmpleados.subscribe(resp => {
  //     // console.log(resp)
      
  //     this.llenarTable(
  //       "Empleados",
  //       this.datosPrueba,
        
  //       [
  //         {"data":"id"},
  //         {"data":"indice"},
  //         {"data": "nombreEmpleado"},
  //         {"data": "novedades"},
  //         {"data": "calculoBasico"},
  //         {"data": "ingresos"},
  //         {"data": "deducciones"},
  //         {"data": "neto"},
          
          
  //       ],
  //       "Empleados");

  //       this.table.columns.adjust();
  //       $('#TableEmpleados_filter').html(``);

        
        
  //   //}
  //   //);
    
  // }

}