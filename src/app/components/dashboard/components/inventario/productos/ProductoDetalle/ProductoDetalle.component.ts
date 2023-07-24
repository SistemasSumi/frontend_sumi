import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PermisosUsuario } from 'src/app/components/auth/permisosUsuario';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { Kardex } from '../../stock/models/kardex';
import { Producto } from '../../stock/models/producto';
import { StockService } from '../../stock/stock.service';

@Component({
  selector: 'app-ProductoDetalle',
  templateUrl: './ProductoDetalle.component.html',
  styleUrls: ['./ProductoDetalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto:number;
  loading:boolean = false;
  codigo:string;
  columnFiltroProducto:string = 'nombreymarcaunico'; 


  permisos:PermisosUsuario;
  

  mostrarKardex:boolean = false;
  kardex:Kardex[];

  inventario:any[] = [];
 




  metodos:MetodosShared = new MetodosShared();
  public filtroProductos: BehaviorSubject<Producto[]>;

  productos: Producto[] = [];


  constructor(private toast:ToastrService, private el: ElementRef  ,private stock:StockService,private auth:SeguridadService) {


   }



  ngOnInit() {
    this.obtenerProductos();
    this.permisos = this.auth.currentUser.getPermisos()
   
  }



  buscarProducto(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if(this.productos){
        const productoEncontrado = this.productos.find(producto => producto.codigoDeBarra === this.codigo);
        if (productoEncontrado) {
          this.producto = productoEncontrado.id;
          this.changeProducto(productoEncontrado.id);
        } else {
          this.toast.error('No existe el producto','SARP SOFT');
          console.log('No existe el producto');
          this.producto = null;
        }
      }else{
        this.toast.warning('Aun estan cargando los productos.','SARP SOFT');
      }

    }
  }

  obtenerProductos(){
    this.stock.SubjectdataProductos.subscribe(resp => {
   
      
      this.productos = resp;
      this.filtroProductos = new BehaviorSubject<Producto[]>(this.productos);
    });
  }

 


  filtrarProductos(busqueda:string){
    
    let filtro:Producto[] = this.metodos.filtrarArray<Producto>(this.productos,this.columnFiltroProducto,busqueda);
    this.filtroProductos.next(filtro);
  }

  showKardex(id:number){
    this.mostrarKardex = false;
    
    if(this.permisos.inventario.kardex || this.permisos.superusuario){
      this.loading = true;
      this.stock.getKardex(id).subscribe(resp => {
        this.kardex = resp;
        this.loading = false;
        this.mostrarKardex = true;
        
      });
  
    }else{
        this.metodos.AlertDenegado('NO TIENE LOS PERMISOS ADECUADOS');
    }

  }

  showInventario(id:number){
    
    this.stock.productosInventario(id).subscribe(resp => {
      console.log(resp)
      this.inventario = resp;
    })
  }

  changeProducto(event){
    let myTag = this.el.nativeElement.querySelector(".active");

    if(myTag){
      myTag.classList.remove('active');
    }

   
    const p  = this.productos.find(producto => producto.id == event);
   
    this.codigo = p.codigoDeBarra;
    

    this.mostrarKardex = false;
    this.inventario = [];


  }

  
 
}
