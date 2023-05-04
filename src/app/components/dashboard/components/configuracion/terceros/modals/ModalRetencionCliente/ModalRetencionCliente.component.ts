import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracionService } from '../../../Configuracion.service';
import { ModelRetenciones } from '../../../models/ModelRetenciones';
import { ModelRetencionesTercero } from '../../../models/ModelRetencionesTercero';
import { TablesBasicService } from '../../../TablesBasic/tablesBasic.service';

@Component({
  selector: 'app-ModalRetencionCliente',
  templateUrl: './ModalRetencionCliente.component.html',
  styleUrls: ['./ModalRetencionCliente.component.scss']
})
export class ModalRetencionClienteComponent implements OnInit {

  ListaRetenciones:ModelRetenciones[] = [];



  Retenciones:ModelRetencionesTercero[] = [];

  formRetencion = this.formBuilder.group({    
    id: ['',{
      
    }],
    tercero: ['',{
      validators:[
        // Validators.required,
      ]
    }],
    retencion: [null,{
      validators:[
        Validators.required,
      ]
    }],
    fija: [false,{
      validators:[
        Validators.required,
      ]
    }],
   
    
  });

  @Input() idProveedor?: number;
  
  @Output() resultado = new EventEmitter<ModelRetencionesTercero>();
  constructor(private config:ConfiguracionService,private toast:ToastrService,private formBuilder: FormBuilder, private tables:TablesBasicService) { }

  ngOnInit() {

    if(this.idProveedor){
      this.config.getRetencionesCliente(this.idProveedor.toString()).subscribe(resp => {
          this.Retenciones = resp;
          
      });
    }


    this.tables.SubjectdataRTF.subscribe(resp => {
      this.ListaRetenciones = resp;
    });


   
  }


  resetform(){
    $("#formRetencion").trigger("reset");
   
  }

  guardar(){
    let retencion:ModelRetencionesTercero;

    retencion = this.formRetencion.value;
    retencion.tercero = this.idProveedor;
    
    this.config.saveRetencionesCliente(retencion).subscribe(resp => {
      this.resetform();

      this.toast.success('Registrado con exito!');
      this.config.getRetencionesProveedor(this.idProveedor.toString()).subscribe(resp => {
        this.Retenciones = resp;
        
      });
    });
  }

}
