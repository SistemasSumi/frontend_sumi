import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import { ModelFormasPago } from '../../configuracion/models/ModelFormasPago';
import { ModelTerceroCompleto } from '../../configuracion/models/ModelTerceroCompleto';
import { ModelVendedor } from '../../configuracion/models/ModelVendedor';
import { TablesBasicService } from '../../configuracion/TablesBasic/tablesBasic.service';
import { FacturacionService } from '../facturacion.service';



@Component({
  selector: 'app-proformas',
  templateUrl: './proformas.component.html',
  styleUrls: ['./proformas.component.css']
})
export class ProformasComponent implements OnInit {
  busquedaAvanzada:boolean = false;
  filtroAvanzado = {
    prefijo:null,
    numero:null,
    cliente:null,
    observacion:null,
    formaPago:null,
    vendedor:null,
    valor:null,
    fechaInicial:null,
    fechaFinal:null
  };


  clientes:ModelTerceroCompleto[] = [];
  vendedores:ModelVendedor[] = [];
  formasPago:ModelFormasPago[] = [];
  metodos:MetodosShared = new MetodosShared();
  public filtroClientes: BehaviorSubject<ModelTerceroCompleto[]>;


  isLoading:boolean = false;

  listado:Proformas[] = [];

  table:any = $('').DataTable({});
  txtBuscarProforma:string;
  @ViewChild('content') myModal: any;

  modalDespacho: NgbModalRef;
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute, 
    private router: Router,
    private invoceService:FacturacionService, 
    private tables:TablesBasicService,
    private config:ConfiguracionService
  ) { }
  


  ngOnInit() {
    
    this.llenarTabla();
    this.obtenerVendedores();
    this.obtenerClientes();
    // this.obtenerFormaDepago();
  }


  getRange(value: number): number[] {
    return Array.from({ length: value }, (_, i) => i);
  }

    ActualizarProformas(){
    this.isLoading = true;
    this.invoceService.cargarProformas().subscribe((resp) => {
      // console.log(resp);
      if(resp != null){

        this.isLoading = false;
      }

    });
  }

  llenarTabla(){
    this.isLoading = true;
    this.invoceService.SubjectdataProformas.subscribe((resp:Proformas[]) => {
      // console.log(resp);
      if(resp != null){

        this.isLoading = false;
      }
      this.listado = resp;
      
    });
  }


  seleccionar(index:number){
   

    this.listado[index].seleccionada = !this.listado[index].seleccionada;
   
    
  }


  editar(id:number){
    this.router.navigateByUrl("facturacion/editar/"+id);
  }

  Despachar(numero:string){
    Swal.fire({
      icon: 'info',
      title: 'Sarp Soft',
      text: '¿ Esta seguro ?',
      showCancelButton: true,
      confirmButtonText: 'SI',
      
    }).then((result) => {
      if (result.isConfirmed) {


         
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Guardando..',
          text:'Espere por favor..'
        });
        Swal.showLoading();

        this.invoceService.Despachos(numero).subscribe((resp:any) => {
          
          Swal.close();

          Swal.fire({
            icon: 'success',
            title: 'Sarp Soft',
            text: 'Proforma actualizada con exito'
          });
         
          this.ActualizarProformas();


          

        },(ex) => {
          // console.log(ex);
          Swal.close();
          
          let errores ='';
          for(let x in ex.error){
            for(let j of ex.error[x]){
              errores +=`
              <div class="alert alert-danger" role="alert" style="text-align: justify;">
                ${j}
              </div>
              `
            }
            
          }
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar.',
            html:errores,
            confirmButtonColor: '#4acf50',
        
          });
        
        });
      } 
    });
  }

  imprimir(id:number){
    this.invoceService.imprimirProforma(id);
  }


  obtenerFormaDepago(){
    this.tables.SubjectdataFP.subscribe(resp => {
      this.formasPago = resp;
    });
  }


  obtenerVendedores(){
    this.config.SubjectdataVendedores.subscribe(resp => {
      this.vendedores = resp;
  
    });
  }

  obtenerClientes(){
    this.config.SubjectdataCliente.subscribe(resp => {
      this.clientes = resp;
      this.filtroClientes = new BehaviorSubject<ModelTerceroCompleto[]>(this.clientes);
    });
  }

 
  filtraTerceros(busqueda:string){
    let filtro:ModelTerceroCompleto[] = this.metodos.filtrarArray<ModelTerceroCompleto>(this.clientes,'nombreComercial',busqueda);
    this.filtroClientes.next(filtro);
  }

  
  BusquedaAvanzada(){
    this.isLoading = true;
    this.invoceService.busquedaAvanzadaProformas(this.filtroAvanzado).subscribe(
      () => {
    
        this.isLoading = false;
      },
      (error) => {
        // Manejar el error aquí
        
        console.error(error);
        Swal.close();
        // Mostrar mensaje de error, realizar acciones adicionales, etc.
      }
    );
  }

  limpiarFiltro(){
    this. filtroAvanzado = {
      prefijo:null,
      numero:null,
      cliente:null,
      observacion:null,
      formaPago:null,
      vendedor:null,
      valor:null,
      fechaInicial:null,
      fechaFinal:null
    };
  }

}

interface Proformas {
  id:               number;
  formaPago:        FormaPago;
  consecutivo:      number;
  numero:           string;
  prefijo:          string;
  valor:            number;
  fecha:            Date;
  fechaVencimiento: Date;
  abono:            number;
  descuento:        number;
  valorDomicilio:   number;
  valorLetras:      string;
  observacion:      null;
  pagada:           boolean;
  xmlEstado:        boolean;
  cufe:             null;
  proformada:       boolean;
  qr:               null;
  statusFac:        null;
  valorIva:         number;
  valorReteFuente:  number;
  subtotal:         number;
  despachado:       boolean;
  correoEnviado:    boolean;
  numeracion:       number;
  cliente:          Cliente;
  vendedor:         vendedor;
  usuario:          number;
  seleccionada?:     boolean;
}


 interface Cliente {
  id:                       number;
  tipoDocumento:            string;
  documento:                string;
  dv:                       string;
  nombreComercial:          string;
  nombreContacto:           string;
  direccion:                string;
  telefonoContacto:         string;
  correoContacto:           string;
  correoFacturas:           string;
  tipoPersona:              string;
  regimen:                  string;
  obligaciones:             string;
  matriculaMercantil:       string;
  codigoPostal:             string;
  saldoAFavorProveedor:     number;
  saldoAFavorCliente:       number;
  isRetencion:              boolean;
  isCliente:                boolean;
  isProveedor:              boolean;
  isContabilidad:           boolean;
  isCompras:                boolean;
  isPos:                    boolean;
  isElectronico:            boolean;
  montoCreditoProveedor:    number;
  montoCreditoClientes:     number;
  fecha_creacion:           Date;
  fecha_modificacion:       Date;
  estado:                   boolean;
  departamento:             string;
  municipio:                string;
  vendedor:                 number;
  formaPago:                number;
  cuenta_x_cobrar:          number;
  cuenta_x_pagar:           null;
  cuenta_saldo_a_cliente:   number;
  cuenta_saldo_a_proveedor: null;
  listaPrecios:             number;
}

interface vendedor {
  id:     number;
  nombre: string;

}
interface FormaPago {
  id:     number;
  nombre: string;
  plazo:  number;
}
