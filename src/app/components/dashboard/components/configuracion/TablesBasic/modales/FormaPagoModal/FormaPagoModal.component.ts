import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModelFormasPago } from '../../../models/ModelFormasPago';
import { TablesBasicService } from '../../tablesBasic.service';

@Component({
  selector: 'app-FormaPagoModal',
  templateUrl: './FormaPagoModal.component.html',
  styleUrls: ['./FormaPagoModal.component.css']
})
export class FormaPagoModalComponent implements OnInit {

  @Input() formaEdit?: ModelFormasPago;

  @Output() resultado = new EventEmitter<boolean>();

  editando:boolean = false;

  formForma = this.formBuilder.group({    
    id: ['',{
      
    }],
    nombre: ['',{
      validators:[
        Validators.required,
      ]
    }],
    plazo: [null,{
      validators:[
        Validators.required,
      ]
    }],
    
  });


  constructor(private tablesService:TablesBasicService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    // console.log(this.formaEdit);
    
    if(this.formaEdit != null){
      // console.log(this.formaEdit);
      this.editando = true;
      this.formForma.get('id').setValue(this.formaEdit.id);
      this.formForma.get('nombre').setValue(this.formaEdit.nombre);
      this.formForma.get('plazo').setValue(this.formaEdit.plazo);
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
    

    this.tablesService.agregarFormas(this.formForma,this.editando).subscribe(() => {
      Swal.close();
      this.resultado.emit(true);

      if(this.editando){
        Swal.fire({
          icon: 'success',
          title: 'SarpSoft',
          text: 'Forma actualizada con exito!',
        
        });
      }else{
        Swal.fire({
          icon: 'success',
          title: 'SarpSoft',
          text: 'Forma registrada con exito!',
        
        });
      }
      
    },(ex) => {
      // console.log(ex.error);
      this.resultado.emit(true);
      
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
    this.resetformForma();
  
  }

  resetformForma(){
    this.editando = false;
     $("#formForma").trigger("reset");
    }

}
