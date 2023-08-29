import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EstadoCarteraCliente } from 'src/app/components/dashboard/reportes/reportesContabilidad/EstadoCarteraCliente';
import { EstadoCarteraProveedor } from 'src/app/components/dashboard/reportes/reportesContabilidad/EstadoCarteraProveedor';
import { EstadoDeCarteraCliente } from 'src/app/components/dashboard/reportes/reportesInventario/excel/EstadoCarteraCliente';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';
import { InformesGeneralesService } from '../../InformesGenerales.service';

@Component({
  selector: 'app-EstadoCarteraProveedor',
  templateUrl: './EstadoCarteraProveedor.component.html',
  styleUrls: ['./EstadoCarteraProveedor.component.css']
})
export class EstadoCarteraProveedorComponent implements OnInit {


  cliente_id:string;
  fechaCorte:Date = new Date()


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
    this.config.SubjectdataProveedorCompras.subscribe(resp => {
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
    // console.log(this.cliente_id)
    if(this.cliente_id == undefined || this.cliente_id == null || this.cliente_id == '' ){
      this.metodos.AlertError("Debe seleccionar un proveedor.");
      return;
    }

    if(this.fechaCorte == undefined || this.fechaCorte == null ){
      this.metodos.AlertError("Debe seleccionar una fecha.");
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Generando pdf..',
      text:'Espere por favor..'
    });
    
    Swal.showLoading();
    this.informes.EstadoCarteraProveedor(this.cliente_id,this.fechaCorte).subscribe(resp => {
      if(resp.facturas.length > 0){
 
        let reporte:EstadoCarteraProveedor = new EstadoCarteraProveedor();
        let report = reporte.ReporteEstadoCarteraProveedor(resp);
        window.open(report.output('bloburl'), '_blank');
        Swal.close();
      }else{
        this.metodos.AlertOK("NO TIENE CARTERA VIGENTE.")
      }
    });

  }

  generarExcel(){
    // console.log(this.cliente_id)
    if(this.cliente_id == undefined || this.cliente_id == null || this.cliente_id == '' ){
      this.metodos.AlertError("Debe seleccionar un cliente.");
      return;
    }

    if(this.fechaCorte == undefined || this.fechaCorte == null ){
      this.metodos.AlertError("Debe seleccionar una fecha.");
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Generando excel..',
      text:'Espere por favor..'
    });
    Swal.showLoading();

    this.informes.EstadoCarteraProveedor(this.cliente_id,this.fechaCorte).subscribe(resp => {
      
      
      let reporte = new EstadoCarteraProveedor()
      reporte.dowloadExcel(resp);
      Swal.close()
    
      
    });
  }

}
