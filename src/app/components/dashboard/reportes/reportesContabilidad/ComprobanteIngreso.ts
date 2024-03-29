import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';
import { AcortarTextPipe } from 'src/app/pipes/acortarText.pipe';

export class ComprobanteIngreso{

    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    
    constructor(){}
       
    public ReporteComprobanteIngreso(data:any){
        let doc = new jsPDF('p', 'pt', 'letter');

        let detalle = []
        for (let x of data.pago.facturas) {
          let p = [
            {
              content: x.factura,
              styles: {
              }
            },
            {
              content: this.cp.transform(x.cxc.valor),
              styles: {
              }
            },
            {
              content: this.cp.transform(x.totalAbono+x.saldoAFavor),
              styles: {
              }
            },
            {
              content: this.cp.transform(x.saldo),
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
              content: "Factura",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Valor Factura",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "Valor Abono",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "Saldo",
              styles: {
                halign: 'right'
              }
            }]
          ],
          body: detalle,
          horizontalPageBreak: true,
          margin: {
            top: 220,
            bottom: 150,
            left: 15,
            right: 15
          },
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {
            totalPage++;
            doc.setFontSize(9)
            let acortarText:AcortarTextPipe = new AcortarTextPipe();    
            // imagen logo empresa
            doc.addImage(logoSumi, 'PNG', 20, 20,150, 80)


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


            // recuadro y info
            doc.setDrawColor(0);
            doc.roundedRect(430, 25, 155, 60, 3, 3)
            doc.line(430, 55, 585, 55)
    
            doc.setFontSize(9)
            doc.text("Pago No.", 473, 45, "center")
            doc.text("Fecha", 549, 45, "center")
            doc.setFont(undefined, 'normal')
            doc.text(data.pago.numero, 473, 75, "center")
            doc.text(moment(data.pago.fecha).format("DD/MM/YYYY"), 549, 75, "center")
            doc.line(510, 25, 510, 85)
    
            //Titulo
            doc.setFont(undefined, 'bold')
            doc.setFontSize(14)
            doc.text('COMPROBANTE DE INGRESO', 307, 125, { align: "center" })
            doc.setFont(undefined, 'normal')
            doc.setFontSize(9)
    
            doc.text('Impreso:', 15, 145)
            doc.text(moment(new Date()).format("DD/MM/YYYY h:mm:ss a"), 50, 145)
            const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
            doc.setFont(undefined, 'bold')
    
    

            let startY     = 155;
            let startYText = 167;

            doc.setFillColor("#41B6FF");
            doc.rect(15,startY,68,18,'FD');
            doc.rect(83,startY,512.5,18);
            doc.setTextColor("#FFF");
            doc.text("CLIENTE:",17, startYText);
            doc.setTextColor("#000");
         
            doc.text(acortarText.transform(data.pago.cliente.nombreComercial,"80").toUpperCase(),86, startYText);


            startY     += 18;
            startYText += 18;

            doc.setFillColor("#41B6FF");
            doc.rect(360,startY,91.15,18,'FD');
            // doc.rect(382.25,startY,69.25,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("NIT / DOCUMENTO:",362, startYText);
            doc.setTextColor("#000");
            doc.setFont(undefined, 'normal')
            // doc.text(data.pago.proveedor.documento,384.25, startYText);


            doc.setFillColor("#41B6FF");
            doc.rect(451.5,startY,144,18);
            
            doc.setTextColor("#000");
            doc.setFont(undefined, 'bold')
            doc.text(data.pago.cliente.documento || '',453.5, startYText);






            doc.setFillColor("#41B6FF");
            doc.rect(15,startY,68,18,'FD');
            doc.rect(83,startY,277,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("DIRECCIÓN:",17, startYText);
            doc.setTextColor("#000");
      
            doc.setFont(undefined, 'normal')
            doc.text(acortarText.transform(data.pago.cliente.direccion,"46").toUpperCase(),86, startYText);


            startY     += 18;
            startYText += 18;

            doc.setFillColor("#41B6FF");
            doc.rect(15,startY,68,18,'FD');
            doc.rect(83,startY,277,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("REALIZADO:",17, startYText);
            doc.setTextColor("#000");
      
            doc.setFont(undefined, 'normal')
            doc.text(acortarText.transform(data.pago.usuario.username,"46").toUpperCase(),86, startYText);


            doc.setFillColor("#41B6FF");
            doc.rect(360,startY,55.25,18,'FD');
            doc.rect(415.25,startY,180.25,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("TELEFONO:",362, startYText);
            doc.setTextColor("#000");
            doc.setFont(undefined, 'normal')
            doc.text(data.pago.cliente.telefonoContacto || '',417.25, startYText);
    
          },
          theme: 'grid',
          headStyles: {
            fillColor: "#41B6FF",
            fontSize: 9
          },
          columnStyles: {
            0: { halign: 'center' },
            1: { halign: 'right' },
            2: { halign: 'right' },
            3: { halign: 'right' },
          },
          styles: {
            fontSize: 6,
            fontStyle: 'bold'
          },
          bodyStyles: {
            fontSize: 9
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
          // console.log(pageCount);
          doc.setFontSize(10);
          // Go to page i
          doc.setPage(i);
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 525, 145); //data.settings.margin.left if you want it on the left
        }
    
    
        let Cuenta = []
        for (let i of data.conta.detalle) {
          let p = [
            {
              content: data.conta.numero,
              styles: {
                cellWitdh: 20
              }
            },
            {
              content: i.cuenta.codigo+' - '+i.cuenta.nombre,
              styles: {
                cellWitdh: 80,
                halign: "left"
              }
            },
            {
              content: this.cp.transform(i.debito),
              styles: {
    
              }
            },
            {
              content: this.cp.transform(i.credito),
              styles: {
    
              }
            }
          ]
          Cuenta.push(p)
        }
        autoTable(doc, {
          head: [
            [{
              content: "Documento referencia",
              styles: {
                halign: "center"
              }
            },
            {
              content: "Nombre de la Cuenta",
              styles: {
                halign: "center"
              }
            },
            {
              content: "Debito",
              styles: {
                halign: "right"
              }
            },
            {
              content: "Credito",
              styles: {
                halign: "right"
              }
            }]
          ],
          body: Cuenta,
          horizontalPageBreak: true,
          margin: {
            top: doc.lastAutoTable.finalY + 15,
            bottom: 20,
            left: 15,
            right: 15
          },
          theme: "plain",
          columnStyles: {
            0: { halign: "left" },
            1: { halign: "center" },
            2: { halign: "right" },
            3: { halign: "right" },
          }
        });
    
        doc.line(15, doc.lastAutoTable.finalY + 10, 595, doc.lastAutoTable.finalY + 10)
        doc.setFont(undefined, 'normal')
        doc.setFontSize(9)
        doc.text(data.conta.concepto, 15, doc.lastAutoTable.finalY + 30,{"maxWidth":520})
        return doc


    }
    

}
