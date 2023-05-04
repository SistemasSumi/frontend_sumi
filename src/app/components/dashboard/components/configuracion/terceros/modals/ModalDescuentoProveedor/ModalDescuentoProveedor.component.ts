import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracionService } from '../../../Configuracion.service';
import { ModelPlazosProveedor } from '../../../models/ModelPlazosProveedor';

@Component({
  selector: 'app-ModalDescuentoProveedor',
  templateUrl: './ModalDescuentoProveedor.component.html',
  styleUrls: ['./ModalDescuentoProveedor.component.css']
})
export class ModalDescuentoProveedorComponent implements OnInit {



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
    cuarenta: [null,{
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

  @Input() idProveedor?: number;
  
  @Output() resultado = new EventEmitter<boolean>();
  
  constructor(private toast:ToastrService,private formBuilder: FormBuilder, private config:ConfiguracionService) { }



  ngOnInit() {

    if(this.idProveedor){
      this.config.getDescuentoProveedor(this.idProveedor.toString()).subscribe(resp => {
          console.log(resp);
          this.formDescuento.get('id').setValue(resp.id);
          this.formDescuento.get('tercero').setValue(this.idProveedor);
          this.formDescuento.get('quince').setValue(resp.quince);
          this.formDescuento.get('cuarenta').setValue(resp.cuarenta);
          this.formDescuento.get('treinta').setValue(resp.treinta);
          this.formDescuento.get('cuarentaycinco').setValue(resp.cuarentaYcinco);
          this.formDescuento.get('sesenta').setValue(resp.sesenta);
          this.formDescuento.get('noventa').setValue(resp.noventa);
      });
    }

   
  }


  guardar(){
    let descuento:ModelPlazosProveedor;

    descuento = this.formDescuento.value;
    this.config.saveDescuentoProveedor(descuento).subscribe(resp => {
      console.log(resp);
      this.resultado.emit(true);
      this.toast.success('Registrado con exito!');
    })  
  }

}
