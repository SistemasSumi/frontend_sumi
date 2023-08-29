import { Component, OnInit, Input, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TablasBasicasService } from '../../../../tablas-basicas/tablas-basicas.service';



@Component({
  selector: 'app-form-empleados',
  templateUrl: './form-empleados.component.html',
  styleUrls: ['./form-empleados.component.css']
})
export class FormEmpleadosComponent implements OnInit,AfterViewInit {
  
  @Input()  data:Promise<any>;
  @Output() cancelar:boolean;

  expand:boolean = false;
  formEmployed: FormGroup;
  


//  VARIABLE DE TIPO STRING PARA GUARDAR UNA URL DE UNA FOTO EXISTENTE
  fotoRecuperada:string;


//  VARIABLE DE TIPO STRING PARA MOSTRAR UN MENSAJE TOOLTIP ENCIMA DE LA FOTO
  tooltipFoto:string = "CARGAR FOTO DEL EMPLEADO";

//  VARIABLE DE TIPO STRING PARA MOSTRAR UN TITULO EN LA FOTO
  tituloFoto :string = "FOTO DEL EMPLEADO";

//  VARIABLE DE TIPO STRING PARA COLOCAR UNA URL PERSONALIZADA
  urlDIR     :string = "empleados/fotos/";
  dataFinca: any;

  dataCargos: any;
  dataTiposEmpleados: any;

  constructor(private formBuilder: FormBuilder,private tablasBasicas:TablasBasicasService) {
    this.tablasBasicas.cargosSubject.subscribe(resp => {
      // console.log(resp);
      this.dataCargos = resp;
      
    })
    this.inicializarFormEmployed();
    // this.tablasBasicas.getFincas().subscribe(resp => {
    //   this.dataFinca = resp;
    // })
    // this.tablasBasicas.getTiposEmpleados().subscribe(resp => {
    //   this.dataTiposEmpleados = resp;
    // })
    // this.tablasBasicas.getCargos().subscribe(resp => {
    //   this.dataCargos = resp;
    // })
    
  
  }
  ngAfterViewInit(): void {
   
  
  }
  

  

  ngOnInit(): void {  
    this.data.then((res) => {
      this.fotoRecuperada = res.foto;
      this.recuperarFoto();
      
      // console.log(this.dataCargos);
       this.initFormEdit(res);
       // console.log(res.cargo);
      
     })
  
  }

//  METODO PARA VALIDAR SI EXISTE UNA FOTO RECUPERADA O NO
  recuperarFoto(){
    if (this.fotoRecuperada) {
      return this.fotoRecuperada;
    }else{
      return null;
    }
  }


  newEmployed(){

  }

  
  archivoSeleccionado(file){
    this.formEmployed.get('foto').setValue(file)
  }
 
 
  initFormEdit(data){

   
    this.formEmployed   = this.formBuilder.group({
      cedula: [data.cedula,{
        validators:[
          Validators.required,
        ]
      }],   
      foto: [data.foto,{
        validators:[
          Validators.required,
        ]
      }],
      nombres: [data.nombres,{
        validators:[
          Validators.required,
        ]
      }],
      apellidos: [data.apellidos,{
        validators:[
          Validators.required,
        ]
      }],
      cargo: new FormControl(data.cargo.id),
      tipoEmpleado:  new FormControl('data.tipo_emp.id,',{validators:[Validators.required,]}),
      finca:  new FormControl('',{validators:[Validators.required,]}),
      direccion: ['',{
        validators:[
          Validators.required,
        ]
      }],
      telefonos: ['',{
        validators:[
          Validators.required,
        ]
      }],
      email: ['',{
        validators:[
          Validators.required,
          Validators.email
        ]
      }],

    });
  }


  inicializarFormEmployed(){
    
    this.formEmployed = this.formBuilder.group({
      cedula: ['',{
        validators:[
          Validators.required,
        ]
      }],   
      foto: ['',{
        validators:[
          Validators.required,
        ]
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
      cargo: [ new FormControl('',{validators:[Validators.required,]})],
      tipoEmpleado: [ new FormControl('',{validators:[Validators.required,]})],
      finca: [ new FormControl('',{validators:[Validators.required,]})],
      direccion: ['',{
        validators:[
          Validators.required,
        ]
      }],
      telefonos: ['',{
        validators:[
          Validators.required,
        ]
      }],
      email: ['',{
        validators:[
          Validators.required,
          Validators.email
        ]
      }],

    });
  }
    
  

}
