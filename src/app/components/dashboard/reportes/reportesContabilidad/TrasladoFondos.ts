import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';



export class TrasladoFondos {
    
    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    
    constructor(){}




    public ReporteTrasladoFondos(data:any){
        const doc = new jsPDF('p', 'pt', 'letter');

        let productos = []
       

        let p = [
            
           
            {
            content: data.cuenta_origen.codigo+' - '+data.cuenta_origen.nombre.toUpperCase(),
            styles: {
                
            }
            },
            {
            content:data.cuenta_destino.codigo+' - '+data.cuenta_destino.nombre.toUpperCase(),
            styles: {
               
            }
            },
            {
            content: this.cp.transform(data.monto),
            styles: {
                
            }
            },
            {
            content: data.concepto,
            styles: {
                cellWidth: 200
            }
            }
        ]

        productos.push(p);
        
        let totalpage = 1
        autoTable(doc, {
        head: [
            [
            {
            content: "Origen",
            styles: {
                halign: 'center'
            }
            },
            {
            content: 'Destino',
            styles: {
                halign: 'center'
            }

            },
            {
            content: 'Monto',
            styles: {
                halign: 'center'
            }

            },
            {
            content: 'Concepto',
            styles: {
                halign: 'center'
            }

            },
            ]],
        body: productos,
        horizontalPageBreak: true,
        margin: {
            top: 190,
            bottom: 65,
            left: 15,
            right: 15,

        },
        // metodo que se repite en cad pagina
        didDrawPage: ({ pageNumber, doc: jsPDF }) => {
            totalpage++;

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

            // Fecha Impreso
            doc.setFontSize(7)
            doc.setFont(undefined, 'bold')
            doc.text('Impreso: ' + moment(new Date()).format("DD/MM/YYYY h:mm:ss a").toUpperCase(), 490, 30, { align: "center" })

            // Movimiento #
            doc.setFontSize(12)
            doc.text('Movi No.', 495, 55, { align: "center" })
            doc.setFont(undefined, 'normal')
            doc.text(data.numero, 495, 70, { align: "center" })
            doc.setFontSize(7)

            // Titulo

            doc.setFontSize(14)
            doc.setFont(undefined, 'bold')
            doc.text('TRASLADO DE FONDOS', 307, 125, { align: "center" })
            doc.setFontSize(9)


            // Tipo

            doc.setFontSize(10)
            doc.setFont(undefined, 'bold')
            // doc.text('Tipo:', 15, 140)
            doc.setFont(undefined, 'normal')
            // doc.text("data.tipo.nombre.toUpperCase()", 50, 140)
            doc.line(15, 145, 595, 145, 'F')

            // Datos adicionales de Mov.Contable

            doc.text('Realizado por:', 15, 180)
            doc.text(' '+data.usuario.toUpperCase(), 80, 180)

            doc.text('Fecha de Registro:', 208, 180)
            doc.text(moment(data.fecha).format('DD/MM/YYYY').toUpperCase(), 298, 180)
        },
        


        theme: 'grid',
        headStyles: {
            fillColor: '#41B6FF',
        },
        columnStyles: {
            0: { halign: 'center' },
            1: { halign: 'center' },
            2: { halign: 'right' },
            3: { halign: 'left' },
            
        },
        styles: {
            fontSize: 8,
            fontStyle: 'bold'
        },
        bodyStyles: {

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
        // For each page, print the page number and the total pages
        for (let i = 1; i <= pageCount; i++) {

        console.log(pageCount);

        doc.setFontSize(10);
        // Go to page i
        doc.setPage(i);
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 495, 180); //data.settings.margin.left if you want it on the left
        }

        // doc.text("Prueba",280, doc.lastAutoTable.finalY + 30)

        return doc
    }

}
