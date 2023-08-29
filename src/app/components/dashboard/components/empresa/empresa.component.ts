import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService, OverlayContainer } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { EmpresaService } from './empresa.service';
import { SeguridadService } from '../../../auth/seguridad.service';



@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  Departamentos:any;
  Municipios:any;

  formEmpresa = this.formBuilder.group({
    
    id: ['',{
      validators:[

      ]
    }], 
    idFE: ['',{
      validators:[

      ]
    }],    
    razon_social: ['',{
      validators:[
        Validators.required,
      ]
    }],
    logo: ['',{
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
    nit: ['',{
      validators:[
        Validators.required,
      ]
    }],
    usuario: ['',{
      validators:[

      ]
    }],
    telefono: ['',{
      validators:[
        Validators.required,
      ]
    }],
    ambiente: ['',{
      validators:[
        Validators.required,
      ]
    }],
    actividadEconomica: ['',{
      validators:[
        Validators.required,
      ]
    }],
    nombreComercial: ['',{
      validators:[
        Validators.required,
      ]
    }],
    tipoPersona: ['',{
      validators:[
        Validators.required,
      ]
    }],
    prefijo: ['',{
      validators:[
        Validators.required,
      ]
    }],
    numeracionMin: ['',{
      validators:[
        Validators.required,
      ]
    }],
    numeracionMax: ['',{
      validators:[
        Validators.required,
      ]
    }],
    fechaInicioFE: ['',{
      validators:[
        Validators.required,
      ]
    }],
    fechaFinalFE: ['',{
      validators:[
        Validators.required,
      ]
    }],
    registroMercantil: ['',{
      validators:[
        Validators.required,
      ]
    }],
    resolucionFE: ['',{
      validators:[
        Validators.required,
      ]
    }],
    nombreContacto: ['',{
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
        Validators.email,
      ]
    }],
    
  });



  // emp:Empresa;


  registrar:boolean = true;
  constructor(private empresa:EmpresaService, private formBuilder: FormBuilder,private  toastr: ToastrService,private auth:SeguridadService) { }







  ngOnInit() {
    this.editarEmpresa();
    this.empresa.SubjectdataDepartamentos.subscribe(resp => {
      this.Departamentos = resp;
    })
    this.empresa.SubjectdataMunicipios.subscribe(resp => {
      this.Municipios = resp;
    })
      this.loadScript('../assets/libs/flatpickr/flatpickr.min.js'); 
      this.loadScript('../assets/js/pages/project-create.init.js');
   

    // this.empresa.getTiposDocumentos().subscribe((resp:any) => {
    //     this.tiposDocumentos = resp.tiposDocumentos;
    // });
   
  }

    
  editarEmpresa(){
    if(this.auth.currentUser.getEmpresa()){

      let empresa:any = this.auth.currentUser.getEmpresa();
      this.formEmpresa.get('id').setValue(empresa.id)
      this.formEmpresa.get('idFE').setValue(empresa.datosFE.id)
      this.formEmpresa.get('razon_social').setValue(empresa.razon_social)
      this.formEmpresa.get('logo').setValue(empresa.logo)
      this.formEmpresa.get('slogan').setValue(empresa.slogan)
      this.formEmpresa.get('nit').setValue(empresa.nit)
      this.formEmpresa.get('telefono').setValue(empresa.telefono)
      this.formEmpresa.get('correo').setValue(empresa.correo)
      this.formEmpresa.get('departamento').setValue(empresa.departamento.id)
      this.formEmpresa.get('municipio').setValue(empresa.municipio.id)
      this.formEmpresa.get('ambiente').setValue(empresa.datosFE.ambiente)
      this.formEmpresa.get('actividadEconomica').setValue(empresa.datosFE.actividadEconomica)
      this.formEmpresa.get('nombreComercial').setValue(empresa.datosFE.nombreComercial)
      this.formEmpresa.get('tipoPersona').setValue(empresa.datosFE.tipoPersona)
      this.formEmpresa.get('prefijo').setValue(empresa.datosFE.prefijo)
      this.formEmpresa.get('numeracionMin').setValue(empresa.datosFE.numeracionMin)
      this.formEmpresa.get('numeracionMax').setValue(empresa.datosFE.numeracionMax)
      this.formEmpresa.get('registroMercantil').setValue(empresa.datosFE.registroMercantil)
      this.formEmpresa.get('resolucionFE').setValue(empresa.datosFE.resolucionFE)
      this.formEmpresa.get('fechaInicioFE').setValue(empresa.datosFE.fechaInicioFE)
      this.formEmpresa.get('fechaFinalFE').setValue(empresa.datosFE.fechaFinalFE)
      this.formEmpresa.get('telefonoContacto').setValue(empresa.datosFE.telefonoContacto)
      this.formEmpresa.get('correoContacto').setValue(empresa.datosFE.correoContacto)
      this.formEmpresa.get('nombreContacto').setValue(empresa.datosFE.nombreContacto)
    }
  }

  imagenSeleccionada(img:String){
    // console.log(img);
    this.formEmpresa.get('logo').setValue(img);
    
  }

  guardar(){

    if(this.formEmpresa.invalid){
      Swal.fire({
        title: 'Error en los datos',
        icon: 'error',
        text: "Faltan campos en el formulario.",
        
      })
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
        title: 'Guardando..',
      text:'Espere por favor..'
      });
      Swal.showLoading();
    this.empresa.saveEmpresa(this.formEmpresa).subscribe((resp:any) => {
      // console.log(resp);
      Swal.close();
      Swal.fire({
        title: 'SquireTech',
        icon: 'success',
        text: "La empresa se registro con exito!",
        
      })

      this.resetFormEmpresa();
      // console.log(this.formEmpresa.value);
    })
   
    
  }

  

  
  resetFormEmpresa(){
    this.registrar = true;
   $("#formEmpresa").trigger("reset");
 }

 get getAreas(){
    return this.formEmpresa.get('areas') as FormArray;
 }

 addArea(){
  //  const control = <FormArray>this.formEmpresa.controls['areas'];
  //  control.push(this.formBuilder.group({
  //   id_area:0,
  //   nombre:[],
  //   usuario:this.auth.currentUser.getIdUser()
  // }))
 }

 removeArea(index:number,area:number){
  // this.empresa.DeleteAreas(this.formEmpresa.value.id_empresa,area).subscribe(data =>{
  //   const control = <FormArray>this.formEmpresa.controls['areas'];
  //   control.removeAt(index);
  // });
 }



 get getCargos(){
  return this.formEmpresa.get('cargos') as FormArray;
}

addCargo(){


 
  const control = <FormArray>this.formEmpresa.controls['cargos'];
  // control.push(this.formBuilder.group({
  //   id_cargo:0,
  //   nombre:[],
  //   usuario:this.auth.currentUser.getIdUser()
  // }))
}

removeCargo(index:number,cargo:any){

  // this.empresa.DeleteCargos(this.formEmpresa.value.id_empresa,cargo).subscribe(data =>{
  //   const control = <FormArray>this.formEmpresa.controls['cargos'];
  //   control.removeAt(index);
  // });
  
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
