import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModelPuc } from '../../../../Contabilidad/models/ModelPuc';
import { PucService } from '../../../../Contabilidad/puc/puc.service';
import { ModelImpuestos } from '../../../models/ModelImpuestos';
import { TablesBasicService } from '../../tablesBasic.service';

@Component({
  selector: 'app-Impuestos',
  templateUrl: './Impuestos.component.html',
  styleUrls: ['./Impuestos.component.css']
})
export class ImpuestosComponent implements OnInit {
  textBuscarCuentaC:string;
  textBuscarCuentaV:string;

  @Input() ImpuestosEdit?: ModelImpuestos;

  editando:boolean = false;
  listCuentas:ModelPuc[] = [];

  formImpuesto = this.formBuilder.group({    
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


    // console.log(this.ImpuestosEdit);
    
    if(this.ImpuestosEdit != null){
      // console.log(this.ImpuestosEdit);
      this.editando = true;
      this.formImpuesto.get('id').setValue(this.ImpuestosEdit.id);
      this.formImpuesto.get('nombre').setValue(this.ImpuestosEdit.nombre);
      this.formImpuesto.get('porcentaje').setValue(this.ImpuestosEdit.porcentaje);
      this.formImpuesto.get('base').setValue(this.ImpuestosEdit.base);
      this.formImpuesto.get('compras').setValue(this.ImpuestosEdit.compras);
      this.formImpuesto.get('ventas').setValue(this.ImpuestosEdit.ventas);
    }
  
  }

  seleccionarCuentaCompras(e){

    let cuenta = this.listCuentas.filter(p => p.nombre === e);
    if(cuenta.length > 0){
      this.formImpuesto.get('compras').setValue(cuenta[0].id);
    }
  
    
  }

  seleccionarCuentaVentas(e){

    let cuenta = this.listCuentas.filter(p => p.nombre === e);
    if(cuenta.length > 0){
      this.formImpuesto.get('ventas').setValue(cuenta[0].id);
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
    

    this.tablesService.agregarIMP(this.formImpuesto,this.editando).subscribe(() => {
      Swal.close();
      // this.resultado.emit(true);

      if(this.editando){
        Swal.fire({
          icon: 'success',
          title: 'SarpSoft',
          text: 'Impuesto actualizado con exito!',
        
        });
      }else{
        Swal.fire({
          icon: 'success',
          title: 'SarpSoft',
          text: 'Impuesto registrado con exito!',
        
        });
      }
      
    },(ex) => {
      // console.log(ex.error);
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
    this.resetformImpuesto();
  
  }


  resetformImpuesto(){
    this.editando = false;
     $("#formImpuesto").trigger("reset");
  }

}
