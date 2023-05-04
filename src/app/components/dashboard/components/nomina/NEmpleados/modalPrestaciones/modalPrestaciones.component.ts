import { Component, OnInit, Output,EventEmitter  } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';
import { NConfigService } from '../../NConfig/NConfig.service';

@Component({
  selector: 'app-modalPrestaciones',
  templateUrl: './modalPrestaciones.component.html',
  styleUrls: ['./modalPrestaciones.component.css']
})
export class ModalPrestacionesComponent implements OnInit {
  
  metodos:MetodosShared = new MetodosShared();

  @Output() resultadoForm = new EventEmitter<any>();
  
  conceptos = [];
  Proveedores  : ModelTerceroCompleto[] = [];
  public filtroTerceroControl: FormControl = new FormControl('');
  public filtroProveedor: BehaviorSubject<ModelTerceroCompleto[]>;
  protected _onDestroy = new Subject<void>();





  formPrestacion = this.formBuilder.group({    
    id: ['',{
      
    }],
    concepto: ['',{
      validators:[
        Validators.required,
      ]
    }],
    tercero: [null,{
      validators:[
       
      ]
    }],
    
    
  });


  constructor(private nconfig:NConfigService, private formBuilder: FormBuilder,private config:ConfiguracionService) { }

  ngOnInit() {
    
    this.obtenerConceptos();
    this.obtenerProveedor();
    this.InitFiltroTercero();
  }




  guardar(){
      this.resultadoForm.emit(this.formPrestacion.value);
  }


  obtenerProveedor(){
    this.config.SubjectdataProveedor.subscribe(resp => {
      this.Proveedores = resp;
      this.filtroProveedor = new BehaviorSubject<ModelTerceroCompleto[]>(this.Proveedores);
    });
  }

  InitFiltroTercero(){
    this.filtroTerceroControl.valueChanges
      .pipe(takeUntil (this._onDestroy))
      .subscribe(() => {
        this.filtraTerceros(this.filtroTerceroControl.value);
      });
  }

  filtraTerceros(busqueda:string){
    let filtro:ModelTerceroCompleto[] = this.metodos.filtrarArray<ModelTerceroCompleto>(this.Proveedores,'nombreComercial',busqueda);
    this.filtroProveedor.next(filtro);
  }


  





 

  

  obtenerConceptos(){
    this.nconfig.getConceptosEmpleados().subscribe(resp => {
        this.conceptos = resp;
    });
  }

}
