import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';
import { PurchaseOrder } from '../../components/inventario/ordenDeCompra/models/purchaseOrder';
import { AcortarTextPipe } from 'src/app/pipes/acortarText.pipe';

export class ReportPurchaseOrder {
   


    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    



    public generarOrdenCompra(data:PurchaseOrder) {
        let doc = new jsPDF('p', 'pt', 'letter')

        doc.setProperties({
            title: data.numero,
            subject: 'Orden de compra N° '+data.numero,		
            author: 'Sarp Soft Nube',
            keywords: '',
            creator: 'Sarp Soft'
        });
        let detalle = [];
        for (let x of data.productos) {

          let p = [
            { 
              content: x.producto.codigo,
              styles: {
              }
            },
            {
              content: x.producto.nombre,
              styles: {
                cellWidth: 220
              }
            },
            {
              content: x.producto.unidad,
              styles: {
              }
            },
            {
                content: x.cantidad,
                styles: {
                    
              }
            },
            {
              content: this.cp.transform(x.valorUnidad),
              styles: {
              }
            },
            {
              content: this.cp.transform(x.descuento),
              styles: {
              }
            },
            {
              content: this.cp.transform(x.iva),
              styles: {
              }
            },
            {
              content: this.cp.transform(x.valorUnidad*x.cantidad),
              styles: {
                
              }
            }
          ]
          detalle.push(p)
        }
    
        autoTable(doc, {
          head: [
            [{
              content: "Código",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Descripción del Producto",
              styles: {
                halign: 'center'
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
              content: "Valor Unit.",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "Dto.",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "Iva",
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
          horizontalPageBreak: true,
          margin: {
            top: 230,
            bottom: 210,
            left: 15,
            right: 15
          },
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {
            


             // elaborado
             doc.setFontSize(6)
             doc.setFont(undefined, 'bold')
             doc.text("Elaborado, impreso y enviado por SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 10, 560, { angle: 90 })



            // solucion propia
            doc.setFontSize(7)
            doc.setFont(undefined, 'bold')
            doc.text("© Sarp Soft Nube (Software propio) - SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 307, 785,{ align: "center" })


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
            doc.text('Régimen Tributario: Común', 307, 60, { align: "center" })
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
            doc.text("Orden No.", 473, 45, "center")
            doc.text("Fecha", 549, 45, "center")
            doc.setFont(undefined, 'normal')
            doc.text(data.numero, 473, 75, "center")
            doc.text(moment(data.fecha).format("DD/MM/YYYY"), 549, 75, "center")
            doc.line(510, 25, 510, 85)
    
            //Titulo
            doc.setFont(undefined, 'bold')
            doc.setFontSize(14)
            doc.text('ORDEN DE COMPRA', 307, 125, { align: "center" })
            doc.setFont(undefined, 'normal')
            doc.setFontSize(9)
    
            // Datos adicionales
            doc.text('Realizado por:', 30, 140)
            doc.text(data.usuario.toString().toUpperCase(), 90, 140)
            doc.text('Hora:', 435, 140)
            doc.text(moment(new Date()).format("h:mm:ss a").toUpperCase(), 465, 140)
            doc.setFont(undefined, 'bold')
    
            // Primer panel
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(15, 145, 285, 75, 3, 3);
            doc.setFont(undefined, 'normal');
            doc.text('Solicitado a: ', 27, 157)
            doc.setFont(undefined, 'bold');
            
            doc.setFontSize(8)
            doc.text(data.proveedor.nombreComercial, 27, 168 ,{maxWidth: 250})
            doc.setFontSize(9)
            doc.text(data.proveedor.tipoDocumento.toString().toUpperCase(), 27, 189)
            doc.setFont(undefined, 'normal');

            doc.text(data.proveedor.documento, 50, 189)
            doc.text('Tel: ', 27, 201)
            doc.text(data.proveedor.telefono, 50, 201)
            doc.text('Dirección: ', 27, 213)

            doc.text(new AcortarTextPipe().transform(data.proveedor.direccion,'40'), 74, 213)
    
            // Segundo Panel
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(310, 145, 285, 75, 3, 3);
            doc.setFont(undefined, 'bold');
            doc.text('Enviar a: ', 322, 162)
            doc.text('SUMIPROD DE LA COSTA S.A.S.', 322, 173)
            doc.text('Calle 44B #21G-11 Urb Santa Cruz, Santa Marta(Mag)', 322, 189)
    
            // Linea Inferior
            doc.line(15, 650, 595, 650)
            doc.setFont(undefined, 'bold')
            doc.setFontSize(10)
            doc.text("Nota: No se acepta fecha de vencimiento inferior a un año.", 25, 660)
            doc.text("Forma de Pago:", 25, 675)
            doc.setFont(undefined, 'normal')
            doc.text(data.formaPago.nombre, 105, 675)
            doc.setFont(undefined, 'bold')
            doc.text("Observación", 25, 690)
            doc.setFont(undefined, 'normal')
            doc.text(data.observacion, 25, 703,
            {
                maxWidth: 290
            });
            
            // Panel de resultado
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(337, 655, 258, 105, 3, 3);
            doc.setFont(undefined, 'bold');
            doc.setFontSize(11)
            doc.text("SUBTOTAL:", 350, 670)
            doc.text("DESCUENTO:", 350, 690)
            doc.text("IVA:", 350, 710)
            doc.text("RETENCIÓN:", 350, 731)
            doc.text("TOTAL:", 350, 751)
            doc.text(this.cp.transform(data.subtotal), 585, 670, "right")
            doc.text(this.cp.transform(data.descuento), 585, 690, "right")
            doc.text(this.cp.transform(data.iva), 585, 710, "right")
            doc.text(this.cp.transform(data.retencion), 585, 731, "right")
            doc.text(this.cp.transform(data.total), 585, 751, "right")
          },
          theme: 'grid',
          headStyles: {
            fillColor: "#41B6FF",
            fontSize: 9
          },
          columnStyles: {
            0: { halign: 'center', fontSize: 7  },
            1: { halign: 'left',   fontSize: 7   },
            2: { halign: 'center', fontSize: 7  },
            3: { halign: 'center',fontSize : 7 },
            4: { halign: 'right',fontSize  : 7  },
            5: { halign: 'right' ,fontSize : 7 },
            6: { halign: 'right' ,fontSize : 7 },
            7: { halign: 'right' ,fontSize : 7 },
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
        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        // For each page, print the page number and the total pages
        for (let i = 1; i <= pageCount; i++) {
    
          // console.log(pageCount);
    
          doc.setFontSize(9);
          // Go to page i
          doc.setPage(i);
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 525, 140,{
            align:'left'
        }); //data.settings.margin.left if you want it on the left
        }
        
        
        return doc;
      }
}
