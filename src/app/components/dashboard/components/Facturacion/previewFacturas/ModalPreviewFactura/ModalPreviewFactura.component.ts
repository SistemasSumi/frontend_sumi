import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ModelAsiento } from '../../../Contabilidad/models/ModelAsiento';
import { IngresoService } from '../../../inventario/ingresoCompras/Ingreso.service';
import { FacturacionService } from '../../facturacion.service';
import { InvoceReport } from '../../models/InvoceReport';

@Component({
  selector: 'app-ModalPreviewFactura',
  templateUrl: './ModalPreviewFactura.component.html',
  styleUrls: ['./ModalPreviewFactura.component.css']
})
export class ModalPreviewFacturaComponent implements OnInit {

  @Input()
  id?:number;

  factura:InvoceReport

  // VARIABLES DE LA CONTABILIDAD 

  contaAsiento            : ModelAsiento;
  contaAsientoTotalDebito : number = 0;
  contaAsientoTotalCredito: number = 0;
  constructor(
    private rutaActiva    : ActivatedRoute,
    private invoceService: FacturacionService,
    private ingresoService: IngresoService,

  ) { 
    
  }

  ngOnInit() {
    
    this.cargarFactura();
  }

  cargarFactura(){


    if(this.id){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Cargando..',
        text:'Espere por favor..'
      });
      Swal.showLoading();
      this.invoceService.obtenerFactura(this.id).subscribe(resp => {

        // console.log(resp);
                
        this.factura = resp;

        this.obtenerAsiento(resp.numero);

        Swal.close();
      
       
     

      });
    }


 

  }

  obtenerAsiento(numero:string){
    this.invoceService.obtenerContabilidadAsiento(numero,'FAC').subscribe((resp:any)=> {
        this.contaAsiento = resp;
        this.contaAsientoTotalDebito  = 0;
        this.contaAsientoTotalCredito = 0;

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


  reContabilizar(){
    new MetodosShared().AlertQuestion(
      '¿ SEGURO DESEA VOLVER A CONTABILIZAR LA FACTURA ?'
    ).then((result) => {



      if (result.isConfirmed) {

    
            
            Swal.fire({
              allowOutsideClick: false,
              icon: 'info',
              title: 'Contabilizando..',
              text:'Espere por favor..'
            });
            Swal.showLoading();

            this.invoceService.Recontabilizar(this.factura.numero).subscribe(resp => {
              Swal.close();

              new MetodosShared().AlertOK('CONTABILIZADO CON EXITO!');
              this.obtenerAsiento(this.factura.numero);
            });
        
      

      }


    });
  }



  imprimir(){
    if(this.factura.numeracion.tipoDocumento == "1"){

      this.invoceService.imprimirFactura(this.factura.id);
    }else if(this.factura.numeracion.tipoDocumento == "2"){
      this.invoceService.imprimirPos(this.factura.id.toString())

    }
  }


}
