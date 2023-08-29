import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import * as moment from 'moment';
import { Observable, ReplaySubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
moment.locale('es')
@Component({
  selector: 'app-InputImageBase',
  templateUrl: './InputImageBase.component.html',
  styleUrls: ['./InputImageBase.component.css']
})
export class InputImageBaseComponent implements OnInit {

  id  :string = Math.random().toString(36).substring(2);
  hoy:Date = new Date();
  mes :string = moment(this.hoy).format("MMMM");
  dia :string = moment(this.hoy).format("DD");
  anio:string = moment(this.hoy).format("YYYY");




  urlImage: string;
 
 


//  VARIABLE DE TIPO STRING PARA GUARDAR UNA URL DE UNA FOTO EXISTENTE
  @Input() imagen: string;
  

//  VARIABLE DE TIPO STRING PARA COLOCAR UNA URL PERSONALIZADA
  @Input() urlDIR: string;

//  VARIABLE DE TIPO STRING PARA MOSTRAR UN TITULO EN LA FOTO
  @Input() tituloFoto: string;

//  VARIABLE DE TIPO STRING PARA MOSTRAR UN MENSAJE TOOLTIP ENCIMA DE LA FOTO
  @Input() tooltipFoto: string;
  

  
  constructor(private storage:AngularFireStorage, public auth:SeguridadService) {
    
  }
  
  obtenerTituloFoto(){
    if (this.tituloFoto) {
      return this.tituloFoto
    }else{
      return "FOTO";
    }
  }
  obtenerURL(){
    if (this.urlDIR) {
      return this.urlDIR;
    }else{
      return "AÑO_"+this.anio+"/"+"MES_"+this.mes+"/"+"DIA_"+this.dia+"/"+this.id;
    }
  }
  obtenerTooltipFoto(){
    if (this.tooltipFoto) {
      return this.tooltipFoto
    }else{
      return "CARGAR FOTO";
    }
  }
  obtenerImagenRecuperada(){
    if (this.imagen != null) {
      // console.log(this.urlDIR);
      
      this.urlImage = this.imagen;
    }else{
     this.urlImage = null;
     // console.log(this.imagen);

    }
  }

  eliminarFoto(){
    this.urlImage = null; 
   
    this.archivoSeleccionado.emit(this.urlImage);


  }


  onFileSelected(event) {

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.urlImage = reader.result as string;
      this.archivoSeleccionado.emit(this.urlImage);
    };

    reader.readAsDataURL(file);

  }



  @Output()
  archivoSeleccionado: EventEmitter<String> = new EventEmitter<String>();


 
  ngOnInit(): void {
    this.obtenerImagenRecuperada();
  }

}
