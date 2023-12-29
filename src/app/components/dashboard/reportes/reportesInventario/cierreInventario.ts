import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';
import { InventoryEntry } from '../../components/inventario/ingresoCompras/models/inventoryEntry';

export class CierreInventario {
    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    
    constructor(){}

    public reporteCierreInventario(data:any){
        let doc:any = new jsPDF('p', 'pt', 'letter');
        let detalle:any = []
       
        // Define las dimensiones del rectángulo y los márgenes
        let rectWidth = doc.internal.pageSize.width - 15 - 15; // Ancho del rectángulo (márgenes izquierdo y derecho)
        let rectHeight = 15; // Alto del rectángulo
        let marginLeft = 15; // Margen izquierdo
        let marginTop = 185; // Margen superior (ajusta esto según tu necesidad)


        
        for(let x of data.bodegas){

          // Dibuja el rectángulo en el documento
          doc.setFillColor("#41B6FF");
          doc.setTextColor("#FFF");
          doc.rect(marginLeft, marginTop, rectWidth, rectHeight,'FD');
  
          // Agrega el texto en la mitad del rectángulo
          let text = x.nombre;
         
          let textX = (rectWidth+marginLeft)  / 2; // Centra el texto horizontalmente
          let textY = marginTop + (rectHeight / 2) + (10 / 2); // Centra el texto verticalmente, considerando el tamaño de fuente
          doc.setFontSize(10);
          doc.text(textX, textY, text,{
            align:'center'
          });
  
          marginTop += rectHeight;
  
  
          doc.setFontSize(9);
          doc.setTextColor("#000");
  
          textX = (180 + marginLeft)  / 2;
          textY = marginTop + (rectHeight / 2) + (9 / 2);
         
          doc.text(textX, textY, 'TIPO DE PRODUCTO',{
            align:'center'
          });
          doc.line(180, marginTop, 180, marginTop + rectHeight);
  
          textX = (230+180) / 2;
          textY = marginTop + (rectHeight / 2) + (9 / 2);
          
  
          doc.text(textX, textY, 'UND',{
            align:'center'
          });
          doc.line(230, marginTop, 230, marginTop + rectHeight);
  
          let divisor4 = 230+87.5
          textX = (230+divisor4) / 2;
          textY = marginTop + (rectHeight / 2) + (9 / 2);
          
  
          doc.text(textX, textY, '$ COMPRA',{
            align:'center'
          });
          doc.line(divisor4, marginTop, divisor4, marginTop + rectHeight);
          divisor4 += 87.5;
          textX = (230+(divisor4+87.5)) / 2;
          textY = marginTop + (rectHeight / 2) + (9 / 2);
          
  
          doc.text(textX, textY, '$ VENTA',{
            align:'center'
          });
          doc.line(divisor4, marginTop, divisor4, marginTop + rectHeight);
          divisor4 += 87.5;
  
          textX = (230+(divisor4+87.5+87.5)) / 2;
          textY = marginTop + (rectHeight / 2) + (9 / 2);
          
  
          doc.text(textX, textY, '$ VENCIDO',{
            align:'center'
          });
          doc.line(divisor4, marginTop, divisor4, marginTop + rectHeight);
          textX = (230+(divisor4+87.5+87.5+87.5+87.5)) / 2;
          textY = marginTop + (rectHeight / 2) + (9 / 2);
          
  
          doc.text(textX, textY, '$ X VENCER',{
            align:'center'
          });
          doc.rect(marginLeft, marginTop, rectWidth, rectHeight);
          
          for(let j of x.tiposProducto){
            marginTop += rectHeight;
            doc.line(180, marginTop, 180, marginTop + rectHeight);
            doc.line(230, marginTop, 230, marginTop + rectHeight);
            divisor4 = 230+87.5
            doc.line(divisor4, marginTop, divisor4, marginTop + rectHeight);
            divisor4 +=87.5
            doc.line(divisor4, marginTop, divisor4, marginTop + rectHeight);
            divisor4 +=87.5
            doc.line(divisor4, marginTop, divisor4, marginTop + rectHeight);
            doc.rect(marginLeft, marginTop, rectWidth, rectHeight);
    
            textY = marginTop + (rectHeight / 2) + (9 / 2);
            doc.text(20, textY, j.nombre,{
              align:'left'
            });
    
            textY = marginTop + (rectHeight / 2) + (9 / 2);
            doc.text(182, textY, this.cp.transform(j.unidades),{
              align:'left'
            });
            divisor4 = 230+87.5
            textY = marginTop + (rectHeight / 2) + (9 / 2);
            doc.text(divisor4-3, textY, this.cp.transform(j.valorCompra),{
              align:'right'
            });
            divisor4 +=87.5
            textY = marginTop + (rectHeight / 2) + (9 / 2);
            doc.text(divisor4-3, textY, this.cp.transform(j.valorVenta),{
              align:'right'
            });
            divisor4 +=87.5
            textY = marginTop + (rectHeight / 2) + (9 / 2);
            doc.text(divisor4-3, textY, this.cp.transform(j.valorVencido),{
              align:'right'
            });
            divisor4 +=102.5
            textY = marginTop + (rectHeight / 2) + (9 / 2);
            doc.text(divisor4-3, textY, this.cp.transform(j.valorPorVencer),{
              align:'right'
            });
          }
          marginTop+=45;
        }
       
        doc.line(25, 710, 190, 710)
        doc.setFontSize(9)
        doc.text("CONTABILIDAD", 110, 725, "center")

        doc.line(400, 710, 585, 710)
        doc.text("GERENCIA", 490, 725, "center")


        let textoFormal = [
          "NOTA:",
          "El valor de productos por vencer se basa en la fecha actual de cierre",
          "más 30 días posteriores a esa fecha."
        ];
        
        // Establece la posición y alineación del texto
        let x = 15; // Posición X
        let y = 765; // Posición Y
        let ancho = 570; // Ancho del texto
        let alto = 100; // Alto del texto (ajusta según sea necesario)
        let alineacion = "left"; // Alineación del texto (izquierda)
        
        // Agrega el texto al documento, dividiéndolo en líneas
        doc.text(textoFormal, x, y, { maxWidth: ancho, align: alineacion });

        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        // For each page, print the page number and the total pages
        for (let i = 1; i <= pageCount; i++) {
    
        
          doc.setFontSize(8);
           
          doc.setPage(i);
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text('Fecha de cierre: ' + String(moment(new Date()).format("DD/MM/YYYY HH:mm:ss")), 20, 169,{
              align:'left'
          }); 
          doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 530, 169,{
              align:'left'
          }); 
          this.setEncabezado(doc,data);
      
        }
        return doc


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
      doc.text('CIERRE DE  INVENTARIO', 307, 105, { align: "center" })

   
      
      
       

  }
}