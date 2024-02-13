import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EstadoCarteraCliente } from 'src/app/components/dashboard/reportes/reportesContabilidad/EstadoCarteraCliente';
import { EstadoCarteraProveedor } from 'src/app/components/dashboard/reportes/reportesContabilidad/EstadoCarteraProveedor';
import { CertificadoRetencionProveedor } from 'src/app/components/dashboard/reportes/reportesContabilidad/CertificadoRetencionProveedor';

import { EstadoDeCarteraCliente } from 'src/app/components/dashboard/reportes/reportesInventario/excel/EstadoCarteraCliente';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';
import { InformesGeneralesService } from '../../InformesGenerales.service';

@Component({
  selector: 'app-certificado-retencion',
  templateUrl: './certificado-retencion.component.html',
  styleUrls: ['./certificado-retencion.component.css']
})
export class CertificadoRetencionComponent implements OnInit {
  years: number[] = [2021, 2022, 2023];
  selectedYear: number | null = null;
  fechaInicio: any;
  fechaFin: any;


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

  onSelectYear() {
    if (this.selectedYear !== null) {
        this.fechaInicio = `${this.selectedYear}-01-01`;
        this.fechaFin = `${this.selectedYear}-12-30`;
    }
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

    if(this.fechaInicio == undefined || this.fechaInicio == null ){
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
      this.informes.CertificadoRetencionProveedor(this.cliente_id,this.fechaInicio,this.fechaFin).subscribe(resp => {
        console.log(resp)
       if(resp[0]){
        const data = {
          base: resp[0].base,
          nombre: resp[0].nombreComercial,
          porcentaje: resp[0].porcentaje_retencion,
          tipo: resp[0].tipo_retencion,
          valor:resp[0].valor_retenido,
          documento: resp[0].documento,
          año: this.selectedYear
        }
        console.log(data)
        let reporte:CertificadoRetencionProveedor = new CertificadoRetencionProveedor();
        let report = reporte.CertificadoRetencionProveedor(data);
        window.open(report.output('bloburl'), '_blank');
         Swal.close();
      }else{
        this.metodos.AlertError("Proveedor no cuenta con retención")
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
