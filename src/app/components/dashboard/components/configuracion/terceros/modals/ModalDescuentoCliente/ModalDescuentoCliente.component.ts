import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModelPlazosClientes } from '../../../models/ModelPlazosClientes';

@Component({
  selector: 'app-ModalDescuentoCliente',
  templateUrl: './ModalDescuentoCliente.component.html',
  styleUrls: ['./ModalDescuentoCliente.component.css']
})
export class ModalDescuentoClienteComponent implements OnInit {

  formDescuento = this.formBuilder.group({    
    id: ['',{
      
    }],
    tercero: ['',{
      validators:[
        // Validators.required,
      ]
    }],
    quince: [null,{
      validators:[
        Validators.required,
      ]
    }],
    treinta: [null,{
      validators:[
        Validators.required,
      ]
    }],
    cuarentaycinco: [null,{
      validators:[
        Validators.required,
      ]
    }],
    sesenta: [null,{
      validators:[
        Validators.required,
      ]
    }],
    noventa: [null,{
      validators:[
        Validators.required,
      ]
    }],
    
  });

  @Input() DescuentoEdit?: ModelPlazosClientes;
  @Output() resultado = new EventEmitter<ModelPlazosClientes>();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(this.DescuentoEdit != null){
      // console.log(this.DescuentoEdit);
      // this.editando = true;
      this.formDescuento.get('id').setValue(this.DescuentoEdit.id);
      this.formDescuento.get('tercero').setValue(this.DescuentoEdit.tercero);
      this.formDescuento.get('quince').setValue(this.DescuentoEdit.quince);
      this.formDescuento.get('treinta').setValue(this.DescuentoEdit.treinta);
      this.formDescuento.get('cuarentaycinco').setValue(this.DescuentoEdit.cuarentaycinco);
      this.formDescuento.get('sesenta').setValue(this.DescuentoEdit.sesenta);
      this.formDescuento.get('noventa').setValue(this.DescuentoEdit.noventa);
    }
  }


  guardar(){
    let descuento:ModelPlazosClientes;

      descuento = this.formDescuento.value;
      this.resultado.emit(descuento);
  }

}
