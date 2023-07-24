import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarteraVencidaEnGeneral } from 'src/app/components/dashboard/reportes/reportesContabilidad/CarteraVencidaEnGeneral';
import { EstadoCarteraCliente } from 'src/app/components/dashboard/reportes/reportesContabilidad/EstadoCarteraCliente';
import { EstadoDeCarteraCliente } from 'src/app/components/dashboard/reportes/reportesInventario/excel/EstadoCarteraCliente';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';
import { InformesGeneralesService } from '../../InformesGenerales.service';

@Component({
  selector: 'app-CarteraVencidaClientes',
  templateUrl: './CarteraVencidaClientes.component.html',
  styleUrls: ['./CarteraVencidaClientes.component.css']
})
export class CarteraVencidaClientesComponent implements OnInit {

  cliente_id:number = 0;
  

  clientes          : ModelTerceroCompleto[] = [];

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
    console.log(this.cliente_id)
    if(this.cliente_id === undefined || this.cliente_id === null  ){
      this.metodos.AlertError("Debe seleccionar un cliente.");
      return;
    }

    

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Generando pdf..',
      text:'Espere por favor..'
    });
    
    Swal.showLoading();
    this.informes.CarteraVencidaCliente(this.cliente_id).subscribe(resp => {
     
 
        let reporte:CarteraVencidaEnGeneral = new CarteraVencidaEnGeneral();
        let report = reporte.ReporteCarteraVencidaEnGeneral(resp);
        window.open(report.output('bloburl'), '_blank');
        Swal.close();
      
    });

  }

  generarExcel(){
    console.log(this.cliente_id)
    if(this.cliente_id == undefined || this.cliente_id == null){
      this.metodos.AlertError("Debe seleccionar un cliente.");
      return;
    }

    
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Generando excel..',
      text:'Espere por favor..'
    });
    Swal.showLoading();


    this.metodos.AlertDenegado("próximamente..");
    return;

    // this.informes.EstadoCarteraCliente(this.cliente_id,this.fechaCorte,false).subscribe(resp => {
      
      
    //   let reporte = new EstadoDeCarteraCliente()
    //   reporte.dowloadExcel(resp);
    //   Swal.close()
    
      
    // });
  }

}
