import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';
import { range } from 'rxjs';
import { NumeroALetrasPipe } from 'src/app/pipes/NumeroALetras.pipe';
import { AcortarTextPipe } from 'src/app/pipes/acortarText.pipe';

export class ConciliacionBancos {
    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    private NL:NumeroALetrasPipe = new NumeroALetrasPipe();
    private AT:AcortarTextPipe = new AcortarTextPipe();


    constructor(){}
    

    public ReporteConciliacion(data:any){
        let doc = new jsPDF('p', 'pt', 'letter');
        let currentPage = 0;
        let startY = 156;
        let startYText = 168;

        let totalDebito = 0;
        let totalCredito = 0;

        let productos = [];
        for (let x of data.movimientos) {
            // Dividir el concepto en varias líneas
            const Tercero = doc.splitTextToSize(x.tercero__nombreComercial || '', 120); // Ajusta el ancho según tus necesidades
            const conceptoLines = doc.splitTextToSize(x.concepto || '', 153); // Ajusta el ancho según tus necesidades
            const docReferencia = doc.splitTextToSize(x.docReferencia || '', 65); // Ajusta el ancho según tus necesidades

        let p = [
        {
            content: x.tipo,
        },
        {
            content: x.asiento__numero,
        },
        {
            content: `${moment(x.fecha).format('DD/MM/YYYY').toUpperCase()}`,
            styles: {
            cellWidth: 44,
            },
        },
        {
            content: Tercero,
            styles: {
            cellWidth: 120,
            halling: 'left',
            },
        },
        {
            content: docReferencia,
            styles: {
            cellWidth: 65,
            },
        },
        {
            content: this.cp.transform(x.debito),
        },
        {
            content: this.cp.transform(x.credito),
        },
        {
            content: conceptoLines,
            styles: {
            cellWidth: 153,
            },
        },
        ];

        totalDebito += x.debito;
        totalCredito += x.credito;
        productos.push(p);
    }
    let totalpage = 1;
    autoTable(doc, {
        head: [
        [
            {
            content: 'Tipo',
            styles: {
                halign: 'center',
            },
            },
            {
            content: 'Asiento',
            styles: {
                halign: 'center',
            },
            },
            {
            content: 'Fecha',
            styles: {
                halign: 'center',
            },
            },
            {
            content: 'Tercero.',
            styles: {
                halign: 'center',
            },
            },
            {
            content: 'Referencia',
            styles: {
                halign: 'center',
            },
            },
            {
            content: 'Débito',
            styles: {
                halign: 'right',
            },
            },
            {
            content: 'Crédito',
            styles: {
                halign: 'right',
            },
            },
            {
            content: 'Concepto',
            styles: {
                halign: 'left',
            },
            },
        ],
        ],
        body: productos,
        horizontalPageBreak: true,

        margin: {
        top: 175,
        bottom: 85,
        left: 15,
        right: 15,
        },
        // metodo que se repite en cad pagina
        didDrawPage: ({ pageNumber, doc: jsPDF }) => {},
        foot: [
        ['', '', '', '', '', '', '', ''],
        [
            '',
            '',
            '',
            '',
            '',
            { content: this.cp.transform(totalDebito), styles: { halign: 'right' } },
            { content: this.cp.transform(totalCredito), styles: { halign: 'right' } },
            '',
        ],
        ],
        theme: 'grid',
        headStyles: {
        fillColor: '#41B6FF',
        },
        columnStyles: {
        0: { halign: 'center' },
        1: { halign: 'center' },
        2: { halign: 'center' },
        3: { halign: 'left' },
        4: { halign: 'center' },
        5: { halign: 'right' },
        6: { halign: 'right' },
        7: { halign: 'left' },
        },
        styles: {
        fontSize: 7,
        fontStyle: 'bold',
        },
        bodyStyles: {},
        footStyles: {
            fillColor: '#ffffff',
            textColor: '#000000',
        },
        alternateRowStyles: {},
    });
        
        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        // For each page, print the page number and the total pages
        for (let i = 1; i <= pageCount; i++) {
    
            
    
            doc.setFontSize(8);
           
            doc.setPage(i);
            var pageSize = doc.internal.pageSize;
            var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text('Fecha de conciliación: ' + String(data.con.fechaCierre), 20, 169,{
                align:'left'
            }); 
            doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 530, 169,{
                align:'left'
            }); 
            this.setEncabezado(doc,data);
        }


           
            
           

        
           

        return doc;
    }


    setEncabezado(doc:jsPDF,data){
                   // elaborado
                   doc.setFontSize(6)
                   doc.setFont(undefined, 'bold')
                   doc.text("Elaborado, impreso y enviado por SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 10, 560, { angle: 90 })
       
       
       
                   // solucion propia
                   doc.setFontSize(7)
                   doc.setFont(undefined, 'bold')
                   doc.text("© Sarp Soft Nube (Software propio) - SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 307, 785,{ align: "center" })

                   doc.setFont(undefined, 'normal')
                   // fecha de impresión
                   doc.text("Fecha de impresión: "+moment(new Date()).format("DD/MM/YYYY"), 307, 15,{ align: "center" })
       
                   // imagen logo empresa
                   doc.addImage(logoSumi, 'PNG', 20, 20,150, 80)
       
                   doc.setFontSize(9)
           
       
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
                   doc.setFontSize(14)
                   doc.setFont(undefined,'bold');
                   doc.text('CONCILIACIÓN BANCARIA', 307, 105, { align: "center" })
       
                
                    // Movimiento #
                   doc.setFontSize(10)
                   doc.text('CONCILIACIÓN N°.', 495, 55, { align: "center" })
                   doc.setFont(undefined, 'normal')
                   doc.text(data.con.numero, 495, 70, { align: "center" })
                   doc.setFontSize(7)

                    doc.setFillColor("#41B6FF");
                    doc.rect(77, 115, 460, 18, 'FD');
                    doc.line(182, 115, 182, 115 + 18);
                    doc.line(337, 115, 337, 115 + 18);
                    doc.line(437, 115, 437, 115 + 18);

                    doc.setTextColor("#FFF");
                    doc.setFontSize(8);
                    doc.setFont(undefined, 'bold');
                    doc.text("SALDO INICIAL", 129.5, 127, { align: "center" });
                    doc.text("BANCO", 259.5, 127, { align: "center" });
                    doc.text("MES CONCILIADO",387, 127, { align: "center" });
                    doc.text("SALDO FINAL", 487, 127, { align: "center" });

                    doc.setTextColor("#000");

                    doc.rect(77, 133, 460, 18);
                    doc.line(182, 133, 182, 133 + 18);
                    doc.line(337, 133, 337, 133 + 18);
                    doc.line(437, 133, 437, 133 + 18);

                    doc.setFont(undefined, 'bold');
                    doc.setFontSize(7);

                    doc.text( this.cp.transform(data.con.saldoAnterior), 178, 145, { align: "right" });
                    doc.text(data.con.cuenta.codigo+' - '+data.con.cuenta.nombre || "0.00", 259.5, 145, { align: "center" });
                    doc.text(data.con.mes+' - '+data.con.year || "01/0/2023", 387, 145, { align: "center" });
                    doc.text(this.cp.transform(data.con.saldoFinal), 531, 145, { align: "right" });
                    doc.setFont(undefined, 'normal');

    }

   

 

    

}


     
