import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { SeguridadService } from '../../../auth/seguridad.service';
import { ReportesService } from '../../reportes/reportes.service';
import { facturaElectronicaReport } from '../../reportes/reportesFacturacion/facturaElectronica';
import { LibroAuxiliarReporte } from '../../reportes/reportesContabilidad/libroAuxiliarReporte';
import { MovimientoContable } from '../../reportes/reportesContabilidad/MovimientoContable';
import { ComprobanteEgreso } from '../../reportes/reportesContabilidad/ComprobanteEgreso';
import { IngresoAlmacen } from '../../reportes/reportesInventario/IngresoAlmacen';
import { ComprobanteProforma } from '../../reportes/reportesFacturacion/ComprobanteProforma';
import { SalidaConsumo } from '../../reportes/reportesInventario/SalidaConsumo';
import { EstadoCarteraCliente } from '../../reportes/reportesContabilidad/EstadoCarteraCliente';
import { EstadoCarteraProveedor } from '../../reportes/reportesContabilidad/EstadoCarteraProveedor';
import { CarteraVencidaEnGeneral } from '../../reportes/reportesContabilidad/CarteraVencidaEnGeneral';
import { NotaCreditoComprasReport } from '../../reportes/reportesInventario/notaCreditoCompras';
import { ActivatedRoute } from '@angular/router';
import { RetencionEnLaFuenteGeneral } from '../../reportes/reportesContabilidad/RetencionEnLaFuenteGeneral';
import { ComprobanteIngreso } from '../../reportes/reportesContabilidad/ComprobanteIngreso';
import { ComprobanteCotizacion } from '../../reportes/reportesFacturacion/ComprobanteCotizacion';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { PermisosUsuario } from 'src/app/components/auth/permisosUsuario';
// import { CurrencyPipe } from '@angular/common';
// import { logoSumi } from '../logoSumi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit  {
  permisos:PermisosUsuario;
  viewWidth:any;

 

  cxp:any;
  cxc:any;


  data:any;
  result:any = [
    {
      name: 'Enero',
      ventas: 1000,
      compras: 800,
    },
    {
      name: 'Febrero',
      ventas: 1200,
      compras: 950,
    },
    {
      name: 'Marzo',
      ventas: 800,
      compras: 950,
    },
    // Agrega más meses aquí...
    {
      name: 'Abril',
      ventas: 800,
      compras: 950,
    },
    // Agrega más meses aquí...
    {
      name: 'Mayo',
      ventas: 800,
      compras: 950,
    },
    // Agrega más meses aquí...
    {
      name: 'Junio',
      ventas: 800,
      compras: 950,
    },
    // Agrega más meses aquí...
    {
      name: 'Julio',
      ventas: 800,
      compras: 950,
    },
    // Agrega más meses aquí...
    {
      name: 'Agosto',
      ventas: 800,
      compras: 950,
    },
    // Agrega más meses aquí...
  ];

  barChartOptions: any = {// Tamaño del gráfico
    showXAxis: true,  // Mostrar el eje X (meses)
    showYAxis: true,  // Mostrar el eje Y (valores)
    gradient: false,  // Usar degradado en las barras
    showLegend: true, // Mostrar la leyenda
    legendTitle: '',
    showXAxisLabel: true, // Mostrar etiquetas en el eje X
    xAxisLabel: 'COMPARACIÓN ANUAL ENTRE VENTAS, COMPRAS, INGRESOS, EGRESOS',
    legendPosition: 'below',
    colorScheme: {
      domain: ['#41B6FF', '#FFA500', '#28a745', '#FF0000', '#FFFF00', '#FFFF00'],

    }
  };
  

  constructor( private route:ActivatedRoute, 
    public reporte:ReportesService,
    private el: ElementRef,
    public auth:SeguridadService,
     private home:HomeService,
     private cp:CurrencyPipe,
     public formBuilder:FormBuilder) { 
      this.permisos = this.auth.currentUser.getPermisos()

     }




  ngAfterViewInit(): void {
    setTimeout(() => {
      this.adjustView();
    });

  }

  ngOnInit(): void {
    this.adjustView();

    if(this.permisos.contabilidad.informes || this.permisos.superusuario){
      
      this.home.getReporteVentasVsCompras().subscribe(
        (resp) =>{
          const dataFormatted = resp.map(item => ({
            name: item.name,
            series: [
              {
                name: 'VENTAS',
                value: item.ventas,
              },
              {
                name: 'COMPRAS',
                value: item.compras,
              },
              {
                name: 'INGRESOS',
                value: item.ingresos,
              },
              {
                name: 'EGRESOS',
                value: item.egresos,
              },
            ],
          }));
          this.data = dataFormatted;
        }
      );
  
      this.home.getCxp().subscribe(
        (resp) => {
          this.cxp = resp;
        }
      );
      this.home.getCxc().subscribe(
        (resp) => {
          this.cxc = resp;
        }
      );
      
       
   }
  
   
  }
  

  adjustContainerWidth() {
    const container = this.el.nativeElement.querySelector('.chart-container');
    if (container) {
      const containerWidth = container.clientWidth;
      // Ajusta el ancho del div según su propio ancho
      container.style.width = containerWidth + 'px';
    }
  }
   // Método para ajustar el ancho del gráfico en función del ancho de la pantalla
   adjustView() {
    const screenWidth = window.innerWidth;
    const container = this.el.nativeElement.querySelector('.chart-container');

    if (container) {
      const containerWidth = container.clientWidth;
      // Ajusta el ancho del div según su propio ancho
      
      this.viewWidth = containerWidth; // Ancho predeterminado en otros casos
      
    }
  }

  // Detectar cambios en el tamaño de la ventana y ajustar el ancho del gráfico
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    
    this.adjustView();
  }






  



 




  
}
