import { Component, OnInit, AfterViewInit, ChangeDetectorRef ,AfterContentChecked} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TablasBasicasService } from './tablas-basicas.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { ExitoComponent } from '../../util/mensajes/exito/exito.component';
import { data } from 'jquery';
import { environment } from '../../../../../environments/environment';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common'
moment.locale('es')
declare var $;




@Component({
  selector: 'app-tablas-basicas',
  templateUrl: './tablas-basicas.component.html',
  styleUrls: ['./tablas-basicas.component.css']
})
export class TablasBasicasComponent implements OnInit, AfterViewInit,AfterContentChecked  {
  fechaInit:any;
  fechaFin:any;
  
  editar:boolean = false;

  expand:boolean = false;
  
/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   VARIABLES DE FORMULARIOS DE ACCESO ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */
  

  formBarberos   : FormGroup;
  formBarberosEdit: FormGroup;

  formServicios    : FormGroup;
  formServiciosEdit: FormGroup;

  formConfiguracion    : FormGroup;
  formConfiguracionEdit: FormGroup;


  formColores    : FormGroup;
  formColoresEdit: FormGroup;
  
  formLabores    : FormGroup;
  formLaboresEdit: FormGroup;
  
  formTipoEmp    : FormGroup;
  formTipoEmpEdit: FormGroup;
  
  formSemanasAnio    : FormGroup;
  formSemanasAnioEdit: FormGroup;

  formProcesos    : FormGroup;
  formProcesosEdit: FormGroup;

  formFuncionesEmp    : FormGroup;
  formFuncionesEmpEdit: FormGroup;
  
/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN VARIABLES DE FORMULARIOS DE ACCESO ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */



  table:any = $('').DataTable({});
  dataFinca: any;
  dataUsers: any;
  dataBarber: any;
  dataConfi: any;
  dataServicios: any;
  dataColor: any;
  

  constructor(private ref: ChangeDetectorRef,private  toastr: ToastrService,public formBuilder:FormBuilder, public tablasBasicas:TablasBasicasService, private auth: SeguridadService,private cp:CurrencyPipe) { }
  ngAfterContentChecked(): void {
  
     this.ref.detectChanges();

  }
  
  ngAfterViewInit(): void {
    this.llenarBarberos();  
  }
  

  

  ngOnInit(): void {
    
    this.tablasBasicas.getUsuario().subscribe(resp => {
      this.dataUsers = resp;
    })

    this.tablasBasicas.getFincas().subscribe(resp => {
      this.dataFinca = resp;
    })
    
    this.tablasBasicas.getColores().subscribe(resp => {
      this.dataColor = resp;
    })
 
    this.initFormBarberos();
    this.initFormservicios();
    this.initFormSettings();
    this.initFormLabores();
    this.initFormTiposEmp();
    this.initFormSemanaAnio();
    this.initFormProcesos();
    this.initFormFuncionesEmpleados();

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
          this.editar = true;
          if (idtable === "Barberos") {
            this.selectItemBarber(data);
          }else if (idtable === "Servicios"){
           this.selectItemServicio(data);
          }else if (idtable === "Labores"){
            this.selectItemLabor(data);
          }else if (idtable === "TipoEmp"){
            this.selectItemTipoEmp(data);
          }else if (idtable === "SemanaAnio"){
            this.selectItemSemana(data);
          }else if (idtable === "Procesos"){
            this.selectItemProceso(data);
          }else if (idtable === "FuncionesEmp"){
            this.selectItemFuncionesEmpleados(data);
          }

          
          
        });

          /* BOTON ELIMINAR  */
        $('#eliminar'+idtable, row).off('click');
        $('#eliminar'+idtable, row).on('click', () => {
          if (idtable === "Cargo") {
           // console.log(data['cargo']+"eliminado");
           
          }else if (idtable === "Color"){
           
          }else if (idtable === "Labores"){
            this.selectItemLabor(data);
          }
         
        });
        return row;
      }
  });
  }
 
 


  tabClick(tab) {
    this.editar = false;
    if(tab.index === 0){
      this.table.destroy();
      this.llenarTable(
        "Barberos",
        this.tablasBasicas.barberosData,
        [
        {"data":"id"},
        {"data":"documento"},
        {"data":"nombres"},
        {"data":"apellidos"},
        {"data":"telefono"},
        {"data":"direccion"},
        {"data":"porcentaje"},
        {"data":"usuario.email"},
        {"data":"fecha_creacion"},
        {"data":"fecha_creacion"},
        ],
        "Barbero");

    }else if(tab.index === 1){
     
     this.llenarServicios();
     
    }else if(tab.index === 2){
    
      this.llenarLabores();  
 
    }else if(tab.index === 3){
    
      this.llenarTiposEmp();
    }else if(tab.index === 4){
    
      this.llenarSemanasAnio();
    }else if(tab.index === 5){
       // console.log("pendiente");
       
    }else if(tab.index === 6){
    
      this.llenarProcesos();
    }else if(tab.index === 7){
    
      this.llenarFuncionesEmpleados();
    }

  }

  /* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO CARGO ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */

  llenarBarberos(){
    this.tablasBasicas.getBarberos().subscribe(resp => {
     this.dataBarber = resp;
      this.tabClick({"index":0}); // tabs de cargos 
      this.table.columns.adjust();
    })
  }

  createNewBarber(){
    this.tablasBasicas.createNewBarbero(this.formBarberos).subscribe(resp => {
      this.llenarBarberos()
      this.toastr.success("Nuevo Barbero registrado.","Sistema");
      this.resetFormBarber();
    },(ex) => {
      if(ex.error.cargo){
        // console.log(ex.error.cargo);
        if (ex.error.cargo[0] === "Ya existe Barbero con este documento:.") {
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: "Ya existe Barbero con ese documento.",
            
          })
        }else{
            Swal.fire({
              title: 'Error en los datos',
              icon: 'error',
              text: ex.error.cargo[0],
            
            })
          
        }
        
     
          
      }
    });
  }

  selectItemBarber(data){
    let porcentaje = data.porcentaje.replace(/[ %]/g,'');
    this.formBarberosEdit = this.formBuilder.group({
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
      porcentaje: [porcentaje,{
        validators:[
          Validators.required,
        ]
      }],
      direccion: [data.direccion,{
        validators:[
          
        ]
      }],
      telefono: [data.telefono,{
        validators:[
          Validators.required,
        ]
      }],
      users: new FormControl(this.dataBarber.filter(x => x.id == data.usuario.id)[0].id,{ validators:[Validators.required,]})
    });
    // console.log(this.formBarberosEdit.value);
  }

  editBarber(){
    this.tablasBasicas.editBarbero(this.formBarberosEdit).subscribe(resp => {
      this.editar = false;
      this.llenarBarberos()
      this.toastr.success("Barbero actualizado.","Sistema");
      this.resetFormBarber();
    },(ex) => {
      if(ex.error.documento){
        // console.log(ex.error.documento);
        if (ex.error.cargo[0] === "Ya existe Barbero con este documento:.") {
          Swal.fire({
            title: 'Error en el documento',
            icon: 'error',
            text: "Ya existe Barbero con este documento.",
            
          })
        }else{
            Swal.fire({
              title: 'Error en los datos',
              icon: 'error',
              text: ex.error.cargo[0],
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

  resetFormBarber(){
    this.editar = false;
    $("#formBarberos").trigger("reset");
  }

  initFormBarberos(){
    
    this.formBarberos = this.formBuilder.group({
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
      porcentaje: ['',{
        validators:[
          Validators.required,
        ]
      }],
      direccion: ['',{
        validators:[
          
        ]
      }],
      telefono: ['',{
        validators:[
          Validators.required,
        ]
      }],
      users: new FormControl('',{ validators:[Validators.required,]})
    });

    this.formBarberosEdit = this.formBuilder.group({
      id: ['',{
        validators:[
          Validators.required,
        ]
      }],
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
      porcentaje: ['',{
        validators:[
          Validators.required,
        ]
      }],
      direccion: ['',{
        validators:[
          
        ]
      }],
      telefono: ['',{
        validators:[
          Validators.required,
        ]
      }],
      users: new FormControl('',{ validators:[Validators.required,]})
    });
  }
  

  ObtenerErrorCampo(input:string,mensaje:string){
    
    var campo = this.formBarberos.get(input);
    if (campo.hasError('required')) {
        return  mensaje+' es requerido*';
    }

  }
/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO BARBEROS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
 


/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO SERVICIOS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */
llenarServicios(){
    this.table.destroy();
    this.tablasBasicas.getServicios().subscribe(resp => {
      // console.log(resp);
      
      this.llenarTable(
        "Servicios",
        this.tablasBasicas.ServicioData,
        
        [
        {"data":"id"},
        {"data":"nombres"},
        {"data":"valor"},
        {"data":"valor"},
        ],
        "Servicio");

        this.table.columns.adjust()
    }) 
}

createNewServicio(){
  this.tablasBasicas.createNewServicio(this.formServicios).subscribe(resp => {
    this.llenarServicios()
    this.toastr.success("Nuevo Servicio registrado.","Sistema");
    this.resetFormServicios();
  },(ex) => {
    if(true){
      // console.log(ex.error.valor);
  
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: ex.error.cargo[0],
          
          })  
    }
  });
}

selectItemServicio(data){
  let valor = data.valor.replace(/[$,]/g,'');
  
  this.formServiciosEdit = this.formBuilder.group({
    id: [data.id,{
      validators:[
        Validators.required,
      ]
    }],

    nombres: [data.nombres,{
      validators:[
        Validators.required,
      ]
    }],
    valor: [valor,{
      validators:[
        Validators.required,
      ]
    }]
  });
  // console.log(this.formServiciosEdit.value);
}

editServicio(){
  this.tablasBasicas.editServicio(this.formServiciosEdit).subscribe(resp => {
    this.editar = false;
    this.llenarServicios()
    this.toastr.success("Servicio actualizado.","Sistema");
    this.resetFormServicios();
  },(ex) => {
    // console.log(ex);
    
  });
}

resetFormServicios(){
  this.editar = false;
  $("#formServicios").trigger("reset");
}

initFormservicios(){
  
  this.formServicios = this.formBuilder.group({
    nombres: ['',{
      validators:[
        Validators.required,
      ]
    }],
    valor: ['',{
      validators:[
        Validators.required,
      ]
    }]
  });

  this.formServiciosEdit = this.formBuilder.group({
    id: ['',{
      validators:[
        Validators.required,
      ]
    }],
    nombres: ['',{
      validators:[
        Validators.required,
      ]
    }],
    valor: ['',{
      validators:[
        Validators.required,
      ]
    }]
  });
}


ObtenerErrorCampoServicio(input:string,mensaje:string){
  
  var campo = this.formServicios.get(input);
  if (campo.hasError('required')) {
      return  mensaje+' es requerido*';
  }

}




/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO SERVICIOS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
 
/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO COLORES ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */
  
  
   initFormSettings(){
    this.formConfiguracion = this.formBuilder.group({
      ConsecutivoDecuento: ['',{
        validators:[
          Validators.required,
        ]
      }],
      codigoActualizar: ['',{
        validators:[
          Validators.required,
        ]
      }],
    });
    this.formConfiguracionEdit = this.formBuilder.group({
      ConsecutivoDecuento: ['',{
        validators:[
          Validators.required,
        ]
      }],
      codigoActualizar: ['',{
        validators:[
          Validators.required,
        ]
      }],
    });
    
    
  
  }

  createNewConfiguracion(){
    this.tablasBasicas.createNewConfiguracion(this.formConfiguracion).subscribe(resp => {
      // console.log(resp);
      this.llenarSettings();
      this.toastr.success("Configuracion Guardada..","Sitema");
      this.resetFormSettings();
    },(ex) => {
      if(ex.error.color){
        // console.log(ex.error.color);
        if (ex.error.color[0] === "Ya existe Color con este Color:.") {
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: "Ya existe color con ese nombre.",
            
          })
        }else{
            Swal.fire({
              title: 'Error en los datos',
              icon: 'error',
              text: ex.error.color[0],
            
            })
          
        }
        
     
          
      }else if(ex.error.finca){
        // console.log(ex.error.finca);
        
        Swal.fire({
          title: 'Error en los datos',
          icon: 'error',
          text: ex.error.finca[0],
        })
      }
    });
  }


  selectItemSetting(data){
    this.formConfiguracionEdit = this.formBuilder.group({
      id: [data.id,{
        validators:[
          Validators.required,
        ]
      }],
      ConsecutivoDecuento: ['',{
        validators:[
          Validators.required,
        ]
      }],
      codigoActualizar: ['',{
        validators:[
          Validators.required,
        ]
      }],

      finca: new FormControl(this.dataFinca.filter(x => x.id == data.finca.id)[0].id,{ validators:[Validators.required,]})
    });
    
  }

  editSetting(){
    this.tablasBasicas.editColor(this.formConfiguracionEdit).subscribe(resp => {
      this.editar = false;
      this.llenarSettings()
      this.toastr.success("Configuracion Actualizada.","Sitema");
      this.resetFormSettings();
    },(ex) => {
      if(ex.error.color){
        // console.log(ex.error.color);
        if (ex.error.color[0] === "Ya existe Color con este Color:.") {
          Swal.fire({
            title: 'Error en el color',
            icon: 'error',
            text: "Ya existe color con ese nombre.",
            
          })
        }else{
            Swal.fire({
              title: 'Error en el color',
              icon: 'error',
              text: ex.error.color[0],
            }) 
        }
      }else if(ex.error.finca){
        Swal.fire({
          title: 'Error en los datos',
          icon: 'error',
          text: ex.error.finca[0],
        
        })
      }else if(ex.error.id){
        Swal.fire({
          title: 'Error en los datos',
          icon: 'error',
          text: ex.error.id[0],
        
        })
      }
    });
  }


  resetFormSettings(){
    this.editar = false;
    $("#formSettings").trigger("reset");
  }
  

  llenarSettings(){
    this.tablasBasicas.getConfiguracion().subscribe(resp => {
      this.dataConfi = resp;
    }) 
    
  }

  
/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO COLORES ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  

/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO LABORES ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */

llenarLabores(){  
  this.table.destroy();
  this.tablasBasicas.getLabores().subscribe(resp => {
    this.llenarTable(
      "Labores",
      this.tablasBasicas.laboresData,
      [
      {"data":"id"},
      {"data":"labor"},
      {"data":"finca.nombre"},
      {"data":"usuario.email"},
      {"data":"fecha_creacion"},
      {"data":"descripcion"},
      {"data":"usuario.email"},
      ],
      "Labor");
  })

}

initFormLabores(){
  this.formLabores = this.formBuilder.group({
    labor: ['',{
      validators:[
        Validators.required,
      ]
    }],
    descripcion: ['',{
      validators:[

      ]
    }],
    finca: new FormControl('',{ validators:[Validators.required,]})
  });
  this.formLaboresEdit = this.formBuilder.group({
    id: ['',{
      validators:[
        Validators.required,
      ]
    }],
    labor: ['',{
      validators:[
        Validators.required,
      ]
    }],
    descripcion: ['',{
      validators:[
      ]
    }],
    finca: new FormControl('',{ validators:[Validators.required,]})
  });
}


createNewLabor(){
  this.tablasBasicas.createNewLabor(this.formLabores).subscribe(resp => {
    // console.log(resp);
    this.llenarLabores();
    this.toastr.success("Nueva laborr registrada.","SigBan Admin");
    this.resetFormLabores();
  },(ex) => {
    // console.log(ex);
    
    if(ex.error.labor){
      // console.log(ex.error.labor);
      if (ex.error.labor[0] === "Ya existe Labor con este Labor:.") {
        Swal.fire({
          title: 'Error en los datos',
          icon: 'error',
          text: "Ya existe labor con ese nombre.",
          
        })
      }else{
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: ex.error.labor[0],
          
          })
        
      }
      
   
        
    }else if(ex.error.finca){
      // console.log(ex.error.finca);
      
      Swal.fire({
        title: 'Error en los datos',
        icon: 'error',
        text: ex.error.finca[0],
      })
    }else if(ex.error.descripcion){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.descripcion,
      })
    }
  });
}

selectItemLabor(data){
  this.formLaboresEdit = this.formBuilder.group({
    id: [data.id,{
      validators:[
        Validators.required,
      ]
    }],
    labor: [data.labor,{
      validators:[
        Validators.required,
      ]
    }],
    descripcion: [data.descripcion,{
      validators:[
      ]
    }],
    finca: new FormControl(this.dataFinca.filter(x => x.id == data.finca.id)[0].id,{ validators:[Validators.required,]})
  });
  
}

editLabor(){
  this.tablasBasicas.editLabor(this.formLaboresEdit).subscribe(resp => {
    this.editar = false;
    this.llenarLabores()
    this.toastr.success("Labor actualizada.","SigBan Admin");
    this.resetFormLabores();
  },(ex) => {
    if(ex.error.labor){
      // console.log(ex.error.labor);
      if (ex.error.labor[0] === "Ya existe Color con este Color:.") {
        Swal.fire({
          title: 'Error en el color',
          icon: 'error',
          text: "Ya existe color con ese nombre.",
          
        })
      }else{
          Swal.fire({
            title: 'Error en el color',
            icon: 'error',
            text: ex.error.labor[0],
          }) 
      }
    }else if(ex.error.finca){
      Swal.fire({
        title: 'Error en los datos',
        icon: 'error',
        text: ex.error.finca[0],
      
      })
    }else if(ex.error.descripcion){
      Swal.fire({
        title: 'Error en la descripcion',
        icon: 'error',
        text: ex.error.descripcion[0],
      
      })
    }
  });
}

resetFormLabores(){
  this.editar = false;
  $("#formLabores").trigger("reset");
}

ObtenerErrorCampoLabor(){
  var campo = this.formLabores.get('labor');
  if (campo.hasError('required')) {
      return 'El nombre de la labor es obligatorio *';
  }
}

ObtenerErrorCampoFincaLabor(){
  var campo = this.formColores.get('finca');
  if (campo.hasError('required')) {
      return 'debe seleccionar una finca *';
  }
}




/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO LABORES ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO TIPOS DE EMPLEADOS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */

llenarTiposEmp(){  
  this.table.destroy();
  this.tablasBasicas.getTiposEmpleados().subscribe(resp => {
    this.llenarTable(
      "TipoEmp",
      this.tablasBasicas.tipoEmpData,
      [
      {"data":"id"},
      {"data":"tipo"},
      {"data":"descripcion"},
      {"data":"fecha_creacion"},
      {"data":"fecha_creacion"}
      ],
      "Tipo");
  })

}

initFormTiposEmp(){
  this.formTipoEmp = this.formBuilder.group({
    tipo: ['',{
      validators:[
        Validators.required,
      ]
    }],
    descripcion: ['',{
      validators:[

      ]
    }]
  });

  this.formTipoEmpEdit = this.formBuilder.group({
    id: ['',{
      validators:[
        Validators.required,
      ]
    }],
    tipo: ['',{
      validators:[
        Validators.required,
      ]
    }],
    descripcion: ['',{
      validators:[
      ]
    }],
  });
  
}


createNewTipo(){
  this.tablasBasicas.createNewTipoEmp(this.formTipoEmp).subscribe(resp => {

    this.llenarTiposEmp();
    this.toastr.success("Nuevo Tipo de empleado registrado.","SigBan Admin");
    this.resetFormTipoEmp();
  },(ex) => {
    // console.log(ex);
    
    if(ex.error.tipo){
      // console.log(ex.error.tipo);
      if (ex.error.tipo[0] === "Ya existe Tipo con este Tipo:.") {
        Swal.fire({
          title: 'Error en los datos',
          icon: 'error',
          text: "Ya existe tipo con ese nombre.",
          
        })
      }else{
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: ex.error.tipo[0],
          
          })
        
       }
      
    }else if(ex.error.descripcion){
      
      Swal.fire({
        title: 'Error en los datos',
        icon: 'error',
        text: ex.error.descripcion[0],
      })
    }else if(ex.error.descripcion){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.descripcion,
      })
    }
  });
}

selectItemTipoEmp(data){
  this.formTipoEmpEdit = this.formBuilder.group({
    id: [data.id,{
      validators:[
        Validators.required,
      ]
    }],
    tipo: [data.tipo,{
      validators:[
        Validators.required,
      ]
    }],
    descripcion: [data.descripcion,{
      validators:[
      ]
    }],
  });
  
}

editTipoEmp(){
  this.tablasBasicas.editTipoEmp(this.formTipoEmpEdit).subscribe(resp => {
    this.editar = false;
    this.llenarTiposEmp()
    this.toastr.success("Tipo de empleado actualizado.","SigBan Admin");
    this.resetFormTipoEmp();
  },(ex) => {
    if(ex.error.tipo){
      // console.log(ex.error.tipo);
      if (ex.error.tipo[0] === "Ya existe Tipo con este Tipo:.") {
        Swal.fire({
          title: 'Error en el tipo',
          icon: 'error',
          text: "Ya existe tipo de empleado con ese nombre.",
          
        })
      }else{
          Swal.fire({
            title: 'Error en el tipo',
            icon: 'error',
            text: ex.error.tipo[0],
          }) 
      }
    }
    else if(ex.error.descripcion){
      Swal.fire({
        title: 'Error en la descripcion',
        icon: 'error',
        text: ex.error.descripcion[0],
      
      })
    }
  });
}

resetFormTipoEmp(){
  this.editar = false;
  $("#formTipoEmp").trigger("reset");
}

ObtenerErrorCampoTipo(){
  var campo = this.formTipoEmp.get('tipo');
  if (campo.hasError('required')) {
      return 'El nombre de la labor es obligatorio *';
  }
}






/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO TIPOS DE EMPLEADOS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO TIPOS DE EMPLEADOS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */

llenarSemanasAnio(){  
  this.table.destroy();
  this.tablasBasicas.getSemanasAnio().subscribe(resp => {
    this.llenarTable(
      "SemanaAnio",
      this.tablasBasicas.semanasAnioData,
      [
      {"data":"id"},
      {"data":"semana"},
      {"data":"color.color"},
      {"data":"fecha_inicial"},
      {"data":"fecha_final"},
      {"data":"finca.nombre"},
      {"data":"year"},
      {"data":"fecha_creacion"},
      {"data":"fecha_creacion"}
      ],
      "Semana");
  })

}

initFormSemanaAnio(){
  this.formSemanasAnio = this.formBuilder.group({
    semana: ['',{
      validators:[
        Validators.required,
      ]
    }],
    color: new FormControl('',{ validators:[Validators.required,]}),
    finca: new FormControl('',{ validators:[Validators.required,]}),
    fecha_inicial: ['',{
      validators:[
        Validators.required,
      ]
    }],
    fecha_final: ['',{
      validators:[
        Validators.required,
      ]
    }],
    
  });
  this.formSemanasAnioEdit = this.formBuilder.group({
    id: ['',{
      validators:[
        Validators.required,
      ]
    }],
    semana: ['',{
      validators:[
        Validators.required,
      ]
    }],
    color: new FormControl('',{ validators:[Validators.required,]}),
    finca: new FormControl('',{ validators:[Validators.required,]}),
    fecha_inicial: [this.fechaInit,{
      validators:[
        Validators.required,
      ]
    }],
    fecha_final: [this.fechaFin,{
      validators:[
        Validators.required,
      ]
    }]
  });
}


createNewSemana(){
  
  this.tablasBasicas.createNewSemanaAnio(this.formSemanasAnio).subscribe(resp => {

    this.llenarSemanasAnio();
    this.toastr.success("Nuevo semana registrada.","SigBan Admin");
    this.resetFormSemanaAnio();
  },(ex) => {
    
    if(ex.error.semana){
      // console.log(ex.error.seamana);
      if (ex.error.semana[0] === "Ya existe Semana con este Semana:.") {
        Swal.fire({
          title: 'Error en los datos',
          icon: 'error',
          text: "Ya existe semana con ese nombre.",
          
        })
      }else{
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: ex.error.semana[0],
          
          })
        
       }
      
    }else if(ex.error.color){
      
      Swal.fire({
        title: 'Error en los datos',
        icon: 'error',
        text: ex.error.color[0],
      })
    }else if(ex.error.fecha_inicial){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.fecha_inicial[0],
      })
    }else if(ex.error.fecha_final){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.fecha_final[0],
      })
    }
  });
}

selectItemSemana(data){
  const fecha1 = moment(data.fecha_inicial,'MMMM/DD/YYYY').format('MMMM-DD-YYYY');
  const fecha2 = moment(data.fecha_final,'MMMM/DD/YYYY').format('MMMM-DD-YYYY');

  this.fechaInit = moment(fecha1,"MMMM/DD/YYYY").toDate();
  this.fechaFin  = moment(fecha2,"MMMM/DD/YYYY").toDate();

  // console.log(data.fecha_inicial,data.fecha_final);
  // console.log("**********************************");
  // console.log(fecha1,fecha2);
  // console.log(this.fechaInit,this.fechaFin);
  
 
  this.formSemanasAnioEdit = this.formBuilder.group({
    id: [data.id,{
      validators:[
        Validators.required,
      ]
    }],
    semana: [data.semana,{
      validators:[
        Validators.required,
      ]
    }],
    color: new FormControl(this.dataColor.filter(x => x.id == data.color.id)[0].id,{ validators:[Validators.required,]}),
    finca: new FormControl(this.dataFinca.filter(x => x.id == data.finca.id)[0].id,{ validators:[Validators.required,]}),
    fecha_inicial: [this.fechaInit,{
      validators:[
        Validators.required,
      ]
    }],
    fecha_final: [this.fechaFin,{
      validators:[
        Validators.required,
      ]
    }]
  });

  // console.log(this.formSemanasAnioEdit.value);
}

editSemana(){
  this.formSemanasAnioEdit.get('fecha_inicial').setValue(this.fechaInit);
  this.formSemanasAnioEdit.get('fecha_final').setValue(this.fechaFin);

  this.tablasBasicas.editSemana(this.formSemanasAnioEdit).subscribe(resp => {
    this.editar = false;
    this.llenarSemanasAnio()
    this.toastr.success("semana actualizada.","SigBan Admin");
    this.resetFormSemanaAnio();
  },(ex) => {

    if(ex.error.semana){
      // console.log(ex.error.seamana);
      if (ex.error.semana[0] === "Ya existe Semana con este Semana:.") {
        Swal.fire({
          title: 'Error en los datos',
          icon: 'error',
          text: "Ya existe semana con ese nombre.",
          
        })
      }else{
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: ex.error.semana[0],
          
          })
        
       }
      
    }else if(ex.error.color){
      
      Swal.fire({
        title: 'Error en los datos',
        icon: 'error',
        text: ex.error.color[0],
      })
    }else if(ex.error.fecha_inicial){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.fecha_inicial[0],
      })
    }else if(ex.error.fecha_final){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.fecha_final[0],
      })
    }
  });
}

resetFormSemanaAnio(){
  $("#formSemanaAnio").trigger("reset");
  this.editar = false;
}

// ObtenerErrorCampoTipo(){
//   var campo = this.formTipoEmp.get('tipo');
//   if (campo.hasError('required')) {
//       return 'El nombre de la labor es obligatorio *';
//   }
// }






/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO TIPOS DE EMPLEADOS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO PROCESOS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */

llenarProcesos(){  
  this.table.destroy();
  this.tablasBasicas.getProcesos().subscribe(resp => {
    this.llenarTable(
      "Procesos",
      this.tablasBasicas.procesosData,
      [
      {"data":"id"},
      {"data":"proceso"},
      {"data":"finca.nombre"},
      {"data":"fecha_creacion"},
      {"data":"descripcion"},
      {"data":"fecha_creacion"}
      ],
      "Proceso");
  })

}

initFormProcesos(){
  this.formProcesos = this.formBuilder.group({
    proceso: ['',{
      validators:[
        Validators.required,
      ]
    }],
    descripcion: ['',{
      validators:[

      ]
    }],
    finca: new FormControl('',{ validators:[Validators.required,]})
  });
  this.formProcesosEdit = this.formBuilder.group({
    id: ['',{
      validators:[
        Validators.required,
      ]
    }],
    proceso: ['',{
      validators:[
        Validators.required,
      ]
    }],
    descripcion: ['',{
      validators:[

      ]
    }],
    finca: new FormControl('',{ validators:[Validators.required,]})
  });
}


createNewProceso(){
  
  this.tablasBasicas.createNewProceso(this.formProcesos).subscribe(resp => {

    this.llenarProcesos();
    this.toastr.success("Nuevo proceso registrado.","SigBan Admin");
    this.resetFormProcesos();
  },(ex) => {
    // console.log(ex);
    
    if(ex.error.proceso){
      // console.log(ex.error.proceso);
      if (ex.error.proceso[0] === "Ya existe Proceso con este Proceso:.") {
        Swal.fire({
          title: 'Error en los datos',
          icon: 'error',
          text: "Ya existe proceso con ese nombre.",
          
        })
      }else{
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: ex.error.proceso[0],
          
          })
        
       }
      
    }else if(ex.error.finca){
      
      Swal.fire({
        title: 'Error en los datos',
        icon: 'error',
        text: ex.error.finca[0],
      })
    }else if(ex.error.descripcion){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.descripcion[0],
      })
    }else if(ex.error.id){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.id[0],
      })
    }
  });
}

selectItemProceso(data){
  
  this.formProcesosEdit = this.formBuilder.group({
    id: [data.id,{
      validators:[
        Validators.required,
      ]
    }],
    proceso: [data.proceso,{
      validators:[
        Validators.required,
      ]
    }],
    descripcion: [data.descripcion,{
      validators:[

      ]
    }],
    finca: new FormControl(this.dataFinca.filter(x => x.id == data.finca.id)[0].id,{ validators:[Validators.required,]}),
  });
  // console.log(this.formProcesosEdit.value);

}

editProceso(){

  this.tablasBasicas.editProcesos(this.formProcesosEdit).subscribe(resp => {
    this.editar = false;
    this.llenarProcesos()
    this.toastr.success("proceso actualizado.","SigBan Admin");
    this.resetFormProcesos();
  },(ex) => {
    // console.log(ex);
    
    if(ex.error.proceso){
      // console.log(ex.error.proceso);
      if (ex.error.proceso[0] === "Ya existe Proceso con este Proceso:.") {
        Swal.fire({
          title: 'Error en los datos',
          icon: 'error',
          text: "Ya existe proceso con ese nombre.",
          
        })
      }else{
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: ex.error.proceso[0],
          
          })
        
       }
      
    }else if(ex.error.finca){
      
      Swal.fire({
        title: 'Error en los datos',
        icon: 'error',
        text: ex.error.finca[0],
      })
    }else if(ex.error.descripcion){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.descripcion[0],
      })
    }else if(ex.error.id){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.id[0],
      })
    }
  });
}

resetFormProcesos(){
  $("#formProcesos").trigger("reset");
  this.editar = false;
}

// ObtenerErrorCampoTipo(){
//   var campo = this.formTipoEmp.get('tipo');
//   if (campo.hasError('required')) {
//       return 'El nombre de la labor es obligatorio *';
//   }
// }






/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO PROCESOS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */


/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼   METODOS PARA GESTIONAR MI MODELO PROCESOS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */

llenarFuncionesEmpleados(){  
  this.table.destroy();
  this.tablasBasicas.getFuncionesEmpleados().subscribe(resp => {
    this.llenarTable(
      "FuncionesEmp",
      this.tablasBasicas.funcionesEmpleadosData,
      [
      {"data":"id"},
      {"data":"funcion"},
      {"data":"finca.nombre"},
      {"data":"fecha_creacion"},
      {"data":"descripcion"},
      {"data":"fecha_creacion"}
      ],
      "Función");
  })

}

initFormFuncionesEmpleados(){
  this.formFuncionesEmp = this.formBuilder.group({
    funcion: ['',{
      validators:[
        Validators.required,
      ]
    }],
    descripcion: ['',{
      validators:[

      ]
    }],
    finca: new FormControl('',{ validators:[Validators.required,]})
  });
  this.formFuncionesEmpEdit = this.formBuilder.group({
    id: ['',{
      validators:[
        Validators.required,
      ]
    }],
    funcion: ['',{
      validators:[
        Validators.required,
      ]
    }],
    descripcion: ['',{
      validators:[

      ]
    }],
    finca: new FormControl('',{ validators:[Validators.required,]})
  });
}


createNewFuncionesEmpleados(){
  
  this.tablasBasicas.createNewFuncionEmpleado(this.formFuncionesEmp).subscribe(resp => {

    this.llenarFuncionesEmpleados();
    this.toastr.success("Nueva funcion registrada.","SigBan Admin");
    this.resetFormFuncionesEmpleados();
  },(ex) => {
    // console.log(ex);
    
    if(ex.error.funcion){
      // console.log(ex.error.funcion);
      if (ex.error.funcion[0] === "Ya existe Funcion con este Funcion:.") {
        Swal.fire({
          title: 'Error en los datos',
          icon: 'error',
          text: "Ya existe Función con ese nombre.",
          
        })
      }else{
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: ex.error.funcion[0],
          
          })
        
       }
      
    }else if(ex.error.finca){
      
      Swal.fire({
        title: 'Error en los datos',
        icon: 'error',
        text: ex.error.finca[0],
      })
    }else if(ex.error.descripcion){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.descripcion[0],
      })
    }else if(ex.error.id){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.id[0],
      })
    }
  });
}

selectItemFuncionesEmpleados(data){
// console.log(data);

  this.formFuncionesEmpEdit = this.formBuilder.group({
    id: [data.id,{
      validators:[
        Validators.required,
      ]
    }],
    funcion: [data.funcion,{
      validators:[
        Validators.required,
      ]
    }],
    descripcion: [data.descripcion,{
      validators:[

      ]
    }],
    finca: new FormControl(this.dataFinca.filter(x => x.id == data.finca.id)[0].id,{ validators:[Validators.required,]}),
  });


}

editFuncionesEmpleados(){

  this.tablasBasicas.editFunciones(this.formFuncionesEmpEdit).subscribe(resp => {
    this.editar = false;
    this.llenarFuncionesEmpleados()
    this.toastr.success("función actualizada.","SigBan Admin");
    this.resetFormFuncionesEmpleados();
  },(ex) => {
    // console.log(ex);
    
    if(ex.error.funcion){
      // console.log(ex.error.funcion);
      if (ex.error.funcion[0] === "Ya existe Funcion con este Funcion:.") {
        Swal.fire({
          title: 'Error en los datos',
          icon: 'error',
          text: "Ya existe proceso con ese nombre.",
          
        })
      }else{
          Swal.fire({
            title: 'Error en los datos',
            icon: 'error',
            text: ex.error.funcion[0],
          
          })
        
       }
      
    }else if(ex.error.finca){
      
      Swal.fire({
        title: 'Error en los datos',
        icon: 'error',
        text: ex.error.finca[0],
      })
    }else if(ex.error.descripcion){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.descripcion[0],
      })
    }else if(ex.error.id){
      Swal.fire({
        title: 'Error en la descripción',
        icon: 'error',
        text: ex.error.id[0],
      })
    }
  });
}

resetFormFuncionesEmpleados(){
  $("#formFuncionesEmp").trigger("reset");
  this.editar = false;
}

// ObtenerErrorCampoTipo(){
//   var campo = this.formTipoEmp.get('tipo');
//   if (campo.hasError('required')) {
//       return 'El nombre de la labor es obligatorio *';
//   }
// }






/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  FIN METODOS PARA GESTIONAR MI MODELO PROCESOS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */


}

