import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';
import { CxcMoviModels } from '../../components/Facturacion/models/CxcMoviModels';
import { InvoceReport } from '../../components/Facturacion/models/InvoceReport';


export class ComprobanteProforma {
    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    
    constructor(){}

    public ReporteComprobanteProforma(data:InvoceReport){
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
              content: x.producto.nombreymarcaunico+"("+x.laboratorio+")",
              styles: {
                cellWidth: 210
              }
            },
            {
              content: x.cantidad,
              styles: {
              }
            },
            {
              content: x.producto.unidad,
              styles: {
              }
            },
            {
              content: this.cp.transform(x.valor),
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
              content: "Código",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Descripción del producto",
              styles: {
                halign: 'left'
              }
            },
            {
              content: "Cant.",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Uni",
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
              content: "Iva %",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "Valor Total",
              styles: {
                halign: 'right'
              }
            }]
          ],
          body: detalle,
          horizontalPageBreak: true,
          margin: {
            top: 235,
            bottom: 200,
            left: 15,
            right: 15
          },
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {
            totalPage++;
            doc.setFontSize(9)
    
             // imagen logo empresa
             doc.addImage(logoSumi, 'PNG', 20, 20,150, 80)


              // elaborado
              doc.setFontSize(6)
              doc.setFont(undefined, 'bold')
              doc.text("Elaborado, impreso y enviado por SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 10, 560, { angle: 90 })



            // solucion propia
            doc.setFontSize(7)
            doc.setFont(undefined, 'bold')
            doc.text("© Sarp Soft Nube (Software propio) - SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 307, 785,{ align: "center" })

             // Datos de la empresa
             doc.setFontSize(14)
             doc.setFont(undefined, 'bold');
             doc.text('SUMIPROD DE LA COSTA S.A.S.', 307, 38, { align: "center" })
             doc.setFontSize(9)
             
             doc.setFont(undefined, 'normal');
             doc.text('NIT: 901648084-9', 307, 50, { align: "center" })
             doc.text('Régimen: Responsable de IVA', 307, 60, { align: "center" })
             doc.text('Persona Judírica', 307, 70, { align: "center" })
             doc.text('Calle 44B #21G-11 Urb Santa Cruz, Santa Marta', 307, 80, { align: "center" })
             doc.text('Tel. (5) 432-7722 -  Cel: (301) 302-2986', 307, 90, { align: "center" })
             doc.text('Email. sumiprodelacosta@gmail.com', 307, 100, { align: "center" })
    
            doc.setFont(undefined, 'bold')
            // recuadro y info
            doc.setDrawColor(0);
            doc.roundedRect(460, 25, 120, 60, 3, 3)
            doc.line(460, 55, 580, 55)
    
            doc.setFontSize(9)
            doc.text("Proforma No.", 520, 45, "center")
            doc.setFont(undefined, 'normal')
            doc.text(data.numero, 520, 75, "center")
    
            //Titulo
            doc.setFont(undefined, 'bold')
            doc.setFontSize(14)
            doc.text('PROFORMA', 307, 125, { align: "center" })
            doc.setFont(undefined, 'normal')
            doc.setFontSize(9)
    
            // Datos adicionales
            doc.setFont(undefined, 'normal')
            doc.text('Impreso:', 30, 150)
            doc.text(moment(new Date()).format("DD/MM/YYYY h:mm:ss a"), 65, 150)
    
    
            // Mas información
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(15, 155, 583, 68, 3, 3);
    
            // Datos
            doc.setFont(undefined, 'normal');
            doc.text('Cliente: ', 27, 165)
            doc.text('NIT: ', 27, 183)
            doc.text("Dirección:", 27, 194)
            doc.text('Teléfono: ', 27, 205)
            doc.text('Ciudad: ', 27, 216)
    
            doc.setFont(undefined, 'bold')
            var sp = doc.splitTextToSize(data.cliente.nombreComercial, 320)
            doc.text(sp, 65, 165)
            doc.text(data.cliente.documento+"-"+data.cliente.dv, 49, 183)
            doc.text(data.cliente.direccion, 70, 194)
            doc.text(data.cliente.telefonoContacto, 70, 205)
            doc.text(data.cliente.municipio+"("+data.cliente.departamento+")", 65, 216)
    
            // Separador
            doc.line(415, 155, 415, 223)
    
            // Mas información 2
            doc.setFont(undefined, 'normal');
            doc.text('Fecha de Preforma: ', 430, 165)
            doc.text(moment(data.fecha).format("DD/MM/YYYY h:mm:ss a"), 430, 175)
            doc.text("Realizada Por:", 430, 205)
            doc.text(data.usuario, 430, 216)
    
            // Cuadro grande
            doc.roundedRect(15, 605, 375, 68, 3, 3);
            doc.setFontSize(8)
            var Nota = doc.splitTextToSize("NOTA: SOLO SE ACEPTAN RECLAMOS DURANTE LAS 36 HORAS SIGUIENTES AL RECIBO DE ESTA MERCANCÍA - PRODUCTOS REFRIGERADOS NO SE ACEPTA DEVOLUCIÓN.", 320)
            doc.text(Nota, 25, 615)
            doc.line(15, 640, 390, 640)
            doc.text("Observación:", 25, 651)
    
            // Cuadro resultados
            doc.roundedRect(400, 605, 198, 90, 3, 3)
            doc.setFontSize(9)
            doc.text("SUBTOTAL:", 415, 622)
            doc.text("DESCUENTO:", 415, 637)
            doc.text("IVA:", 415, 652)
            doc.text("RETENCIÓN:", 415, 667)
            doc.text("TOTAL:", 415, 682)
            doc.setFont(undefined, 'bold')
            doc.text(this.cp.transform(data.subtotal), 585, 622, "right")
            doc.text(this.cp.transform(data.descuento), 585, 637, "right")
            doc.text(this.cp.transform(data.valorIva), 585, 652, "right")
            doc.text(this.cp.transform(data.valorReteFuente), 585, 667, "right")
            doc.text(this.cp.transform(data.valor), 585, 682, "right")
            doc.setFont(undefined, 'normal')
    
            // Zonade firmas
            doc.line(15, 730, 190, 730)
            doc.setFontSize(9)
            doc.text("Empresa - Firma y Sello", 100, 745, "center")
    
            doc.line(400, 730, 595, 730)
            doc.text("Cliente - Firma y Sello", 500, 745, "center")
    
          },
          theme: 'grid',
          headStyles: {
            fillColor: "#41B6FF",
            fontSize: 9
          },
          columnStyles: {
            0: { halign: 'center' },
            1: { halign: 'left' },
            2: { halign: 'center' },
            3: { halign: 'center' },
            4: { halign: 'right' },
            5: { halign: 'right' },
            6: { halign: 'right' },
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
            // fillColor: '#B2B1B1',
    
          },
        });
        // For each page, print the page number and the total pages
        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        for (let i = 1; i <= pageCount; i++) {
          console.log(pageCount);
          doc.setFontSize(10);
          // Go to page i
          doc.setPage(i);
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 525, 150); //data.settings.margin.left if you want it on the left
        }
    
        return doc


    }


}

