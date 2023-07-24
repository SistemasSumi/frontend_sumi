import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Kardex } from '../stock/models/kardex';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit,AfterViewInit  {
  @ViewChild('tablaScroll') tablaScroll: ElementRef;
  @Input() listado:Kardex[] = [];
  mostrarIconoFlotante = false;
  constructor() { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const container = this.tablaScroll.nativeElement as HTMLElement;
      if (container.scrollTop + container.clientHeight < container.scrollHeight) {
        this.mostrarIconoFlotante = true;
      } 


      if (container) {
        console.log("Existe")
        container.addEventListener('scroll', () => {
          if (container.scrollTop + container.clientHeight < container.scrollHeight) {
            this.mostrarIconoFlotante = true;
          } else {
            this.mostrarIconoFlotante = false;
          }
        });
      }
    }, 0);
  }

  ngOnInit() {
  }

  scrollToLastRow(): void {
    setTimeout(() => {
      const tableContainer = document.querySelector('.table-scroll') as HTMLElement;
      const table = tableContainer.querySelector('table') as HTMLElement;
      const rows = table.querySelectorAll('tr');
      const lastRow = rows[rows.length - 1] as HTMLElement;
    
      if (lastRow) {
        lastRow.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }
    }, 0);
  }

  // onScroll(): void {
  //   const container = document.querySelector('.tabla-scroll') as HTMLElement;

  //   if (container) {
  //     if (container.scrollTop + container.clientHeight < container.scrollHeight) {
  //       this.mostrarIconoFlotante = true;
  //     } else {
  //       this.mostrarIconoFlotante = false;
  //     }
  //   }
  // }

}
