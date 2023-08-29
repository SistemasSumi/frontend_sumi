import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { ModelPuc } from '../../Contabilidad/models/ModelPuc';
import { PucService } from '../../Contabilidad/puc/puc.service';
import { TipoDeConceptoModel } from '../models/tipoDeConceptoModel';
import { NConfigService } from './NConfig.service';

@Component({
  selector: 'app-NConfig',
  templateUrl: './NConfig.component.html',
  styleUrls: ['./NConfig.component.css']
})
export class NConfigComponent implements OnInit {



  edicionEnProceso: boolean = false;


  metodos:MetodosShared = new MetodosShared();
  public filtroPucCuentaControl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();


  public filtroPucCuenta: BehaviorSubject<ModelPuc[]>  = null;

  tiposDeConcepto:TipoDeConceptoModel[] = [];

  pucCuentas:ModelPuc[] = [];

  constructor(private config:NConfigService, private puc:PucService) { }

  ngOnInit() {
    this.obtenerConceptos();
    this.obtenerCuentas();
    this.InitFiltroCuentas();

  }



  onEdit(tipo:TipoDeConceptoModel,concepto:Concepto){

    
    
    tipo.conceptos.forEach(element => {
      element.isEdit = false;
    });
    
    this.edicionEnProceso = true;
    concepto.isEdit = true;


  }

  onSave(concepto:Concepto){
    this.config.SaveConcepto(concepto).subscribe(resp => {
      this.config.cargarConceptos();
      this.edicionEnProceso = false;
    },(ex) => {
      // console.log(ex);
      
      new MetodosShared().AlertError(ex);
    });
  }

  onCancel(concepto:Concepto){

    // this.config.cargarConceptos();
    
    this.edicionEnProceso = false;
  
    concepto.isEdit = false;


  }

  obtenerCuentas(){
    this.puc.SubjectdataPuc.subscribe(resp => {
        this.filtroPucCuenta = new BehaviorSubject<ModelPuc[]>(resp);
        this.pucCuentas = resp;
 
        
    });
  }


  obtenerConceptos(){
    this.config.SubjectdataConceptos.subscribe(
      (resp:TipoDeConceptoModel[]) => {
      for(let x in resp){
        for(let i of resp[x].conceptos){
          // // console.log(i)
          if (!i.cuenta){
            let model:ModelPuc = new ModelPuc();
            i.cuenta = model;
            // console.log(i);
          }
          if(!i.contrapartida){
            let model:ModelPuc = new ModelPuc();
            i.contrapartida = model;
          }
        }
      }
      this.tiposDeConcepto = resp;
    })
  }


  InitFiltroCuentas(){
    this.filtroPucCuentaControl.valueChanges
      .pipe(takeUntil (this._onDestroy))
      .subscribe(() => {
        this.filtraCuentas(this.filtroPucCuentaControl.value);
      });
  }


  filtraCuentas(busqueda:string){
      let filtro:ModelPuc[] = this.metodos.filtrarArray<ModelPuc>(this.pucCuentas,'nombre',busqueda);
      this.filtroPucCuenta.next(filtro);
  }

}

interface Concepto {
  id       : number;
  nombre   : string;
  valor    : number;
  empleado : number;
  empleador: number;
  cuenta   : ModelPuc;
  tipo     : number;
  isEdit?  : boolean;
}



