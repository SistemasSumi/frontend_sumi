import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmpleadosService } from '../../empleados.service';
import { EmpleadosModel } from '../../../../../../../models/empleados.model';
import { institucional } from '../../../../../../../models/institucional.model';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TablasBasicasService } from '../../../../tablas-basicas/tablas-basicas.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit,AfterViewInit {
  editar:boolean = false;
  data:Promise<any>;
  empleadosSubject: BehaviorSubject<EmpleadosModel[]>
  empleadosData:EmpleadosModel[] = [];

  dataFinca: any;

  dataCargos: any;
  dataTiposEmpleados: any;
  Columns:any = [
    {"data":"id"},
    {"data":"codigo"},
    {"data":"producto"},
    {"data":"marca"},
    {"data":"lote"},
    {"data":"existencia"},
    {"data":"costo"},
    {"data":"valorventa"},
    {"data":"vence"},
    {"data":"estado"},
    {"data":"estado"},
  ]
  
  COLUMNS_DEFS = [
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
      targets:[9],
      class:'label-estado',
      orderable: false,
      render: function(data,type,row){
        if(data == 1){
          
          return '<label class="label label-success">Disponible</label>';
        }else{
          return '<label class="label label-danger">Agostado</label>';

        }
          
      }
    }
  ];

  CABEZERA = [
    '',
   'COD',
   'PRODUCTO',
   'MARCA',
   'LOTE',
   'EXISTENCIA',
   'VALOR COMPRA',
   'VALOR VENTA',
   'VENCE',
   'ESTADO',
   '',
  ];

  DATA:Observable<institucional[]> = this.empleados.getEmpleados();
  NAME:string = "Producto";
  constructor(public empleados:EmpleadosService,private auth:SeguridadService, private tablasBasicas:TablasBasicasService) { 
    this.empleadosSubject = new BehaviorSubject<EmpleadosModel[]>(this.empleadosData)

 

  }


  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

  
  }

  editarEmpleado(data){
    this.editar  = true;
    this.data = new Promise((resolve, reject) => {
      resolve(data);
    });
    // console.log(data);
      
  }


}
