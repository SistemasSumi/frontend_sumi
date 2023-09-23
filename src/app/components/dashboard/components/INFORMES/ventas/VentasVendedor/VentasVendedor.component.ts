import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ModelVendedor } from '../../../configuracion/models/ModelVendedor';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import { InformesGeneralesService } from '../../InformesGenerales.service';
import Swal from 'sweetalert2';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { ventasXVendedorGeneral } from 'src/app/components/dashboard/reportes/reportesInventario/excel/ventasXVendedorGeneral';

declare var $: any;

@Component({
  selector: 'app-VentasVendedor',
  templateUrl: './VentasVendedor.component.html',
  styleUrls: ['./VentasVendedor.component.css']
})
export class VentasVendedorComponent implements OnInit {
  text:string = '';
  selectedChips: string[] = [];
  autocompleteOptions: {nombre:string}[] = [];
  autocompleteOptionsAll: {nombre:string}[] = [];

  Listvendedores = [];
  dateRange = {startDate:Date,endDate:Date}

  reporte = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor(private config:ConfiguracionService, private informes:InformesGeneralesService) { 
    
  }

  filtrar(value){
   


      let filtro:FiltroPipe = new FiltroPipe();
      this.autocompleteOptions = filtro.transform(this.autocompleteOptionsAll,this.text,'nombre')
    
  }

  ngOnInit() {
    this.config.SubjectdataVendedores.subscribe((resp:ModelVendedor[]) => {
      // console.log(resp)
      if(resp){

        for(let x of resp){
          this.autocompleteOptions.push(x)
          this.autocompleteOptionsAll.push(x)
        }
      }
    });
  }


  validarFecha(fecha) {
    return !isNaN(fecha) && Object.prototype.toString.call(fecha) === '[object Date]';
  }

  generar(){
    console.log(this.Listvendedores)

    if(this.Listvendedores.length <= 0){
      new MetodosShared().AlertError('Por favor, asegúrese de seleccionar al menos un vendedor antes de continuar. Es necesario tener al menos un vendedor seleccionado para realizar la operación requerida.')
      return;
    }

    if(!this.validarFecha(this.dateRange.startDate) || !this.validarFecha(this.dateRange.endDate) ){
      new MetodosShared().AlertError('Por favor, asegúrese de seleccionar un rango válido de fechas antes de continuar. Es necesario especificar un rango de fechas para realizar la operación requerida. Asegúrese de proporcionar una fecha de inicio y una fecha final válidas.')
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere por favor..',
      text:'Por favor, tenga en cuenta que los vendedores cuya meta es igual a cero no serán considerados en el cálculo del porcentaje de cumplimiento. Es importante establecer metas válidas para todos los vendedores para obtener resultados precisos en el análisis. Asegúrese de revisar y ajustar las metas de los vendedores antes de realizar el cálculo.'
    });
    Swal.showLoading();
    this.informes.VentasxVendedor(this.Listvendedores,this.dateRange.startDate,this.dateRange.endDate).subscribe(
      (resp) => {
      Swal.close();
    

      this.reporte = resp;
      },
      (error) => {   
        // console.log(error);
          
        Swal.close();
      });
  }


  generarExcel(){
    console.log(this.Listvendedores);
    if(this.Listvendedores.length <= 0){
      new MetodosShared().AlertError('Por favor, asegúrese de seleccionar al menos un vendedor antes de continuar. Es necesario tener al menos un vendedor seleccionado para realizar la operación requerida.')
      return;
    }

    if(!this.validarFecha(this.dateRange.startDate) || !this.validarFecha(this.dateRange.endDate) ){
      new MetodosShared().AlertError('Por favor, asegúrese de seleccionar un rango válido de fechas antes de continuar. Es necesario especificar un rango de fechas para realizar la operación requerida. Asegúrese de proporcionar una fecha de inicio y una fecha final válidas.')
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere por favor..',
      text:'Se esta generando el excel..'
    });
    Swal.showLoading();
    this.informes.VentasxVendedorGeneral(this.Listvendedores,this.dateRange.startDate,this.dateRange.endDate).subscribe(
      (resp) => {
      Swal.close();
    

      console.log(resp)

      let reporte = new ventasXVendedorGeneral()
      reporte.dowloadExcel(resp.vendedores);


      },
      (error) => {   
        // console.log(error);
          
        Swal.close();
      });
  }
  
  removeChip(chip: string): void {
    const index = this.Listvendedores.indexOf(chip);
    // console.log(chip,index)
    if (index >= 0) {
      this.Listvendedores.splice(index, 1);
    }
  }
  
  displayFn(option: string): string {
    return option; // Mostrar el valor de la opción en el campo de autocompletado
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = (event.option.viewValue || '').trim();
  
    // Agregar el chip solo si tiene contenido y no está duplicado
    if (value && !this.Listvendedores.includes(value)) {
      
      this.Listvendedores.push(value);
    }
  
  
    this.text = '';
    
    
  }

}
