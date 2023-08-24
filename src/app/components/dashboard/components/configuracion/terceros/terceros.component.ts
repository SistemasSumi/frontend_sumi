import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ModelPuc } from '../../Contabilidad/models/ModelPuc';
import { PucService } from '../../Contabilidad/puc/puc.service';
import { EmpresaService } from '../../empresa/empresa.service';
import { ConfiguracionService } from '../Configuracion.service';
import { ModelDepartamentos } from '../models/modelDepartamentos';
import { ModelFormasPago } from '../models/ModelFormasPago';
import { ModelMunicipios } from '../models/modelMunicipios';
import { ModelPlazosClientes } from '../models/ModelPlazosClientes';
import { ModelPlazosProveedor } from '../models/ModelPlazosProveedor';
import { ModelRetencionesTercero } from '../models/ModelRetencionesTercero';
import { ModelVendedor } from '../models/ModelVendedor';
import { TablesBasicService } from '../TablesBasic/tablesBasic.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare var $;

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrls: ['./terceros.component.scss']
})
export class TercerosComponent implements OnInit {
  
  actualizar:boolean = false;
  public filtroCuentasControl: FormControl = new FormControl('');
  listCuentas:ModelPuc[] = [];
  listaDeGrupos:grupos[] = [];
  descuentoProveedor: ModelPlazosProveedor = null;
  descuentoCliente  : ModelPlazosClientes  = null;

  retencionesCliente  : ModelRetencionesTercero[] = [];
  retencionesProveedor: ModelRetencionesTercero[] = [];

  modalDescuentoP: NgbModalRef;
  modalDescuentoC: NgbModalRef;
  modalRetencion: NgbModalRef;
  protected _onDestroy = new Subject<void>();

  public filtroCuentas: BehaviorSubject<ModelPuc[]> = new BehaviorSubject<ModelPuc[]>([]) ;

  metodos:MetodosShared = new MetodosShared();
  
  table:any = $('').DataTable({});

  textDepartamentos: string;
  textMunicipios   : string;

  departamentos: ModelDepartamentos[] = [];
  municipios   : ModelMunicipios   [] = [];
  formasDePago : ModelFormasPago   [] = [];
  cuentasPuc   : ModelPuc          [] = [];
  vendedores   : ModelVendedor     [] = [];

  
  formTercero = this.formBuilder.group({    
    id: ['',{
      
    }],
    tipoDocumento: ['',{
      validators:[
        Validators.required,
      ]
    }],
    documento: ['',{
      validators:[
        Validators.required,
      ]
    }],
    dv: ['',{
      validators:[
        // Validators.required,
      ]
    }],
    nombreComercial: ['',{
      validators:[
        Validators.required,
      ]
    }],
    nombreContacto: ['',{
      validators:[
        Validators.required,
      ]
    }],
    direccion: ['',{
      validators:[
        Validators.required,
      ]
    }],
    departamento: ['',{
      validators:[
        Validators.required,
      ]
    }],
    municipio: ['',{
      validators:[
        Validators.required,
      ]
    }],
    telefonoContacto: ['',{
      validators:[
        Validators.required,
      ]
    }],
    correoContacto: ['',{
      validators:[
        Validators.required,
        Validators.email,
      ]
    }],
    correoFacturas: ['',{
      validators:[
        Validators.email,
      ]
    }],
    vendedor: ['',{
      validators:[
  
      ]
    }],
    formaPago: ['',{
      validators:[
        Validators.required,

      ]
    }],
    tipoPersona: ['',{
      validators:[
        Validators.required,
      ]
    }],
    regimen: ['',{
      validators:[
        Validators.required,
      ]
    }],
    matriculaMercantil: ['',{
      validators:[
        Validators.required,
      ]
    }],
    codigoPostal: ['',{
      validators:[
        Validators.required,
      ]
    }],
    isCliente: [false,{
      validators:[
        // Validators.required,
      ]
    }],
    isProveedor: [false,{
      validators:[
        // Validators.required,
      ]
    }],
    isContabilidad: [false,{
      validators:[
        // Validators.required,
      ]
    }],
    isCompras: [false,{
      validators:[
        // Validators.required,
      ]
    }],
    isPos: [false,{
      validators:[
        // Validators.required,
      ]
    }],
    isElectronico: [false,{
      validators:[
        // Validators.required,
      ]
    }],
    cuenta_x_cobrar: ['',{
      validators:[
        // Validators.required,
      ]
    }],
    cuenta_x_pagar: ['',{
      validators:[
        // Validators.required,
      ]
    }],
    cuenta_saldo_a_cliente: ['',{
      validators:[
        // Validators.required,
      ]
    }],
    cuenta_saldo_a_proveedor: ['',{
      validators:[
        // Validators.required,
      ]
    }],
  });




  constructor(private route:Router,private rutaActiva: ActivatedRoute,private modalService: NgbModal,private puc:PucService,private tablesBasic:TablesBasicService,private formBuilder: FormBuilder, private config:ConfiguracionService) { }

  ngOnInit() {

      if(this.rutaActiva.snapshot.params.id){
        this.config.getTercero(this.rutaActiva.snapshot.params.id).subscribe(resp => {
          this.actualizar = true;
          this.formTercero.get('id').setValue(resp.id);
          this.formTercero.get('tipoDocumento').setValue(resp.tipoDocumento);
          this.formTercero.get('documento').setValue(resp.documento);
          this.formTercero.get('dv').setValue(resp.dv);
          this.formTercero.get('nombreComercial').setValue(resp.nombreComercial);
          this.formTercero.get('nombreContacto').setValue(resp.nombreContacto);
          this.formTercero.get('direccion').setValue(resp.direccion);
          this.formTercero.get('departamento').setValue(resp.departamento.id);
          this.textDepartamentos = resp.departamento.departamento;
          this.formTercero.get('municipio').setValue(resp.municipio.id)
          this.textMunicipios = resp.municipio.municipio;
          this.formTercero.get('telefonoContacto').setValue(resp.telefonoContacto);
          this.formTercero.get('correoContacto').setValue(resp.correoContacto);
          this.formTercero.get('correoFacturas').setValue(resp.correoFacturas);
          if(resp.vendedor){
            this.formTercero.get('vendedor').setValue(resp.vendedor.id);
          }
          
          this.formTercero.get('formaPago').setValue(resp.formaPago.id);
          this.formTercero.get('codigoPostal').setValue(resp.codigoPostal);
          this.formTercero.get('matriculaMercantil').setValue(resp.matriculaMercantil);
          this.formTercero.get('regimen').setValue(resp.regimen);
          this.formTercero.get('tipoPersona').setValue(resp.tipoPersona);
          this.formTercero.get('cuenta_saldo_a_proveedor').setValue(resp.cuenta_saldo_a_proveedor);
          this.formTercero.get('cuenta_saldo_a_cliente').setValue(resp.cuenta_saldo_a_cliente);
          this.formTercero.get('cuenta_x_pagar').setValue(resp.cuenta_x_pagar);
          this.formTercero.get('cuenta_x_cobrar').setValue(resp.cuenta_x_cobrar);
          this.formTercero.get('isElectronico').setValue(resp.isElectronico);
          this.formTercero.get('isPos').setValue(resp.isPos);
          this.formTercero.get('isCompras').setValue(resp.isCompras);
          this.formTercero.get('isProveedor').setValue(resp.isProveedor);
          this.formTercero.get('isCliente').setValue(resp.isCliente);
          // this.descuentoProveedor = null;
          // this.descuentoCliente   = null;
          // if(resp.retencionCliente.length != 0){
          //   this.retencionesCliente = resp.retencionCliente;
          // }
          // if(resp.retencionProveedor.length !=0){
          //   this.retencionesProveedor = resp.retencionProveedor;
          // }
          
          // if(resp.descuentoCliente.length != 0){
          //   this.descuentoCliente = resp.descuentoCliente[0];
          // }
          
          // if(resp.descuentoProveedor.length != 0){
          //   this.descuentoProveedor = resp.descuentoProveedor[0];
          // }

        });

      

      }

      this.puc.getCuentas().subscribe((resp:ModelPuc[])=>{
        this.listCuentas = resp;
  
        this.filtroCuentas.next(resp);
  
      
      });
      this.InitFiltroPuc();
      this.getVendedores();
      
      this.filtroCuentas.subscribe(resp => {
        this.listaDeGrupos = [];
        console.log(resp);
        for(let x of resp){
          if(x.codigo.toString().length < 6 && x.codigo.toString().length >= 4 ){
            let c:cuentas[] = [];
            for(let j of resp){
              if(x.codigo.toString() == j.codigo.toString().substring(0, 4) && j.codigo.toString().length >= 6){
                c.push(j)
              }
            }
  
            let g:grupos = {
              codigo: x.codigo,
              nombre:x.nombre,
              cuentas:c
            }
  
            this.listaDeGrupos.push(g);
          }
        }
     
      });
      
      this.getDepartamentos();
      this.getFormasDePago();


  }


  guardar(){

    let data = {
      "tercero":this.formTercero.value,
      // "descuentoCliente":this.descuentoCliente,
      // "descuentoProveedor":this.descuentoProveedor,
      // "retencionCliente":this.retencionesCliente,
      // "retencionProveedor":this.retencionesProveedor
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Guardando..',
      text:'Espere por favor..'
    });
    Swal.showLoading();
    if(this.actualizar){
      this.config.actualizarTercero(data).subscribe(resp => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'SarpSoft',
          text: 'Tercero actualizado con exito!',
        });
        console.log(resp);
        this.resetform();
      },(ex) => {
        Swal.close();
          console.log(ex);
          // this.resultado.emit(true);
          
          let errores ='';
          for(let x in ex.error){
            console.log();
            
            errores +=`
            <div class="alert alert-danger" role="alert" style="text-align: justify;">
              ${ex.error[x]}
            </div>
            `
            
            
          }
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar.',
            html:errores,
            confirmButtonColor: '#41B6FF',
        
          });
        
        });
    }else{
        this.config.registrarTercero(data).subscribe(resp => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'SarpSoft',
          text: 'Tercero registrado con exito!',
        });
          console.log(resp);
          this.resetform();
      },(ex) => {
          Swal.close();
          
          console.log(ex);
          // this.resultado.emit(true);
          
          let errores ='';
          for(let x in ex.error){
            console.log();
            
            errores +=`
            <div class="alert alert-danger" role="alert" style="text-align: justify;">
              ${ex.error[x]}
            </div>
            `
            
            
          }
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar.',
            html:errores,
            confirmButtonColor: '#41B6FF',
        
          });
          this.route.navigateByUrl('terceros');
        });
    }

    
      
    
  }
  
  InitFiltroPuc(){
    this.filtroCuentasControl.valueChanges
      .pipe(takeUntil (this._onDestroy))
      .subscribe(() => {
        this.filtrarPuc(this.filtroCuentasControl.value);
      });
  }

  filtrarPuc(busqueda:string){
    let filtro:ModelPuc[] = this.metodos.filtrarArrayPuc<ModelPuc>(this.listCuentas,'codigo',busqueda);
    this.filtroCuentas.next(filtro);
  }


  resetform(){
    $("#formTercero").trigger("reset");
   
  }

  cancelar(){
    this.resetform();
    this.actualizar = false;
  }

  getDepartamentos(){
    this.config.SubjectdataDepartamentos.subscribe((resp:ModelDepartamentos[])=>{
        this.departamentos = resp;
    })
  }

  getFormasDePago(){
    this.tablesBasic.SubjectdataFP.subscribe((resp:ModelFormasPago[])=>{
        this.formasDePago = resp;
    });
  }

  getCuentasPuc(){
    this.puc.SubjectdataPuc.subscribe((resp:ModelPuc[]) => {
      
      this.listCuentas = resp;
      this.filtroCuentas.next(resp);
    });
  }

  getVendedores(){
    this.config.SubjectdataVendedores.subscribe(resp => {
      this.vendedores = resp;
    });
  }


  seleccionarDepa(depa:string){
    let departament = this.departamentos.filter(d => d.departamento === depa);
    if(departament.length > 0){
      this.municipios = departament[0].municipios
       this.formTercero.get('departamento').setValue(departament[0].id);
    }
  }

  seleccionarMuni(muni:string){
    let municipio = this.municipios.filter(d => d.municipio === muni);
    if(municipio.length > 0){

       this.formTercero.get('municipio').setValue(municipio[0].id);
    }
  }

  abrirModalDescuentoP(content) {
    
		this.modalDescuentoP = this.modalService.open(content, { centered: true,size: 'lg'  });
	}

  closeModalDescuentoP(){
   
    this.modalDescuentoP.close();
  }

  capturarDescuentoP(event){
    this.descuentoProveedor = event;
    this.closeModalDescuentoP();
    
  }
  abrirModalDescuentoC(content) {
    
		this.modalDescuentoC = this.modalService.open(content, { centered: true,size: 'lg'  });
	}

  closeModalDescuentoC(){
   
    this.modalDescuentoC.close();
  }

  capturarDescuentoC(event){
    this.descuentoCliente = event;
    this.closeModalDescuentoC();
    
  }


  abrirModalRetencion(content) {
    
		this.modalRetencion = this.modalService.open(content, { centered: true });
	}

  closeModalRetencion(){
   
    this.modalRetencion.close();
  }

  capturarRetencionC(event){
   

    this.retencionesCliente.push(event);
    this.closeModalRetencion();
    
  }
  capturarRetencionP(event){
   

    this.retencionesProveedor.push(event);
    this.closeModalRetencion();
    
  }

  eliminarRetencionCliente(i){
    const filtro = this.retencionesCliente.filter((item) => item.retencion.id !== i.retencion.id);
    this.retencionesCliente = filtro;
  }

  eliminarRetencionProveedor(i){
    const filtro = this.retencionesProveedor.filter((item) => item.retencion.id !== i.retencion.id);
    this.retencionesProveedor = filtro;
  }



  // llenarTable(idtable:string,data,columns,nameButton){
  //   var tokenid =  this.auth.currentUser.getTokenUser();
  //   var beforeSend = function (xhr) {
  //     xhr.setRequestHeader('Authorization', 'Token ' +tokenid);
  //   }
  //   $.ajaxSetup({
  //     beforeSend: beforeSend
  //   });

  //   this.table =  $('#Table'+idtable).DataTable({
  //     responsive: true,
  //     autoWidth: true,
  //     pageLength: 5,   
  //     lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "Todos"]],
  //     language: environment.languageDataTable,
  //     data:data,
  //     columns:columns,
  //     columnDefs:[
  //         { responsivePriority: 1, targets: 0 },
  //         { responsivePriority: 2, targets: 1 },
  //         { responsivePriority: 3, targets: -1 },
  //         {
  //           targets:[0],
  //           class:'text-center',
  //           orderable: false,
  //           render: function(data,type,row){
  //               return '';
  //           }
  //         },
  //         {
  //             targets:[-1],
  //             class:'text-center',
  //             orderable: false,
  //             render: function(data,type,row){
  //                 let name = nameButton;

  //                 let acciones = `<div class="dropdown">
  //                 <a class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  //                   <i class="uil uil-ellipsis-h"></i>
  //                 </a>
  //                 <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  //                   <li><a class="dropdown-item" href="#">Editar Producto</a></li>
                
  //                 </ul>
  //               </div>`
                  
              
        
  //                 return acciones;
                  
  //             }
  //         },
  //     ],
  //     rowCallback: (row: Node, data: any[] | Object, index: number) => {
  //       const self = this;
  //       // Unbind first in order to avoid any duplicate handler
  //       // (see https://github.com/l-lin/angular-datatables/issues/87)
  //       // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
  //       // deprecated in favor of `off` and `on`

  //       /* BOTON EDITAR  */
  //       $('#editar'+idtable, row).off('click');
  //       $('#editar'+idtable, row).on('click', () => {
  //         // this.editar = true;
  //         if (idtable === "Barberos") {
  //           // this.selectItemBarber(data);
  //         }else if (idtable === "Servicios"){
  //         //  this.selectItemServicio(data);
  //         }else if (idtable === "Labores"){
  //           // this.selectItemLabor(data);
  //         }else if (idtable === "TipoEmp"){
  //           // this.selectItemTipoEmp(data);
  //         }else if (idtable === "SemanaAnio"){
  //           // this.selectItemSemana(data);
  //         }else if (idtable === "Procesos"){
  //           // this.selectItemProceso(data);
  //         }else if (idtable === "FuncionesEmp"){
  //           // this.selectItemFuncionesEmpleados(data);
  //         }

          
          
  //       });

  //         /* BOTON ELIMINAR  */
  //       $('#eliminar'+idtable, row).off('click');
  //       $('#eliminar'+idtable, row).on('click', () => {
  //         if (idtable === "Cargo") {
  //          console.log(data['cargo']+"eliminado");
           
  //         }else if (idtable === "Color"){
           
  //         }else if (idtable === "Labores"){
  //           // this.selectItemLabor(data);
  //         }
         
  //       });
  //       return row;
  //     }
  //   });
  // }

  // llenarTableTerceros(){
  //   this.empresa.SubjectdataTerceros.subscribe(resp => {
  //     console.log(resp);
      
  //     this.table.destroy();
  //     this.llenarTable(
  //       "Terceros",
  //       resp,
  //       [
        
  //       {"data":"idTercero"},
  //       {"data":"tipoDocumento"},
  //       {"data":"documento"},
  //       {"data":"nombreComercial"},
  //       {"data":"direccion"},
  //       {"data":"departamento.departamento"},
  //       {"data":"municipio.municipio"},
  //       {"data":"telefonoContacto"},
  //       {"data":"correoContacto"},
  //       {"data":"nombreContacto"},
  //       {"data":"formaPago.nombre"},
  //       {"data":"tipoPersona"},
  //       {"data":"regimen"},
  //       {"data":"obligaciones"},
  //       {"data":"matriculaMercantil"},
  //       {"data":"tipoRegimen"},
  //       {"data":"vendedor"},
  //       {"data":"reteICA"},
  //       {"data":"reteCree"},
  //       {"data":"reteFuente"},
  //       {"data":"isCliente"},
  //       {"data":"isProveedor"},
  //       {"data":"tipoPersona"},
        
  //       ],
  //       "Tercero");

  //      this.table.columns.adjust();
  //   })
  // }

}
interface grupos {
  nombre: string;
  codigo: string;
  cuentas: cuentas[];
}

interface cuentas {
  id: number
  codigo: string;
  nombre: string;
  
}