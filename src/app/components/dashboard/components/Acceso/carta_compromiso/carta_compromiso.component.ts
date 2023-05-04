import { Component, OnInit, AfterViewInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { ProductosService } from '../producto/productos.service';
import { environment } from '../../../../../../environments/environment.prod';

declare var $;


@Component({
  selector: 'app-carta_compromiso',
  templateUrl: './carta_compromiso.component.html',
  styleUrls: ['./carta_compromiso.component.css']
})
export class Carta_compromisoComponent implements OnInit,AfterViewInit {

  @Input()  data:Promise<any>;
  @Output() cancelar:boolean;


  table:any = $('').DataTable({});


  expand:boolean = false;
  formCartas: FormGroup;
  public dataProducto$: any;
//  VARIABLE DE TIPO STRING PARA GUARDAR UNA URL DE UNA FOTO EXISTENTE
fotoRecuperada:string;


//  VARIABLE DE TIPO STRING PARA MOSTRAR UN MENSAJE TOOLTIP ENCIMA DE LA FOTO
  tooltipFoto:string = "CARGAR ARCHIVO";

//  VARIABLE DE TIPO STRING PARA MOSTRAR UN TITULO EN LA FOTO
  tituloFoto :string = "CARTA DE COMPROMISO";

//  VARIABLE DE TIPO STRING PARA COLOCAR UNA URL PERSONALIZADA
  urlDIR     :string = "productos/cartas/";


  constructor(private auth:SeguridadService,private formBuilder: FormBuilder,private productoService:ProductosService) { }


  ngOnInit() {
    this.inicializarFormEmployed();
    this.getDataProducto();
    this.llenarCartas();
  }

  ngAfterViewInit(): void {
   
  
  }
  

  archivoSeleccionado(file){
    console.log(file);
    
    this.formCartas.get('archivo').setValue(file)
  }

  TipoArchivoSeleccionado(file){
    console.log(file);
    
    this.formCartas.get('tipoArchivo').setValue(file)
  }

  inicializarFormEmployed(){
    
    this.formCartas = this.formBuilder.group({
      producto: ['',{
        validators:[
          Validators.required,
        ]
      }],
      codigo: ['',{
        validators:[
          Validators.required,
        ]
      }],   
      archivo: ['',{
        validators:[
          Validators.required,
        ]
      }],
      tipoArchivo: ['',{
        validators:[
          Validators.required,
        ]
      }],
      observaciones: ['',{
        validators:[
          // Validators.required,
        ]
      }],
     
    });
  }



  llenarTable(idtable:string,data,columns,nameButton){
    var tokenid =  this.auth.currentUser.getTokenUser();
    var beforeSend = function (xhr) {
      xhr.setRequestHeader('Authorization', 'Token ' +tokenid);
    }
    $.ajaxSetup({
      beforeSend: beforeSend
    });


    this.table =  $('#Table'+idtable).DataTable({
      responsive: true,
      autoWidth: true,
      pageLength: 5,   
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "Todos"]],
      language: environment.languageDataTable,
      data:data,
      columns:columns,
      columnDefs:[
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: 1 },
        { responsivePriority: 3, targets: -1 },
        {
          targets:[0],
          class:'text-center',
          orderable: false,
          render: function(data,type,row){
              return '';
          }
        },
        {
          targets:[-1],
          class:'text-center',
          orderable: false,
          render: function(data,type,row){
              console.log(data);
              
              let img = "";
              if(data.tipo == "PDF"){
                  img ='<a href="'+data.url+'" target="_blank"><img src="./assets/theme/iconos/archivos/pdf.png" class="well drop-zone" alt="foto"  style="width: 40px; height: 40px"></a>';
              }
              if(data.tipo == "EXCEL"){
                img ='<a href="'+data.url+'" target="_blank"><img src="./assets/theme/iconos/archivos/ecxel.png" class="well drop-zone" alt="foto"  style="width: 40px; height: 40px"></a>';
              }
              if(data.tipo == "WORD"){
                img ='<a href="'+data.url+'" target="_blank"><img src="./assets/theme/iconos/archivos/word.png" class="well drop-zone" alt="foto"  style="width: 40px; height: 40px"></a>';
              }

              return img;
          }
        },
        
    ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
        // deprecated in favor of `off` and `on`

       
        return row;
      }
  });
  }


  llenarCartas(){
    this.table.destroy();
    this.productoService.getCartas().subscribe(resp => {
      console.log(resp);
      
      this.llenarTable(
        "Cartas",
        resp,
        
        [
        {"data":"idProducto.id"},
        {"data":"idProducto.codigodebarra"},
        {"data":"idProducto.nombre"},
        {"data":"archivo"},
     
        ],
        "Cartas");

        this.table.columns.adjust()
    }) 
  }
  Registrar(){
    console.log(this.formCartas.value);

    this.productoService.createNewCartaCompromiso(this.formCartas).subscribe((resp:any)=>{
      this.llenarCartas();
      
    });
    
  }

  getDataProducto(): void {
    this.productoService.getproductos().subscribe((data:any) => {
      console.log(data);
      
     this.dataProducto$ = data.data;
   });
 }


  onChangeCodigo(deviceValue){
    console.log(deviceValue);
    deviceValue = deviceValue.toString().toUpperCase();
    let producto = this.dataProducto$.filter(p => p.codigodebarra === deviceValue);
 
    
      if(producto.length > 0){
        console.log(producto);
        
        // this.formCorte.get('codigo').setValue(producto[0].codigodebarra);
        this.formCartas.get('producto').setValue(producto[0].id);
        // this.formCorte.get('costo').setValue(producto[0].valorcompra);
        // this.formCorte.get('existencia').setValue(producto[0].unidades);
        // this.formCorte.get('precio').setValue(producto[0].valorventa);
        //   // this.formCorte.get('idcliente').setValue(cliente[0]);
      }
  }

  onChangeProducto(deviceValue){
    console.log(deviceValue);
    
      let producto = this.dataProducto$.filter(p => p.id === deviceValue);
      if(producto.length > 0){
        console.log(producto);
        
        this.formCartas.get('codigo').setValue(producto[0].codigodebarra);
        // this.formCorte.get('costo').setValue(producto[0].valorcompra);
        // this.formCorte.get('existencia').setValue(producto[0].unidades);
        // this.formCorte.get('precio').setValue(producto[0].valorventa);
          // this.formCorte.get('idcliente').setValue(cliente[0]);
      }
      // console.log(cliente);


    // this.dataCliente$.subscribe(resp => {
      
      
      
    // });
     
  }
 

}
