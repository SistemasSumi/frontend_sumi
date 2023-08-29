import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';
import { NotaCreditoCompras } from '../../components/inventario/notaCredito/models/notaCreditoCompras';
import { AcortarTextPipe } from 'src/app/pipes/acortarText.pipe';
import { Sin_Contabilizar } from '../sin_conta';
import { ModelAsiento } from '../../components/Contabilidad/models/ModelAsiento';


export class NotaCreditoComprasReport {
    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    
    constructor(){}

    public reporteNotaCreditoCompras(data?:NotaCreditoCompras,conta?:ModelAsiento){
        let doc = new jsPDF('p', 'pt', 'letter');
        let detalle = []
        for (let x of data.productos) {
          let p = [
            {
              content: x.producto.codigoDeBarra,
              styles: {
              }
            },
            {
              content: x.producto.nombreymarcaunico,
              styles: {
                cellWidth: 240
              }
            },
            {
              content: x.lote,
              styles: {
          
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
              content: this.cp.transform(x.iva),
              styles: {
              }
            },
            {
              content: this.cp.transform(x.subtotal),
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
              content: "Cod.",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Descripción",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Lote",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "Und.",
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
            top: 205,
            bottom: 200,
            left: 15,
            right: 15
          },
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {

            let acortarText:AcortarTextPipe = new AcortarTextPipe();
            
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


            // Datos de la empresa
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


            // recuadro y info
            doc.setDrawColor(0);
            doc.roundedRect(430, 25, 155, 60, 3, 3)
            doc.line(430, 55, 585, 55)
    
            doc.setFontSize(9)
            doc.text("Nota No.", 473, 45, "center")
            doc.text("Fecha", 549, 45, "center")
            doc.setFont(undefined, 'normal')
            doc.text(data.numero, 473, 75, "center")
            doc.text(moment(data.fecha).format("DD/MM/YYYY"), 549, 75, "center")
            doc.line(510, 25, 510, 85)
    
            //Titulo
            doc.setFont(undefined, 'bold')
            doc.setFontSize(14)
            doc.text('NOTA CRÉDITO COMPRAS', 307, 125, { align: "center" })
            doc.setFont(undefined, 'normal')
            doc.setFontSize(9)
    
            // Datos adicionales
            doc.text('Realizado por:', 15, 140)
            // doc.text("Jose07", 75, 140)
            doc.text(data.usuario.toString().toUpperCase(), 75, 140)
            doc.text('Impreso:', 360, 140)
            doc.text(moment(new Date()).format("DD/MM/YYYY h:mm:ss a").toUpperCase(), 397, 140)
            doc.setFont(undefined, 'bold')
    


            let startY     = 145;
            let startYText = 157;

            doc.setFillColor("#41B6FF");
            doc.rect(15,startY,68,18,'FD');
            doc.rect(83,startY,512.5,18);
            doc.setTextColor("#FFF");
            doc.text("PROVEEDOR:",17, startYText);
            doc.setTextColor("#000");
         
            doc.text(acortarText.transform(data.proveedor.nombreComercial,"80").toUpperCase(),86, startYText);


            startY     += 18;
            startYText += 18;

            doc.setFillColor("#41B6FF");
            doc.rect(360,startY,22.25,18,'FD');
            doc.rect(382.25,startY,69.25,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("NIT:",362, startYText);
            doc.setTextColor("#000");
            doc.setFont(undefined, 'normal')
            doc.text(data.proveedor.documento,384.25, startYText);


            doc.setFillColor("#41B6FF");
            doc.rect(451.5,startY,55.25,18,'FD');
            doc.rect(506.75,startY,88.75,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("TELEFONO:",453.5, startYText);
            doc.setTextColor("#000");
            doc.setFont(undefined, 'normal')
            doc.text(data.proveedor.telefonoContacto || '',508.75, startYText);






            doc.setFillColor("#41B6FF");
            doc.rect(15,163,68,18,'FD');
            doc.rect(83,163,277,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("DIRECCIÓN:",17, 174);
            doc.setTextColor("#000");
      
            doc.setFont(undefined, 'normal')
            doc.text(acortarText.transform(data.proveedor.direccion,"46").toUpperCase(),86, 174);

            doc.setFillColor("#41B6FF");
            doc.rect(15,181,68,18,'FD');
            doc.rect(83,181,69.25,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("COMPRA N°:",17, 193);
            doc.setTextColor("#000");
            doc.setFont(undefined, 'normal')
            doc.text(data.ingreso.orden.numero,86, 193);

            doc.setFillColor("#41B6FF");
            doc.rect(152.25,181,68,18,'FD');
            doc.rect(220.25,181,69.25,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("FACTURA N°:",154.25, 193);
            doc.setTextColor("#000");
            doc.setFont(undefined, 'normal')
            doc.text(data.factura,222.25, 193);

            doc.setFillColor("#41B6FF");
            doc.rect(289.5,181,49.25,18,'FD');
            doc.rect(338.75,181,69.25,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("NOTA N°:",292.5, 193);
            doc.setTextColor("#000");
            doc.setFont(undefined, 'normal')
            doc.text(data.numeroNota || ''  ,340.75, 193);



            doc.setFillColor("#41B6FF");
            doc.rect(408,181,98.75,18,'FD');
            doc.rect(506.75,181,88.75,18);
            doc.setTextColor("#FFF");
            doc.setFont(undefined, 'bold')
            doc.text("FECHA DE COMPRA:",410, 193);
            doc.setTextColor("#000");
            doc.setFont(undefined, 'normal')
            doc.text(moment(data.ingreso.fecha).format("DD/MM/YYYY").toUpperCase(),508.75, 193); 


            if(!data.contabilizado){
              doc.addImage(Sin_Contabilizar, 'PNG', 15, 225,575.5, 575.5)
            }



           
    
    
          },
          theme: "grid",
          headStyles: {
            fillColor: "#41B6FF",
            fontSize: 9
          },
          columnStyles: {
            0: { halign: 'center' },
            1: { halign: 'left' },
            2: { halign: 'center' },
            3: { halign: 'center' },
            4: { halign: 'center' },  
            5: { halign: 'right' },
            6: { halign: 'right' },
            7: { halign: 'right' },
            8: { halign: 'right' },
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
          },
        });
        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        // For each page, print the page number and the total pages
        for (let i = 1; i <= pageCount; i++) {
    
          // console.log(pageCount);
    
          doc.setFontSize(10);
          // Go to page i
          doc.setPage(i);
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 525, 140); //data.settings.margin.left if you want it on the left
        } 

        let finalY = doc.lastAutoTable.finalY + 15;

        // Linea Inferior
        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255);
        doc.line(15, finalY-12, 595, finalY-12)
        doc.setFont(undefined, 'bold')
        doc.setFontSize(10)
      

       
        doc.setFont(undefined, 'bold');
        doc.setFontSize(10)
        doc.text("Subtotal:", 400, finalY)
        doc.text("Descuento:", 400, finalY+15)
        doc.text("IVA:", 400, finalY+30)
        doc.text("RETENCIÓN:", 400, finalY+45)
        doc.text("TOTAL:", 400, finalY+60)


        doc.text(this.cp.transform(data.subtotal), 585, finalY, "right")
        doc.text(this.cp.transform(0), 585, finalY+15, "right")
        doc.text(this.cp.transform(data.iva), 585, finalY+30, "right")
        doc.text(this.cp.transform(data.retencion), 585, finalY+45, "right")
        doc.text(this.cp.transform(data.total), 585, finalY+60, "right")


        finalY += 90;

        if(data.contabilizado){
          doc.line(15, finalY-15, 595, finalY-15)
          doc.text('CONTABILIDAD', 307, finalY, { align: "center" })


          finalY += 10
          let finalText = finalY + 12;
          

        



          doc.setFontSize(9)

          doc.setFillColor("#41B6FF");
          doc.rect(15,finalY,580.5,18,'FD');
          doc.setTextColor("#FFF"); 
          doc.text("DOCUMENTO",17, finalText);
          doc.text("NOMBRE DE LA CUENTA",200, finalText);
          doc.text("DÉBITO",400, finalText);
          doc.text("CRÉDITO",517, finalText);
          // doc.setTextColor("#000");

        
          doc.line(160,finalY,160,finalY+18);
          doc.line(350,finalY,350,finalY+18);
          doc.line(480,finalY,480,finalY+18);
        


          let Cuenta = conta.detalle;
          doc.setTextColor("#000");
          for (let x of Cuenta) {
            finalText +=17
            doc.text(conta.numero,17, finalText);
            doc.text(x.cuenta.codigo +" - "+ x.cuenta.nombre ,163, finalText);
            doc.text(this.cp.transform(x.debito),476, finalText,"right");
            doc.text(this.cp.transform(x.credito),590, finalText,"right");
          }

        
      
        
          doc.text("Por Concepto de:", 15, finalText + 30 )
          doc.text(conta.concepto, 95, finalText + 30 )
        }
        
 



    





        return doc


    }

}