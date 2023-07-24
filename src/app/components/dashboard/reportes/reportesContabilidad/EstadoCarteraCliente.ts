import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';


export class EstadoCarteraCliente{
    private cp:CurrencyPipe = new CurrencyPipe('en-US');

    constructor(){}
  
    public ReporteEstadoCarteraCliente(data:any){
        const doc = new jsPDF('l', 'pt', 'letter');

      
        doc.setProperties({
            title: 'ESTADO DE CARTERA CLIENTE - '+moment(new Date()).format("DD/MM/YYYY"),
            subject: data.cliente+' - '+moment(new Date()).format("DD/MM/YYYY"),		
            author: 'Sarp Soft Nube',
            keywords: '',
            creator: 'Sarp Soft'
        });
        let facturas = [];
        for (let x of data.facturas) {
          let f = [{
            content: x.factura,
            styles: {
             
            }
          },
          {
            content: `${moment(x.fecha).format("DD/MM/YYYY").toUpperCase()}`,
            styles: {
            
            }
          },
          {
            content: `${moment(x.fechaVencimiento).format("DD/MM/YYYY").toUpperCase()}`,
            styles: {
    
            }
          },
          {
            content: x.dias_factura,
            styles: {
    
            }
          },
          {
            content:  this.cp.transform(x.totales_x_rango['0_30']),
            styles: {
            }
          },
          {
            content:  this.cp.transform(x.totales_x_rango['31_60']),
            styles: {
            }
          },
          {
            content: this.cp.transform(x.totales_x_rango['61_90']),
          
          },
          {
            content: this.cp.transform(x.totales_x_rango['91_120']),
          
          },
          {
            content: this.cp.transform(x.totales_x_rango['121_150']),
          },
          {
            content:  this.cp.transform(x.totales_x_rango['151_180']),
            styles: {
            }
          },
          {
            content:  this.cp.transform(x.totales_x_rango['181++']),
            styles: {
            }
          }
          ]
    
          facturas.push(f);
        }
        let totalpage = 1
        autoTable(doc, {
          head: [
            [{
              content: 'No.Ref',
              styles: {
                halign: 'center'
              }
    
            },
            {
              content: 'Fecha',
              styles: {
                halign: 'center'
              }
    
            }, {
              content: 'F.Vence',
              styles: {
                halign: 'center'
              }
    
            },
            {
              content: 'Dias Fact.',
              styles: {
                halign: 'center'
              }
    
            },
            {
              content: '0 - 30',
              styles: {
                halign: 'right'
              }
    
            }, {
              content: '31 - 60',
              styles: {
                halign: 'right'
              }
    
            }, {
              content: '61 - 90',
              styles: {
                halign: 'right'
              }
    
            }, {
              content: '91 - 120',
              styles: {
                halign: 'right'
              }
    
            }, {
              content: '121 - 150',
              styles: {
                halign: 'right'
              }
            },
            {
                content: '151 - 180',
                styles: {
                  halign: 'right'
                }
            },
            {
                content: '181 - Mas',
                styles: {
                  halign: 'right'
                }}
            ]],
          body: facturas,
          horizontalPageBreak: true,
    
          margin: {
            top: 150,
            bottom: 65,
            left: 15,
            right: 15,
    
          },
          // metodo que se repite en cad pagina
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {
            totalpage++;

            // imagen logo empresa
            doc.addImage(logoSumi, 'PNG', 20, 20,150, 80 )

            // elaborado
            doc.setFontSize(6)
            doc.setFont(undefined, 'bold')
            doc.text("Elaborado, impreso y enviado por SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 10, 433   ,{ angle:90})



            // solucion propia
            doc.setFontSize(7)
            doc.setFont(undefined, 'bold')
            doc.text("© Sarp Soft Nube (Software propio) - SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 396, 600,{ align: "center" })



            // Datos de la Empresa
            doc.setFontSize(13);
            doc.setFont(undefined, 'bold');
            doc.text('SUMIPROD DE LA COSTA S.A.S.', 396, 30, { align: "center" });
            doc.setFontSize(7);
            
            doc.setFont(undefined, 'normal');
            doc.text('NIT: 901648084-9', 396, 42, { align: "center" });
            doc.text('Régimen: Responsable de IVA', 396, 52, { align: "center" });
            doc.text('Persona Judírica', 396, 62, { align: "center" });
            doc.text('Calle 44B #21G-11 Urb Santa Cruz, Santa Marta', 396, 72, { align: "center" });
            doc.text('Tel. (5) 432-7722 - Cel: (301) 302-2986', 396, 82, { align: "center" });
            doc.text('Email. sumiprodelacosta@gmail.com', 396, 92, { align: "center" });
            

            doc.setFont(undefined, 'bold');
            doc.setFontSize(8);
            doc.text('FECHA', 707, 38, { align: "center" });
            doc.setFont(undefined, 'normal');
            doc.setFontSize(8);
            doc.text(moment(new Date()).format("DD/MM/YYYY"), 707, 53, { align: "center" });
            
            


            // Titulo
            doc.setFont(undefined, 'bold');
            doc.setFontSize(12);
            doc.text('ESTADO DE CARTERA A CORTE DE '+moment(data.fecha_corte).format("DD MMMM YYYY").toUpperCase(), 396, 117, { align: "center" });
            
            
    
            
    
            doc.setDrawColor('#000000');
            doc.line(15, 128, 777, 128,);
    
            doc.setFontSize(9);
            // // Cuenta y Saldo
            doc.text("Referencia:",15, 143);
            doc.text(data.documento, 65, 143);
            doc.text("Cliente:",130,143)
            doc.text(data.cliente,170,143)
            doc.text("Forma de pago:",550,143)
            doc.text(data.formaPago,620,143)
  
            
    
          },
          foot: [
            ['', '','','', { content: this.cp.transform(data.totales_por_rango['0_30']), styles: {  halign: 'right' } }, { content: this.cp.transform(data.totales_por_rango['31_60']), styles: {  halign: 'right' } }
            , { content: this.cp.transform(data.totales_por_rango['61_90']), styles: {  halign: 'right' } }, { content: this.cp.transform(data.totales_por_rango['91_120']), styles: {  halign: 'right' } }
            , { content: this.cp.transform(data.totales_por_rango['121_150']), styles: {  halign: 'right' } }, { content: this.cp.transform(data.totales_por_rango['151_180']), styles: {  halign: 'right' } }
            , { content: this.cp.transform(data.totales_por_rango['181++']), styles: {  halign: 'right' } }]
    
    
          ],
    
          theme: 'grid',
          headStyles: {
            fontSize: 8,
            fillColor: '#41B6FF',
    
    
    
          },
    
          columnStyles: {
            0: { halign: 'center' },
            1: { halign: 'center' },
            2: { halign: 'center' },
            3: { halign: 'center' },
            4: { halign: 'right' },
            5: { halign: 'right' },
            6: { halign: 'right' },
            7: { halign: 'right' },
            8: { halign: 'right' },
            9: { halign: 'right' },
            10: { halign: 'right' },
          },
    
          styles: {
            fontSize: 6,
            fontStyle: 'bold',
    
          },
          bodyStyles: {
    
          },
          footStyles: {
    
             fontSize: 9,
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
    
          doc.setFontSize(9);
          // Go to page i
          doc.setPage(i);
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 700, 118,{
            align:'left'
        }); //data.settings.margin.left if you want it on the left
        }


        doc.setDrawColor('#000000');
        let FinalY = doc.lastAutoTable.finalY + 20;
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold')
        doc.line(15, FinalY, 777, FinalY,);
        doc.text("Total Facturas:   ",15, FinalY+15);
        doc.text(data.total_facturas+"",88, FinalY+15);
        doc.text("Total Saldo:",125, FinalY+15);
        doc.text(this.cp.transform(data.saldo_total),185,FinalY+15);
        


        return doc;
    }


}