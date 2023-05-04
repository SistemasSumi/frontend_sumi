import { Component, OnInit } from '@angular/core';
import { CarteraVencidaEnGeneral } from '../../reportes/reportesContabilidad/CarteraVencidaEnGeneral';
import { ComprobanteEgreso } from '../../reportes/reportesContabilidad/ComprobanteEgreso';
import { ComprobanteIngreso } from '../../reportes/reportesContabilidad/ComprobanteIngreso';
import { EstadoCarteraCliente } from '../../reportes/reportesContabilidad/EstadoCarteraCliente';
import { EstadoCarteraProveedor } from '../../reportes/reportesContabilidad/EstadoCarteraProveedor';
import { LibroAuxiliarReporte } from '../../reportes/reportesContabilidad/libroAuxiliarReporte';
import { MovimientoContable } from '../../reportes/reportesContabilidad/MovimientoContable';
import { ComprobanteCotizacion } from '../../reportes/reportesFacturacion/ComprobanteCotizacion';
import { NotaCreditoComprasReport } from '../../reportes/reportesInventario/notaCreditoCompras';
import { SalidaConsumo } from '../../reportes/reportesInventario/SalidaConsumo';

@Component({
  selector: 'app-INFORMES',
  templateUrl: './INFORMES.component.html',
  styleUrls: ['./INFORMES.component.css']
})
export class INFORMESComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  imprimirNotaCredito(){
    let reporte:NotaCreditoComprasReport = new NotaCreditoComprasReport();
    let report = reporte.reporteNotaCreditoCompras();
    window.open(report.output('bloburl'), '_blank');
  }
  
  COTIZACION(){
    let reporte:ComprobanteCotizacion = new ComprobanteCotizacion();
    let report = reporte.ReporteComprobanteCotizacion(null);
    window.open(report.output('bloburl'), '_blank');
  }
  carteraVencida(){
    let reporte:CarteraVencidaEnGeneral = new CarteraVencidaEnGeneral();
    let report = reporte.ReporteCarteraVencidaEnGeneral(null);
    window.open(report.output('bloburl'), '_blank');
  }

  egreso(){
    let reporte:ComprobanteEgreso = new ComprobanteEgreso();
    let report = reporte.ReporteComprobanteEgreso(null);
    window.open(report.output('bloburl'), '_blank');
  }
  ingreso(){
    let reporte:ComprobanteIngreso = new ComprobanteIngreso();
    let report = reporte.ReporteComprobanteIngreso(null);
    window.open(report.output('bloburl'), '_blank');
  }
  carteraCliente(){
    let reporte:EstadoCarteraCliente = new EstadoCarteraCliente();
    let report = reporte.ReporteEstadoCarteraCliente(null);
    window.open(report.output('bloburl'), '_blank');
  }
  carteraProveedor(){
    let reporte:EstadoCarteraProveedor = new EstadoCarteraProveedor();
    let report = reporte.ReporteEstadoCarteraProveedor(null);
    window.open(report.output('bloburl'), '_blank');
  }

  aux(){
    let reporte:LibroAuxiliarReporte = new LibroAuxiliarReporte();
    let report = reporte.GenerarLibroAux(null);
    window.open(report.output('bloburl'), '_blank');
  }

  movi(){
    let reporte:MovimientoContable = new MovimientoContable();
    let report = reporte.ReporteMovimientoContable(null);
    window.open(report.output('bloburl'), '_blank');
  }
  salidaConsumo(){
    let reporte:SalidaConsumo = new SalidaConsumo();
    let report = reporte.ReporteSalidaConsumo(null);
    window.open(report.output('bloburl'), '_blank');
  }




}
