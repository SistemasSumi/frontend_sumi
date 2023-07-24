import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';
import { AcortarTextPipe } from 'src/app/pipes/acortarText.pipe';
import { NumeroALetrasPipe } from 'src/app/pipes/NumeroALetras.pipe';

export class ComprobanteEgreso {

    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    
    constructor(){}

    public ReporteComprobanteEgreso (data:any){
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
              content: this.cp.transform(x.cxpCompra.base),
              styles: {
              }
            },
            {
              content: this.cp.transform(x.cxpCompra.iva),
              styles: {
              }
            },
            {
              content: this.cp.transform(x.cxpCompra.reteFuente),
              styles: {
              }
            },
            {
              content: this.cp.transform(x.cxpCompra.valorTotal),
              styles: {
              }
            },
            {
              content: this.cp.transform(x.totalAbono),
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
              content: "No. Factura",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Base",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "I.V.A",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "Retefuente",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "Valor Factura",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "Abono",
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
            bottom: 65,
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
    
            doc.setFont(undefined, 'bold')
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
            doc.text('COMPROBANTE DE EGRESO', 307, 125, { align: "center" })
            doc.setFont(undefined, 'normal')
            doc.setFontSize(9)
    
            // Datos adicionales
            // doc.text('Realizado por:', 30, 175)
            // doc.text(data.pago.usuario.username, 90, 175)
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
            doc.text("PROVEEDOR:",17, startYText);
            doc.setTextColor("#000");
         
            doc.text(acortarText.transform(data.pago.proveedor.nombreComercial,"80").toUpperCase(),86, startYText);


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
            doc.text(data.pago.proveedor.documento || '',453.5, startYText);






            doc.setFillColor("#41B6FF");
            doc.rect(15,startY,68,18,'FD');
            doc.rect(83,startY,277,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("DIRECCIÓN:",17, startYText);
            doc.setTextColor("#000");
      
            doc.setFont(undefined, 'normal')
            doc.text(acortarText.transform(data.pago.proveedor.direccion,"46").toUpperCase(),86, startYText);


            startY     += 18;
            startYText += 18;

            doc.setFillColor("#41B6FF");
            doc.rect(15,startY,68,18,'FD');
            doc.rect(83,startY,160,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("REALIZADO:",17, startYText);
            doc.setTextColor("#000");
      
            doc.setFont(undefined, 'normal')
            doc.text(acortarText.transform(data.pago.usuario.username,"46").toUpperCase(),86, startYText);


            doc.setFillColor("#41B6FF");
            doc.rect(210,startY,55.25,18,'FD');
            doc.rect(265.25,startY,115.25,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("   BANCO",212, startYText);
            doc.setTextColor("#000");
            doc.setFont(undefined, 'normal')


            const datosBancarios = data.pago.proveedor.datosBancarios;
            const filtroBanco = datosBancarios.filter(bancario => bancario.banco === 'BANCOLOMBIA');

            const resultado = filtroBanco.length > 0 ? filtroBanco[0] : datosBancarios[0];

            doc.text(resultado?.banco || '',269.25, startYText);



            doc.setFillColor("#41B6FF");
            doc.rect(378.5,startY,65.25,18,'FD');
            doc.rect(443.75,startY,151.93,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("  N° CUENTA",380.5, startYText);
            doc.setTextColor("#000");
            doc.setFont(undefined, 'normal')
            doc.text(resultado?.cuenta || '',447.75, startYText);

            // doc.setFillColor("#41B6FF");
            // doc.rect(15,181,68,18,'FD');
            // doc.rect(83,181,69.25,18);
            // doc.setTextColor("#FFF");
            // doc.setFont(undefined, 'bold')
            // doc.text("COMPRA N°:",17, 193);
            // doc.setTextColor("#000");
            // doc.setFont(undefined, 'normal')
            // // doc.text(data.ingreso.orden.numero,86, 193);

            // doc.setFillColor("#41B6FF");
            // doc.rect(152.25,181,68,18,'FD');
            // doc.rect(220.25,181,69.25,18);
            // doc.setTextColor("#FFF");
            // doc.setFont(undefined, 'bold')
            // doc.text("FACTURA N°:",154.25, 193);
            // doc.setTextColor("#000");
            // doc.setFont(undefined, 'normal')
            // // doc.text(data.factura,222.25, 193);

            // doc.setFillColor("#41B6FF");
            // doc.rect(289.5,181,49.25,18,'FD');
            // doc.rect(338.75,181,69.25,18);
            // doc.setTextColor("#FFF");
            // doc.setFont(undefined, 'bold')
            // doc.text("NOTA N°:",292.5, 193);
            // doc.setTextColor("#000");
            // doc.setFont(undefined, 'normal')
            // // doc.text(data.numeroNota || ''  ,340.75, 193);



            // doc.setFillColor("#41B6FF");
            // doc.rect(408,181,98.75,18,'FD');
            // doc.rect(506.75,181,88.75,18);
            // doc.setTextColor("#FFF");
            // doc.setFont(undefined, 'bold')
            // doc.text("FECHA DE COMPRA:",410, 193);
            // doc.setTextColor("#000");
            // doc.setFont(undefined, 'normal')
            // doc.text(moment(data.ingreso.fecha).format("DD/MM/YYYY").toUpperCase(),508.75, 193); 


            // // Mas información
            // doc.roundedRect(15, 180, 580, 85, 3, 3, 'S');
    
    
            // // Primera parte
            // doc.setFont(undefined, 'bold')
            // doc.setFontSize(11)
            // doc.text("Proveedor:", 30, 205)
            // doc.setFont(undefined, 'normal')
            // var texto2 = doc.splitTextToSize(data.pago.proveedor.nombreComercial, 320)
            // doc.text(texto2, 90, 205)
            // doc.setFont(undefined, 'bold')
            // doc.text("Dirección:", 30, 240)
            // doc.setFont(undefined, 'normal')
            // var texto = doc.splitTextToSize(data.pago.proveedor.direccion, 320)
            // doc.text(texto, 85, 240)
    
            // // Segunda parte
            // doc.setFont(undefined, 'bold')
            // doc.setFontSize(11)
            // doc.text("NIT:", 390, 205)
            // doc.setFont(undefined, 'normal')
            // doc.text(data.pago.proveedor.documento, 425, 205)
            // doc.setFont(undefined, 'bold')
            // doc.text("Telefono:", 390, 240)
            // doc.setFont(undefined, 'normal')
            // doc.text(data.pago.proveedor.telefonoContacto, 445, 240)
    
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
            4: { halign: 'right' },
            5: { halign: 'right' },
            6: { halign: 'right' },
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
          console.log(pageCount);
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
              content: "Documento",
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
    

        let numeroALetras:NumeroALetrasPipe = new NumeroALetrasPipe();

        doc.line(15, doc.lastAutoTable.finalY + 10, 595, doc.lastAutoTable.finalY + 10)
        doc.setFont(undefined, 'bold')
        doc.setFontSize(10)
        doc.setFont(undefined, 'bold')
        doc.text("TOTAL A PAGAR: "+this.cp.transform(data.pago.total), 595.68, doc.lastAutoTable.finalY + 25,{ align: "right" })
        doc.setFont(undefined, 'bold')
        doc.setFontSize(8)
        doc.setFont(undefined, 'bold')
        doc.text('SON: ', 15, doc.lastAutoTable.finalY + 25)
        doc.setFont(undefined, 'normal')
        doc.text('          '+numeroALetras.transform(data.pago.total), 15, doc.lastAutoTable.finalY + 25,{maxWidth: 380})
        
        doc.setFont(undefined, 'bold')
        doc.text("POR CONCEPTO DE: ", 15, doc.lastAutoTable.finalY + 47)
        doc.setFont(undefined, 'normal')
        doc.text('\t\t\t\t     '+data.pago.concepto, 15, doc.lastAutoTable.finalY + 47,{maxWidth: 550})
        return doc

    }

}