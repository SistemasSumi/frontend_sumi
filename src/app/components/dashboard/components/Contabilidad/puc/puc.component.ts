import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import Swal from 'sweetalert2';
import { ModelPuc } from '../models/ModelPuc';
import { PucService } from './puc.service';

@Component({
  selector: 'app-puc',
  templateUrl: './puc.component.html',
  styleUrls: ['./puc.component.css']
})
export class PucComponent implements OnInit {

  editando:boolean = false;

  CLASE        = 'CLASES'
  SUBCLASE     = 'SUBCLASE'
  GRUPO        = 'GRUPO'
  CUENTA       = 'CUENTAS'
  SUBCUENTA    = 'SUBCUENTA'


  ACTIVOSCORRIENTES   = 'EF1'
  ACTIVOSNOCORRIENTES = 'EF2'
  PASIVOSCORRIENTES   = 'EF3'
  PASIVOSNOCORRIENTES = 'EF4'
  PATRIMONIO          = 'EF5'

  ESTADOFINANCIERO     = [];
  RESULTADOSINTEGRALES =  [];
  



  INGRESOSDEACTIVIDADESCONTINUADAS = 'RI1'
  COSTOSDEACTIVIDADESCONTINUADAS   = 'RI2'
  GASTOSDEADMINISTRACION           = 'RI3'
  GASTOSFINANCIEROS                = 'RI4'
  INGRESOSFINANCIEROS              = 'RI5'
  IMPUESTOALARENTAYCOMPLEMENTARIOS = 'RI6'


  

  @ViewChild("modalPuc", {static: false}) modalPuc: TemplateRef<any>

  pucClases:ModelPuc[] = [];
  pucSubclases:ModelPuc[] = [];
  pucGrupos:ModelPuc[] = [];
  pucCuentas:ModelPuc[] = [];
  pucSubcuentas:ModelPuc[] = [];

  formCuentasPuc = this.formBuilder.group({    
    id: ['',{
      
    }],
    tipoDeCuenta: ['',{
      validators:[
        Validators.required,
      ]
    }],
    naturaleza: ['',{
      validators:[
        Validators.required,
      ]
    }],
    nombre: ['',{
      validators:[
        Validators.required,
      ]
    }],
    codigo: [null,{
      validators:[

      ]
    }],
    estadoFinanciero: [false,{
      validators:[

      ]
    }],
    estadoResultado: [false,{
      validators:[

      ]
    }],

    grupoReporte: ['',{
      validators:[
        Validators.required,
      ]
    }],
    padre: ['',{
      validators:[

      ]
    }]

    
    
  });


  constructor(private pucService:PucService,private modalService: NgbModal,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.llenarGrupos();
    this.getCuentas();
  }

  getCuentas(){
    this.pucService.getCuentas().subscribe(resp => {
      // console.log(resp);
      

      this.pucClases = [];
      this.pucSubclases = [];
      this.pucGrupos =[];
      this.pucCuentas = [];
      this.pucSubcuentas =[];

      let f = new FiltroPipe();
      
      this.pucClases = f.transform(resp,'CLASES','tipoDeCuenta');
      this.pucSubclases = f.transform(resp,'SUBCLASE','tipoDeCuenta');
      this.pucGrupos = f.transform(resp,'GRUPO','tipoDeCuenta');
      // console.log(this.pucGrupos);
      this.pucCuentas = f.transform(resp,'CUENTA','tipoDeCuenta');
      this.pucSubcuentas = f.transform(resp,'SUBCUENTA','tipoDeCuenta');
      
    })
  }

  llenarGrupos(){

    let EF1 = {
      nombre:'ACTIVOS CORRIENTES',
      value:this.ACTIVOSCORRIENTES
    }
    let EF2 = {
      nombre:'ACTIVOS NO CORRIENTES',
      value:this.ACTIVOSNOCORRIENTES
    }
    let EF3 = {
      nombre:'PASIVOS CORRIENTES',
      value:this.PASIVOSCORRIENTES
    }
    let EF4 = {
      nombre:'PASIVOS NO CORRIENTES',
      value:this.PASIVOSNOCORRIENTES
    }

    let EF5 = {
      nombre:'PATRIMONIO',
      value:this.PATRIMONIO
    }

    this.ESTADOFINANCIERO.push(EF1,EF2,EF3,EF4,EF5);


    let RI1 = {
      nombre:'INGRESOS DE ACTIVIDADES CONTINUADAS',
      value:this.INGRESOSDEACTIVIDADESCONTINUADAS
    }
    let RI2 = {
      nombre:'COSTOS DE ACTIVIDADES CONTINUADAS',
      value:this.COSTOSDEACTIVIDADESCONTINUADAS
    }
    let RI3 = {
      nombre:'GASTOS DE ADMINISTRACIÓN',
      value:this.GASTOSDEADMINISTRACION
    }
    let RI4 = {
      nombre:'GASTOS FINANCIEROS',
      value:this.GASTOSFINANCIEROS
    }

    let RI5 = {
      nombre:'INGRESOS FINANCIEROS',
      value:this.INGRESOSFINANCIEROS
    }
    let RI6 =  {
      nombre:'IMPUESTOS A LA RENTA Y COMPLEMENTARIOS',
      value:this.IMPUESTOALARENTAYCOMPLEMENTARIOS
    }

    this.RESULTADOSINTEGRALES.push(RI1,RI2,RI3,RI4,RI5,RI6);

  }

  open() {
		this.modalService.open(this.modalPuc, { centered: true }).result.then(
			(result) => {
				// this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.resetformCuentasPuc();
			},
		);
	}

  close(){
    this.modalService.dismissAll();
    this.resetformCuentasPuc();
  }

  agregar(tipoDeCuenta:string,cuentaPadre:ModelPuc){
    this.editando = false;
    this.formCuentasPuc.get('tipoDeCuenta').setValue(tipoDeCuenta);
    // this.formCuentasPuc.get('tipoDeCuenta').disable();
    this.formCuentasPuc.get('naturaleza').setValue(cuentaPadre.naturaleza);
    // this.formCuentasPuc.get('naturaleza').disable();
    this.formCuentasPuc.get('naturaleza')
    this.formCuentasPuc.get('padre').setValue(cuentaPadre.codigo); 
    // this.formCuentasPuc.get('padre').disable(); 
    
    this.open();
  }

  editar(cuenta:ModelPuc){
    this.editando = true;
    this.formCuentasPuc.get('id').setValue(cuenta.id);
    this.formCuentasPuc.get('tipoDeCuenta').setValue(cuenta.tipoDeCuenta);
    this.formCuentasPuc.get('codigo').setValue(cuenta.codigo);
    this.formCuentasPuc.get('naturaleza').setValue(cuenta.naturaleza);

    this.formCuentasPuc.get('naturaleza')
    this.formCuentasPuc.get('padre').setValue(cuenta.padre); 
 
    this.formCuentasPuc.get('nombre').setValue(cuenta.nombre); 
    this.formCuentasPuc.get('estadoFinanciero').setValue(cuenta.estadoFinanciero); 
    this.formCuentasPuc.get('estadoResultado').setValue(cuenta.estadoResultado); 
    this.formCuentasPuc.get('grupoReporte').setValue(cuenta.grupoReporte); 

    this.open();
  }

  resetformCuentasPuc(){
  this.editando = false;
    
   $("#formCuentasPuc").trigger("reset");
  }

  guardar(){
    // console.log(this.formCuentasPuc.value);
    

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Guardando..',
      text:'Espere por favor..'
    });
    Swal.showLoading();
    

    if(this.editando){
      this.pucService.actualizarCuentas(this.formCuentasPuc).subscribe(() => {
        Swal.close();
        
        Swal.fire({
          icon: 'success',
          title: 'SarpSoft',
          text: 'Cuenta actualizada con exito!',
        
        });
        this.getCuentas();
      },(ex) => {
        // console.log(ex.error);
        
        let errores ='';
        for(let x in ex.error){
          for(let j of ex.error[x]){
            errores +=`
            <div class="alert alert-danger" role="alert" style="text-align: justify;">
              ${j}
            </div>
            `
          }
          
        }
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar.',
          html:errores,
          confirmButtonColor: '#4acf50',
      
        });
      
      });
    }else{
      this.pucService.agregarCuentas(this.formCuentasPuc).subscribe(() => {
        Swal.close();
        
        Swal.fire({
          icon: 'success',
          title: 'SarpSoft',
          text: 'Cuenta registrada con exito!',
        
        });
      },(ex) => {
        // console.log(ex.error);
        
        let errores ='';
        for(let x in ex.error){
          for(let j of ex.error[x]){
            errores +=`
            <div class="alert alert-danger" role="alert" style="text-align: justify;">
              ${j}
            </div>
            `
          }
          
        }
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar.',
          html:errores,
          confirmButtonColor: '#4acf50',
      
        });
      
      });
      this.close();
    }

  
  
  }

}
