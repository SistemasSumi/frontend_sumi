import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';


export class SalidaConsumo{
    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    
    constructor(){}

    public ReporteSalidaConsumo(data:any){

        let doc = new jsPDF('p', 'pt', 'letter');

    let detalle = []
    for (let x = 0; x < 25; x++) {
      let p = [
        {
          content: "POS",
          styles: {
            cellWidth: 50
          }
        },
        {
          content: "Papel Para Pos Rollo*6 Und Inv: N/A Cum: N/A (Folder)",
          styles: {
            cellWidth: 425
          }
        },
        {
          content: "N/A",
          styles: {
          }
        },
        {
          content: 6,
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
        }]
      ],
      body: detalle,
      horizontalPageBreak: true,
      margin: {
        top: 165,
        bottom: 200,
        left: 15,
        right: 15
      },
      didDrawPage: ({ pageNumber, doc: jsPDF }) => {
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
        // recuadro y info
        doc.setDrawColor(0);
        doc.roundedRect(460, 25, 120, 50, 3, 3)

        doc.setFontSize(9)
        doc.text("Salida No.", 520, 45, "center")
        doc.setFont(undefined, 'normal')
        doc.text("0853", 520, 60, "center")

        //Titulo
        doc.setFont(undefined, 'bold')
        doc.setFontSize(14)
        doc.text('SALIDA DE CONSUMO POR AREA', 307, 125, { align: "center" })
        doc.setFont(undefined, 'normal')
        doc.setFontSize(9)

        // Area
        doc.text('Area que recibe:', 15, 140)
        doc.text('Auxiliar de Logística', 85, 140)

        doc.text('Responsable del Area:', 433, 140)
        doc.text('Javier Vilardy', 530, 140)

        // Info Extra
        doc.text('Ingresado por:', 15, 160)
        doc.text('MHERNANDEZ01', 75, 160)
        doc.text('Tipo de Salida:', 180, 160)
        doc.text('SALIDA POR', 245, 160)
        doc.text('Fecha:', 360, 160)
        doc.text(moment(new Date()).format("DD/MM/YYYY").toUpperCase(), 395, 160)
        doc.setFont(undefined, 'bold')


        // // Zonade firmas
        // doc.line(15, 730, 190, 730)
        // doc.setFontSize(9)
        // doc.text("Empresa - Firma y Sello", 100, 745, "center")

        // doc.line(400, 730, 595, 730)
        // doc.text("Cliente - Firma y Sello", 500, 745, "center")

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
      doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 525, 160); //data.settings.margin.left if you want it on the left
    }

    doc.text("Observación:", 15, doc.lastAutoTable.finalY + 30)
    doc.line(15, doc.lastAutoTable.finalY + 110, 190, doc.lastAutoTable.finalY + 110)
    doc.text("TALENTO HUMANO", 100, doc.lastAutoTable.finalY + 120, "center")
    doc.line(400, doc.lastAutoTable.finalY + 110, 595, doc.lastAutoTable.finalY + 110)
    doc.text("RECIBIDO", 500, doc.lastAutoTable.finalY + 120, "center")

    return doc

    }


}