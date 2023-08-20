import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import { EmpleadosService } from '../Empleados.service';
declare var $;
import moment from 'moment';
@Component({
  selector: 'app-listadoEmpleado',
  templateUrl: './listadoEmpleado.component.html',
  styleUrls: ['./listadoEmpleado.component.css']
})
export class ListadoEmpleadoComponent implements OnInit {
  table:any = $('').DataTable({});

  constructor(private router:Router, private EmpService:EmpleadosService, private auth:SeguridadService) { }

  ngOnInit() {
    this.llenarTableEmpleados();
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
          { responsivePriority: 3, targets: -1 },
          { responsivePriority: 4, targets: 2 },
          { responsivePriority: 5, targets: 13 },
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
            "targets": [1],
            "class": "text-center",
            "orderable": true,
            "render": function(data, type, row) {
              return `<img src="`+data+`" class="avatar-sm rounded-circle" 
              alt="Avatar" />`; // No se aplica tratamiento especial a este campo
            }
          },
          {
            "targets": [2],
            "class": "text-left text-nowrap",
            "orderable": true,
            "render": function(data, type, row) {
              let nombres = row.primerNombre+' '+row.segundoNombre 
              return nombres; // No se aplica tratamiento especial a este campo
            }
          },
          {
            targets:[3],
            class:'text-left text-nowrap',
            orderable: true,
            render: function(data,type,row){
              let apellidos = row.primerApellido+' '+row.segundoApellido 
              return apellidos;
            } 
          },
          {
            "targets": [4],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // No se aplica tratamiento especial a este campo
            }
          },
          {
            "targets": [5],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              
              return moment(data).format('DD MMMM YYYY');; // Mantener el valor original para ordenación y otros tipos
            }
          },
          {
            "targets": [6],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // No se aplica tratamiento especial a este campo
            }
          },
          {
            "targets": [7],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // No se aplica tratamiento especial a este campo
            }
          },
          {
            "targets": [8],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // No se aplica tratamiento especial a este campo
            }
          },
          {
            "targets": [9],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // No se aplica tratamiento especial a este campo
            }
          },
          {
            "targets": [10],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // No se aplica tratamiento especial a este campo
            }
          },
          {
            "targets": [11],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // Convertir a mayúsculas para este campo
            }
          },
          {
            "targets": [12],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // No se aplica tratamiento especial a este campo
            }
          },
          {
            "targets": [13],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(data); // Tratamiento con CurrencyPipe de Angular para valores
            }
          },
          {
            "targets": [14],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // Convertir a mayúsculas para este campo
            }
          },
          {
            "targets": [15],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // Convertir a mayúsculas para este campo
            }
          },
          {
            "targets": [16],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // Convertir a mayúsculas para este campo
            }
          },
          {
            "targets": [17],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // Convertir a mayúsculas para este campo
            }
          },
          {
            "targets": [18],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // Convertir a mayúsculas para este campo
            }
          },
          {
            "targets": [19],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // No se aplica tratamiento especial a este campo
            }
          },
          {
            "targets": [20],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // Convertir a mayúsculas para este campo
            }
          },
          {
            "targets": [21],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              
              return moment(data).format('DD MMMM YYYY');; // Mantener el valor original para ordenación y otros tipos
            }
          },
          {
            "targets": [22],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              
              return moment(data).format('DD MMMM YYYY');; // Mantener el valor original para ordenación y otros tipos
            }
          },
          {
            "targets": [23],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // Convertir a mayúsculas para este campo
            }
          },
          {
            "targets": [24],
            "class": "text-left",
            "orderable": true,
            "render": function(data, type, row) {
              return data; // No se aplica tratamiento especial a este campo
            }
          },
          
         
          
          {
              targets:[-1],
              class:'text-center font-size-18',
              orderable: false,
              render: function(data,type,row){
                  


                  let acciones = `<a class="text-primary"  href="javascript:;" id="ver"><i class="fas fa-eye"></i> </a>`
                  
              
        
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

        /* ver  */
       
        $('#ver', row).off('click');
        $('#ver', row).on('click', () => {
          

          
       
          const ObjEmpleado =  JSON.stringify(data);;
          localStorage.setItem('empleadoEdit', ObjEmpleado)
          this.router.navigate(['/preview','empleado']);
          


          
        });


       
        return row;
      }
    });
  }


  llenarTableEmpleados(){
    return this.EmpService.SubjectdataEmpleados.subscribe(resp => {
      this.llenarTable(
        "Empleados",
        resp,
        [
        
          {"data": "id"},
          {"data": "foto"},
          {"data": "primerNombre"},
          {"data": "primerApellido"},
          {"data": "documento"},
          {"data": "fechaNacimiento"},
          {"data": "correo"},
          {"data": "telefono"},
          {"data": "direccion"},
          {"data": "Cargo"},
          {"data": "formaDepago.nombre"},
          {"data": "banco"},
          {"data": "noCuenta"},
          {"data": "contrato.salarioBase"},
          {"data": "contrato.eps.tercero"},
          {"data": "contrato.arl.tercero"},
          {"data": "contrato.fondoPension.tercero"},
          {"data": "contrato.fondoCesantias.tercero.nombreComercial"},
          {"data": "contrato.cajaCompensacion.tercero"},
          {"data": "contrato.riesgo.nombre"},
          {"data": "contrato.tipoTrabajador.nombre"},
          {"data": "contrato.fechaInicioContrato"},
          {"data": "contrato.fechaFinalContrato"},
          {"data": "contrato.tipoContrato.nombre"},
          {"data": "contrato.noContrato"},
          {"data": "contrato.noContrato"}

        
    
        ],
        "Empleados");

        this.table.columns.adjust();
        $('#TableEmpleados_filter').html(``);

        
        
    });
    
  }

}
