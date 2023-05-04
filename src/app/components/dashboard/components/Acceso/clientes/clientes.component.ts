import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from './clientes.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClientesModel } from '../../../../../models/clientes.model';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from '../../../../../../environments/environment';
declare var $;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  formCliente: FormGroup;
  formClienteEdit: FormGroup;
  

  registrar:Boolean = false;
  editar:Boolean = false;


  clientesSubject: BehaviorSubject<ClientesModel[]>
  clientesData:ClientesModel[] = [];

  table:any = $('').DataTable({});

 

  constructor(private formBuilder: FormBuilder,private clientesService:ClientesService,private  toastr: ToastrService,private auth: SeguridadService) {
  
    this.clientesSubject = new BehaviorSubject<ClientesModel[]>(this.clientesData)
    this.llenarClientes();
    this.inicializarFormCliente();

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
                '<a class="dropdown-item" id="editar'+idtable+'" href="javascript:;"><i class="fa fa-edit" ></i>&nbsp Editar  '+name+' </a>'+
                '<div class="dropdown-divider"></div>'+
                '<a class="dropdown-item"  id="eliminar'+idtable+'" style="color:red;" href="javascript:;"><i class="fa fa-trash-alt"></i>&nbsp; Eliminar '+name+'</a>'+
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
          this.registrar = true;
          this.editar = true;
          this.selectItemBarber(data);

          
          
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


  llenarClientes(){
    this.table.destroy();
    this.clientesService.getClientes().subscribe(resp => {
      console.log(resp);
      
      this.llenarTable(
        "Clientes",
        this.clientesService.clientesData,
        
        [
        {"data":"id"},
        {"data":"documento"},
        {"data":"nombres"},
        {"data":"apellidos"},
        {"data":"telefono"},
        {"data":"direccion"},
        {"data":"fecha_nacimiento"},
        {"data":"usuario.username"},
        {"data":"usuario"},
        ],
        "Cliente");

        this.table.columns.adjust()
    }) 
  }

  createNewCliente(){
    this.clientesService.createNewCliente(this.formCliente).subscribe(resp => {
      this.llenarClientes();
      this.toastr.success("Nuevo Cliente registrado.","Sistema");
      this.resetFormCliente();
    },(ex) => {
      console.log(ex.error);
      
      if(ex.error.documento){
        console.log(ex.error.documento);
        if (ex.error.documento[0] === "Ya existe Cliente con este documento:.") {
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: "Ya existe Cliente con ese documento.",
            
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



  resetFormCliente(){
     this.registrar = false;
     this.editar = false;
    $("#formClientes").trigger("reset");
  }

  inicializarFormCliente(){
    this.formCliente = this.formBuilder.group({
      
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

  selectItemBarber(data){
    console.log(data);
    
    this.formClienteEdit = this.formBuilder.group({
      
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
  

  editBarber(){
    this.clientesService.editCliente(this.formClienteEdit).subscribe(resp => {
      this.editar = false;
      this.llenarClientes()
      this.toastr.success("Cliente actualizado.","Sistema");
      this.resetFormCliente();
    },(ex) => {
      console.log(ex);
      
      if(ex.error.documento){
        console.log(ex.error.documento);
        if (ex.error.documento[0] === "Ya existe Cliente con este documento:.") {
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: "Ya existe Cliente con ese documento.",
            
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
