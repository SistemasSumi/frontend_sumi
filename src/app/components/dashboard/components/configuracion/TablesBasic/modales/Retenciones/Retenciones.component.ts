import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModelPuc } from '../../../../Contabilidad/models/ModelPuc';
import { PucService } from '../../../../Contabilidad/puc/puc.service';
import { ModelRetenciones } from '../../../models/ModelRetenciones';
import { TablesBasicService } from '../../tablesBasic.service';

@Component({
  selector: 'app-Retenciones',
  templateUrl: './Retenciones.component.html',
  styleUrls: ['./Retenciones.component.css']
})
export class RetencionesComponent implements OnInit {

  textBuscarCuentaC:string;
  textBuscarCuentaV:string;

  @Input() RetencionesEdit?: ModelRetenciones;

  editando:boolean = false;
  listCuentas:ModelPuc[] = [];

  formRetenciones = this.formBuilder.group({    
    id: ['',{
      
    }],
    nombre: ['',{
      validators:[
        Validators.required,
      ]
    }],
    porcentaje: [null,{
      validators:[
        Validators.required,
      ]
    }],
    base: [0,{
      validators:[
        Validators.required,
      ]
    }],
    compras: [null,{
      validators:[
        Validators.required,
      ]
    }],
    ventas: [null,{
      validators:[
        Validators.required,
      ]
    }],
    
  });


  constructor(private pucService:PucService,private tablesService:TablesBasicService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pucService.SubjectdataPuc.subscribe((resp:ModelPuc[])=>{
      this.listCuentas = resp;
    })


    console.log(this.RetencionesEdit);
    
    if(this.RetencionesEdit != null){
      console.log(this.RetencionesEdit);
      this.editando = true;
      this.formRetenciones.get('id').setValue(this.RetencionesEdit.id);
      this.formRetenciones.get('nombre').setValue(this.RetencionesEdit.nombre);
      this.formRetenciones.get('porcentaje').setValue(this.RetencionesEdit.porcentaje);
      this.formRetenciones.get('base').setValue(this.RetencionesEdit.base);
      this.formRetenciones.get('compras').setValue(this.RetencionesEdit.compras);
      this.formRetenciones.get('ventas').setValue(this.RetencionesEdit.ventas);
    }
  
  }

  seleccionarCuentaCompras(e){

    let cuenta = this.listCuentas.filter(p => p.nombre === e);
    if(cuenta.length > 0){
      this.formRetenciones.get('compras').setValue(cuenta[0].id);
    }
  
    
  }

  seleccionarCuentaVentas(e){

    let cuenta = this.listCuentas.filter(p => p.nombre === e);
    if(cuenta.length > 0){
      this.formRetenciones.get('ventas').setValue(cuenta[0].id);
    }
  
    
  }

  guardar(){

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Guardando..',
      text:'Espere por favor..'
    });
    Swal.showLoading();
    

    this.tablesService.agregarRTF(this.formRetenciones,this.editando).subscribe(() => {
      Swal.close();
      // this.resultado.emit(true);

      if(this.editando){
        Swal.fire({
          icon: 'success',
          title: 'SarpSoft',
          text: 'Retención actualizada con exito!',
        
        });
      }else{
        Swal.fire({
          icon: 'success',
          title: 'SarpSoft',
          text: 'Retención registrada con exito!',
        });
      }
      
    },(ex) => {
      console.log(ex.error);
      // this.resultado.emit(true);
      
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
    this.resetformRetenciones();
  
  }


  resetformRetenciones(){
    this.editando = false;
     $("#formRetenciones").trigger("reset");
  }

}
