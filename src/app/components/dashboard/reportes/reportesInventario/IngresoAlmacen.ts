import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';
import { InventoryEntry } from '../../components/inventario/ingresoCompras/models/inventoryEntry';

export class IngresoAlmacen {
    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    
    constructor(){}

    public ReporteIngresoAlmacen(data:InventoryEntry){
        let doc = new jsPDF('p', 'pt', 'letter');
        let detalle = []
        for (let x of data.productos) {
          let p = [
            {
              content: x.producto.codigoDeBarra,
              styles: {
              }
            },
            {
              content: x.producto.nombreymarcaunico,
              styles: {
                cellWidth: 145
              }
            },
            {
              content: x.lote,
              styles: {
          
              }
            },
            {
              content: x.producto.unidad,
              styles: {
              }
            },
            {
              content: moment(x.fechaVencimiento).format("DD/MM/YYYY"),
              styles: {
         
              }
            },
            {
              content: x.cantidad,
              styles: {
  
              }
            },
            {
              content: this.cp.transform(x.valorUnidad),
              styles: {
              }
            },
            {
              content: this.cp.transform(x.descuento),
              styles: {
              }
            },
            {
              content: this.cp.transform(x.iva),
              styles: {
              }
            },
            {
              content: this.cp.transform(x.subtotal),
              styles: {
              }
            }
    
          ]
          detalle.push(p)
        }
        let totalPage = 1
        autoTable(doc, {
          head: [
            [{
              content: "Cod.",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Descripción",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Lote",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Und.",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Vence",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Cant.",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Valor Unit.",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "Dto.",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "Iva",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "Subtotal",
              styles: {
                halign: 'right'
              }
            }]
          ],
          body: detalle,
          horizontalPageBreak: true,
          margin: {
            top: 145,
            bottom: 200,
            left: 15,
            right: 15
          },
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {


            
             // elaborado
             doc.setFontSize(6)
             doc.setFont(undefined, 'bold')
             doc.text("Elaborado, impreso y enviado por SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 10, 560, { angle: 90 })



            // solucion propia
            doc.setFontSize(7)
            doc.setFont(undefined, 'bold')
            doc.text("© Sarp Soft Nube (Software propio) - SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 307, 785,{ align: "center" })


            // imagen logo empresa
            doc.addImage(logoSumi, 'PNG', 20, 20,150, 80)


            // Datos de la empresa
            doc.setFontSize(14)
            doc.setFont(undefined, 'bold');
            doc.text('SUMIPROD DE LA COSTA S.A.S.', 307, 38, { align: "center" })
            doc.setFontSize(9)
            
            doc.setFont(undefined, 'normal');
            doc.text('NIT: 901648084-9', 307, 50, { align: "center" })
            doc.text('Régimen Tributario: Común', 307, 60, { align: "center" })
            doc.text('Persona Judírica', 307, 70, { align: "center" })
            doc.text('Calle 44B #21G-11 Urb Santa Cruz, Santa Marta', 307, 80, { align: "center" })
            doc.text('Tel. (5) 432-7722 -  Cel: (301) 302-2986', 307, 90, { align: "center" })
            doc.text('Email. sumiprodelacosta@gmail.com', 307, 100, { align: "center" })


            // recuadro y info
            doc.setDrawColor(0);
            doc.roundedRect(430, 25, 155, 60, 3, 3)
            doc.line(430, 55, 585, 55)
    
            doc.setFontSize(9)
            doc.text("Ingreso No.", 473, 45, "center")
            doc.text("Fecha", 549, 45, "center")
            doc.setFont(undefined, 'normal')
            doc.text(data.numero, 473, 75, "center")
            doc.text(moment(data.fecha).format("DD/MM/YYYY"), 549, 75, "center")
            doc.line(510, 25, 510, 85)
    
            //Titulo
            doc.setFont(undefined, 'bold')
            doc.setFontSize(14)
            doc.text('INGRESO AL ALMACEN', 307, 125, { align: "center" })
            doc.setFont(undefined, 'normal')
            doc.setFontSize(9)
    
            // Datos adicionales
            doc.text('Ingresado por:', 15, 140)
            doc.text(data.usuario.username.toString().toUpperCase(), 75, 140)
            doc.text('Impreso:', 360, 140)
            doc.text(moment(new Date()).format("DD/MM/YYYY h:mm:ss a").toUpperCase(), 397, 140)
            doc.setFont(undefined, 'bold')
    
            // Linea Inferior
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.line(15, 650, 595, 650)
            doc.setFont(undefined, 'bold')
            doc.setFontSize(10)
            doc.text("Orden de Compra No.", 25, 660)
            doc.text(data.orden.numero, 129, 660)
            doc.text("Proveedor:", 25, 675)
            doc.text(data.proveedor.nombreComercial, 80, 675)
            doc.text("Fac No.", 25, 690)
            doc.text(data.factura, 65, 690)
            doc.text("Forma de Pago:", 25, 705)
            doc.setFont(undefined, 'normal')
            doc.text(data.formaPago.nombre, 105, 705)
            doc.setFont(undefined, 'bold')
            doc.text("Observaciones:", 25, 720)
    
            // Panel del Resultado
            doc.setFont(undefined, 'bold');
            doc.setFontSize(10)
            doc.text("Subtotal:", 350, 665)
            doc.text("Descuento:", 350, 680)
            doc.text("IVA:", 350, 692)
            doc.text("RETENCIÓN:", 350, 704)
            doc.text("TOTAL:", 350, 717)
            doc.text(this.cp.transform(data.subtotal), 585, 665, "right")
            doc.text(this.cp.transform(data.descuento), 585, 680, "right")
            doc.text(this.cp.transform(data.iva), 585, 692, "right")
            doc.text(this.cp.transform(data.retencion), 585, 704, "right")
            doc.text(this.cp.transform(data.total), 585, 717, "right")
    
    
          },
          theme: "grid",
          headStyles: {
            fillColor: "#41B6FF",
            fontSize: 9
          },
          columnStyles: {
            0: { halign: 'center' },
            1: { halign: 'left' },
            2: { halign: 'center' },
            3: { halign: 'center' },
            4: { halign: 'center' },
            5: { halign: 'center' },
            6: { halign: 'right' },
            7: { halign: 'right' },
            8: { halign: 'right' },
            9: { halign: 'right' },
          },
          styles: {
            fontSize: 6,
            fontStyle: 'bold'
          },
          bodyStyles: {
            fontSize: 7
          },
          footStyles: {
            fillColor: '#ffffff',
            textColor: '#000000',
          },
          alternateRowStyles: {
          },
        });
        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        // For each page, print the page number and the total pages
        for (let i = 1; i <= pageCount; i++) {
    
          console.log(pageCount);
    
          doc.setFontSize(10);
          // Go to page i
          doc.setPage(i);
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 525, 140); //data.settings.margin.left if you want it on the left
        }
        return doc


    }

}