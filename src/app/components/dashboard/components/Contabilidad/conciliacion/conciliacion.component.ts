import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { DatePipe } from 'src/app/pipes/date.pipe';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CierreContable } from '../../../reportes/reportesContabilidad/cierreReportContable';
import { CierreInventario } from '../../../reportes/reportesInventario/cierreInventario';
import { ModelPuc } from '../models/ModelPuc';
import { PucService } from '../puc/puc.service';
import { ConciliacionService } from './conciliacion.service';
declare var $;
@Component({
  selector: 'app-conciliacion',
  templateUrl: './conciliacion.component.html',
  styleUrls: ['./conciliacion.component.css']
})
export class ConciliacionComponent implements OnInit,AfterViewInit  {




  selectedMes: string;
  selectedAnio: number;
  txtBuscar:string;


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
  constructor(private cdr: ChangeDetectorRef,private modalService: NgbModal,private auth:SeguridadService , private pucService:PucService, private conciliacion:ConciliacionService) {

    this.setYearsDefault();
   }



   abrirModal(content) {
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

    modalRef.result.then(
      (result) => {
        if (result === 'Guardar') {
          // Realiza acciones cuando se guarda
          console.log('Mes seleccionado:', this.selectedMes);
          console.log('Año seleccionado:', this.selectedAnio);
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'GENERANDO..',
            text:'Espere por favor..'
          });
          Swal.showLoading();

          this.conciliacion.reporteCierre(this.selectedMes,this.selectedAnio).subscribe(
            (resp) => {
              console.log(resp);
              Swal.close()

              Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                title: 'Imprimiendo..',
                text:'Espere por favor..'
              });
              Swal.showLoading();
             
                Swal.close();
                let reporte = new CierreContable();
              
                let report = reporte.ReporteCierre(resp);
                window.open(report.output('bloburl'), '_blank');

            }
          )
        }
      },
      (reason) => {
        // Realiza acciones cuando se cierra sin guardar
      }
    );
  
   
  
  }

  searchInTable(valor){
    this.table.search(valor).draw();
    const self = this;

    this.table.on('draw', () => {
      // Llama a la función footerCallback después de que se haya redibujado la tabla
      self.table.api().footerCallback();
    });
  }


  ngAfterViewInit() {
    this.setMesesDefault(this.selectedAnio);
  }


  consultar(page?){

    if(this.filtroConciliacion.saldoBanco == undefined || this.filtroConciliacion.saldoBanco == null ){


      this.metodos.AlertError('INGRESE EL SALDO ACTUAL DEL BANCO.')
      return;
    }
    if(this.filtroConciliacion.cuenta == undefined || this.filtroConciliacion.cuenta == null ){


      this.metodos.AlertError('SELECCIONE UNA CARTERA A CONCILIAR.')
      return;
    }
    if(this.filtroConciliacion.year == undefined || this.filtroConciliacion.year == null ){


      this.metodos.AlertError('SELECCIONE UN AÑO.')
      return;
    }
    if(this.filtroConciliacion.mes == undefined || this.filtroConciliacion.mes == null ){


      this.metodos.AlertError('SELECCIONE UN MES.')
      return;
    }


    this.conciliacion.getConciliacionView(this.filtroConciliacion).subscribe(
        (resp:any) => {
          this.consulta = resp;
          console.log(resp)
          this.filtroConciliacion.saldoInicial = resp.saldo_anterior;
          this.llenarTablePagos(resp.movimientos,page)
        },
        (error) => {
          console.log(error)
        }
    );
  }
  setConciliado(id,estado,page){
    let row = {
      estado:estado,
      id:id
    }
    this.conciliacion.setConciliado(row).subscribe(
        (resp:any) => {
          this.consultar(page);
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
    this.pucService.getEfectivo().subscribe((resp:any[])=>{
      
      this.listCuentas = resp;

      this.filtroCuentas.next(resp);

    
    });
    this.InitFiltroPuc();
    this.filtroCuentas.subscribe(resp => {
      this.listaDeGrupos = [];

      for (let x of resp) {
        if (x.codigo !== null && x.codigo !== undefined) {
          if (x.codigo.toString().length < 6 && x.codigo.toString().length >= 4) {
            let c: any[] = [];
            for (let j of resp) {
              if (j.codigo !== null && j.codigo !== undefined) {
                if (x.codigo.toString() == j.codigo.toString().substring(0, 4) && j.codigo.toString().length >= 6) {
                  c.push(j);
                }
              }
            }
      
            let g: grupos = {
              codigo: x.codigo,
              nombre: x.nombre,
              cuentas: c
            };
      
            this.listaDeGrupos.push(g);
          }
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
    let filtro:ModelPuc[] = this.metodos.filtrarArrayPuc<ModelPuc>(this.listCuentas,'codigo',busqueda) || [];
    this.filtroCuentas.next(filtro);
  }

  cierreInventario(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Generando..',
      text:'Espere por favor..'
    });
    Swal.showLoading();
    this.conciliacion.reporteCierreInventario().subscribe(resp => {
      Swal.close();
      let reporte = new CierreInventario();
    
      let report = reporte.reporteCierreInventario(resp);
      window.open(report.output('bloburl'), '_blank');

    });
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
            class:'text-left',
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
            var currentPage = self.table.page.info().page + 1;
            
            console.log(data)
            console.log(isChecked)
            self.setConciliado(data.id,isChecked,currentPage);
            // Acciones adicionales según el estado del checkbox, por ejemplo:
            
            // Aquí puedes agregar más lógica según tus necesidades
          });
        
       
        return row;
      },
      footerCallback: function(row, data, start, end, display) {
        var api = this.api();
        let cp:CurrencyPipe = new CurrencyPipe('en-US');

        var debitoTotal = 0;
        var creditoTotal = 0;
  
        api.rows({ search: 'applied' }).data().each(function(rowData) {
          debitoTotal += parseFloat(rowData.debito); // Assuming column 1 is "debito"
          creditoTotal += parseFloat(rowData.credito); // Assuming column 2 is "credito"
        });


  
        // Mostrar las sumas en el footer
        $(api.column(6).footer()).html(cp.transform(debitoTotal)); // Format to 2 decimal places
        $(api.column(7).footer()).html(cp.transform(creditoTotal)); // Format to 2 decimal places
      }
      
    });
  }

  llenarTablePagos(movimientos,page?){
    console.log('page',page);

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
      if(page){

        this.table.page(parseInt(page) - 1).draw(false);
      }

    
  }
  
  cerrar(){
    if(this.consulta ){
      const tolerancia = 0.01; // Define una tolerancia adecuada para tu caso

      if (Math.abs(this.consulta.diferencia) < tolerancia) {
          this.consulta.diferencia = 0;
      } else if (this.consulta.diferencia > -tolerancia && this.consulta.diferencia < 0) {
          this.consulta.diferencia = 0;
      }

      if(this.consulta.diferencia != 0 ){

        this.metodos.AlertError('Existe diferencias en los movimientos')
        return;
      }

      this.metodos.AlertQuestion('Esta seguro de cerrar la conciliación?').then((result) => {
        if (result.isConfirmed) {
          this.conciliacion.saveConciliacion(this.filtroConciliacion).subscribe(
            (resp) => {
              console.log(resp);

              this.consulta = null;

               
              this.llenarTablePagos([]);
              this.filtroConciliacion = {
                saldoBanco  : null,
                saldoInicial: null,
                cuenta      : null,
                mes         : null,
                year        : null,
              }
              this.conciliacion.imprimir(resp);
            }
          )
        }
      });
    }

    
    
  


    

    
  }

  imprimir(){
    Swal.fire({
      icon: 'info',
      title:'IMPRIMIR CONCILIACIÓN',
      html: `
        <div class="alert alert-info alert-dismissible fade show" role="alert">
            <i class="fas fa-info me-2"></i>
            ESCRIBA EL VALOR Y PRESIONE EL BOTÓN "IMPRIMIR".
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div class="swal-input-container">
          <input type="text" id="input" class="swal2-input mb-3" placeholder="AÑADE UN VALOR" />
        </div>
      `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'IMPRIMIR',
      preConfirm: () => {
        const inputElement = document.getElementById('input') as HTMLInputElement;
        const inputValue = inputElement.value.trim();
        
        if (inputValue === '') {
          Swal.showValidationMessage('Ingrese un valor válido');
          return false; // Evita que se cierre la alerta si el valor está vacío
        }
    
        // Realiza la acción deseada con el valor inputValue aquí
        
        this.conciliacion.buscar(inputValue).subscribe(
          (resp) => {
            this.conciliacion.imprimir(resp);
          }
        )

      }
    });
    
  }
  cierreContable(){
    Swal.fire({
      title: 'Seleccionar Mes y Año',
      html: `
        <div class="form-group">
          <label for="mes">Mes:</label>
          <select class="form-control" id="mes" [(ngModel)]="selectedMes">
            <option *ngFor="let mes of meses" [value]="mes">{{ mes }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="anio">Año:</label>
          <select class="form-control" id="anio" [(ngModel)]="selectedAnio">
            <option *ngFor="let anio of anios" [value]="anio">{{ anio }}</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        // Aquí puedes hacer algo con selectedMes y selectedAnio
        console.log('Mes seleccionado:', this.selectedMes);
        console.log('Año seleccionado:', this.selectedAnio);
      }
    });
  
  }

}


interface grupos {
  nombre: string  | null;
  codigo: string;
  cuentas: cuentas[];
}

interface cuentas {
  id: number
  codigo: string;
  nombre: string | null;
  
}
