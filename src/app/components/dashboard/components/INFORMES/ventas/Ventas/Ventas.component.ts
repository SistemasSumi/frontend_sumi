import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cxp_compras } from 'src/app/components/dashboard/reportes/reportesInventario/excel/Cxp_Compras';
import { VentasDetalladas } from 'src/app/components/dashboard/reportes/reportesInventario/excel/VentasDetalladas';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';
import { InformesGeneralesService } from '../../InformesGenerales.service';

@Component({
  selector: 'app-Ventas',
  templateUrl: './Ventas.component.html',
  styleUrls: ['./Ventas.component.css']
})
export class VentasComponent implements OnInit {

  cliente_id:number = 0;
  tipo:string = 'GENERAL';
  dateRange:{startDate:Date,endDate:Date}


  clientes: ModelTerceroCompleto[] = [];

  public filtroTerceroControl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();
  

  metodos:MetodosShared = new MetodosShared();

  public filtroClientes: BehaviorSubject<ModelTerceroCompleto[]>;
  constructor(private config:ConfiguracionService,private informes:InformesGeneralesService) { }


  ngOnInit() {
    this.InitFiltroTercero();
    this.obtenerClientes();
  }

  obtenerClientes(){
    this.config.SubjectdataCliente.subscribe(resp => {
      this.clientes = resp;
      this.filtroClientes = new BehaviorSubject<ModelTerceroCompleto[]>(this.clientes);
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
    let filtro:ModelTerceroCompleto[] = this.metodos.filtrarArray<ModelTerceroCompleto>(this.clientes,'nombreComercial',busqueda);
    this.filtroClientes.next(filtro);
  }

  generarPDF(){
    

  }

  generarExcel(){
    
    if(this.cliente_id == undefined || this.cliente_id == null  ){
      this.metodos.AlertError("Debe seleccionar un cliente.");
      return;
    }

    if(this.dateRange == undefined || this.dateRange == null ){
      this.metodos.AlertError("Debe seleccionar un rango de fechas.");
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Generando excel..',
      text:'Espere por favor..'
    });
    Swal.showLoading();

    this.informes.VentasDetalladas(this.cliente_id,this.tipo,this.dateRange.startDate,this.dateRange.endDate).subscribe(resp => {
      console.log(resp)
      
      let reporte = new VentasDetalladas()
      reporte.dowloadExcel(resp,this.tipo,this.dateRange.startDate,this.dateRange.endDate);
      Swal.close()
    
      
    });
  }
}
