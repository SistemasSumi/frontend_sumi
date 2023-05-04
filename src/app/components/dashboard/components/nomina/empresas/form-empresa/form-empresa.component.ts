import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService, OverlayContainer } from 'ngx-toastr';
import { EmpresaService } from '../empresa.service';
import { Empresa } from '../../../../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { SeguridadService } from '../../../../../auth/seguridad.service';



@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent implements OnInit {

  formEmpresa: FormGroup;
  formEmpresaEdit: FormGroup;
  tiposDocumentos:any;

  emp:Empresa;


  registrar:boolean = true;
  constructor( private auth:SeguridadService,private formBuilder: FormBuilder,private  toastr: ToastrService,private empresa:EmpresaService) { }







  ngOnInit() {

      this.loadScript('../assets/libs/flatpickr/flatpickr.min.js'); 
  this.loadScript('../assets/js/pages/project-create.init.js');
    this.formEmpresa = this.formBuilder.group({
      
      razon_social: ['',{
        validators:[
          Validators.required,
        ]
      }],   
      slogan: ['',{
        validators:[
          Validators.required,
        ]
      }],
      correo: ['',{
        validators:[
          Validators.email,
        ]
      }],
      tipo_documento: ['',{
        validators:[
          Validators.required,
        ]
      }],
      documento: ['',{
        validators:[
          Validators.required,
        ]
      }],
    
      frecuencia_pago: ['',{
        validators:[
          Validators.required,
        ]
      }],
      medio_pago: ['',{
        validators:[
          Validators.required,
        ]
      }],
      banco: ['',{
        validators:[
          Validators.required,
        ]
      }],
      tipo_cuenta: ['',{
        validators:[
          Validators.required,
        ]
      }],
      numero_cuenta: ['',{
        validators:[
          Validators.required,
        ]
      }],
      operador_pila: ['',{
        validators:[
          Validators.required,
        ]
      }],
      telefono: ['',{
        validators:[
          Validators.required,
        ]
      }],
      areas: this.formBuilder.array([this.formBuilder.group({
        id:0,
        nombre:['']
      })]),
      cargos: this.formBuilder.array([this.formBuilder.group({
        id:0,
        nombre:['']
      })])

    });
    this.inicializarFormEmpresa();
    this.empresa.getTiposDocumentos().subscribe((resp:any) => {
        this.tiposDocumentos = resp.tiposDocumentos;
    });
   
  }

  guardar(){
    console.log("s");
    
    if(this.formEmpresa.invalid){
      Swal.fire({
        title: 'Error en los datos',
        icon: 'error',
        text: "Faltan campos en el formulario.",
        
      })
      return;
    }
    this.empresa.updateEmpresas(this.formEmpresa).subscribe((resp:any) => {
      console.log(resp);
      Swal.fire({
        title: 'SUMIPROD-INTRANET',
        icon: 'success',
        text: "La empresa se actualizo con exito!",
        
      })
      this.resetFormEmpresa();
      this.inicializarFormEmpresa();
      console.log(this.formEmpresa.value);
    })
   
    
  }

  inicializarFormEmpresa(){
    this.empresa.getEmpresas().subscribe((resp:any) => {
      this.emp = resp[0];
      console.log(this.emp);
      this.formEmpresa = this.formBuilder.group({
      
        id_empresa: [ this.emp.id_empresa,{
          validators:[
            Validators.required,
          ]
        }], 
        razon_social: [ this.emp.razon_social,{
          validators:[
            Validators.required,
          ]
        }],   
        slogan: [this.emp.slogan,{
          validators:[
            Validators.required,
          ]
        }],
        correo: [this.emp.correo,{
          validators:[
            Validators.email,
          ]
        }],
        tipo_documento: [this.emp.tipo_documento,{
          validators:[
            Validators.required,
          ]
        }],
        documento: [this.emp.numero_documento,{
          validators:[
            Validators.required,
          ]
        }],
      
        frecuencia_pago: [this.emp.frecuencia_pago,{
          validators:[
            Validators.required,
          ]
        }],
        medio_pago: [this.emp.medio_pago,{
          validators:[
            Validators.required,
          ]
        }],
        banco: [this.emp.banco,{
          validators:[
            Validators.required,
          ]
        }],
        tipo_cuenta: [this.emp.tipo_cuenta,{
          validators:[
            Validators.required,
          ]
        }],
        numero_cuenta: [this.emp.numero_cuenta,{
          validators:[
            Validators.required,
          ]
        }],
        operador_pila: [this.emp.operador_pila,{
          validators:[
            Validators.required,
          ]
        }],
      
        telefono: [this.emp.telefono,{
          validators:[
            Validators.required,
          ]
        }],
        areas: this.formBuilder.array([this.formBuilder.group({
          
          nombre:['']
        })]),
        cargos: this.formBuilder.array([this.formBuilder.group({
          nombre:['']
        })])
  
      });
    
      this.rellenarAreas();
      this.rellenarCargos();
    })
   
  }



  rellenarAreas(){
    const control = <FormArray>this.formEmpresa.controls['areas'];
    control.clear();
    for(let x of this.emp.areas){
      
      control.push(this.formBuilder.group(
        {
          id_area:x.id_area,
          nombre:x.nombre,
          usuario:this.auth.currentUser.getIdUser()
        }
        ))
    }
  }


  rellenarCargos(){
    const control = <FormArray>this.formEmpresa.controls['cargos'];
    control.clear();
    for(let x of this.emp.cargos){
      
      control.push(this.formBuilder.group(
        {
          id_cargo:x.id_cargo,
          nombre:x.nombre,
          usuario:this.auth.currentUser.getIdUser()
        }
        ))
    }
  }
  resetFormEmpresa(){
    this.registrar = true;
   $("#formEmpresa").trigger("reset");
 }

 get getAreas(){
    return this.formEmpresa.get('areas') as FormArray;
 }

 addArea(){
   const control = <FormArray>this.formEmpresa.controls['areas'];
   control.push(this.formBuilder.group({
    id_area:0,
    nombre:[],
    usuario:this.auth.currentUser.getIdUser()
  }))
 }

 removeArea(index:number,area:number){
  this.empresa.DeleteAreas(this.formEmpresa.value.id_empresa,area).subscribe(data =>{
    const control = <FormArray>this.formEmpresa.controls['areas'];
    control.removeAt(index);
  });
 }



 get getCargos(){
  return this.formEmpresa.get('cargos') as FormArray;
}

addCargo(){


 
  const control = <FormArray>this.formEmpresa.controls['cargos'];
  control.push(this.formBuilder.group({
    id_cargo:0,
    nombre:[],
    usuario:this.auth.currentUser.getIdUser()
  }))
}

removeCargo(index:number,cargo:any){

  this.empresa.DeleteCargos(this.formEmpresa.value.id_empresa,cargo).subscribe(data =>{
    const control = <FormArray>this.formEmpresa.controls['cargos'];
    control.removeAt(index);
  });
  
 }

 public loadScript(url: string) {
  const body = document.getElementById("cajascriptPage");
  const script = document.createElement('script');
  script.src = url;
  script.async = false;
  script.defer = true;
  body.append(script);
}

















}
