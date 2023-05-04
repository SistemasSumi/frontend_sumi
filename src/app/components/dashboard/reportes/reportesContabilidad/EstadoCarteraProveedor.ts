import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';


export class EstadoCarteraProveedor {
    private cp:CurrencyPipe = new CurrencyPipe('en-US');

    contrusctor(){}

    public ReporteEstadoCarteraProveedor(data:any){
        const doc = new jsPDF('l', 'pt', 'letter');

        let cliente = "JOSE MIGUEL ESCUDERO BUSTAMANTE"; 
        doc.setProperties({
            title: 'JOSE MIGUEL ESCUDERO BUSTAMANTE - '+moment(new Date()).format("DD/MM/YYYY"),
            subject: 'JOSE MIGUEL ESCUDERO BUSTAMANTE - '+moment(new Date()).format("DD/MM/YYYY"),		
            author: 'Sarp Soft Nube',
            keywords: '',
            creator: 'Sarp Soft'
        });
        let factura = []
        for (let x = 0; x < 22; x++) {
    
          let f = [{
            content: "SUM-00112",
            styles: {
             
            }
          },
          {
            content: `${moment(new Date()).format("DD/MM/YYYY").toUpperCase()}`,
            styles: {
            
            }
          },
          {
            content: `${moment(new Date()).format("DD/MM/YYYY").toUpperCase()}`,
            styles: {
    
            }
          },
          {
            content: "13",
            styles: {
    
            }
          },
          {
            content:  this.cp.transform(3850604),
            styles: {
            }
          },
          {
            content:  this.cp.transform(2871832),
            styles: {
            }
          },
          {
            content: this.cp.transform(22000000),
          
          },
          {
            content: this.cp.transform(11014),
          
          },
          {
            content: this.cp.transform(38000000),
          },
          {
            content:  this.cp.transform(45000000),
            styles: {
            }
          },
          {
            content:  this.cp.transform(12000000),
            styles: {
            }
          },
          {
            content:  this.cp.transform(18880000),
            styles: {

            }
          }
          ]
    
          factura.push(f);
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
          body: factura,
          horizontalPageBreak: true,
    
          margin: {
            top: 125,
            bottom: 65,
            left: 15,
            right: 15,
    
          },
          // metodo que se repite en cad pagina
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {
            totalpage++;

            // imagen logo empresa
            doc.addImage(logoSumi, 'PNG', 20, 20,100, 50)

            // elaborado
            doc.setFontSize(6)
            doc.setFont(undefined, 'bold')
            doc.text("Elaborado, impreso y enviado por SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 10, 433   ,{ angle:90})



            // solucion propia
            doc.setFontSize(7)
            doc.setFont(undefined, 'bold')
            doc.text("© Sarp Soft Nube (Software propio) - SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 396, 600,{ align: "center" })



            // Datos de la Empresa
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('SUMIPROD DE LA COSTA S.A.S.', 396, 38, { align: "center" });
            doc.setFontSize(7);
            
            doc.setFont(undefined, 'normal');
            doc.text('NIT: 901648084-9', 396, 50, { align: "center" });
            doc.text('Régimen: Responsable de IVA', 396, 60, { align: "center" });
            

            doc.setFont(undefined, 'bold');
            doc.setFontSize(8);
            doc.text('FECHA', 707, 38, { align: "center" });
            doc.setFont(undefined, 'normal');
            doc.setFontSize(8);
            doc.text(moment(new Date()).format("DD/MM/YYYY"), 707, 53, { align: "center" });
            
            doc.setDrawColor('#000000');
            doc.line(15, 103, 777, 103,);


            // Titulo
            doc.setFont(undefined, 'bold');
            doc.setFontSize(14);
            doc.text('ESTADO DE CARTERA A LA FECHA', 396, 85, { align: "center" });
            
            
    
            
    
            
    
            doc.setFontSize(9);
            // // Cuenta y Saldo
            doc.text("Referencia:",15, 118);
            doc.text("1221981200-5", 65, 118);
            doc.text("Proveedor:",130,118)
            doc.text("ARMONIA MEDICAL S.A.S",180,118)
            doc.text("Forma de pago:",550,118)
            doc.text("Credito 30 Dias",620,118)
  
            
    
          },
          foot: [
            ['', '','','', { content: this.cp.transform(5860630), styles: {  halign: 'right' } }, { content: this.cp.transform(6138210), styles: {  halign: 'right' } }
            , { content: this.cp.transform(45000000), styles: {  halign: 'right' } }, { content: this.cp.transform(1101994), styles: {  halign: 'right' } }
            , { content: this.cp.transform(25000000), styles: {  halign: 'right' } }, { content: this.cp.transform(22200000), styles: {  halign: 'right' } }
            , { content: this.cp.transform(38800000), styles: {  halign: 'right' } }]
    
    
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
        doc.text("7",88, FinalY+15);
        doc.text("Total Saldo:",125, FinalY+15);
        doc.text(this.cp.transform(12000000),185,FinalY+15);
        


        return doc;
    }

}
