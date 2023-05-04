import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from '../../nomina/empresas/empresa.service';
import { ConductorService } from './conductor.service';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css']
})
export class ConductoresComponent implements OnInit {
  
  tiposDocumentos:any;
  ListConductores:any[];

  editar:boolean = false;

  formConductores = this.formBuilder.group({
    id: ['',{
      validators:[

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
    correo: ['',{
      validators:[
        Validators.email,
      ]
    }],
    direccion: ['',{
      validators:[
        Validators.required,
      ]
    }],
    telefono: ['',{
      validators:[

      ]
    }]
  });

  constructor(private conductor:ConductorService, private auth:SeguridadService,private formBuilder: FormBuilder,private  toastr: ToastrService,private empresa:EmpresaService) { }
  




  ngOnInit() {

    this.empresa.getTiposDocumentos().subscribe((resp:any) => {
      this.tiposDocumentos = resp.tiposDocumentos;
    });

   this.cargar();
  }



cargar(){
  this.conductor.getConductores().subscribe((resp:any) => {
    this.ListConductores = resp;
  });
}

guardar(){
  if(!this.editar){
    this.conductor.saveConductor(this.formConductores).subscribe(resp => {
      console.log(resp);
      this.cargar();
      this.resetFormConductor();
    })
  }else{
    this.conductor.UpdateConductor(this.formConductores).subscribe(resp => {
      console.log(resp);
      this.cargar();
      this.resetFormConductor();
    })
  }
}

editarConductor(conductor:any){
  this.editar = true;
  console.log(conductor);
  this.formConductores.get('id').setValue(conductor.id_conductor);
  this.formConductores.get('nombres').setValue(conductor.nombres);
  this.formConductores.get('apellidos').setValue(conductor.apellidos);
  this.formConductores.get('telefono').setValue(conductor.telefono);
  this.formConductores.get('direccion').setValue(conductor.direccion);
  this.formConductores.get('correo').setValue(conductor.correo);
  this.formConductores.get('documento').setValue(conductor.documento);
  this.formConductores.get('tipo_documento').setValue(conductor.tipo_documento);
  
}

resetFormConductor(){
  this.editar = false;
 $("#formConductor").trigger("reset");
}

}
