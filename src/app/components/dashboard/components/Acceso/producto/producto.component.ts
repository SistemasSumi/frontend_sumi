import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductosService } from './productos.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { environment } from 'src/environments/environment';

declare var $;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  
  formProducto: FormGroup;
  formProductoEdit: FormGroup;

  registrar:Boolean = true;
  editar:Boolean = false;

  table:any = $('').DataTable({});

  constructor(private auth:SeguridadService,private formBuilder: FormBuilder,private productoService:ProductosService,private  toastr: ToastrService) {
    this.llenarProductos();
   }
  
  

   selectItemProducto(data){
    console.log(data);
    let valorCompra = data.precioCompra.replace(/[$,]/g,'');
    let valorVenta = data.precioVenta.replace(/[$,]/g,'');
    this.formProductoEdit = this.formBuilder.group({
      

      idProducto: [data.idProducto,{
        validators:[
          Validators.required,
        ]
      }],  
      code: [data.code,{
        validators:[
          Validators.required,
        ]
      }],   
      nombre: [data.nombre,{
        validators:[
          Validators.required,
        ]
      }],
      marca: [data.marca,{
        validators:[
          Validators.required,
        ]
      }],
      precioCompra: [valorCompra,{
        validators:[
      
        ]
      }],
      precioVenta: [valorVenta,{
        validators:[

        ]
      }],
      observacion: [data.observacion,{
        validators:[

        ]
      }],
      stock: [data.stock,{
        validators:[

        ]
      }],
    

    });
  }

  editProducto(){
    this.productoService.editProducto(this.formProductoEdit).subscribe(resp => {
      this.llenarProductos();
      this.toastr.success("Nuevo Producto actualizado.","Sistema");
      this.resetFormProductos();
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


  createNewProducto(){
    this.productoService.createNewProducto(this.formProducto).subscribe(resp => {
      this.llenarProductos();
      this.toastr.success("Nuevo Producto registrado.","Sistema");
      this.resetFormProductos();
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
          this.selectItemProducto(data);

          
          
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


  llenarProductos(){
    this.table.destroy();
    this.productoService.getproductos().subscribe(resp => {
      console.log(resp);
      
      this.llenarTable(
        "Productos",
        this.productoService.productosData,
        
        [
        {"data":"idProducto"},
        {"data":"code"},
        {"data":"nombre"},
        {"data":"marca"},
        {"data":"precioCompra"},
        {"data":"precioVenta"},
        {"data":"stock"},
        {"data":"observacion"},
        {"data":"observacion"},
        
        ],
        "Producto");

        this.table.columns.adjust()
    }) 
  }



  resetFormProductos(){
    //  this.registrar = false;
    //  this.editar = false;
    $("#formProductos").trigger("reset");
  }



  inicializarFormProducto(){
    this.formProducto = this.formBuilder.group({  
      code: ['',{
        validators:[
          Validators.required,
        ]
      }],   
      nombre: ['',{
        validators:[
          Validators.required,
        ]
      }],
      marca: ['',{
        validators:[
          Validators.required,
        ]
      }],
      precioCompra: ['',{
        validators:[
      
        ]
      }],
      precioVenta: ['',{
        validators:[

        ]
      }],
      observacion: ['',{
        validators:[

        ]
      }],
            
    });
  }



  ngOnInit(): void {
    this.inicializarFormProducto();
  }

}
