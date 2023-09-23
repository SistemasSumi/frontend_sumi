import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';
import { range } from 'rxjs';
import { NumeroALetrasPipe } from 'src/app/pipes/NumeroALetras.pipe';
import { AcortarTextPipe } from 'src/app/pipes/acortarText.pipe';

export class CierreContable {
    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    private NL:NumeroALetrasPipe = new NumeroALetrasPipe();
    private AT:AcortarTextPipe = new AcortarTextPipe();


    constructor(){}
    

    public ReporteCierre(data:any){
        let doc = new jsPDF('p', 'pt', 'letter');
        let currentPage = 0;
        let startY = 156;
        let startYText = 168;

        let totalDebito = 0;
        let totalCredito = 0;

        let topTitle = this.RectTitle(doc,15,130,'CIERRE SALDOS POR COBRAR Y SALDOS POR PAGAR',null,574);
        
        this.RectTitle(doc,15,topTitle,'SALDOS POR COBRAR',null,302);
        let topTitle2 = this.RectTitle(doc,302,topTitle,'SALDOS POR PAGAR',null,287);
        this.RectTitle(doc,302,topTitle,'SALDOS POR PAGAR',null,287);
        
        let topLeft = topTitle2;
        let topRight = topTitle2;
        for(let x of data.cxc){
          
            topLeft = this.RectTitleValor(doc,15,topLeft,x['name'],this.cp.transform(x['value']),143.5,143.5);
        }
        for(let x of data.cxp){
          
            topRight = this.RectTitleValor(doc,302,topRight,x['name'],this.cp.transform(x['value']),143.5,143.5);
        }

        const mayorTop = Math.max(topLeft, topRight) +20;



        topTitle = this.RectTitle(doc,15,mayorTop,'CIERRE DE EFECTIVO Y EQUIVALENTE AL EFECTIVO',null,574);
        topLeft = topTitle;
        for(let x of data.saldos){
          
            topLeft = this.RectTitleValor(doc,15,topLeft,x['cuenta__nombre'],this.cp.transform(x['saldo']),287,287);
        }

        doc.line(25, 710, 190, 710)
        doc.setFontSize(9)
        doc.text("CONTABILIDAD", 110, 725, "center")

        doc.line(400, 710, 585, 710)
        doc.text("GERENCIA", 490, 725, "center")
        
        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        // For each page, print the page number and the total pages
        for (let i = 1; i <= pageCount; i++) {
    
            
    
            doc.setFontSize(8);
           
            doc.setPage(i);
            var pageSize = doc.internal.pageSize;
            var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            // doc.text('Fecha de conciliación: ' + String(data.con.fechaCierre), 20, 169,{
            //     align:'left'
            // }); 
            doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 530, 105,{
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
                   doc.text('CIERRE CONTABLE', 307, 105, { align: "center" })
       
                
                    // Movimiento #
                   doc.setFontSize(10)
                   doc.text('MES CIERRE.', 495, 55, { align: "center" })
                   doc.setFont(undefined, 'normal')
                   doc.text("8-2023", 495, 70, { align: "center" })
                   doc.setFontSize(7)

                    

    }

    RectTitle(doc: jsPDF, x: number, y: number,titulo:string,data?:any,rectWidth:number = 285) {

      

        doc.setTextColor("#FFF");
        doc.setFillColor('#41B6FF');
        // const rectWidth = 285;
        const rectHeight = 16;
        const margin = 5;

        

        // Primer rectángulo con el texto "Datos del cliente"
        doc.rect(x, y, rectWidth, rectHeight, 'FD');
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.text(titulo, x + rectWidth / 2, y + rectHeight / 2, { align: 'center', baseline: 'middle' });
        doc.setFont(undefined, 'normal');
        // Dibujar la segunda línea con los dos rectángulos
        const rectTop = y + rectHeight;

      

        doc.setTextColor("#000");
        return rectTop;
    }


    RectTitleValor(doc: jsPDF, x: number, y: number, rectLeftContent: string, rectRightContent: string, rectLeftWidth: number, rectRightWidth: number,RightFontSize:number = 8): number {
      doc.setFillColor('#41B6FF');
    //   doc.setTextColor("#FFF");
      const rectHeight = 16;
      const margin = 5;
    
      

    
      // Obtener altura necesaria para el texto del rectángulo derecho
      console.log(rectRightContent)
      const rectRightLines = doc.splitTextToSize(rectRightContent, (rectRightWidth - 15));
      console.log('N° lineas:',rectRightLines)
      let numLines = rectHeight;
      if(rectRightLines.length > 1){
        numLines = Math.ceil(rectRightLines.length * rectHeight);
        
      }

      const adjustedRectRightHeight = numLines;
    
      // Rectángulo derecho con texto ajustado
      const rectRightX = x + rectLeftWidth;
      const rectRightY = y;
      const textOffset = (adjustedRectRightHeight - rectRightLines.length * 8) / 2;


      // Rectángulo izquierdo con el texto "NIT"
      doc.rect(x, y, rectLeftWidth, adjustedRectRightHeight);
      doc.setFontSize(8);
      
      
      


      doc.rect(rectRightX, rectRightY, rectRightWidth, adjustedRectRightHeight, 'S');
      doc.setFontSize(8);
      doc.setTextColor("#000");     

      if(rectRightLines.length > 1){
        // doc.setTextColor("#FFF");
        doc.setFont(undefined, 'bold');
        doc.text(rectLeftContent, x + margin,  rectRightY + adjustedRectRightHeight / 2 + (textOffset / rectRightLines.length ));
        doc.setTextColor("#000");
        doc.setFont(undefined, 'normal');
        doc.setFontSize(RightFontSize);
        doc.text(rectRightLines, rectRightX + margin, rectRightY + adjustedRectRightHeight / 2 - (textOffset / rectRightLines.length));
        doc.setFontSize(8);
      }else{
        // doc.setTextColor("#FFF");
        doc.setFont(undefined, 'bold');
        doc.text(rectLeftContent, x + margin,  rectRightY + adjustedRectRightHeight / 2 + textOffset);
        doc.setFont(undefined, 'normal');
        doc.setTextColor("#000");
        doc.setFontSize(RightFontSize);
        doc.text(rectRightLines, rectRightX + margin, rectRightY + adjustedRectRightHeight / 2  + textOffset);
        doc.setFontSize(8);
      }

      return y+adjustedRectRightHeight;

    }
    RectTotalesTitleValor(doc: jsPDF, x: number, y: number, rectLeftContent: string, rectRightContent: string, rectLeftWidth: number, rectRightWidth: number): number {
      doc.setFillColor('#41B6FF');
      doc.setTextColor("#FFF");
      const rectHeight = 15;
      const margin = 5;
    
      

    
      // Obtener altura necesaria para el texto del rectángulo derecho
      const rectRightLines = doc.splitTextToSize(rectRightContent, (rectRightWidth - 15));
      console.log('N° lineas:',rectRightLines)
      let numLines = rectHeight;
      if(rectRightLines.length > 1){
        numLines = Math.ceil(rectRightLines.length * rectHeight);
        
      }

      const adjustedRectRightHeight = numLines;
    
      // Rectángulo derecho con texto ajustado
      const rectRightX = x + rectLeftWidth;
      const rectRightY = y;
      const textOffset = (adjustedRectRightHeight - rectRightLines.length * 8) / 2;


      // Rectángulo izquierdo con el texto "NIT"
      doc.rect(x, y, rectLeftWidth, adjustedRectRightHeight, 'FD');
      doc.setFontSize(8);
      
      
      


      doc.rect(rectRightX, rectRightY, rectRightWidth, adjustedRectRightHeight, 'S');
      doc.setFontSize(8);
      doc.setTextColor("#000");     

      if(rectRightLines.length > 1){
        doc.setTextColor("#FFF");
        doc.setFont(undefined, 'bold');
        doc.text(rectLeftContent,  x + margin,  rectRightY + adjustedRectRightHeight / 2 + (textOffset / rectRightLines.length ));
        doc.setTextColor("#000");
        doc.setFont(undefined, 'normal');
        doc.text(rectRightLines, rectRightX+rectRightWidth - margin, rectRightY + adjustedRectRightHeight / 2 + (textOffset / rectRightLines.length ),{ align: 'right'});
      }else{
        doc.setTextColor("#FFF");
        doc.setFont(undefined, 'bold');
        doc.text(rectLeftContent, x + margin,  rectRightY + adjustedRectRightHeight / 2 + textOffset);
        doc.setFont(undefined, 'normal');
        doc.setTextColor("#000");
        doc.text(rectRightLines,rectRightX+ rectRightWidth - margin,  rectRightY + adjustedRectRightHeight / 2 + textOffset,{ align: 'right' });

      }

      return y+adjustedRectRightHeight;

    }

   

 

    

}


     
