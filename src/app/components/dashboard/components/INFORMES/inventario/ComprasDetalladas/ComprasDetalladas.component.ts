import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComprasDetalladas } from 'src/app/components/dashboard/reportes/reportesInventario/excel/ComprasDetalladas';
import { RotacionxCompras } from 'src/app/components/dashboard/reportes/reportesInventario/excel/RotacionXCompras';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';
import { InformesGeneralesService } from '../../InformesGenerales.service';

@Component({
  selector: 'app-ComprasDetalladas',
  templateUrl: './ComprasDetalladas.component.html',
  styleUrls: ['./ComprasDetalladas.component.css']
})
export class ComprasDetalladasComponent implements OnInit {


  dateRange:{startDate:Date,endDate:Date};



  proveedor_id:number = 0;

  proveedores: ModelTerceroCompleto[] = [];
  public filtroProveedor: BehaviorSubject<ModelTerceroCompleto[]>;
  
  
  public filtroTerceroControl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();


  metodos:MetodosShared = new MetodosShared();

  constructor(private config:ConfiguracionService,private informes:InformesGeneralesService) { }

  ngOnInit() {
    this.InitFiltroTercero();
    this.obtenerProveedor();
  }

  obtenerProveedor(){
    this.config.SubjectdataProveedorCompras.subscribe(resp => {
      this.proveedores = resp;
      this.filtroProveedor = new BehaviorSubject<ModelTerceroCompleto[]>(this.proveedores);
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
    let filtro:ModelTerceroCompleto[] = this.metodos.filtrarArray<ModelTerceroCompleto>(this.proveedores,'nombreComercial',busqueda);
    this.filtroProveedor.next(filtro);
  }


  generarExcel(){

    console.log(this.dateRange)
    
      if(this.dateRange == undefined || this.dateRange == null  ){
        this.metodos.AlertError("Debe seleccionar un rango de fechas");
        return;
      }


      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Generando excel..',
        text:'Espere por favor..'
      });
      Swal.showLoading();

      this.informes.compras_detalladas(this.proveedor_id,this.dateRange.startDate,this.dateRange.endDate).subscribe(resp => {

        console.log(resp);
        
        let reporte = new ComprasDetalladas()
        reporte.dowloadExcel(resp,this.dateRange.startDate,this.dateRange.endDate);
        Swal.close()
      
        
      });
  }

  

}
