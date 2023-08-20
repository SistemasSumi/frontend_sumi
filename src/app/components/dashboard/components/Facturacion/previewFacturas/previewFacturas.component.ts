import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ModelAsiento } from '../../Contabilidad/models/ModelAsiento';
import { IngresoService } from '../../inventario/ingresoCompras/Ingreso.service';
import { FacturacionService } from '../facturacion.service';
import { CxcMoviModels } from '../models/CxcMoviModels';
import { InvoceReport } from '../models/InvoceReport';

@Component({
  selector: 'app-previewFacturas',
  templateUrl: './previewFacturas.component.html',
  styleUrls: ['./previewFacturas.component.css']
})
export class PreviewFacturasComponent implements OnInit {


  id:number;
 
  constructor(
    private rutaActiva    : ActivatedRoute,
   

  ) { 
    
  }

  ngOnInit() {
    
    this.cargarFactura();
  }

  cargarFactura(){

      if(this.rutaActiva.snapshot.params.id){
        this.id = this.rutaActiva.snapshot.params.id;
        
      }

  }

  
}
