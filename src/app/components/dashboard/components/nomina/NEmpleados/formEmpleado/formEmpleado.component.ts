import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';

import { ConfiguracionService } from '../../../configuracion/Configuracion.service';
import { ModelTerceroCompleto } from '../../../configuracion/models/ModelTerceroCompleto';
import { NConfigService } from '../../NConfig/NConfig.service';
import { EmpleadosService } from '../Empleados.service';

@Component({
  selector: 'app-formEmpleado',
  templateUrl: './formEmpleado.component.html',
  styleUrls: ['./formEmpleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {

  TIPO = '';
  modalPrestaciones: NgbModalRef;
  modalIngresosyDeducciones: NgbModalRef;

  listadoEps             : any;
  listadoPension         : any;
  listadoArl             : any;
  listadoCajaCompensacion: any;
  listadoCesantias       : any;

  listadoIngresosRecurrentes : any;
  listadoDeduccionesRecurrentes : any;
  
  formEmpleado = this.formBuilder.group({    
    id: ['',{
      
    }],
    foto: ['',{
      
    }],
    idContrato: ['',{
      
    }],
    nombres: ['',{
      validators:[
        Validators.required,
      ]
    }],
    apellidos: ['',{
      validators:[
        Validators.required,
      ]
    }],
    tipoDocumento: ['',{
      validators:[
        Validators.required,
      ]
    }],
    documento: ['',{
      validators:[
        Validators.required,
      ]
    }],
    fechaNacimiento: ['',{
      validators:[
        Validators.required,
      ]
    }],
    correo: ['',{
      validators:[
        Validators.required,
        Validators.email,
      
      ]
    }],
    telefono: ['',{
      validators:[
        
      ]
    }],
    direccion: ['',{
      validators:[
        
      ]
    }],
    cargo: ['',{
      validators:[
        
      ]
    }],
    tercero: ['',{
      validators:[
        
      ]
    }],
    banco: ['',{
      validators:[
        
      ]
    }],
    formaDePago: ['',{
      validators:[
        
      ]
    }],
    noCuenta: ['',{
      validators:[
        
      ]
    }],
    salarioBase: ['',{
      validators:[
        
      ]
    }],
    eps: ['',{
      validators:[
        
      ]
    }],
    arl: ['',{
      validators:[
        
      ]
    }],
    fondoPension: ['',{
      validators:[
        
      ]
    }],
    fondoCesantias: ['',{
      validators:[
        
      ]
    }],
    cajaCompensacion: ['',{
      validators:[
        
      ]
    }],
    riesgo: ['',{
      validators:[
        
      ]
    }],
    fechaInicioContrato: ['',{
      validators:[
        
      ]
    }],
    fechaFinalContrato: ['',{
      validators:[
        
      ]
    }],
    noContrato: ['',{
      validators:[
        
      ]
    }],
    tipoContrato: ['',{
      validators:[
        
      ]
    }],
    tipoTrabajador: ['',{
      validators:[
        
      ]
    }],
    deduccionesRecurrentes: ['',{
      validators:[
        
      ]
    }],
    ingresosRecurrentes: ['',{
      validators:[
        
      ]
    }],
    
    
  });

  Proveedores  : ModelTerceroCompleto[] = [];
  public filtroTerceroControl: FormControl = new FormControl('');
  public filtroProveedor: BehaviorSubject<ModelTerceroCompleto[]>;
  protected _onDestroy = new Subject<void>();


  constructor(private EmpService:EmpleadosService ,private config:ConfiguracionService, private formBuilder: FormBuilder,private modalService  : NgbModal, private nconfig:NConfigService) { }

  ngOnInit() {
    this.obtenerEps();
    this.obtenerPension();
    this.obtenerArl();
    this.obtenerCaja();
    this.obtenerCesantias();
    this.obtenerProveedor();

    this.obtenerIngresosRecurrentes();
    this.obtenerDeduccionesRecurrentes();
    this.InitFiltroTercero();
  }

  obtenerIngresosRecurrentes(){
    this.nconfig.obtenerIngresoRecurrentes().subscribe(resp => {
      // console.log(resp);
      this.listadoIngresosRecurrentes = resp;
      console.log('Ingresos Recurrentes:',resp)
    });

  }

  obtenerDeduccionesRecurrentes(){
    this.nconfig.obtenerDeduccionRecurrentes().subscribe(resp => {
      // console.log(resp);
      this.listadoDeduccionesRecurrentes = resp;
      console.log('Deducciones Recurrentes: ',resp)
    });

  }




  obtenerProveedor(){
    this.config.SubjectdataProveedor.subscribe(resp => {
      this.Proveedores = resp;
      this.filtroProveedor = new BehaviorSubject<ModelTerceroCompleto[]>(this.Proveedores);
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
  }


  openModalPrestacionesEPS(content) {
    this.TIPO = 'EPS';
		this.modalPrestaciones = this.modalService.open(content, { size: 'lg',centered: true });
  }
  openModalPrestacionesPENSION(content) {
    this.TIPO = 'PENSION';
		this.modalPrestaciones = this.modalService.open(content, { size: 'lg',centered: true });
  }
  openModalPrestacionesARL(content) {
    this.TIPO = 'ARL';
		this.modalPrestaciones = this.modalService.open(content, { size: 'lg',centered: true });
  }
  openModalPrestacionesCAJA(content) {
    this.TIPO = 'CAJA DE COMPENSACIÓN';
		this.modalPrestaciones = this.modalService.open(content, { size: 'lg',centered: true });
  }
  openModalPrestacionesCESANTIAS(content) {
    this.TIPO = 'CESANTIAS';
		this.modalPrestaciones = this.modalService.open(content, { size: 'lg',centered: true });
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

  cerrarModalPrestaciones(){
    this.modalPrestaciones.close();
    // this.limpiarDetalle();
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

  guardarPrestacion(value){
    if(this.TIPO == 'EPS'){
      new MetodosShared().AlertQuestion(
        '¿ SEGURO DESEA AGREGAR LA NUEVA EPS ?'
      ).then((result) => {
        if (result.isConfirmed) {
  
  
           
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Guardando..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
          
          this.nconfig.SaveEps(value).subscribe(resp => {
            Swal.close();
            this.obtenerEps();
            this.cerrarModalPrestaciones();
            new MetodosShared().AlertOK('EPS REGISTRADA CON EXITO!');
          });

         
        } 
      });
      
      
    }else if(this.TIPO == 'PENSION'){
      new MetodosShared().AlertQuestion(
        '¿ SEGURO DESEA AGREGAR LA NUEVA PENSION ?'
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
            this.obtenerPension();
            this.cerrarModalPrestaciones();
            new MetodosShared().AlertOK('FONDO DE PENSIÓN REGISTRADO CON EXITO!');
          });

         
        } 
      });
    }else if(this.TIPO == 'ARL'){
      new MetodosShared().AlertQuestion(
        '¿ SEGURO DESEA AGREGAR LA NUEVA ARL ?'
      ).then((result) => {
        if (result.isConfirmed) {
  
  
           
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Guardando..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
          
          this.nconfig.SaveArl(value).subscribe(resp => {
            Swal.close();
            this.obtenerArl();
            this.cerrarModalPrestaciones();
            new MetodosShared().AlertOK('ARL REGISTRADA CON EXITO!');
          });

         
        } 
      });
    }else if(this.TIPO == 'CAJA DE COMPENSACIÓN'){

      new MetodosShared().AlertQuestion(
        '¿ SEGURO DESEA AGREGAR LA NUEVA CAJA DE COMPENSACIÓN ?'
      ).then((result) => {
        if (result.isConfirmed) {
  
  
           
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Guardando..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
          
          this.nconfig.SaveCaja(value).subscribe(resp => {
            Swal.close();
            this.obtenerCaja();
            this.cerrarModalPrestaciones();
            new MetodosShared().AlertOK('CAJA DE COMPENSACIÓN REGISTRADA CON EXITO!');
          });

         
        } 
      });
    }else if(this.TIPO == 'CESANTIAS'){
      new MetodosShared().AlertQuestion(
        '¿ SEGURO DESEA AGREGAR EL NUEVO FONDO DE CESANTIAS ?'
      ).then((result) => {
        if (result.isConfirmed) {
  
  
           
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Guardando..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
          
          this.nconfig.SaveCesantias(value).subscribe(resp => {
            Swal.close();
            this.obtenerCesantias();
            this.cerrarModalPrestaciones();
            new MetodosShared().AlertOK('FONDO DE CESANTIAS REGISTRADO CON EXITO!');
          });

         
        } 
      });
    }else{

    }
  }

  saveEmpleado(){
    console.log(this.formEmpleado.value)
    new MetodosShared().AlertQuestion(
      '¿ SEGURO DESEA GUARDAR UN NUEVO EMPLEADO ?'
    ).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Guardando..',
          text:'Espere por favor..'
        });
        Swal.showLoading();
        
        this.EmpService.SaveEmpleado(this.formEmpleado.value).subscribe(
          (resp) => {
            Swal.close();
            this.resetFormEmpleado();
            this.EmpService.actualizarEmpleados();
            new MetodosShared().AlertOK('NUEVO EMPLEADO REGISTRADO.!');
          },
          (error) => {
            Swal.close();
            console.log(error.error)
          }
        
        );

       
      } 
    });
  }

  resetFormEmpleado(){
    this.formEmpleado.reset();

    // Marcar el formulario como "pristine" (no modificado) y "untouched" (no tocado)
    this.formEmpleado.markAsPristine();
    this.formEmpleado.markAsUntouched();
  }


}
