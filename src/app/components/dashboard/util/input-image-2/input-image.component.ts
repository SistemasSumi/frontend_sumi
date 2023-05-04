import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, Input } from '@angular/core';
import {AngularFireStorage} from  '@angular/fire/storage'
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import * as moment from 'moment';
moment.locale('es')

@Component({
  selector: 'app-input-image-2',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css']
})
export class InputImageComponent2 implements OnInit {
  
  id  :string = Math.random().toString(36).substring(2);
  hoy:Date = new Date();
  mes :string = moment(this.hoy).format("MMMM");
  dia :string = moment(this.hoy).format("DD");
  anio:string = moment(this.hoy).format("YYYY");

//  VARIABLE DE TIPO NUMBER PARA MOSTRAR PORCENTAJE DE SUBIDA DE LA FOTO
  uploadPercent: number = 0;


  urlImage: string;
  TypeImage: string;
  showBar: boolean = false;



  TypesArchivos = {
    'ecxel':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'pdf':'application/pdf',
    'word':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'png':'image/png',
    'jpg':'image/jpeg'
  }

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
  obtenerURL(nombre:String){
    if (this.urlDIR) {
      return this.urlDIR+"AÑO_"+this.anio+"/"+"MES_"+this.mes+"/"+"DIA_"+this.dia+"/"+nombre;
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
      console.log(this.urlDIR);
      
      this.urlImage = this.imagen;
    }else{
     this.urlImage = null;
     console.log(this.imagen);

    }
  }

  @Output()
  archivoSeleccionado: EventEmitter<String> = new EventEmitter<String>();

  @Output()
  TipoArchivoSeleccionado: EventEmitter<String> = new EventEmitter<String>();

  change(event){
    if(event.target.files.length > 0){
        //  const id         = Math.random().toString(36).substring(2);
        const file: File = event.target.files[0];


        if(file.type == this.TypesArchivos.ecxel){
          this.TypeImage = 'EXCEL'
          
        }else if(file.type == this.TypesArchivos.pdf){
          this.TypeImage = 'PDF'
        }else if(file.type == this.TypesArchivos.word){
          this.TypeImage = 'WORD'
        }else {
          this.TypeImage = 'IMG'
        }
        this.tituloFoto = file.name;
        console.log(file);
        
        const filePath   = this.obtenerURL(file.name);
        const ref        = this.storage.ref(filePath);
        const task       = this.storage.upload(filePath, file);

        task.percentageChanges().subscribe(resp => {
          this.showBar = true;
          this.uploadPercent = resp;
          
        })
        task.snapshotChanges().pipe( finalize(()=>  ref.getDownloadURL().subscribe( resp => {
          this.urlImage = resp;
          this.archivoSeleccionado.emit(this.urlImage);
          this.TipoArchivoSeleccionado.emit(this.TypeImage);
        }))).subscribe();
        
        

        // toBase64(file).then((value:string) => this.imagenBase64 = value)
        // .catch(error => console.log(error));
        // this.archivoSeleccionado.emit(file);
    }
  }
  ngOnInit(): void {
    this.obtenerImagenRecuperada();
  }

}
