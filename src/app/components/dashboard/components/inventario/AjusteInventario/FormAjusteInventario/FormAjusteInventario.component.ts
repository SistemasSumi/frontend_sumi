import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PermisosUsuario } from 'src/app/components/auth/permisosUsuario';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { ObjectFilterPipe } from 'src/app/pipes/ObjectFilter.pipe';
import Swal from 'sweetalert2';
import { Producto } from '../../stock/models/producto';
import { StockService } from '../../stock/stock.service';
import { AjustesInventarioService } from '../AjustesInventario.service';

@Component({
  selector: 'app-FormAjusteInventario',
  templateUrl: './FormAjusteInventario.component.html',
  styleUrls: ['./FormAjusteInventario.component.css']
})
export class FormAjusteInventarioComponent implements OnInit {


  numeraciones:any;

  viewLote = false;
  viewFV = false;

  listadoEntradas:AjusteEntrada[] = [];
  listadoSalidas:AjusteSalida[] = [];

  public filtroProductoControl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();

  filtroValor$ = new Subject<string>();
  public producto:    Producto;
  public productos:    Producto[];
  public metodos:MetodosShared = new MetodosShared();
  public filtroProductos: BehaviorSubject<Producto[]>;
  permisos:PermisosUsuario;
  modalEntrada: NgbModalRef;
  modalSalida: NgbModalRef;
  ajusteForm: FormGroup;
  bodega:any;
  Lotes :any;
  nuevoLote:any;
  nuevaFV:any;

  ajusteEntrada:AjusteEntrada;
  ajusteSalida:AjusteSalida;

  constructor(private ajusteService:AjustesInventarioService, private formBuilder: FormBuilder,private modalService: NgbModal, private auth:SeguridadService, private stock:StockService) {
    this.iniciarObjAjusteEntrada();
    this.iniciarObjAjusteSalida();
    this.permisos = this.auth.currentUser.getPermisos()
  }


  ngOnInit(): void {
    this.InitFiltroProducto();
    this.obtenerNumeracion();
    this.ajusteForm = this.formBuilder.group({
      numeracion: ['', Validators.required],
      observacion: [''],
      
    });
  }


  obtenerNumeracion(){
    this.ajusteService.cargarNumeracion().subscribe( resp => {
      this.numeraciones = resp;
    })
  }
  obtenerProductos(event){
    this.productos = [];
    if(event == 'consumo'){
        if(this.permisos){
          if(this.permisos.inventario.consumo || this.permisos.superusuario){
              console.log(this.bodega)
              this.stock.SubjectdataProductosConsumo.subscribe(resp => {
     
        
                this.productos = resp;
                this.filtroProductos = new BehaviorSubject<Producto[]>(this.productos);
              });
              return true;
          
          }else{
              this.metodos.AlertDenegado('NO TIENE LOS PERMISOS ADECUADOS');
              // this.tipoProducto = 'institucional';
          
          }

      }else{

          this.metodos.AlertDenegado('NO TIENE LOS PERMISOS ADECUADOS');
          // return false;
      }
    }else{
      console.log(this.bodega)

      this.stock.SubjectdataProductos.subscribe(resp => {
     
        
        this.productos = resp;
        this.filtroProductos = new BehaviorSubject<Producto[]>(this.productos);
      });
    }
  }
  obtenerProductosStock(event){
    this.productos = [];
    if(event == 'consumo'){
        if(this.permisos){
          if(this.permisos.inventario.consumo || this.permisos.superusuario){
              console.log(this.bodega)
              this.stock.SubjectdataProductosConsumo.subscribe(resp => {
     
        
                this.productos = resp.filter(item => item.stock_inicial > 0);
                this.filtroProductos = new BehaviorSubject<Producto[]>(this.productos);
              });
              return true;
          
          }else{
              this.metodos.AlertDenegado('NO TIENE LOS PERMISOS ADECUADOS');
              // this.tipoProducto = 'institucional';
          
          }

      }else{

          this.metodos.AlertDenegado('NO TIENE LOS PERMISOS ADECUADOS');
          // return false;
      }
    }else{
      console.log(this.bodega)

      this.stock.SubjectdataProductos.subscribe(resp => {
     
        
        this.productos = resp.filter(item => item.stock_inicial > 0);;
        this.filtroProductos = new BehaviorSubject<Producto[]>(this.productos);
      });
    }
  }

  changeTipoAjusteSalida(event) {
    if(event === '3'){
      this.viewLote = true;
      this.viewFV = false
    }else if(event === '4'){
      this.viewLote = false;
      this.viewFV = true
    }else{
      this.viewLote = false;
      this.viewFV = false;
    }
  }

 

  iniciarObjAjusteEntrada(){
    this.ajusteEntrada = {
      cantidad:0,
      costo:0,
      existencia:0,
      fechaVencimiento:new Date(),
      
      lote:'',
      producto:null,
      tipoAjuste:'1',
      total:0
  
    };
    this.bodega = null;
  }
  iniciarObjAjusteSalida(){
    this.ajusteSalida= {
      cantidad:0,
      costo:0,
      existencia:0,
      fechaVencimiento:new Date(),
      lote:'',
      producto:null,
      tipoAjuste:'1',
      total:0
  
    };
    this.bodega = null;
    this.nuevoLote = '';

    this.nuevaFV = null;
  }


  InitFiltroProducto(){
    this.filtroProductoControl.valueChanges
      .pipe(takeUntil (this._onDestroy))
      .subscribe(() => {
        this.filtrarProductos(this.filtroProductoControl.value);
      });
  }



  filtrarProductos(busqueda:string){

    let filtroPipe:ObjectFilterPipe = new ObjectFilterPipe();
    let filtro:Producto[] = filtroPipe.transform(this.productos,busqueda);
    this.filtroProductos.next(filtro);
  }

  selectProductoEntrada(event:Producto){
    this.ajusteEntrada.existencia = event.stock_inicial
    this.ajusteEntrada.costo = event.valorCompra
  }

   openModalEntrada(content) {
		this.modalEntrada = this.modalService.open(content, { size: 'xl',centered: true });
  }
  cerrarModalEntrada(){
    this.modalEntrada.close();
    this.iniciarObjAjusteEntrada();
    
  }
  
  openModalSalida(content) {
   this.modalSalida = this.modalService.open(content, { size: 'xl',centered: true });
  }

  cerrarModalSalida(){
    this.modalSalida.close();
    this.iniciarObjAjusteSalida();
  }


  get detalles() {
    return this.ajusteForm.get('detalles') as FormArray;
  }

  addDetalle() {
    const detalle = this.formBuilder.group({
      producto: ['', Validators.required],
      cantidad: ['', Validators.required],
      // Agrega otros campos de detalle aquí
    });

    this.detalles.push(detalle);
  }

  removeEntrada(id: number) {
    
    this.listadoEntradas.splice(id, 1);
  }
  removeSalida(id: number) {
    this.listadoSalidas.splice(id, 1);
  }

  onSubmit() {
    const formData = this.ajusteForm.value;

    if(this.listadoEntradas.length === 0 &&  this.listadoSalidas.length === 0){
      this.metodos.AlertError('Debe ingresar un ajuste ya sea de entrada o de salida.');
      return;
    }

    const data = {
      data:formData,
      entradas:this.listadoEntradas,
      salidas:this.listadoSalidas
    }
    console.log(data)
    this.ajusteService.saveAjuste(data).subscribe( resp => {
      this.ajusteForm = this.formBuilder.group({
        numeracion: ['', Validators.required],
        observacion: [''],
        
      });
      this.listadoEntradas = [];
      this.listadoSalidas = [];

      this.metodos.AlertOK(resp);
    })
    // Realiza las acciones necesarias con los datos del formulario y los detalles
  }

  agregarAjusteEntrada(){
    if(this.ajusteEntrada.cantidad <= 0){
      this.metodos.AlertError('Debe ingresar una cantidad superior a 0');
      return;
    }
    if(this.ajusteEntrada.lote == '' || this.ajusteEntrada.lote == undefined){
      this.metodos.AlertError('Debe ingresar un lote');
      return;
    }

    this.listadoEntradas.push(this.ajusteEntrada);

    let  aj:AjusteEntrada = {
      cantidad:0,
      costo:0,
      existencia:0,
      fechaVencimiento:new Date(),
      lote:'',
      producto:null,
      tipoAjuste:this.ajusteEntrada.tipoAjuste,
      total:0
  
    };

    this.ajusteEntrada = aj;
    
  }

  agregarAjusteSalida(){
    if(this.ajusteSalida.cantidad <= 0){
      this.metodos.AlertError('Debe ingresar una cantidad superior a 0');
      return;
    }
    if(this.ajusteSalida.lote == '' || this.ajusteSalida.lote == undefined){
      this.metodos.AlertError('Debe seleccionar un lote');
      return;
    }
    if(this.ajusteSalida.cantidad > this.ajusteSalida.existencia){
      this.metodos.AlertError('La cantidad supera la existencia');
      return;
    }

    if(this.ajusteSalida.tipoAjuste === '3'){
      if(this.nuevoLote == undefined || this.nuevoLote == '' || this.nuevoLote == null){
        this.metodos.AlertError('Debe ingresar un lote si el tipo de ajuste es lote trocado.');
        return;
      } 
    }

    
    
    this.listadoSalidas.push(this.ajusteSalida);
    if(this.ajusteSalida.tipoAjuste === '3'){
      let entrada:AjusteEntrada = {
        cantidad:this.ajusteSalida.cantidad,
        costo:this.ajusteSalida.costo,
        tipoAjuste:this.ajusteSalida.tipoAjuste,
        lote:this.nuevoLote,
        fechaVencimiento:this.ajusteSalida.fechaVencimiento,
        existencia:this.ajusteSalida.existencia,
        producto:this.ajusteSalida.producto,
        total:this.ajusteSalida.costo * this.ajusteSalida.costo,
      }

      this.listadoEntradas.push(entrada)
    }else if(this.ajusteSalida.tipoAjuste === '4'){
      let entrada:AjusteEntrada = {
        cantidad:this.ajusteSalida.cantidad,
        costo:this.ajusteSalida.costo,
        tipoAjuste:this.ajusteSalida.tipoAjuste,
        lote:this.ajusteSalida.lote,
        fechaVencimiento:this.nuevaFV,
        existencia:this.ajusteSalida.existencia,
        producto:this.ajusteSalida.producto,
        total:this.ajusteSalida.costo * this.ajusteSalida.costo,
      }

      this.listadoEntradas.push(entrada)
    }

    let  aj:AjusteSalida = {
      cantidad:0,
      costo:0,
      existencia:0,
      fechaVencimiento:new Date(),
      lote:'',
      producto:null,
      tipoAjuste:this.ajusteSalida.tipoAjuste,
      total:0
  
    };

    this.ajusteSalida = aj;
    this.nuevoLote = '';
    this.nuevaFV = null;
  }



  obtenerTotal(listado:any){
    let total = 0;
    for(let x of listado){
      total += x.costo * x.cantidad;
    }
    return total;
  }


  selectProductoSalida(event){
    console.log(event.id)
   this.obtenerInventario(event.id)
  }

  seleccionarLote(event){
    this.ajusteSalida.lote             = event.lote
    this.nuevoLote                     = event.lote
    this.ajusteSalida.existencia       = event.unidades
    this.ajusteSalida.costo            = event.valorCompra
    this.ajusteSalida.fechaVencimiento = event.vencimiento;
    this.nuevaFV                       = event.vencimiento;
  }

  obtenerInventario(idProducto){
    this.Lotes = [];
    this.stock.productosInventario(idProducto).subscribe(resp => {
   
      console.log(resp)
      this.Lotes = resp;
      

    });
  }

}


interface AjusteEntrada{
  tipoAjuste:string;
  lote:string;
  fechaVencimiento:string | Date;
  existencia:number;
 
  producto:Producto;
  cantidad:number;
  costo:number;
  total:number;
}


interface AjusteSalida{
  tipoAjuste:string;
  lote:string;
  fechaVencimiento:string | Date;
  existencia:number;

  producto:Producto;
  cantidad:number;
  costo:number;
  total:number;
}