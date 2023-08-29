import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EstadoCarteraProveedor } from 'src/app/components/dashboard/reportes/reportesContabilidad/EstadoCarteraProveedor';
import { Cxp_compras } from 'src/app/components/dashboard/reportes/reportesInventario/excel/Cxp_Compras';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';
import { InformesGeneralesService } from '../../InformesGenerales.service';

@Component({
  selector: 'app-cxp',
  templateUrl: './cxp.component.html',
  styleUrls: ['./cxp.component.css']
})
export class CxpComponent implements OnInit {


  cliente_id:number;
  fechaCorte:Date = new Date()


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
    // // console.log(this.cliente_id)
    // if(this.cliente_id == undefined || this.cliente_id == null  ){
    //   this.metodos.AlertError("Debe seleccionar un proveedor.");
    //   return;
    // }

    // if(this.fechaCorte == undefined || this.fechaCorte == null ){
    //   this.metodos.AlertError("Debe seleccionar una fecha.");
    //   return;
    // }

    // Swal.fire({
    //   allowOutsideClick: false,
    //   icon: 'info',
    //   title: 'Generando pdf..',
    //   text:'Espere por favor..'
    // });
    
    // Swal.showLoading();
    // this.informes.Cxp_compras(this.cliente_id,this.fechaCorte).subscribe(resp => {
    //   // console.log(resp)
    //   // if(resp.facturas.length > 0){
 
    //   //   let reporte:EstadoCarteraProveedor = new EstadoCarteraProveedor();
    //   //   let report = reporte.ReporteEstadoCarteraProveedor(resp);
    //   //   window.open(report.output('bloburl'), '_blank');
    //   //   Swal.close();
    //   // }else{
    //   //   this.metodos.AlertOK("NO TIENE CARTERA VIGENTE.")
    //   // }
    // });

  }

  generarExcel(){
    // console.log(this.cliente_id)
    if(this.cliente_id == undefined || this.cliente_id == null  ){
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

    this.informes.Cxp_compras(this.cliente_id,this.fechaCorte).subscribe(resp => {
      // console.log(resp)
      
      let reporte = new Cxp_compras()
      reporte.dowloadExcel(resp);
      Swal.close()
    
      
    });
  }
}
