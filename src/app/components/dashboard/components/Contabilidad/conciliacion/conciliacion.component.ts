import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { DatePipe } from 'src/app/pipes/date.pipe';
import { environment } from 'src/environments/environment';
import { ModelPuc } from '../models/ModelPuc';
import { PucService } from '../puc/puc.service';
import { ConciliacionService } from './conciliacion.service';
declare var $;
@Component({
  selector: 'app-conciliacion',
  templateUrl: './conciliacion.component.html',
  styleUrls: ['./conciliacion.component.css']
})
export class ConciliacionComponent implements OnInit {
  listCuentas:ModelPuc[] = [];
  listaDeGrupos:grupos[] = [];

  consulta:any = null;

  years: number[];
  meses: any[];

  public filtroCuentasControl: FormControl = new FormControl('');
  public filtroCuentas: BehaviorSubject<ModelPuc[]> = new BehaviorSubject<ModelPuc[]>([]) ;
  
  protected _onDestroy = new Subject<void>();
  metodos:MetodosShared = new MetodosShared();
  
  filtroConciliacion:{
    saldoBanco  : number | null,
    saldoInicial: number | null,
    cuenta      : number | null,
    mes         : number | null,
    year        : number | null,
  }
  table:any = $('').DataTable({});
  constructor(private auth:SeguridadService , private pucService:PucService, private conciliacion:ConciliacionService) {

    this.setYearsDefault();
   }



  consultar(){
    this.conciliacion.getConciliacionView(this.filtroConciliacion).subscribe(
        (resp:any) => {
          this.consulta = resp;
          this.llenarTablePagos(resp.movimientos)
        },
        (error) => {
          console.log(error)
        }
    );
  }
  setConciliado(id,estado){
    let row = {
      estado:estado,
      id:id
    }
    this.conciliacion.setConciliado(row).subscribe(
        (resp:any) => {
          this.consultar();
        },
        (error) => {
          console.log(error)
        }
    );
  }

  setYearsDefault(){
    this.years = new MetodosShared().generateYears();
  }

  setMesesDefault(year:number){
    this.filtroConciliacion.mes = null;
    this.meses = new MetodosShared().generateMonths(year);
  }
  ngOnInit() {
    this.filtroConciliacion = {
      saldoBanco  : null,
      saldoInicial: null,
      cuenta      : null,
      mes         : null,
      year        : null,
    }
    this.pucService.getEfectivo().subscribe((resp:ModelPuc[])=>{
      
      this.listCuentas = resp;

      this.filtroCuentas.next(resp);

    
    });
    this.InitFiltroPuc();
    this.filtroCuentas.subscribe(resp => {
      this.listaDeGrupos = [];

      for(let x of resp){
        if(x.codigo.toString().length < 6 && x.codigo.toString().length >= 4 ){
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
  }

  InitFiltroPuc(){
    this.filtroCuentasControl.valueChanges
      .pipe(takeUntil (this._onDestroy))
      .subscribe(() => {
        this.filtrarPuc(this.filtroCuentasControl.value);
      });
  }

  filtrarPuc(busqueda:string){
    let filtro:ModelPuc[] = this.metodos.filtrarArrayPuc<ModelPuc>(this.listCuentas,'codigo',busqueda);
    this.filtroCuentas.next(filtro);
  }

  llenarTable(idtable:string,data,columns,nameButton){
    
    this.table.destroy();
    var tokenid =  this.auth.currentUser.getTokenUser();
    var beforeSend = function (xhr) {
      xhr.setRequestHeader('Authorization', 'Token ' +tokenid);
    }
    $.ajaxSetup({
      beforeSend: beforeSend
    });

    this.table =  $('#Table'+idtable).DataTable({
      retrieve: true,
      responsive: true,
      autoWidth: true,
      footer: true, // Habilitar el footer
      pageLength: 5,   
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "Todos"]],
      language: environment.languageDataTable,
      data:data,
      columns:columns,
      columnDefs:[
          { responsivePriority: 1, targets: 0 },
          { responsivePriority: 2, targets: 1 },
          { responsivePriority: 4, targets: 2 },
          { responsivePriority: 5, targets: -3 },
          { responsivePriority: 3, targets: -1 },
          { responsivePriority: 6, targets: 3},
          
          
       
          // { "width": "80%", "targets": 2 },
        


     
         
          {
            targets:[0],
            class:'plus-info',
            orderable: false,
            render: function(data,type,row){
                return null;
            }
          },
          {
            targets:[1],
            class:'text-center text-nowrap',
            orderable: true,
            render: function(data,type,row){
                return data;
            }
          },
          
          {
            targets:[2],
            class:'text-center',
            orderable: true,
            render: function(data,type,row){
                return data;
            }
          },
          
          
          
          {
            targets:[3],
            class:'text-center text-nowrap',
            orderable: true,
            render: function(data,type,row){
              let datetime = new DatePipe();
              let fecha = datetime.transform(data);
              return fecha;
            }
          },
          {
            targets:[4],
        
            orderable: true,
            render: function(data,type,row){
              return data;
            }
          },
          {
            targets:[5],
        
            orderable: true,
            render: function(data,type,row){
              return data;
            }
          },
          {
            targets:[6],
            class: 'sum', // Agrega la clase 'sum' a la columna de débito
            orderable: true,
            render: function(data,type,row){
              let currency = new CurrencyPipe('en-US');

              return currency.transform(data);
            }
          },
          {
            targets:[7],
            class: 'sum', // Agrega la clase 'sum' a la columna de débito
            orderable: true,
            render: function(data,type,row){
              let currency = new CurrencyPipe('en-US');

              return currency.transform(data);
            }
          },
          {
            targets:[-1],
            class:'text-center text-nowrap',
            orderable: false,
            render: function(data,type,row){
              
              return '<input id="conciliar" type="checkbox" style="width: 20px; height: 20px;" ' + (data ? 'checked' : '') + '>';
            }
          },
          
         
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
        // deprecated in favor of `off` and `on`

        /* IMPRIMIR  */
        $('#imprimirPago', row).off('click');
        $('#imprimirPago', row).on('click', () => {
          

          

          // Swal.fire({

          //   allowOutsideClick: false,
          //   icon: 'info',
          //   title: 'Generando PDF..',
          //   text:'Espere por favor..'
          // });
          // Swal.showLoading();
          // this.pucService.imprimirMovi(data.numero.toString()).subscribe((resp:any)=> {
          //   Swal.close();
          //   // console.log(resp)
          //   let reporte = new MovimientoContable();
  
          //   let report = reporte.ReporteMovimientoContable(resp);
          //   window.open(report.output('bloburl'), '_blank');
         
          // },(ex) => {
            
          //   Swal.close();
          //   Swal.fire({
          //     icon: 'error',
          //     title: 'SarpSoft',
          //     text: 'Error al generar el PDF!',
          //   });




          // });



          
        });
        $('#editar', row).off('click');
        $('#editar', row).on('click', () => {
          

          
       
          // const numeroEditParam =  data.numero.toString();
          // this.router.navigate(['/comprobantes-contables-crear'], { queryParams: { numeroEdit: numeroEditParam } });
          


          
        });
        $('#duplicar', row).off('click');
        $('#duplicar', row).on('click', () => {
          
          // const numeroDuplicadoParam =  data.numero.toString();
          // this.router.navigate(['/comprobantes-contables-crear'], { queryParams: { duplicar: numeroDuplicadoParam } });
          
         


          
        });

        $(row).find('input[type="checkbox"]').on('change', function() {
            var checkbox = $(this);
            var isChecked = checkbox.prop('checked');
      
            console.log(data)
            console.log(isChecked)
            self.setConciliado(data.id,isChecked);
            // Acciones adicionales según el estado del checkbox, por ejemplo:
            
            // Aquí puedes agregar más lógica según tus necesidades
          });
        
       
        return row;
      }
      
    });
  }

  llenarTablePagos(movimientos){


    this.llenarTable(
      "Conta",
      movimientos,
      [
      
      {"data":"id"},
      {"data":"asiento__numero"},
      {"data":"tipo"},
      {"data":"fecha"},
      {"data":"docReferencia"},
      {"data":"tercero__nombreComercial"},
      {"data":"debito"},
      {"data":"credito"},
      
      {"data":"concepto"},
      {"data":"conciliado"},
     
      
  
      ],
      "Movi");

      this.table.columns.adjust();
      $('#TableConta_filter').html(``);

    
  }
  
  cerrar(){
    this.conciliacion.imprimir();
  }

}


interface grupos {
  nombre: string;
  codigo: string;
  cuentas: cuentas[];
}

interface cuentas {
  id: number
  codigo: string;
  nombre: string;
  
}
