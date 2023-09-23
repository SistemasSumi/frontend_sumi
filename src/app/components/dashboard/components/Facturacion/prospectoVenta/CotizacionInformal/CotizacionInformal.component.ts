import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-CotizacionInformal',
  templateUrl: './CotizacionInformal.component.html',
  styleUrls: ['./CotizacionInformal.component.css']
})
export class CotizacionInformalComponent implements OnInit {
  cotizacionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { 
    this.cotizacionForm = this.fb.group({
      numero: ['', Validators.required],
      prefijo: ['', ],
      cliente: ['', Validators.required],
      fecha: ['',],
      valor: [0, Validators.required],
      descuento: [0],
      valorLetras: [''],
      observacion: [''],
      formaPago: ['', Validators.required],
      valorIva: [0],
      valorReteFuente: [0],
      subtotal: [0],
      detalle_cotizacion_informal: this.fb.array([]),
    });
  }

  ngOnInit() {
  }

  agregarDetalleCotizacion() {
    const detalleFormGroup = this.fb.group({
      producto: ['', Validators.required],
      valorCompra: [0, Validators.required],
      valor: [0, Validators.required],
      cantidad: [0, Validators.required],
      vence: ['', Validators.required],
      subtotal: [0],
      descuento: [0],
      iva: [0],
      total: [0],
    });

    this.detalleCotizacionFormArray.push(detalleFormGroup);
  }


  get detalleCotizacionFormArray() {
    return this.cotizacionForm.get('detalle_cotizacion_informal') as FormArray;
  }

  eliminarDetalleCotizacion(index: number) {
    this.detalleCotizacionFormArray.removeAt(index);
  }


}


 interface CotizacionData {
  numero: string;
  prefijo: string;
  cliente: string;
  fecha: Date;
  valor: number;
  descuento: number;
  valorLetras: string;
  observacion: string;
  formaPago: string;
  valorIva: number;
  valorReteFuente: number;
  subtotal: number;
  detalle_cotizacion_informal: DetalleCotizacionData[];
}

 interface DetalleCotizacionData {
  producto: string;
  valorCompra: number;
  valor: number;
  cantidad: number;
  vence: Date;
  subtotal: number;
  descuento: number;
  iva: number;
  total: number;
}
