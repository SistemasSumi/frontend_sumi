import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi'


export class ComprobanteCotizacion{
    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    
    constructor(){}

    public ReporteComprobanteCotizacion(data:any){
        console.log(data)
        let doc = new jsPDF('p', 'pt', 'letter');

        let detalle = []
        let productos = data.productos
        for (let x = 0; x < productos.length; x++) {
          let p = [
            {
              content: productos[x].producto?.codigoDeBarra,
              styles: {
                
              }
            },
            {
              content: productos[x].producto?.nombreymarcaunico,
              styles: {
                
              }
            },
            {
              content: productos[x].producto?.unidad,
              styles: {
              }
            },
            {
              content: productos[x].cantidad,
              styles: {
                
              }
            },
            {
              content: (productos[x].iva !== 0 ? '19.0%': '0.00'),
              styles: {
                
                
              }
            },
            {
              content: this.cp.transform(productos[x].descuento),
              styles: {
                
              }
            },
            {
              content: this.cp.transform(productos[x].valor),
              styles: {
                
              }
            },
            {
              content: this.cp.transform(productos[x].subtotal),
              
              styles: {
              }
            },
            // {
            //   content: this.cp.transform(350000),
            //   styles: {
            //   }
            // }
          ]
          detalle.push(p)
        }
        let totalPage = 1
        autoTable(doc, {
          didParseCell: (data:any) => {
            // Este callback se llama después de que se ha analizado cada celda
        
            // Verificar si la celda está en la última fila de la página actual
            if (data.row.index === data.table.body.length - 1 && data.row.finalY > data.settings.margin.bottom) {
              // Si es la última fila y no cabe en la página actual, forzar un salto de página
              doc.addPage();
              data.cursor.y = data.settings.margin.top; // Restablecer la posición vertical
            }
          },
          head: [
            [{
              content: "Código",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Producto",
              styles: {
                cellWidth:200,
                halign: 'left'
              }
            },
            {
              content: "Unidad",
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
              content: "Iva %",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "Dto %",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "Valor Unit.",
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
          horizontalPageBreak: false,
          margin: {
            top: 240,
            bottom: 150,
            left: 10,
            right: 10
          },
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {
            // if (data.table.height > data.settings.margin.bottom) {
            //   doc.addPage(); // Agregar una nueva página
            //   data.cursor.y = 40; // Ajustar la posición vertical
            // }
            totalPage++;
            doc.setFontSize(9)
    
            // imagen logo empresa
            doc.addImage(logoSumi, 'PNG', 20, 20,150, 80)


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
    
            // dida
            doc.setFontSize(14)
            doc.setFont(undefined, 'bold')
            doc.text('COTIZACIÓN', 307, 125, { align: "center" })
            doc.setFontSize(9)
    
            // recuadro y info
            doc.setDrawColor(0);
            doc.roundedRect(430, 25, 155, 60, 3, 3)
            doc.line(430, 55, 585, 55)
    
            doc.setFontSize(9)
            doc.text("Cotización No.", 473, 45, "center")
            doc.text("Fecha", 549, 45, "center")
            doc.setFont(undefined, 'normal')
            doc.text(String(data.consecutivo).padStart(4, '0'), 473, 75, "center")
            doc.text(moment(new Date()).format("DD/MM/YYYY"), 549, 75, "center")
            doc.line(510, 25, 510, 85)
    
            // Fecha Impreso
            doc.setFontSize(9)
            doc.setFont(undefined, 'normal')
            doc.text('Impreso: ' + moment(new Date()).format("DD/MM/YYYY h:mm:ss a").toUpperCase(), 440, 145, { align: "center" })
    
            // recuadro
            doc.roundedRect(15, 150, 585, 75, 3, 3)
            doc.setFont(undefined, 'bold')
            doc.setFontSize(11)
            doc.text("Cliente:", 30, 165)
            doc.setFont(undefined, 'normal')
            var texto2 = doc.splitTextToSize(data?.cliente?.nombreComercial, 320)
            doc.text(texto2, 75, 165)
            doc.setFont(undefined, 'bold')
            doc.text("Dirección:", 30, 200)
            doc.setFont(undefined, 'normal')
            var texto = doc.splitTextToSize(data?.cliente?.direccion, 320)
            doc.text(texto, 85, 200)
            doc.setFont(undefined, 'bold')
            doc.text("NIT:", 400, 165)
            doc.setFont(undefined, 'normal')
            doc.text(data.cliente?.documento, 435, 165)
            doc.setFont(undefined, 'bold')
            doc.text("Telefono:", 400, 200)
            doc.setFont(undefined, 'normal')
            doc.text(data.cliente?.telefonoContacto, 455, 200)
          },
          theme: 'grid',
          headStyles: {
            fillColor: "#41B6FF",
            fontSize: 9
          },
          columnStyles: {
            0: { halign: 'center' },
            1: { halign: 'left', fontSize: 7 },
            2: { halign: 'center' },
            3: { halign: 'center' },
            4: { halign: 'right' },
            5: { halign: 'right' },
            6: { halign: 'right' },
            7: { halign: 'right' },
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
        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        for (let i = 1; i <= pageCount; i++) {
          // console.log(pageCount);
          doc.setFontSize(10);
          // Go to page i
          doc.setPage(i);
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 525, 145); //data.settings.margin.left if you want it on the left
        }
    
        doc.roundedRect(15, doc.lastAutoTable.finalY + 5, 380, 45, 3, 3)
        doc.setFontSize(9)
        doc.text("Observación:", 30, doc.lastAutoTable.finalY + 15)
        var textolargo = data.observacion ? doc.splitTextToSize(data.observacion, 350) : "";
        doc.text(textolargo, 30, doc.lastAutoTable.finalY + 25)
        doc.setFontSize(11)
        doc.text("Cotización valida por 24 horas o hasta agotar existencias!", 30, doc.lastAutoTable.finalY + 65)
    
        // Cuadro resultados
        doc.roundedRect(400, doc.lastAutoTable.finalY + 5, 198, 90, 3, 3)
        doc.setFontSize(9)
        doc.text("SUBTOTAL:", 415, doc.lastAutoTable.finalY + 17)
        doc.text("IVA:", 415, doc.lastAutoTable.finalY + 34)
        doc.text("DESCUENTO:", 415, doc.lastAutoTable.finalY + 51)
        doc.text("RETENCIÓN:", 415, doc.lastAutoTable.finalY + 68)
        doc.text("TOTAL:", 415, doc.lastAutoTable.finalY + 85)
        doc.setFont(undefined, 'bold')
        doc.text(this.cp.transform(data.subtotal), 585, doc.lastAutoTable.finalY + 17, "right")
        doc.text(this.cp.transform(data.valorIva), 585, doc.lastAutoTable.finalY + 34, "right")
        doc.text(this.cp.transform(data.descuento), 585, doc.lastAutoTable.finalY + 51, "right")
        doc.text(this.cp.transform(data.valorReteFuente), 585, doc.lastAutoTable.finalY + 68, "right")
        doc.text(this.cp.transform(data.valor), 585, doc.lastAutoTable.finalY + 85, "right")
        doc.setFont(undefined, 'normal')
    
        return doc


    }


}