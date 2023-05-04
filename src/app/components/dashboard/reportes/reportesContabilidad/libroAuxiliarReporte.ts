import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';

export class LibroAuxiliarReporte {

    private cp:CurrencyPipe  = new CurrencyPipe('en-US');

    
    constructor(){}

    public GenerarLibroAux(data:any){

        const doc = new jsPDF('p', 'pt', 'letter')
        //tabla de valores y paginas
        let productos = []
        for (let x = 0; x < 35; x++) {
    
          let p = [{
            content: "ABC",
            styles: {
              cellWidth: 25
            }
          },
          {
            content: "ABC-123",
            styles: {
              cellWidth: 40,
            }
          },
          {
            content: `${moment(new Date()).format("DD/MM/YYYY").toUpperCase()}`,
            styles: {
    
              cellWidth: 45,
    
    
    
            }
          },
          {
            content: "1083018728-5",
            styles: {
    
              cellWidth: 49,
              halign: 'right'
    
    
            }
          },
          {
            content: "INVERSIONES MEDICAS BARU S.A.S",
            styles: {
    
              cellWidth: 100,
              halling: "left"
    
    
            }
          },
          {
            content: "FS-123456",
            styles: {
    
              cellWidth: 40,
    
    
    
            }
          },
          {
            content: this.cp.transform(20000000),
            cellWidth: 65,
          },
          {
            content: this.cp.transform(20000000),
            cellWidth: 65,
          },
          {
            content: this.cp.transform(20000000),
            cellWidth: 70,
          },
          {
            content: "modi magni asperiores totam tenetur ",
            styles: {
    
              cellWidth: 93,
    
    
    
            }
          },
          ]
    
          productos.push(p);
        }
        let totalpage = 1
        autoTable(doc, {
          head: [
            [{
              content: 'Tipo',
              styles: {
                halign: 'center'
              }
    
            },
              'NUM',
            {
              content: 'FECHA',
              styles: {
                halign: 'center'
              }
    
            }, {
              content: 'NIT',
              styles: {
                halign: 'left'
              }
    
            },
            {
              content: 'TERCERO.',
              styles: {
                halign: 'center'
              }
    
            },
            {
              content: 'REF',
              styles: {
                halign: 'center'
              }
    
            }, {
              content: 'DEBITO',
              styles: {
                halign: 'right'
              }
    
            }, {
              content: 'CREDITO',
              styles: {
                halign: 'right'
              }
    
            }, {
              content: 'SALDO',
              styles: {
                halign: 'right'
              }
    
            }, {
              content: 'CONCEPTO',
              styles: {
                halign: 'left'
              }
    
            }
            ]],
          body: productos,
          horizontalPageBreak: true,
    
          margin: {
            top: 290,
            bottom: 65,
            left: 15,
            right: 15,
    
          },
          // metodo que se repite en cad pagina
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {
            totalpage++;

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



            // Datos de la Empresa
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


            // Titulo
            doc.setFont(undefined, 'bold')
            doc.setFontSize(14)
            doc.text('LIBRO AUXILIAR', 307, 125, { align: "center" })
            doc.setFontSize(7)
            doc.line(15, 145, 595, 145, 'F')
    
            //  texto en cuadro
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(15, 155, 285, 85, 3, 3);
    
            // inicio del texto 1
            doc.setFont(undefined, 'bold')
            doc.setFontSize(9)
            doc.text("Cuenta Inicial:", 27, 175)
            doc.setFont(undefined, 'normal')
            doc.text("130505", 90, 175)
    
            doc.setFont(undefined, 'bold')
            doc.setFontSize(9)
            doc.text("Fecha Inicial:", 30, 195)
            doc.setFont(undefined, 'normal')
            doc.text(moment(new Date).format(" dddd DD/MM MMMM YYYY").toUpperCase(), 88, 195)
    
            doc.setFont(undefined, 'bold')
            doc.setFontSize(9)
            doc.text("Terceros:", 46, 215, { alig: "right" })
            doc.setFont(undefined, 'bold')
            var tts = doc.splitTextToSize("INVERSIONES MEDICAS BARU S.A.S", 200)
            doc.text(tts, 90, 215)
    
            // texto en cuadro 2
            doc.roundedRect(310, 155, 285, 85, 3, 3);
            doc.setFont(undefined, 'bold')
            doc.setFontSize(9)
            doc.text("Cuenta Final:", 317, 175)
            doc.setFont(undefined, 'normal')
            doc.text("130505", 375, 175)
    
            doc.setFont(undefined, 'bold')
            doc.setFontSize(9)
            doc.text("Fecha Final:", 320, 195)
            doc.setFont(undefined, 'normal')
            doc.text(moment(new Date).format(" dddd DD/MM MMMM YYYY").toUpperCase(), 373, 195)
    
            // Cuenta y Saldo
            doc.text("CUENTA", 15, 265)
            doc.text("SALDO ANTERIOR", 95, 265)
            doc.text("SALDO ACTUAL", 225, 265)
            doc.line(15, 270, 595, 270, 'F')
            doc.setFont(undefined, 'bold')
            doc.text("130505", 15, 285)
            doc.text(this.cp.transform(0), 95, 285)
            doc.text(this.cp.transform(0), 225, 285)
            doc.setFont(undefined, 'normal')
            
           

            
    
          },
          foot: [
    
            // ['', '', '', '', '', '', '', '', ''],
            // ['', '', '', '', '', '', '', { content: this.cp.transform(20000000), styles: {  halign: 'right' } }, { content: this.cp.transform(20000000), styles: {  halign: 'right' } },'','']
    
    
          ],
          theme: 'grid',
          headStyles: {
            fillColor: '#41B6FF',
    
    
    
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
            9: { halign: 'left' },
          },
    
          styles: {
            fontSize: 6,
            fontStyle: 'bold',
    
          },
          bodyStyles: {
    
          },
          footStyles: {
    
            // fontSize: 12,
            fillColor: '#ffffff',
            textColor: '#000000',
    
    
          },
          alternateRowStyles: {
            // fillColor: '#B2B1B1',
    
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
          doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 495, 265); //data.settings.margin.left if you want it on the left
        }
        
        let FinalY = doc.lastAutoTable.finalY+30
        doc.setFontSize(12);
        doc.text("Totales:",260,   FinalY+30);
        doc.text(this.cp.transform(20000000),390,  FinalY+30,{align:'right'});
        doc.text(this.cp.transform(30000000),485,   FinalY+30,{align:'right'});

    
        return doc;


    }

}
