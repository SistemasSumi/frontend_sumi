import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracionService } from '../../../Configuracion.service';

@Component({
  selector: 'app-ModalDatosContacto',
  templateUrl: './ModalDatosContacto.component.html',
  styleUrls: ['./ModalDatosContacto.component.css']
})
export class ModalDatosContactoComponent implements OnInit {





  contactos:any[] = [];

  formContacto= this.formBuilder.group({    
    id: ['',{
      
    }],
    tercero: ['',{
      validators:[
        // Validators.required,
      ]
    }],
    tipo: [null,{
      validators:[
        Validators.required,
      ]
    }],
    nombre: [null,{
      validators:[
        Validators.required,
      ]
    }],
    telefono: [null,{
      validators:[
        Validators.required,
      ]
    }],
    correo: [null,{
      validators:[
        Validators.required,
      ]
    }],
   
   
    
  });

  @Input() idProveedor?: number;
  
  // @Output() resultado = new EventEmitter<ModelRetencionesTercero>();
 
  constructor(private config:ConfiguracionService,private toast:ToastrService,private formBuilder: FormBuilder) { }

  ngOnInit() {

    if(this.idProveedor){
      this.config.getDatosDeContato(this.idProveedor.toString()).subscribe(resp => {
        // console.log(resp)  
        this.contactos = resp;
          
      });
    }


    // this.tables.SubjectdataRTF.subscribe(resp => {
    //   this.ListaRetenciones = resp;
    // });


   
  }


  resetform(){
    $("#formContacto").trigger("reset");
   
  }

  guardar(){
    // let retencion:ModelRetencionesTercero;

    let contacto = this.formContacto.value;
    contacto.tercero = this.idProveedor;
    
    this.config.saveDatosContacto(contacto).subscribe(resp => {
      this.resetform();

      this.toast.success('Registrado con exito!');
      this.config.getDatosDeContato(this.idProveedor.toString()).subscribe(resp => {
        
        // console.log(resp);
        this.contactos = resp;
        
      });
    });
  }

}
