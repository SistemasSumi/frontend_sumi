import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { NConfigService } from '../../NConfig/NConfig.service';
import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { EmpleadosService } from '../Empleados.service';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-PreviewEmpleados',
  templateUrl: './PreviewEmpleados.component.html',
  styleUrls: ['./PreviewEmpleados.component.css']
})
export class PreviewEmpleadosComponent implements OnInit {
  ObjEmpleado:any;
  ObjEmpleadoContrato:any;
  
  metodos:MetodosShared = new MetodosShared();
  _empleado:empleado;
  datosPersonales:DatosPersonales;
  datosContrato:DatosContrato;
  datosDePago:DatosDePago;

  listadoEps             : any;
  listadoPension         : any;
  listadoArl             : any;
  listadoCajaCompensacion: any;
  listadoCesantias       : any;
  listadoIngresosRecurrentes : any;
  listadoDeduccionesRecurrentes : any;

  selectedDeducciones: number[] = [];
  selectedIngresos: number[] = [];


  _editDatosPersonales:boolean = false;
  _editDatosContrato:boolean = false;
  _editDatosPago:boolean=false;

  valoresIngresosRecurrentes:any;
  valoresDeduccionesRecurrentes:any

  TIPO = '';
  modalIngresosyDeducciones: NgbModalRef;

  Proveedores  : ModelTerceroCompleto[] = [];
  public filtroTerceroControl: FormControl = new FormControl('');
  public filtroProveedor: BehaviorSubject<ModelTerceroCompleto[]>;
  protected _onDestroy = new Subject<void>();

  constructor(private EmpService:EmpleadosService,private config:ConfiguracionService,private route:ActivatedRoute,private nconfig:NConfigService,private modalService  : NgbModal) { }

  ngOnInit() {
    this.ObjEmpleado = localStorage.getItem('empleadoEdit');
    this.ObjEmpleado = JSON.parse(this.ObjEmpleado);
    this.ObjEmpleadoContrato = this.ObjEmpleado.contrato
    console.log(this.ObjEmpleadoContrato,'este es el obj')
    
    this.obtenerEps();
    this.obtenerPension();
    this.obtenerArl();
    this.obtenerCaja();
    this.obtenerCesantias();
    this.obtenerProveedor()
    this.obtenerIngresosRecurrentes();
    this.obtenerDeduccionesRecurrentes();
    this.InitFiltroTercero();

    
    this.llenarDatosPerfil();
    
  }

  obtenerIngresosRecurrentes(){
    this.nconfig.obtenerIngresoRecurrentes().subscribe(resp => {
      
      this.listadoIngresosRecurrentes = resp;
      
    });

  }

  obtenerDeduccionesRecurrentes(){
    this.nconfig.obtenerDeduccionRecurrentes().subscribe(resp => {
      this.listadoDeduccionesRecurrentes = resp;
    });

  }
  
  updateDeducciones(event: MatSelectChange): void {
    this.datosContrato.deduccionesRecurrentes = this.listadoDeduccionesRecurrentes.filter(item => this.selectedDeducciones.includes(item.id));
    console.log(this.datosContrato.deduccionesRecurrentes)
  }

  updateIngresos(event: MatSelectChange): void {
    this.datosContrato.ingresosRecurrentes = this.listadoIngresosRecurrentes.filter(item => this.selectedIngresos.includes(item.id));
    console.log(this.datosContrato.ingresosRecurrentes)
  }
 
  llenarDatosPerfil(){
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
      banco: this.ObjEmpleado.banco,
      formaDepago: this.ObjEmpleado.formaDepago,
      noCuenta: this.ObjEmpleado.noCuenta,
    };

    // Llenar la interfaz DatosDePago
    

    // Llenar la interfaz DatosContrato
    this.datosContrato = {
      id: this.ObjEmpleadoContrato.id,
      eps: this.ObjEmpleadoContrato.eps,
      arl: this.ObjEmpleadoContrato.arl,
      fondoPension: this.ObjEmpleadoContrato.fondoPension,
      cajaCompensacion: this.ObjEmpleadoContrato.cajaCompensacion,
      salarioBase: this.ObjEmpleadoContrato.salarioBase,
      valorDia: this.ObjEmpleadoContrato.valorDia,
      noContrato: this.ObjEmpleadoContrato.noContrato,  
      tipoContrato: this.ObjEmpleadoContrato.tipoContrato,
      tipoTrabajador: this.ObjEmpleadoContrato.tipoTrabajador,
      fechaInicioContrato: new Date(this.ObjEmpleadoContrato.fechaInicioContrato),
      fechaFinalContrato: new Date(this.ObjEmpleadoContrato.fechaFinalContrato),
      riesgo: this.ObjEmpleadoContrato.riesgo,
      fondoCesantias: this.ObjEmpleadoContrato.fondoCesantias,
      deduccionesRecurrentes: this.ObjEmpleadoContrato.deduccionesRecurrentes,
      ingresosRecurrentes: this.ObjEmpleadoContrato.ingresosRecurrentes,
      icbf: null,
      sena: null,
    };
    this.selectedDeducciones = this.datosContrato.deduccionesRecurrentes.map(item => item.id);
    this.selectedIngresos = this.datosContrato.ingresosRecurrentes.map(item => item.id);
    
  }  
  actualizarDatosPersonales(){
    this.metodos.AlertQuestion('¿Seguro quiere actualizar los datos personales?').then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Actualizando..',
          text:'Espere por favor..'
        });
        Swal.showLoading();
        this.EmpService.UpdateEmpleado(this.datosPersonales).subscribe(
          (resp) => {
            Swal.close()
            this.metodos.AlertOK('Datos actualizados')
            console.log(resp);
            this.ObjEmpleado = resp
            this.llenarDatosPerfil();
            this._editDatosPersonales = false
            this._editDatosPago = false
          },
          (error) => {
            console.error('Error al actualizar datos personales:', error.error);
            // Realizar acciones adicionales si es necesario
          }
        );
      } else {
        this._editDatosPago = false
        this.llenarDatosPerfil();
      }
    });
    
  }

  actualizarDatosContrato(){
    this.metodos.AlertQuestion('¿Seguro quiere actualizar los datos del contrato?').then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Actualizando..',
          text:'Espere por favor..'
        });

        Swal.showLoading();
        
        this.EmpService.UpdateContratoEmpleado(this.datosContrato).subscribe(
          (resp) => {
            Swal.close()
            console.log(resp)
            this.metodos.AlertOK('Datos actualizados')
            this.ObjEmpleadoContrato = resp
            // this.datosContrato = resp
            this.llenarDatosPerfil();
            this._editDatosContrato = !this._editDatosContrato
          },
          (error) => {
            console.error('Error al actualizar datos de Contrato:', error.error);
            // Realizar acciones adicionales si es necesario
          }
        );
      } else {
        this.llenarDatosPerfil();
      }
    });
    
  }

  guardarIngresoDeduccion(value){
    if(this.TIPO == 'INGRESO RECURRENTE'){
      new MetodosShared().AlertQuestion(
        '¿ SEGURO DESEA AGREGAR NUEVO INGRESO RECURRENTE ?'
      ).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Guardando..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
          let nuevoIngreso = {IngresosRecurrentes: value}
          console.log(value)
          this.EmpService.UpdateContratoEmpleado(nuevoIngreso).subscribe(
            (resp) => {
              Swal.close()
              console.log(resp)
              this.metodos.AlertOK('Datos actualizados')
              this.ObjEmpleadoContrato = resp
              // this.datosContrato = resp
              this.llenarDatosPerfil();
              this._editDatosContrato = !this._editDatosContrato
            },
            (error) => {
              console.error('Error al actualizar datos de Contrato:', error.error);
              // Realizar acciones adicionales si es necesario
            }
          );
          // this.nconfig.guardarIngresoRecurrentes(value).subscribe(resp => {
          //   console.log(resp)
          //   this.datosContrato.ingresosRecurrentes.push(resp)
          //   this.llenarDatosPerfil()
          //   Swal.close();
          //   new MetodosShared().AlertOK('INGRESO RECURRENTE REIGISTRADO CON EXITO');
          // },
          // (ex)=>{
          //   Swal.close();
           

          //   // Muestra un mensaje de error al usuario
          //   new MetodosShared().AlertError(ex.error);
          // });
        } 
      });
      
      
    }else if(this.TIPO == 'DEDUCCION RECURRENTE'){
      new MetodosShared().AlertQuestion(
        '¿ SEGURO DESEA AGREGAR LA NUEVA DEDUCCION RECURRENTE ?'
      ).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Guardando..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
          this.nconfig.SavePension(value).subscribe(resp => {
            Swal.close();  
            new MetodosShared().AlertOK('DEDUCCION RECURRENTE REGISTRADA CON EXITO');
          });
        } 
      });
    }
  }
  


 
  obtenerEps(){
    this.nconfig.obtenerEps().subscribe(resp => {
      // console.log(resp);
      this.listadoEps = resp;
    });
  }

  obtenerPension(){
    this.nconfig.obtenerPension().subscribe(resp => {
      // console.log(resp);
      this.listadoPension = resp;
      // console.log(resp)
    });
  }

  obtenerArl(){
    this.nconfig.obtenerArls().subscribe(resp => {
      // console.log(resp);
      this.listadoArl = resp;
    });
  }

  obtenerCaja(){
    this.nconfig.obtenerCaja().subscribe(resp => {
      // console.log(resp);
      this.listadoCajaCompensacion = resp;
    });
  }

  obtenerCesantias(){
    this.nconfig.obtenerCesantias().subscribe(resp => {
      // console.log(resp);
      this.listadoCesantias = resp;
      
    });
  }

  obtenerProveedor(){
    this.config.SubjectdataProveedor.subscribe(resp => {
      this.Proveedores = resp;
      this.filtroProveedor = new BehaviorSubject<ModelTerceroCompleto[]>(this.Proveedores);
      // console.log(this.filtroProveedor)
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
    let filtro:ModelTerceroCompleto[] = new MetodosShared().filtrarArray<ModelTerceroCompleto>(this.Proveedores,'nombreComercial',busqueda);
    this.filtroProveedor.next(filtro);
    // console.log(this.filtroProveedor)
  }



  calcularSumaIngresos(ingresos:any[]): number {
    return ingresos.reduce((total, ingreso) => total + ingreso.valorMensual, 0);
  }

  calcularSumaDeducciones(deducciones: any[]): number {
    return deducciones.reduce((total, deduccion) => total + deduccion.valorMensual, 0);
  }

  openModalIngresos(content) {
    this.TIPO = 'INGRESO RECURRENTE';
		this.modalIngresosyDeducciones = this.modalService.open(content, { size: 'lg',centered: true });
  }
  openModalDeducciones(content) {
    this.TIPO = 'DEDUCCION RECURRENTE';
		this.modalIngresosyDeducciones = this.modalService.open(content, { size: 'lg',centered: true });
  }

  cerrarModalIngresosyDeducciones(){
    this.modalIngresosyDeducciones.close();
    // this.limpiarDetalle();
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
  banco: string;
  formaDepago: any;
  noCuenta: string;
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
  tipoContrato: any;
  tipoTrabajador: any;
  fechaInicioContrato: Date;
  fechaFinalContrato: Date;
  riesgo: any;
  fondoCesantias: { id: number; tercero: string } | null;
  deduccionesRecurrentes: any
  ingresosRecurrentes: any
  icbf: null;
  sena: null;
}



