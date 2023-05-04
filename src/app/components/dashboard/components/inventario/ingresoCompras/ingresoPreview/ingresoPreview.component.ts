import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ModelAsiento } from '../../../Contabilidad/models/ModelAsiento';
import { IngresoService } from '../Ingreso.service';
import { InventoryEntry } from '../models/inventoryEntry';

@Component({
  selector: 'app-ingresoPreview',
  templateUrl: './ingresoPreview.component.html',
  styleUrls: ['./ingresoPreview.component.css']
})
export class IngresoPreviewComponent implements OnInit {

  // VARIABLES DEL INGRESO 
  ingreso:InventoryEntry;



  // VARIABLES DE LA CONTABILIDAD 

  contaAsiento            : ModelAsiento;
  contaAsientoTotalDebito : number = 0;
  contaAsientoTotalCredito: number = 0;


  constructor(
    private rutaActiva    : ActivatedRoute,
    private ingresoService: IngresoService,

  ) { }






  ngOnInit() {
    this.cargarOrden();
  }

  cargarOrden(){
    if(this.rutaActiva.snapshot.params.id){
      let id = this.rutaActiva.snapshot.params.id;
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Cargando ingreso..',
        text:'Espere por favor..'
      });
      Swal.showLoading();
      this.ingresoService.buscarIngresoSegunOc(id).subscribe(resp => {

        console.log(resp);
                
        this.ingreso = resp;

        this.obtenerAsiento(resp.numero);

        Swal.close();
      
       
     

      });
  }

  }


obtenerAsiento(numero:string){
  this.ingresoService.obtenerContabilidadAsiento(numero).subscribe((resp:any)=> {
      this.contaAsiento = resp;
      for(let x of this.contaAsiento.detalle){
          if(x.debito > 0){
            this.contaAsientoTotalDebito += x.debito;
          }
          if(x.credito > 0){
            this.contaAsientoTotalCredito += x.credito;

          }
      }
      
  });
}




  imprimir(){
    this.ingresoService.imprimir(this.ingreso);
  }

}
