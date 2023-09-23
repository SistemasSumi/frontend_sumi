import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ModelVendedor } from '../../../configuracion/models/ModelVendedor';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import { InformesGeneralesService } from '../../InformesGenerales.service';
import Swal from 'sweetalert2';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { ventasXVendedorIndividual } from 'src/app/components/dashboard/reportes/reportesInventario/excel/ventasXVendedorIndividual';

declare var $: any;

@Component({
  selector: 'app-VentasVendedor',
  templateUrl: './VentasVendedorIndividual.component.html',
  styleUrls: ['./VentasVendedorIndividual.component.css']
})
export class VentasVendedorIndividualComponent implements OnInit {


  Listvendedores = [];
  vendedor_id:any;
  dateRange = {startDate:Date,endDate:Date}

 



  constructor(private config:ConfiguracionService, private informes:InformesGeneralesService, private auth:SeguridadService) { 
    
  }


  ngOnInit() {
    this.vendedor_id = this.auth.currentUser.getIdUser();
    
    this.config.SubjectdataVendedores.subscribe((resp:ModelVendedor[]) => {
      console.log(resp)
      if(resp){
        const vendedorEncontrado = resp.find(vendedor => vendedor.usuario === Number(this.auth.currentUser.getIdUser()));

        this.Listvendedores = resp;

        this.vendedor_id = vendedorEncontrado.id;
      }
    });
  }


  validarFecha(fecha) {
    return !isNaN(fecha) && Object.prototype.toString.call(fecha) === '[object Date]';
  }

  generar(){
    // console.log(this.Listvendedores,this.dateRange)

  

    if(!this.validarFecha(this.dateRange.startDate) || !this.validarFecha(this.dateRange.endDate) ){
      new MetodosShared().AlertError('Por favor, asegúrese de seleccionar un rango válido de fechas antes de continuar. Es necesario especificar un rango de fechas para realizar la operación requerida. Asegúrese de proporcionar una fecha de inicio y una fecha final válidas.')
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere por favor..',
      text:'...'
    });
    Swal.showLoading();
    this.informes.VentasxVendedorIndividual(this.vendedor_id,this.dateRange.startDate,this.dateRange.endDate).subscribe(
      (resp) => {
      Swal.close();
    

      console.log(resp)

      let reporte = new ventasXVendedorIndividual()
      reporte.dowloadExcel(resp);

      },
      (error) => {   
        // console.log(error);
          
        Swal.close();
      });
  }
  
  

 
}
