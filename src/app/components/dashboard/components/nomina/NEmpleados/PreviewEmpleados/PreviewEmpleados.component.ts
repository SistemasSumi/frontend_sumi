import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-PreviewEmpleados',
  templateUrl: './PreviewEmpleados.component.html',
  styleUrls: ['./PreviewEmpleados.component.css']
})
export class PreviewEmpleadosComponent implements OnInit {
  ObjEmpleado:any;

  _empleado:empleado;
  datosPersonales:DatosPersonales;
  datosContrato:DatosContrato;
  datosDePago:DatosDePago;


  _editDatosPersonales:boolean = false;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.ObjEmpleado = localStorage.getItem('empleadoEdit');
    this.ObjEmpleado = JSON.parse(this.ObjEmpleado);
    


    this._empleado = {
      id_empleado: this.ObjEmpleado.id,
      foto:this.ObjEmpleado.foto
    }

    // Llenar la interfaz DatosPersonales
    this.datosPersonales = {
      id_empleado: this.ObjEmpleado.id,
      tercero: this.ObjEmpleado.tercero,
      primerNombre:  this.ObjEmpleado.primerNombre,
      segundoNombre:  this.ObjEmpleado.segundoNombre,
      primerApellido:  this.ObjEmpleado.primerApellido,
      segundoApellido:  this.ObjEmpleado.segundoApellido,
      tipoDocumento:this.ObjEmpleado.tipoDocumento ,
      documento: this.ObjEmpleado.documento,
      fechaNacimiento: new Date(this.ObjEmpleado.fechaNacimiento),
      correo: this.ObjEmpleado.correo,
      telefono: this.ObjEmpleado.telefono,
      direccion:this.ObjEmpleado.direccion,
      Cargo: this.ObjEmpleado.Cargo,
    };

    // Llenar la interfaz DatosDePago
    this.datosDePago = {
      id_empleado: this.ObjEmpleado.id,
      banco: this.ObjEmpleado.banco,
      formaDepago: this.ObjEmpleado.formaDepago,
      noCuenta: this.ObjEmpleado.noCuenta,
    };

    // Llenar la interfaz DatosContrato
    this.datosContrato = {
      id: this.ObjEmpleado.contrato.id,
      eps: this.ObjEmpleado.contrato.eps,
      arl: this.ObjEmpleado.contrato.arl,
      fondoPension: this.ObjEmpleado.contrato.fondoPension,
      cajaCompensacion: this.ObjEmpleado.contrato.cajaCompensacion,
      salarioBase: this.ObjEmpleado.contrato.salarioBase,
      valorDia: this.ObjEmpleado.contrato.valorDia,
      noContrato: this.ObjEmpleado.contrato.noContrato,
      tipoContrato: this.ObjEmpleado.contrato.tipoContrato.nombre,
      tipoTrabajador: this.ObjEmpleado.contrato.tipoTrabajador.nombre,
      fechaInicioContrato: new Date(this.ObjEmpleado.contrato.fechaInicioContrato),
      fechaFinalContrato: new Date(this.ObjEmpleado.contrato.fechaFinalContrato),
      riesgo: this.ObjEmpleado.contrato.riesgo.nombre,
      fondoCesantias: this.ObjEmpleado.contrato.fondoCesantias,
      icbf: null,
      sena: null,
    };

    // console.log("Datos Personales:",datosPersonales);
    // console.log("Datos Bancarios:", datosDePago);

  }

}


interface empleado  {
  id_empleado: number;
  foto:string | null;
}

interface DatosPersonales {
  id_empleado: number;
  tercero: { id: number; nombreComercial: string } | null;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  tipoDocumento: any;
  documento: string;
  fechaNacimiento: Date;
  correo: string;
  telefono: string;
  direccion: string;
  Cargo: string;
}

interface DatosDePago {
  id_empleado: number;
  banco: string;
  formaDepago: any;
  noCuenta: string;
}

interface DatosContrato {
  id: number;
  eps: { id: number; tercero: string } | null;
  arl: { id: number; tercero: string } | null;
  fondoPension: { id: number; tercero: string } | null;
  cajaCompensacion: { id: number; tercero: string } | null;
  salarioBase: number;
  valorDia: number;
  noContrato: string;
  tipoContrato: string;
  tipoTrabajador: string;
  fechaInicioContrato: Date;
  fechaFinalContrato: Date;
  riesgo: string;
  fondoCesantias: { id: number; tercero: string } | null;
  icbf: null;
  sena: null;
}



