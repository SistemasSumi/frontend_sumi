import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ProveedorModel } from '../../../../../models/proveedor.model';
import { ProveedorService } from './proveedor.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

declare var $;


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit { 
  formProveedor: FormGroup;
  formProveedorEdit: FormGroup;
  



  registrar:Boolean = false;
  editar:Boolean = false;
  viewProveedor:Boolean = false;
  viewProveedorCurrent:any;


  ProveedorSubject: BehaviorSubject<ProveedorModel[]>
  ProveedoresData:ProveedorModel[] = [];

  table:any = $('').DataTable({});

 

  constructor(private formBuilder: FormBuilder,private proveedoresService:ProveedorService,private  toastr: ToastrService,private auth: SeguridadService) {
  
    this.ProveedorSubject = new BehaviorSubject<ProveedorModel[]>(this.ProveedoresData)
    this.llenarProveedor();
    this.inicializarFormProveedor();

  }

  ngOnInit(): void {

    
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
                let name = nameButton;
                return '<div class="btn-group">'+
                '<button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color: #4caf50;color:#f5f5f5;">'+
                  'Acciones <i class="fa fa-caret-down"></i>'+
                '</button>'+
                '<div class="dropdown-menu">'+
                '<a class="dropdown-item" id="editar'+idtable+'" href="javascript:;"><i class="fa fa-edit" ></i>&nbsp Ver proveedor </a>'+
                '<div class="dropdown-divider"></div>'+
                '<a class="dropdown-item"  id="eliminar'+idtable+'" style="color:red;" href="javascript:;"><i class="fa fa-marker"></i>&nbsp; Actualizar</a>'+
                '</div>'+
              '</div>'
                
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

          this.viewProveedor = true;
          this.viewProveedorCurrent = data;

          
          
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


  llenarProveedor(){
    this.table.destroy();
    this.proveedoresService.getProveedor().subscribe(resp => {
      // console.log(resp);
      
      this.llenarTable(
        "Proveedores",
        this.proveedoresService.proveedorData,
        
        [
        {"data":"idproveedor"},
        {"data":"documento"},
        {"data":"empresa"},
        {"data":"direccion"},
        {"data":"telefono"},
        {"data":"celular"},
        {"data":"email"},
        {"data":"formapago"},
        {"data":"usuario"},
        ],
        "Proveedor");

        this.table.columns.adjust()
    }) 
  }

  createNewProveedor(){
    this.proveedoresService.createNewProveedor(this.formProveedor).subscribe(resp => {
      this.llenarProveedor();
      this.toastr.success("Nuevo Proveedor registrado.","Sistema");
      this.resetFormProveedor();
    },(ex) => {
      // console.log(ex.error);
      
      if(ex.error.documento){
        // console.log(ex.error.documento);
        if (ex.error.documento[0] === "Ya existe Proveedor con este documento:.") {
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: "Ya existe Proveedor con ese documento.",
            
          })
        }else{
            Swal.fire({
              title: 'Error en los datos',
              icon: 'error',
              text: ex.error,
            
            })
          
        }
        
     
          
      }
    });
  }



  resetFormProveedor(){
     this.registrar = false;
     this.editar = false;
    $("#formProveedor").trigger("reset");
  }

  inicializarFormProveedor(){
    this.formProveedor = this.formBuilder.group({
      
      documento: ['',{
        validators:[
          Validators.required,
        ]
      }],   
      nombres: ['',{
        validators:[
          Validators.required,
        ]
      }],
      apellidos: ['',{
        validators:[
          Validators.required,
        ]
      }],
      telefono: ['',{
        validators:[
      
        ]
      }],
      direccion: ['',{
        validators:[

        ]
      }],
      

    });
  }

  selectItemProveedor(data){
    // console.log(data);
    
    this.formProveedorEdit = this.formBuilder.group({
      
      id: [data.id,{
        validators:[
          Validators.required,
        ]
      }],
      documento: [data.documento,{
        validators:[
          Validators.required,
        ]
      }],   
      nombres: [data.nombres,{
        validators:[
          Validators.required,
        ]
      }],
      apellidos: [data.apellidos,{
        validators:[
          Validators.required,
        ]
      }],
      telefono: [data.telefono,{
        validators:[
      
        ]
      }],
      direccion: [data.direccion,{
        validators:[

        ]
      }],
      usuario: [data.usuario.id,{
        validators:[

        ]
      }],
      

    });
  }
  

  editProveedor(){
    this.proveedoresService.editProveedor(this.formProveedorEdit).subscribe(resp => {
      this.editar = false;
      this.llenarProveedor()
      this.toastr.success("Proveedor actualizado.","Sistema");
      this.resetFormProveedor();
    },(ex) => {
      // console.log(ex);
      
      if(ex.error.documento){
        // console.log(ex.error.documento);
        if (ex.error.documento[0] === "Ya existe Proveedor con este documento:.") {
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: "Ya existe Proveedor con ese documento.",
            
          })
        }else{
            Swal.fire({
              title: 'Error en los datos',
              icon: 'error',
              text: ex.error,
            
            })
          
        }
        
     
          
      }else if(ex.error.usuario){
        Swal.fire({
          title: 'Error en los datos',
          icon: 'error',
          text: ex.error.usuario[0],
        
        })
      }
    });
  }


    
}
