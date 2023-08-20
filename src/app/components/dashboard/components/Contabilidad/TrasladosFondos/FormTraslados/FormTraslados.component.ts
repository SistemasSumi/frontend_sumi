import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ModelNumeraciones } from '../../../configuracion/models/ModelNumeraciones';
import { PucService } from '../../puc/puc.service';
import { TrasladosService } from '../Traslados.service';

@Component({
  selector: 'app-FormTraslados',
  templateUrl: './FormTraslados.component.html',
  styleUrls: ['./FormTraslados.component.css']
})
export class FormTrasladosComponent implements OnInit {
  numeroEdit: string  = '';

  numeraciones:ModelNumeraciones[] = [];
  consecutivo:number;
  fechaRegistro:Date = new Date();

  listaDeGrupos:grupos[] = [];
  pucList:any[] = [];
  cuenta_origen:number;
  cuenta_destino:number;
  concepto:string;
  monto:string = "0";

  saldoActual:number = 0;

  constructor(private route:ActivatedRoute, private puc:PucService,private trasladoService:TrasladosService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.numeroEdit = params.get('numeroEdit');
    });
    this.numeracion();
    this.puc.getEfectivo().subscribe(resp => {
      console.log(resp);
      
      this.pucList = resp;

      for(let x of resp){
        if(x.codigo.toString().length < 6){
          let c:cuentas[] = [];
          for(let j of resp){
            if(x.codigo.toString() == j.codigo.toString().substring(0, 4) && j.codigo.toString().length >= 6){
              c.push(j)
            }
          }

          let g:grupos = {
            codigo: x.codigo,
            nombre:x.nombre,
            cuentas:c
          }

          this.listaDeGrupos.push(g);
        }
      }
    });

    this.MetodoEditar();
  }



  
  MetodoEditar(){
    if(this.numeroEdit != '' && this.numeroEdit != null){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Consultando traslado..',
      text:'Espere por favor..'
    });
    Swal.showLoading();
      this.trasladoService.getTraslado(this.numeroEdit).subscribe(
        (resp) => {
        console.log(resp);
        Swal.close();
        this.numeraciones = [];
        resp.numeracion.numero = resp.numero
        this.consecutivo = resp.numeracion.id
        this.numeraciones.push(resp.numeracion);
        this.fechaRegistro = parseDateWithoutTimezone(resp.fecha);
        this.cuenta_origen = resp.cuenta_origen.id;
        this.ObtenerSaldo(resp.cuenta_origen.id);
        this.cuenta_destino = resp.cuenta_destino.id;
        this.monto = resp.monto;
        this.concepto = resp.concepto;

        
      },
      (error) => {
        console.log(error.error);
        Swal.close();
      }
      
      ); 
    }
  }


  numeracion(){
    this.trasladoService.getNumeracion().subscribe(resp => {
      this.numeraciones = resp;
      this.consecutivo = this.numeraciones[0].id;
    })
  }

  ObtenerSaldo(id){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Consultando saldo..',
      text:'Espere por favor..'
    });
    Swal.showLoading();
    this.trasladoService.getSaldoCuenta(id).subscribe(resp => {
      console.log(resp);
      this.saldoActual = resp;
      Swal.close();
    });
  }

  transform(value:number)
  {
    if(!isNaN(value)){

      return new CurrencyPipe('en-US').transform(value)
    }else{
      new MetodosShared().AlertError('Introduce un valor Valido.')
      
    }
    
  }


  // Método para limpiar los campos después de guardar el traslado
  limpiarCampos(): void {
    this.fechaRegistro = new Date();
    this.consecutivo = null;
    this.cuenta_origen = null;
    this.cuenta_destino = null;
    this.monto = "0";
    this.concepto = null;
    
  }

  guardar(){
    if(!this.consecutivo){
      new MetodosShared().AlertError('Seleccione una numeracion.')
      return;
    }

    if(!this.cuenta_origen){
      new MetodosShared().AlertError('Seleccione una cuenta origen.')
      return;
    }
    if(!this.cuenta_destino){
      new MetodosShared().AlertError('Seleccione una cuenta destino.')
      return;
    }
    if(!this.monto){
      new MetodosShared().AlertError('Debe introducir un monto mayor a 0.')
      return;
    }
    
    if(!this.concepto){
      new MetodosShared().AlertError('Debe introducir un concepto.')
      return; 
    }

    if(this.saldoActual < parseFloat(this.monto) || parseFloat(this.monto) == 0){
      new MetodosShared().AlertError('Disculpa, pero no es posible completar la transacción debido a un saldo insuficiente en la cuenta o el monto supera el saldo actual de la misma. Te recomendamos verificar tus fondos disponibles y asegurarte de contar con el monto necesario para realizar la operación deseada. Si tienes alguna pregunta o inquietud adicional, no dudes en contactarnos para brindarte asistencia.')
      return;
    }



    let data = {
      "numeracion": this.consecutivo, 
      "fecha": this.fechaRegistro, 
      "cuenta_origen": this.cuenta_origen, 
      "cuenta_destino": this.cuenta_destino, 
      "monto": this.monto, 
      "concepto": this.concepto, 
    }

    if(this.numeroEdit != '' && this.numeroEdit != null){
      new MetodosShared().AlertQuestion(
        '¿ SEGURO DESEA ACTUALIZAR EL TRASLADO ?'
      ).then((result) => {
        if (result.isConfirmed) {
  
  
           
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Actualizando..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
  
          this.trasladoService.actualizaTraslado(data,this.numeroEdit).subscribe(
              (resp) => {
                Swal.close();
                new MetodosShared().AlertOK(`El traslado N° ${resp.numero} fue Actualizado con exito.`);
                console.log(resp);
                this.limpiarCampos();
                this.numeracion();
                this.trasladoService.actualizarListado();
              },
              (error) => {
                console.log(error)
                new MetodosShared().AlertError(error.error);
              }
        
            );
         
        } 
      });
    }else{

      new MetodosShared().AlertQuestion(
        '¿ SEGURO DESEA GUARDAR EL TRASLADO ?'
      ).then((result) => {
        if (result.isConfirmed) {
  
  
           
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Guardando..',
            text:'Espere por favor..'
          });
          Swal.showLoading();
  
          this.trasladoService.crearTraslado(data).subscribe(
              (resp) => {
                Swal.close();
                new MetodosShared().AlertOK(`El traslado N° ${resp.numero} fue Registrado con exito.`);
                console.log(resp);
                this.limpiarCampos();
                this.numeracion();
                this.trasladoService.actualizarListado();

              },
              (error) => {
                console.log(error)
                new MetodosShared().AlertError(error.error);
              }
        
            );
         
        } 
      });
    }



    
    
  }
 


}
interface grupos {
  nombre: string;
  codigo: string;
  cuentas: cuentas[];
}

interface cuentas {
  id: number
  nombre: string;
  
}


function parseDateWithoutTimezone(dateString) {
  var parts = dateString.split("-");
  var year = parseInt(parts[0]);
  var month = parseInt(parts[1]) - 1; // Restamos 1 porque los meses en JavaScript van de 0 a 11
  var day = parseInt(parts[2]);

  var date = new Date();
  date.setFullYear(year, month, day);
  date.setHours(0, 0, 0, 0);

  return date;
}
