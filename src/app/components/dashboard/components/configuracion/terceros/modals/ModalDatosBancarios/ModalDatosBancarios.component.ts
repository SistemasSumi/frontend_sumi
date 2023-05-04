import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracionService } from '../../../Configuracion.service';

@Component({
  selector: 'app-ModalDatosBancarios',
  templateUrl: './ModalDatosBancarios.component.html',
  styleUrls: ['./ModalDatosBancarios.component.css']
})
export class ModalDatosBancariosComponent implements OnInit {

  bancos:any[] = [];

  formBanco= this.formBuilder.group({    
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
    banco: [null,{
      validators:[
        Validators.required,
      ]
    }],
    cuenta: [null,{
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
      this.config.getDatosBancarios(this.idProveedor.toString()).subscribe(resp => {
        console.log(resp)  
        this.bancos = resp;
          
      });
    }


    // this.tables.SubjectdataRTF.subscribe(resp => {
    //   this.ListaRetenciones = resp;
    // });


   
  }


  resetform(){
    $("#formBanco").trigger("reset");
   
  }

  guardar(){
    // let retencion:ModelRetencionesTercero;

    let bancos = this.formBanco.value;
    bancos.tercero = this.idProveedor;
    
    this.config.saveDatosBancarios(bancos).subscribe(resp => {
      this.resetform();

      this.toast.success('Registrado con exito!');
      this.config.getDatosBancarios(this.idProveedor.toString()).subscribe(resp => {
        
        console.log(resp);
        this.bancos = resp;
        
      });
    });
  }
}
