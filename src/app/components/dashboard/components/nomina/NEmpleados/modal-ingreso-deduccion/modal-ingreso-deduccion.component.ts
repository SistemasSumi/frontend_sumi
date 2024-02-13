
import { Component, OnInit, Output,EventEmitter,Input   } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
// import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';
import { NConfigService } from '../../NConfig/NConfig.service';
import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';



@Component({
  selector: 'app-modal-ingreso-deduccion',
  templateUrl: './modal-ingreso-deduccion.component.html',
  styleUrls: ['./modal-ingreso-deduccion.component.css']
})
export class ModalIngresoDeduccionComponent implements OnInit {

  @Input() tipo: string;
  metodos:MetodosShared = new MetodosShared();

  @Output() resultadoForm = new EventEmitter<any>();

  
  tiposConceptos = [];
  tiposSelect = []

  conceptos = []


  conceptosFiltrados = [];
  tiposConceptosFiltrados = [];
  resultado:Resultado={
    tipo: '', 
    concepto: null,
    valorMensual: null,
    valorQuincenal: null
  };

  Proveedores  : ModelTerceroCompleto[] = [];
  protected _onDestroy = new Subject<void>();

  

  
  constructor(private nconfig:NConfigService, private formBuilder: FormBuilder,private config:ConfiguracionService) { }
  
  ngOnInit() {
    
    this.obtenerTipos();
    
    
  }
  guardar(){
    this.resultado.valorQuincenal = this.resultado.valorMensual/2
    if(this.verificarObjeto()){
      this.resultadoForm.emit(this.resultado);
    }else{
      window.alert('Verifique que todos los campos estén completos')
    }
    
  }

  verificarObjeto(){
    if (Object.values(this.resultado).every(value => value !== null && value !== undefined && value !== '')) {
      
      return true
      // Aquí puedes realizar más acciones si todos los campos son no vacíos
    } else {
      return false
    }
  }
  
  obtenerTipos(){
     this.nconfig.getConceptos().subscribe(resp => {
        this.tiposConceptos = resp;
        // this.tiposConceptosFiltrados = this.tiposConceptos.filter(item => item.id===5 || item.id ===3 || item.id ===6)
        // console.log(this.tiposConceptosFiltrados)

        if(this.tipo === 'INGRESO RECURRENTE'){

          this.tiposSelect = [{
            nombre: 'Ingreso constitutivo de salario',
            value:'1'
          },{
            nombre: 'Ingreso No constitutivo de salario',
            value:'2'
          }]
        }else{
          this.tiposSelect = [{
            nombre: 'Deduccion',
            value:'3'
          }]
        }
    });
  
  }
  onTipoChange(){
    console.log('cambiando con tipo',this.resultado.tipo)
    if(this.resultado.tipo === '1'){
      this.tiposConceptosFiltrados = this.tiposConceptos.filter(item => item.id ===3)
      console.log(this.tiposConceptosFiltrados)
    }else if(this.resultado.tipo === '2'){
      this.tiposConceptosFiltrados = this.tiposConceptos.filter(item => item.id ===5)
      console.log(this.tiposConceptosFiltrados)
    }else if(this.resultado.tipo === '3'){
      this.tiposConceptosFiltrados = this.tiposConceptos.filter(item => item.id ===6)
      console.log(this.tiposConceptosFiltrados)
    }

    if(this.tiposConceptosFiltrados){
      this.conceptos =  this.tiposConceptosFiltrados[0].conceptos
      
    }
  }

 

  

}
interface Resultado {
  tipo:string ;
  concepto:any;
  valorMensual:any,
  valorQuincenal:any, 
 
}