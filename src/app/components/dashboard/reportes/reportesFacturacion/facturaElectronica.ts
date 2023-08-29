import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoDream, logoSumi, waterMake } from '../logoSumi';
import { CxcMoviModels } from '../../components/Facturacion/models/CxcMoviModels';
import { InvoceReport } from '../../components/Facturacion/models/InvoceReport';
import { AcortarTextPipe } from 'src/app/pipes/acortarText.pipe';

export class facturaElectronicaReport {


    constructor(){}


    private cp:CurrencyPipe = new CurrencyPipe('en-US');

    public geerarPDFFacturaSumisx(datos:InvoceReport) {

        const data = datos;
        const doc = new jsPDF('p', 'pt', 'letter');
        
    
        const topTableLeft = this.setEncabezadoTableLeft(doc,15,145,'DATOS DEL CLIENTE',data);
        const topTableRight = this.setEncabezadoTableRigth(doc,310,145,'PRE FACTURA ELECTRÓNICA DE VENTA',data);

        const topTable =  Math.max(topTableLeft, topTableRight);

        // variable productos a recorrer en el pdf
        let productos = [];
     
    
        // for para recorrer productos y diseñar la tabla
        let i = 0;
        for (let x of data.productos){ 
          i+=1;
          let p = [{
            content: i,
            styles: {
              cellWidth: 20,
             
            }
          },
          {
            content: x.producto.nombreymarcaunico + ' Lote: '+x.lote,
            styles: {
              cellWidth: 260,
            

            }
          },
          {
            content:x.cantidad,
            styles: {
    
              cellWidth: 30,
             
    
    
            }
          },
          {
            content: this.cp.transform(x.valor),
            styles: {
    
              cellWidth: 60,
              halign: 'right',
            

    
    
            }
          },
          {
            content: this.cp.transform((x.iva*x.cantidad) / x.subtotal * 100),
            styles: {
    
              cellWidth: 60,
            

    
    
            }
          },
          {
            content:  this.cp.transform((x.descuento*x.cantidad) / x.subtotal * 100),
            styles: {
    
              cellWidth: 60,
             

    
    
            }
          },
          {
            content: this.cp.transform(x.subtotal),
            cellWidth: 110,
           

          },
          ]
    
          productos.push(p);
        }
        
        let currentPage = 0;
        // tabla productos
        autoTable(doc, {
         
          // tableLineWidth: 0.5,
          // tableLineColor: [0,0,0],
          head: [
            [{
              content: '#',
              styles: {
                halign: 'center'
              }
    
            },
              'PRODUCTO',
            {
              content: 'CANT.',
              styles: {
                halign: 'center',
                
              }
    
            }, {
              content: 'VALOR UND',
              styles: {
                halign: 'right'
              }
    
            },
            {
              content: 'IVA %',
              styles: {
                halign: 'right'
              }
    
            },
            {
              content: 'DTO %',
              styles: {
                halign: 'right'
              }
    
            }, {
              content: 'SUBTOTAL',
              styles: {
                halign: 'right'
              }
    
            }
            ]],
          body: productos,
          horizontalPageBreak: true,
          margin: {
            top: topTable+15,
            bottom: 245,
            left: 15,
            right: 15,
    
          },
          
          // metodo que se repite en cad pagina
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {
    
          
    
            // imagen logo empresa
            doc.addImage(logoDream, 'PNG', 490, 10,100, 100)

            doc.setFontSize(14)
    
            doc.setFont(undefined, 'bold');
            doc.text('SUMIPROD DE LA COSTA S.A.S.', 15, 30)
            doc.setFontSize(8)
            // doc.text('Enrique Rosado Navarro', 190, 40)
            doc.setFont(undefined, 'normal');
            doc.text('NIT: 901648084-9', 15, 40)
            doc.text('Régimen: Responsable de IVA', 15, 50)
            doc.text('Persona Judírica', 15, 60)
            doc.text('Dirección: Calle 44B #21G-11 Urb Santa Cruz', 15, 70)
            doc.text('Tel. (5) 432-7722 -  Cel: (301) 302-2986', 15, 80)
            doc.text('Email. sumiprodelacosta@gmail.com', 15, 90)
            doc.setFontSize(7)
    
    
            // Fecha y realizado
            doc.text("Realizado Por:", 15, 115)
            doc.setFont(undefined, 'bold')
            doc.text(data.usuario, 64, 115)
            doc.setFont(undefined, 'normal')
    
            doc.text("Impreso:", 135, 115)
            doc.setFont(undefined, 'bold')
            doc.text(moment(new Date()).format("MMMM DD YYYY - h:mm:ss a").toLocaleUpperCase(), 270, 115,"right")
            doc.setFont(undefined, 'normal')
            // Fin de Fecha y realizado
    
    
            // elaborado
            doc.setFontSize(6)
            doc.setFont(undefined, 'bold')
            doc.text("Elaborado, impreso y enviado electrónicamente por Sumiprod de la Costa S.A.S. NIT: 901648084-9", 10, 560, { angle: 90 })
            // fin elaborado
    
            // tabla encabezado consecutivo y fecha
            doc.setFont(undefined, 'normal')
            // linea principal
            doc.line(15, 120, 595, 120, 'F')
    
            // Datos de resolución de factura
            doc.setFontSize(9)
            doc.setFont(undefined, 'bold')
            var textoResolucion = doc.splitTextToSize(data.numeracion.textoResolucion, 520);
            doc.text(textoResolucion, 15, 130)
    
    
            doc.setFontSize(7)
            doc.setFont(undefined, 'normal')
            


         


            
            if(currentPage != 0){
              this.setEncabezadoTableLeft(doc,15,145,'DATOS DEL CLIENTE',data);
              this.setEncabezadoTableRigth(doc,310,145,'PRE FACTURA ELECTRÓNICA DE VENTA',data);
            }



    

    
           
    
            
            doc.setDrawColor(0);
            doc.rect(15, 550, 580, 235);
    
            this.tableImpuestos(doc,550,data);
            doc.setFontSize(10)

            const subtotalY     =  this.RectTotalesTitleValor(doc,402,550,'Subtotal',this.cp.transform(data.subtotal),80,113)
            const descuentoY    =  this.RectTotalesTitleValor(doc,402,subtotalY,'Descuento',this.cp.transform(data.descuento),80,113)
            const retencionesY  =  this.RectTotalesTitleValor(doc,402,descuentoY,'Retenciones',this.cp.transform(data.valorReteFuente),80,113)
            const cargosY       =  this.RectTotalesTitleValor(doc,402,retencionesY,'Cargos',this.cp.transform(data.valorIva),80,113)
            const totalY        =  this.RectTotalesTitleValor(doc,402,cargosY,'TOTAL FACTURA',this.cp.transform(data.valor),80,113)
            
            
            const observacionY    =  this.RectTitleValor(doc,15,totalY,'OBSERVACIONES',data.observacion,100,480)
            const totalEnLetrasY  =  this.RectTitleValor(doc,15,observacionY,'TOTAL EN LETRAS',this.numeroALetras(data.valor, ''),100,480,7)
            
            const notasY =  this.RectTitle(doc,15,totalEnLetrasY,'NOTAS',null,580);
            doc.setTextColor('#000')
            let textNotas = 'INFORMACIÓN PARA PAGOS POR CONSIGNACIÓN O TRANSFERENCIAS:\nA/C NOMBRE: JAILIN ALEJANDRA FERRER MARQUEZ\n- BANCOLOMBIA: CUENTA DE AHORROS N° 51735172135\n- BANCO DAVIVIENDA: CUENTA DE AHORROS N° 488407690467\n- BANCO DE BOGOTÁ: CUENTA DE AHORROS N° 564792745';
            textNotas = doc.splitTextToSize(textNotas,565);
            doc.text(textNotas,20,notasY+15)
            
            // Obtener el tamaño de la página
            const pageSize = doc.internal.pageSize;

            // Agregar la imagen de marca de agua al final del PDF
            const watermarkWidth = 400; // Ancho de la imagen de marca de agua
            const watermarkHeight = 400; // Alto de la imagen de marca de agua
            const watermarkX = (pageSize.width - watermarkWidth) / 2; // Centrar horizontalmente
            const watermarkY = (pageSize.height - watermarkHeight) / 2; // Centrar verticalmente


            // Agregar la imagen de marca de agua con las coordenadas calculadas
            doc.addImage(waterMake, 'PNG', watermarkX, watermarkY, watermarkWidth, watermarkHeight);

         

           
       
    
            doc.setFont(undefined, 'bold');
            doc.setFontSize(8)
            currentPage+=1;
           
          },
    
          
          theme: 'grid',
          headStyles: {
            fillColor: '#41B6FF',
    
    
    
          },
          columnStyles: {
            0: { halign: 'center' },
            2: { halign: 'center' },
            3: { halign: 'center' },
            4: { halign: 'right' },
            5: { halign: 'right' },
            6: { halign: 'right' },
            7: { halign: 'right' },
            8: { halign: 'right' },
          },
          styles: {
            fontSize: 7,
            fontStyle: 'bold',
           
          },
          bodyStyles: {
           
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
    
          doc.setFontSize(8);
          // Go to page i
          doc.setPage(i);
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text('Pagina ' + String(i) + ' De ' + String(pageCount), 593, 141,"right"); //data.settings.margin.left if you want it on the left
        }
    
    
    
        return doc;
    
    
    }



    setEncabezadoTableLeft(doc: jsPDF,x,y,titulo:string,data:any){
      doc.setDrawColor('#000000');
      const rectTop =  this.RectTitle(doc,x,y,titulo,data);

      // Contenidos de texto para los rectángulos
        
      const rectLeftWidth = 70;
      const rectRightWidth = 215;



    


      let documento =  data.cliente.documento;
      if(data.cliente.tipoDocumento == 'NIT'){
        documento = documento+'-'+data.cliente.dv
      }

      const nitLineHeight = this.RectTitleValor(doc, x, rectTop, data.cliente.tipoDocumento.toUpperCase(), documento, rectLeftWidth, rectRightWidth);
      const clienteLineHeight = this.RectTitleValor(doc, x, nitLineHeight, 'CLIENTE', data.cliente.nombreComercial, rectLeftWidth, rectRightWidth);
      const direccionLineHeight = this.RectTitleValor(doc, x, clienteLineHeight, 'DIRECCIÓN', data.cliente.direccion, rectLeftWidth, rectRightWidth);
      const telefonoLineHeight = this.RectTitleValor(doc, x, direccionLineHeight, 'TELEFONO', data.cliente.telefonoContacto, rectLeftWidth, rectRightWidth);
      const emailLineHeight = this.RectTitleValor(doc, x, telefonoLineHeight, 'EMAIL', data.cliente.correoContacto || '', rectLeftWidth, rectRightWidth);

      
      doc.setTextColor("#000");




      doc.setFontSize(7)
      doc.setFont(undefined, 'normal');

      return emailLineHeight;
    }

    setEncabezadoTableRigth(doc: jsPDF,x,y,titulo:string,data:any){
      doc.setDrawColor('#000000');
      const rectTop =  this.RectTitle(doc,x,y,titulo,data);
        // Contenidos de texto para los rectángulos
      
      const rectLeftWidth = 85;
      const rectRightWidth = 200;


      doc.setFont(undefined, 'bold');
    
      


      const numeroFacturaLineHeight = this.RectTitleValor(doc, x, rectTop, 'FACTURA N°', data.numero + "", rectLeftWidth, rectRightWidth);
      const emisionLineHeight = this.RectTitleValor(doc, x, numeroFacturaLineHeight, 'FECHA EMISIÓN',moment(data.fecha).format('MMMM DD YYYY').toUpperCase(), rectLeftWidth, rectRightWidth);
      const vencimientoLineHeight = this.RectTitleValor(doc, x, emisionLineHeight, 'VENCIMIENTO ', moment(data.fechaVencimiento).format('MMMM DD YYYY').toUpperCase(), rectLeftWidth, rectRightWidth);
      const formaPagoLineHeight = this.RectTitleValor(doc, x, vencimientoLineHeight, 'FORMA DE PAGO', data.formaPago.nombre, rectLeftWidth, rectRightWidth);
      const totalLineasLineHeight = this.RectTitleValor(doc, x, formaPagoLineHeight, 'TOTAL DE LINEAS', data.productos.length+"", rectLeftWidth, rectRightWidth);

      
      doc.setTextColor("#000");




      doc.setFontSize(7)
      doc.setFont(undefined, 'normal');

      
      return totalLineasLineHeight;
    }

    RectTitle(doc: jsPDF, x: number, y: number,titulo:string,data?:any,rectWidth:number = 285) {

      

        doc.setTextColor("#FFF");
        doc.setFillColor("#41B6FF");
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

      

        return rectTop;
    }


    RectTitleValor(doc: jsPDF, x: number, y: number, rectLeftContent: string, rectRightContent: string, rectLeftWidth: number, rectRightWidth: number,RightFontSize:number = 8): number {
      doc.setFillColor("#41B6FF");
      doc.setTextColor("#FFF");
      const rectHeight = 16;
      const margin = 5;
    
      
  
    
      // Obtener altura necesaria para el texto del rectángulo derecho
      const rectRightLines = doc.splitTextToSize(rectRightContent, (rectRightWidth - 15));
      // console.log('N° lineas:',rectRightLines)
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
        doc.text(rectLeftContent, x + margin,  rectRightY + adjustedRectRightHeight / 2 + (textOffset / rectRightLines.length ));
        doc.setTextColor("#000");
        doc.setFont(undefined, 'normal');
        doc.setFontSize(RightFontSize);
        doc.text(rectRightLines, rectRightX + margin, rectRightY + adjustedRectRightHeight / 2 - (textOffset / rectRightLines.length));
        doc.setFontSize(8);
      }else{
        doc.setTextColor("#FFF");
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
      doc.setFillColor("#41B6FF");
      doc.setTextColor("#FFF");
      const rectHeight = 15;
      const margin = 5;
    
      
  
    
      // Obtener altura necesaria para el texto del rectángulo derecho
      const rectRightLines = doc.splitTextToSize(rectRightContent, (rectRightWidth - 15));
      // console.log('N° lineas:',rectRightLines)
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

    tableImpuestos(doc: jsPDF,firstY:number,data:any,rectWidth:number = 385,rectHeight:number = 15){
    
      doc.setFontSize(9)
      doc.setFillColor('#41b6ff')
      const firstDivisionWidth = 150;
      const remainingDivisionsWidth = (rectWidth - firstDivisionWidth) / 3;
      
      // Dibujar el rectángulo principal
      doc.rect(15, firstY, rectWidth, rectHeight,'FD');
      
      // Textos en las divisiones
      const divisions = ['IMPUESTO', 'BASE', 'TARIFA', 'VALOR'];
     
      // Dibujar las divisiones y los textos en el rectángulo
      for (let i = 0; i < 4; i++) {
          let divisionX;
          if (i === 0) {
            divisionX = 15 + firstDivisionWidth / 2;
          } else {
            divisionX = 15 + firstDivisionWidth + (i - 1) * remainingDivisionsWidth + remainingDivisionsWidth / 2;
          }

          const divisionText = divisions[i];
          doc.setTextColor("#FFF");
          doc.text(divisionText, divisionX, firstY + rectHeight / 2, { align: 'center', baseline: 'middle' });
          doc.setTextColor("#000");
      }


      for(let x of data.impuestos){
        
        firstY+= 15;
        // Dibujar el rectángulo principal
        doc.rect(15, firstY, rectWidth, rectHeight,'S');
      
        // Textos en las divisiones
        const valores = [x.impuesto.nombre, x.base, x.procentaje, x.total];
  
        // Dibujar las divisiones y los textos en el rectángulo
  
        doc.setFontSize(8)
        for (let i = 0; i < 4; i++) {
            let divisionX;
            if (i === 0) {
              divisionX = 20;
              const divisionText = valores[i];
              doc.text(divisionText, divisionX, firstY + rectHeight / 2, { align: 'left', baseline: 'middle' });
            }else if(i === 2){
              divisionX = 15 + firstDivisionWidth + (i - 1) * remainingDivisionsWidth + remainingDivisionsWidth / 2;
              const divisionText = this.cp.transform(( parseFloat(valores[i].toString())))+'%';
              doc.text(divisionText, divisionX, firstY + rectHeight / 2, { align: 'center', baseline: 'middle' });
            }else {
              divisionX = 15 + firstDivisionWidth + (i - 1) * remainingDivisionsWidth + remainingDivisionsWidth - 3;
              const divisionText = this.cp.transform(( parseFloat(valores[i].toString())));
              doc.text(divisionText, divisionX, firstY + rectHeight / 2, { align: 'right', baseline: 'middle' });
            }
  
  
            if (i !== 0) {
              // Dibujar las líneas divisorias entre las divisiones
              doc.line(
                15 + firstDivisionWidth + (i - 1) * remainingDivisionsWidth,
                firstY,
                15 + firstDivisionWidth + (i - 1) * remainingDivisionsWidth,
                firstY + rectHeight
              );
            }
        }
      }


      for(let x of data.retenciones){
        
        firstY+= 15;
        // Dibujar el rectángulo principal
        doc.rect(15, firstY, rectWidth, rectHeight,'S');
      
        // Textos en las divisiones
        const valores = [x.retencion.nombre, x.base, x.procentaje, x.total];
  
        // Dibujar las divisiones y los textos en el rectángulo
  
        doc.setFontSize(8)
        for (let i = 0; i < 4; i++) {
            let divisionX;
            if (i === 0) {
              divisionX = 20;
              const divisionText = valores[i];
              doc.text(divisionText, divisionX, firstY + rectHeight / 2, { align: 'left', baseline: 'middle' });
            }else if(i === 2){
              divisionX = 15 + firstDivisionWidth + (i - 1) * remainingDivisionsWidth + remainingDivisionsWidth / 2;
              const divisionText = this.cp.transform(( parseFloat(valores[i].toString())))+'%';
              doc.text(divisionText, divisionX, firstY + rectHeight / 2, { align: 'center', baseline: 'middle' });
            }else {
              divisionX = 15 + firstDivisionWidth + (i - 1) * remainingDivisionsWidth + remainingDivisionsWidth - 3;
              const divisionText = this.cp.transform(( parseFloat(valores[i].toString())));
              doc.text(divisionText, divisionX, firstY + rectHeight / 2, { align: 'right', baseline: 'middle' });
            }
  
  
            if (i !== 0) {
              // Dibujar las líneas divisorias entre las divisiones
              doc.line(
                15 + firstDivisionWidth + (i - 1) * remainingDivisionsWidth,
                firstY,
                15 + firstDivisionWidth + (i - 1) * remainingDivisionsWidth,
                firstY + rectHeight
              );
            }
        }
      }
      


    }





    public geerarPDFFacturaSumi(data:InvoceReport) {

        const doc = new jsPDF('p', 'pt', 'letter');
        
    
    
        // variable productos a recorrer en el pdf
        let productos = [];
     
    
        // for para recorrer productos y diseñar la tabla
        let i = 0;
        for (let x of data.productos){ 
          i+=1;
          let p = [{
            content: i,
            styles: {
              cellWidth: 20,
             
            }
          },
          {
            content: x.producto.nombreymarcaunico + ' Lote: '+x.lote,
            styles: {
              cellWidth: 260,
            

            }
          },
          {
            content:x.cantidad,
            styles: {
    
              cellWidth: 30,
             
    
    
            }
          },
          {
            content: this.cp.transform(x.valor),
            styles: {
    
              cellWidth: 60,
              halign: 'right',
            

    
    
            }
          },
          {
            content: this.cp.transform((x.iva*x.cantidad) / x.subtotal * 100),
            styles: {
    
              cellWidth: 60,
            

    
    
            }
          },
          {
            content:  this.cp.transform((x.descuento*x.cantidad) / x.subtotal * 100),
            styles: {
    
              cellWidth: 60,
             

    
    
            }
          },
          {
            content: this.cp.transform(x.subtotal),
            cellWidth: 110,
           

          },
          ]
    
          productos.push(p);
        }
    
        // tabla productos
        autoTable(doc, {
         
          // tableLineWidth: 0.5,
          // tableLineColor: [0,0,0],
          head: [
            [{
              content: '#',
              styles: {
                halign: 'center'
              }
    
            },
              'PRODUCTO',
            {
              content: 'CANT.',
              styles: {
                halign: 'center',
                
              }
    
            }, {
              content: 'VALOR UND',
              styles: {
                halign: 'right'
              }
    
            },
            {
              content: 'IVA %',
              styles: {
                halign: 'right'
              }
    
            },
            {
              content: 'DTO %',
              styles: {
                halign: 'right'
              }
    
            }, {
              content: 'SUBTOTAL',
              styles: {
                halign: 'right'
              }
    
            }
            ]],
          body: productos,
          horizontalPageBreak: true,
          margin: {
            top: 250,
            bottom: 245,
            left: 15,
            right: 15,
    
          },
    
          // metodo que se repite en cad pagina
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {
    
    
    
            // imagen logo empresa
            doc.addImage(logoSumi, 'PNG', 20, 20,150, 80)

            doc.setFontSize(14)
    
            doc.setFont(undefined, 'bold');
            doc.text('SUMIPROD DE LA COSTA S.A.S.', 190, 30)
            doc.setFontSize(7)
            // doc.text('Enrique Rosado Navarro', 190, 40)
            doc.setFont(undefined, 'normal');
            doc.text('NIT: 901648084-9', 190, 40)
            doc.text('Régimen: Responsable de IVA', 190, 50)
            doc.text('Persona Judírica', 190, 60)
            doc.text('Dirección: Calle 44B #21G-11 Urb Santa Cruz', 190, 70)
            doc.text('Tel. (5) 432-7722 -  Cel: (301) 302-2986', 190, 80)
            doc.text('Email. sumiprodelacosta@gmail.com', 190, 90)
    
    
    
            // Fecha y realizado
            doc.text("Realizado Por:", 336, 105)
            doc.setFont(undefined, 'bold')
            doc.text(data.usuario, 385, 105)
            doc.setFont(undefined, 'normal')
    
            doc.text("Impreso:", 460, 105)
            doc.setFont(undefined, 'bold')
            doc.text(moment(new Date()).format("MMMM DD YYYY - h:mm:ss a").toLocaleUpperCase(), 595, 105,"right")
            doc.setFont(undefined, 'normal')
            // Fin de Fecha y realizado
    
    
            // elaborado
            doc.setFontSize(6)
            doc.setFont(undefined, 'bold')
            doc.text("Elaborado, impreso y enviado electrónicamente por Sumiprod de la Costa S.A.S. NIT: 901648084-9", 10, 560, { angle: 90 })
            // fin elaborado
    
            // tabla encabezado consecutivo y fecha
            doc.setFont(undefined, 'normal')
            // linea principal
            doc.line(15, 110, 595, 110, 'F')
    
            // Datos de resolución de factura
            doc.setFontSize(9)
            doc.setFont(undefined, 'bold')
            var textoResolucion = doc.splitTextToSize(data.numeracion.textoResolucion, 520);
            doc.text(textoResolucion, 15, 125)
    
    
            doc.setFontSize(7)
            doc.setFont(undefined, 'normal')
    
            // primer cuadro principal
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(15, 145, 285, 100, 3, 3);
            doc.line(20, 210, 295, 210, 's')
    
            // datos basicos del adquiriente
            doc.setFont(undefined, 'bold');
            doc.text('Cliente: ', 27, 162)
            doc.text('NIT: ', 27, 173)
            doc.text("Dirección:", 27, 184)
            doc.text('Teléfono: ', 27, 195)
            doc.text('Email: ', 27, 206)
            doc.text('Total lineas: ', 27, 220)
            doc.text('Vendedor: ', 27, 231)
    
    
            // Variables del adquiriente (Variables quemadas)
            doc.setFont(undefined, 'normal');
            doc.text(new AcortarTextPipe().transform(data.cliente.nombreComercial,'56'), 70, 162)
            doc.text(data.cliente.documento+'-'+data.cliente.dv, 70, 173)
            doc.text(data.cliente.direccion+','+data.cliente.municipio, 70, 184)
            doc.text(data.cliente.telefonoContacto, 70, 195)
            doc.text(data.cliente.correoContacto || '', 70, 206)
            doc.text(data.productos.length+'', 70, 220)
            doc.text(data.vendedor.nombre.toString().toUpperCase(), 70, 231)
    
    
    
    
    
    
    
    
            // datos de la factura / reporte
            doc.roundedRect(310, 145, 285, 100, 3, 3);
            doc.line(315, 165, 585, 165, 's')
            doc.line(315, 180, 585, 180, 's')
            doc.line(315, 195, 585, 195, 's')
            doc.line(315, 210, 585, 210, 's')
            doc.line(315, 225, 585, 225, 's')
    
    
            doc.setFont(undefined, 'bold');
    
            // comienzo de consecutivo reporte
            doc.text('FACTURA DE VENTA N°: ', 317, 162)
            doc.text(data.numero + "", 405, 162)
            // Fin de consecutivo reporte
    
            // Comienzo tipo de moneda reporte
            doc.setFont(undefined, 'normal');
            doc.text('MONEDA: ', 317, 177);
            doc.setFont(undefined, 'bold');
            doc.text("COP Colombia,Pesos", 405, 177);
            // Fin de tipo de moneda reporte
    
            // Comienzo de fecha de reporte
            doc.setFont(undefined, 'normal');
            doc.text('FECHA EMISIÓN: ', 317, 192)
            doc.setFont(undefined, 'bold');
            doc.text(moment(data.fecha).format('MMMM DD YYYY').toUpperCase(), 405, 192)
            doc.setFont(undefined, 'normal');
            doc.text('FECHA VENCIMIENTO: ', 317, 207)
            doc.setFont(undefined, 'bold');
            doc.text(moment(data.fechaVencimiento).format('MMMM DD YYYY').toUpperCase(), 405, 207)
            // Fin de fecha de reporte
    
            // Comienzo tipo negocación
            doc.setFont(undefined, 'normal');
            doc.text('TIPO DE NEGOCIACIÓN: ', 317, 222)
            doc.setFont(undefined, 'bold');
            doc.text(data.formaPago.nombre, 405, 222)
            // Fin tipo negocación
    
    
    
    
            doc.roundedRect(15, 550, 580, 235, 3, 3);
    
    
            // imagen de la nota
            // doc.addImage(dataImgNote, 'PNG', 295, 588,8, 8);
    
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            // RECTANGULO DEL TOTAL
            // doc.roundedRect(40, 610, 530, 70, 3, 3);
    
            //LINEAS HORIZONTALES DE LOS TOTALES
            doc.line(400, 567, 595, 567, 's')
            doc.line(400, 582, 595, 582, 's')
            doc.line(400, 597, 595, 597, 's')
            doc.line(400, 612, 595, 612, 's')
            doc.line(400, 627, 595, 627, 's')
            // doc.line(400, 682, 595, 682, 's')
            // doc.line(400, 670, 595, 670, 's')
            // doc.line(400, 680, 595, 680, 's')
    
            // LINEAS VERTICALES DE LOS TOTALES
            doc.line(400, 550, 400, 627, 's')
            doc.line(485, 550, 485, 627, 's')
    
            // TEXO DE LOS TOTALES
            doc.setFont(undefined, 'bold');
            doc.setFontSize(9)
            doc.text("Subtotal:", 402, 565)
            doc.text("Descuento:", 402, 580)
            doc.text("IVA:", 402, 595)
            doc.text("RETENCIONES:", 402, 610)
            doc.text("TOTAL FACTURA:", 402, 625)
        
    
            // totales en numeros
            doc.setFont(undefined, 'normal');
            doc.setFontSize(9)
            doc.text(this.cp.transform(data.subtotal), 590, 565, "right")
            doc.text(this.cp.transform(data.descuento), 590, 580, "right")
            doc.text(this.cp.transform(data.valorIva), 590, 595, "right")
            doc.text(this.cp.transform(data.valorReteFuente), 590, 610, "right")
            doc.setFont(undefined, 'bold');
            doc.setFontSize(10)
            doc.text(this.cp.transform(data.valor), 590, 625, "right")
          
    
    
    
            // NOTAS 
            doc.setFont(undefined, 'bold');
            doc.setFontSize(7)
            doc.text("NOTAS:", 25, 570)
            doc.text("       \tSOLO SE ACEPTAN RECLAMOS DURANTE LAS 36 HORAS SIGUIENTES AL RECIBO DE ESTA MERCANCÍA - PRODUCTOS REFRIGERADOS NO SE ACEPTA DEVOLUCIÓN.", 25, 570,{maxWidth: 385})
    
    
    
            // LINEA DIVISORA DE NOTAS 
            doc.line(15, 582, 400, 582, 's')
    
            // TEXTO DEBAJO DE LA LINEA DIVISORA DE NOTAS
            doc.text("Declaro haber recibido real y materialmente las mercancía antes descritas y por lo tanto aceptamos y nos obligamos a pagar el valor total de la misma a SUMIPROD DE LA COSTA  S.A.S. en las fechas indicadas arriba.", 25, 590,{maxWidth: 385})
            doc.setFontSize(6)
            doc.text("Esta factura de venta se asimila en todos sus efectos legales a la letra de cambio según articulo 774 del codigo de comercio", 25, 607,{maxWidth: 385})
            doc.setFontSize(7)
            // LINEA DIVISORA DE OBSERVACIONES 
            doc.line(15, 612, 400, 612, 's')

            // MODULO DE RETENCIONES FACTURACIÓN ELECTRONICA 
            
            if(data.retenciones.length > 0){

           
              doc.setFillColor("#41B6FF");
              doc.rect(30,620,270,15,'FD');
              doc.rect(30,635,270,15);

            

              doc.setFontSize(9)
              doc.setTextColor("#FFF");
              doc.text("RETENCIÓNES", 165, 631,{align:'center'})


              doc.setFontSize(8)
              
              doc.setTextColor("#000");
              doc.text("RETENCIÓN", 75, 646,{align:'center'})
              doc.text("BASE", 160, 646,{align:'center'})
              doc.text("%", 210, 646,{align:'center'})
              doc.text("TOTAL", 260, 646,{align:'center'})


              doc.line(120,635,120,635+15);
              doc.line(200,635,200,635+15);
              doc.line(220,635,220,635+15);

      
              let startY = 635;
              let startYText = 646;
              doc.setTextColor("#1E1D1D");
              for(let x of data.retenciones){
                startY+=15
                startYText +=15;

                doc.rect(30,startY,270,15);
                doc.line(120,startY,120,startY+15);
                doc.line(200,startY,200,startY+15);
                doc.line(220,startY,220,startY+15);


                doc.text(x.retencion.nombre, 35, startYText)
                doc.text(this.cp.transform(x.base), 195, startYText,{align:'right'})
                doc.text(x.procentaje+"", 210, startYText,{align:'center'})
                doc.setFont(undefined, 'bold');
                doc.text(this.cp.transform(x.total), 295, startYText,{align:'right'})

              }
            }

            // Zona de firmas
            doc.line(25, 710, 190, 710)
            doc.setFontSize(9)
            doc.text("Empresa - Firma y Sello", 110, 725, "center")
    
            doc.line(400, 710, 585, 710)
            doc.text("Cliente - Firma y Sello", 490, 725, "center")
        
            // TOTAL EN LETRAS
            doc.setFont(undefined, 'bold');
            doc.setFontSize(6)
            doc.text("OBSERVACIÓN:", 25, 740)
            doc.setFont(undefined, 'normal');
            doc.text("\t\t\t     "+data.observacion, 25, 740,{'width':560})
            doc.setFont(undefined, 'bold');
            doc.text("SON:", 25, 750)
            doc.setFont(undefined, 'normal');
            var splitTitle2 = doc.splitTextToSize("(" + this.numeroALetras(data.valor, '') + ")", 560)
            doc.text(42, 750, splitTitle2)
    
    
            doc.setFont(undefined, 'normal');
            doc.setFontSize(7)
            doc.setFont(undefined, 'bold');
            var splitTitle = doc.splitTextToSize("A esta factura de venta aplican las normas relativas a la letra de cambio (artículo 5 Ley 1231 de 2008). Con esta el Comprador declara haber recibido real y materialmente las mercancías o prestación de servicios descritos.  ", 570);
            doc.text(25, 770, splitTitle)
    
            doc.setFont(undefined, 'bold');
            doc.setFontSize(8)
        
           
          },
    
          
          theme: 'grid',
          headStyles: {
            fillColor: '#41B6FF',
    
    
    
          },
          columnStyles: {
            0: { halign: 'center' },
            2: { halign: 'center' },
            3: { halign: 'center' },
            4: { halign: 'right' },
            5: { halign: 'right' },
            6: { halign: 'right' },
            7: { halign: 'right' },
            8: { halign: 'right' },
          },
          styles: {
            fontSize: 7,
            fontStyle: 'bold',
           
          },
          bodyStyles: {
           
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
    
          doc.setFontSize(8);
          // Go to page i
          doc.setPage(i);
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text('Pagina ' + String(i) + ' De ' + String(pageCount), 593, 141,"right"); //data.settings.margin.left if you want it on the left
        }
    
    
    
        return doc;
    
    
    }

    public generarPDFFacturaSumi(data:InvoceReport) {

      const doc = new jsPDF('p', 'pt', 'letter');
      
  
  
      // variable productos a recorrer en el pdf
      let productos = [];
   
  
      // for para recorrer productos y diseñar la tabla
      let i = 0;
      for (let x of data.productos){ 
        i += 1;
        let p = [{
          content: i,
          styles: {
            cellWidth: 20,
           
          }
        },
        {
          content: x.producto.nombreymarcaunico + ' Lote: '+x.lote,
          styles: {
            cellWidth: 260,
          

          }
        },
        {
          content:x.cantidad,
          styles: {
  
            cellWidth: 30,
           
  
  
          }
        },
        {
          content: this.cp.transform(x.valor),
          styles: {
  
            cellWidth: 60,
            halign: 'right',
          

  
  
          }
        },
        {
          content: this.cp.transform((x.iva*x.cantidad) / x.subtotal * 100),
          styles: {
  
            cellWidth: 60,
          

  
  
          }
        },
        {
          content:  this.cp.transform((x.descuento*x.cantidad) / x.subtotal * 100),
          styles: {
  
            cellWidth: 60,
           

  
  
          }
        },
        {
          content: this.cp.transform(x.subtotal),
          cellWidth: 110,
         

        },
        ]
  
        productos.push(p);
        
      }
  
      // tabla productos
      autoTable(doc, {
       
        tableLineWidth: 0.5,
        tableLineColor: [0,0,0],
        head: [
          [{
            content: '#',
            styles: {
              halign: 'center'
            }
  
          },
            'PRODUCTO',
          {
            content: 'CANT.',
            styles: {
              halign: 'center',
              
            }
  
          }, {
            content: 'VALOR UND',
            styles: {
              halign: 'right'
            }
  
          },
          {
            content: 'IVA %',
            styles: {
              halign: 'right'
            }
  
          },
          {
            content: 'DTO %',
            styles: {
              halign: 'right'
            }
  
          }, {
            content: 'SUBTOTAL',
            styles: {
              halign: 'right'
            }
  
          }
          ]],
        body: productos,
        horizontalPageBreak: true,
        margin: {
          top: 250,
          bottom: 205,
          left: 15,
          right: 15,
  
        },
  
        // metodo que se repite en cad pagina
        didDrawPage: ({ pageNumber, doc: jsPDF }) => {
  
  
  
          // imagen logo empresa
          doc.addImage(logoSumi, 'PNG', 20, 20,150, 80)

          doc.setFontSize(14)
  
          doc.setFont(undefined, 'bold');
          doc.text('Sumiprod de la costa S.A.S.', 190, 30)
          doc.setFontSize(7)
          // doc.text('Enrique Rosado Navarro', 190, 40)
          doc.setFont(undefined, 'normal');
          doc.text('NIT: 901648084-9', 190, 40)
          doc.text('Régimen: Responsable de IVA', 190, 50)
          doc.text('Persona Judírica', 190, 60)
          doc.text('Dirección: Calle 44B #21G-11 Urb Santa Cruz', 190, 70)
          doc.text('Tel. (5) 432-7722 -  Cel: (301) 302-2986', 190, 80)
          doc.text('Email. sumiprodelacosta@gmail.com', 190, 90)
  
  
  
          // Fecha y realizado
          doc.text("Realizado Por:", 336, 105)
          doc.setFont(undefined, 'bold')
          doc.text(data.usuario, 385, 105)
          doc.setFont(undefined, 'normal')
  
          doc.text("Impreso:", 460, 105)
          doc.setFont(undefined, 'bold')
          doc.text(moment(new Date()).format("MMMM DD YYYY - h:mm:ss a").toLocaleUpperCase(), 595, 105,"right")
          doc.setFont(undefined, 'normal')
          // Fin de Fecha y realizado
  
  
          // elaborado
          doc.setFontSize(6)
          doc.setFont(undefined, 'bold')
          doc.text("Elaborado, impreso y enviado electrónicamente por Sumiprod de la Costa S.A.S. NIT: 901648084-9", 10, 560, { angle: 90 })
          // fin elaborado
  
          // tabla encabezado consecutivo y fecha
          doc.setFont(undefined, 'normal')
          // linea principal
          doc.line(15, 110, 595, 110, 'F')
  
          // Datos de resolución de factura
          doc.setFontSize(9)
          doc.setFont(undefined, 'bold')
          var textoResolucion = doc.splitTextToSize(data.numeracion.textoResolucion, 520);
          doc.text(textoResolucion, 15, 125)
  
  
          doc.setFontSize(7)
          doc.setFont(undefined, 'normal')
  
          // primer cuadro principal
          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255);
          doc.roundedRect(15, 145, 285, 100, 3, 3);
          doc.line(20, 210, 295, 210, 's')
  
          // datos basicos del adquiriente
          doc.setFont(undefined, 'bold');
          doc.text('Cliente: ', 27, 162)
          doc.text('NIT: ', 27, 173)
          doc.text("Dirección:", 27, 184)
          doc.text('Teléfono: ', 27, 195)
          doc.text('Email: ', 27, 206)
          doc.text('Total lineas: ', 27, 220)
          doc.text('Vendedor: ', 27, 231)
  
  
          // Variables del adquiriente (Variables quemadas)
          doc.setFont(undefined, 'normal');
          doc.text(data.cliente.nombreComercial, 70, 162)
          doc.text(data.cliente.documento+'-'+data.cliente.dv, 70, 173)
          doc.text(data.cliente.direccion+','+data.cliente.municipio, 70, 184)
          doc.text(data.cliente.telefonoContacto, 70, 195)
          doc.text(data.cliente.correoContacto  || '', 70, 206)
          doc.text(data.productos.length+'', 70, 220)
          doc.text(data.vendedor.nombre.toString().toUpperCase(), 70, 231)
  
  
  
  
  
  
  
  
          // datos de la factura / reporte
          doc.roundedRect(310, 145, 285, 100, 3, 3);
          doc.line(315, 165, 585, 165, 's')
          doc.line(315, 180, 585, 180, 's')
          doc.line(315, 195, 585, 195, 's')
          doc.line(315, 210, 585, 210, 's')
          doc.line(315, 225, 585, 225, 's')
  
  
          doc.setFont(undefined, 'bold');
  
          // comienzo de consecutivo reporte
          doc.text('FACTURA DE VENTA N°: ', 317, 162)
          doc.text(data.numero + "", 405, 162)
          // Fin de consecutivo reporte
  
          // Comienzo tipo de moneda reporte
          doc.setFont(undefined, 'normal');
          doc.text('MONEDA: ', 317, 177);
          doc.setFont(undefined, 'bold');
          doc.text("COP Colombia,Pesos", 405, 177);
          // Fin de tipo de moneda reporte
  
          // Comienzo de fecha de reporte
          doc.setFont(undefined, 'normal');
          doc.text('FECHA EMISIÓN: ', 317, 192)
          doc.setFont(undefined, 'bold');
          doc.text(moment(data.fecha).format('MMMM DD YYYY').toUpperCase(), 405, 192)
          doc.setFont(undefined, 'normal');
          doc.text('FECHA VENCIMIENTO: ', 317, 207)
          doc.setFont(undefined, 'bold');
          doc.text(moment(data.fechaVencimiento).format('MMMM DD YYYY').toUpperCase(), 405, 207)
          // Fin de fecha de reporte
  
          // Comienzo tipo negocación
          doc.setFont(undefined, 'normal');
          doc.text('TIPO DE NEGOCIACIÓN: ', 317, 222)
          doc.setFont(undefined, 'bold');
          doc.text(data.formaPago.nombre, 405, 222)
          // Fin tipo negocación
  
  
  
  
          doc.roundedRect(15, 550, 580, 195, 3, 3);
  
  
          // imagen de la nota
          // doc.addImage(dataImgNote, 'PNG', 295, 588,8, 8);
  
          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255);
          // RECTANGULO DEL TOTAL
          // doc.roundedRect(40, 610, 530, 70, 3, 3);
  
          //LINEAS HORIZONTALES DE LOS TOTALES
          doc.line(400, 607, 595, 607, 's')
          doc.line(400, 622, 595, 622, 's')
          doc.line(400, 637, 595, 637, 's')
          doc.line(400, 652, 595, 652, 's')
          doc.line(400, 667, 595, 667, 's')
          // doc.line(400, 682, 595, 682, 's')
          // doc.line(400, 670, 595, 670, 's')
          // doc.line(400, 680, 595, 680, 's')
  
          // LINEAS VERTICALES DE LOS TOTALES
          doc.line(400, 590, 400, 667, 's')
          doc.line(485, 590, 485, 667, 's')
  
          // TEXO DE LOS TOTALES
          doc.setFont(undefined, 'bold');
          doc.setFontSize(9)
          doc.text("Subtotal:", 402, 605)
          doc.text("Descuento:", 402, 620)
          doc.text("IVA:", 402, 635)
          doc.text("RETENCIONES:", 402, 650)
          doc.text("TOTAL FACTURA:", 402, 665)
      
  
          // totales en numeros
          doc.setFont(undefined, 'normal');
          doc.setFontSize(9)
          doc.text(this.cp.transform(data.subtotal), 590, 605, "right")
          doc.text(this.cp.transform(data.descuento), 590, 620, "right")
          doc.text(this.cp.transform(data.valorIva), 590, 635, "right")
          doc.text(this.cp.transform(data.valorReteFuente), 590, 650, "right")
          doc.setFont(undefined, 'bold');
          doc.setFontSize(10)
          doc.text(this.cp.transform(data.valor), 590, 664, "right")
        
  
  
  
          // NOTAS 
          doc.setFont(undefined, 'bold');
          doc.setFontSize(7)
          doc.text("NOTAS:", 25, 610)
          doc.text("       \tSOLO SE ACEPTAN RECLAMOS DURANTE LAS 36 HORAS SIGUIENTES AL RECIBO DE ESTA MERCANCÍA - PRODUCTOS REFRIGERADOS NO SE ACEPTA DEVOLUCIÓN.", 25, 610,{maxWidth: 385})
  
  
  
          // LINEA DIVISORA DE NOTAS 
          doc.line(15, 622, 400, 622, 's')
  
          // TEXTO DEBAJO DE LA LINEA DIVISORA DE NOTAS
          doc.text("Declaro haber recibido real y materialmente las mercancía antes descritas y por lo tanto aceptamos y nos obligamos a pagar el valor total de la misma a SUMIPROD DE LA COSTA  S.A.S. en las fechas indicadas arriba.", 25, 630,{maxWidth: 385})
          doc.setFontSize(6)
          doc.text("Esta factura de venta se asimila en todos sus efectos legales a la letra de cambio según articulo 774 del codigo de comercio", 25, 647,{maxWidth: 385})
          doc.setFontSize(7)
          // LINEA DIVISORA DE OBSERVACIONES 
          doc.line(15, 652, 400, 652, 's')

          // MODULO DE RETENCIONES FACTURACIÓN ELECTRONICA 
          
          if(data.retenciones.length > 0){

         
            doc.setFillColor("#41B6FF");
            doc.rect(30,660,270,15,'FD');
            doc.rect(30,675,270,15);

          

            doc.setFontSize(9)
            doc.setTextColor("#FFF");
            doc.text("RETENCIÓNES", 165, 671,{align:'center'})


            doc.setFontSize(8)
            
            doc.setTextColor("#000");
            doc.text("RETENCIÓN", 75, 686,{align:'center'})
            doc.text("BASE", 160, 686,{align:'center'})
            doc.text("%", 210, 686,{align:'center'})
            doc.text("TOTAL", 260, 686,{align:'center'})


            doc.line(120,675,120,675+15);
            doc.line(200,675,200,675+15);
            doc.line(220,675,220,675+15);

    
            let startY = 675;
            let startYText = 686;
            doc.setTextColor("#1E1D1D");
            for(let x of data.retenciones){
              startY+=15
              startYText +=15;

              doc.rect(30,startY,270,15);
              doc.line(120,startY,120,startY+15);
              doc.line(200,startY,200,startY+15);
              doc.line(220,startY,220,startY+15);


              doc.text(x.retencion.nombre, 35, startYText)
              doc.text(this.cp.transform(x.base), 195, startYText,{align:'right'})
              doc.text(x.procentaje+"", 210, startYText,{align:'center'})
              doc.setFont(undefined, 'bold');
              doc.text(this.cp.transform(x.total), 295, startYText,{align:'right'})

            }
          }
      
          // TOTAL EN LETRAS
          doc.setFont(undefined, 'bold');
          doc.setFontSize(6)
          doc.text("SON:", 25, 750)
          doc.setFont(undefined, 'normal');
          var splitTitle2 = doc.splitTextToSize("(" + this.numeroALetras(data.valor, '') + ")", 560)
          doc.text(42, 750, splitTitle2)
  
  
          doc.setFont(undefined, 'normal');
          doc.setFontSize(7)
          doc.setFont(undefined, 'bold');
          var splitTitle = doc.splitTextToSize("A esta factura de venta aplican las normas relativas a la letra de cambio (artículo 5 Ley 1231 de 2008). Con esta el Comprador declara haber recibido real y materialmente las mercancías o prestación de servicios descritos.  ", 570);
          doc.text(25, 770, splitTitle)
  
          doc.setFont(undefined, 'bold');
          doc.setFontSize(8)
      
         
        },
  
        
        theme: 'grid',
        headStyles: {
          fillColor: '#41B6FF',
  
  
  
        },
        columnStyles: {
          0: { halign: 'center' },
          2: { halign: 'center' },
          3: { halign: 'center' },
          4: { halign: 'right' },
          5: { halign: 'right' },
          6: { halign: 'right' },
          7: { halign: 'right' },
          8: { halign: 'right' },
        },
        styles: {
          fontSize: 7,
          fontStyle: 'bold',
         
        },
        bodyStyles: {
         
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
  
        doc.setFontSize(8);
        // Go to page i
        doc.setPage(i);
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text('Pagina ' + String(i) + ' De ' + String(pageCount), 593, 141,"right"); //data.settings.margin.left if you want it on the left
      }
  
  
  
      return doc;
  
  
  }








    Unidades(num){

        switch(num)
        {
            case 1: return 'UN';
            case 2: return 'DOS';
            case 3: return 'TRES';
            case 4: return 'CUATRO';
            case 5: return 'CINCO';
            case 6: return 'SEIS';
            case 7: return 'SIETE';
            case 8: return 'OCHO';
            case 9: return 'NUEVE';
        }
      
        return '';
      }//Unidades()
      
      Decenas(num){
      
        let decena = Math.floor(num/10);
        let unidad = num - (decena * 10);
      
        switch(decena)
        {
            case 1:
                switch(unidad)
                {
                    case 0: return 'DIEZ';
                    case 1: return 'ONCE';
                    case 2: return 'DOCE';
                    case 3: return 'TRECE';
                    case 4: return 'CATORCE';
                    case 5: return 'QUINCE';
                    default: return 'DIECI' + this.Unidades(unidad);
                }
            case 2:
                switch(unidad)
                {
                    case 0: return 'VEINTE';
                    default: return 'VEINTI' + this.Unidades(unidad);
                }
            case 3: return this.DecenasY('TREINTA', unidad);
            case 4: return this.DecenasY('CUARENTA', unidad);
            case 5: return this.DecenasY('CINCUENTA', unidad);
            case 6: return this.DecenasY('SESENTA', unidad);
            case 7: return this.DecenasY('SETENTA', unidad);
            case 8: return this.DecenasY('OCHENTA', unidad);
            case 9: return this.DecenasY('NOVENTA', unidad);
            case 0: return this.Unidades(unidad);
        }
      }//Unidades()
      
      DecenasY(strSin, numUnidades) {
        if (numUnidades > 0)
            return strSin + ' Y ' + this.Unidades(numUnidades)
      
        return strSin;
      }//DecenasY()
      
      Centenas(num) {
        let centenas = Math.floor(num / 100);
        let decenas = num - (centenas * 100);
      
        switch(centenas)
        {
            case 1:
                if (decenas > 0)
                    return 'CIENTO ' + this.Decenas(decenas);
                return 'CIEN';
            case 2: return 'DOSCIENTOS ' + this.Decenas(decenas);
            case 3: return 'TRESCIENTOS ' + this.Decenas(decenas);
            case 4: return 'CUATROCIENTOS ' + this.Decenas(decenas);
            case 5: return 'QUINIENTOS ' + this.Decenas(decenas);
            case 6: return 'SEISCIENTOS ' + this.Decenas(decenas);
            case 7: return 'SETECIENTOS ' + this.Decenas(decenas);
            case 8: return 'OCHOCIENTOS ' + this.Decenas(decenas);
            case 9: return 'NOVECIENTOS ' + this.Decenas(decenas);
        }
      
        return this.Decenas(decenas);
      }//Centenas()
      
      Seccion(num, divisor, strSingular, strPlural) {
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)
      
        let letras = '';
      
        if (cientos > 0)
            if (cientos > 1)
                letras = this.Centenas(cientos) + ' ' + strPlural;
            else
                letras = strSingular;
      
        if (resto > 0)
            letras += '';
      
        return letras;
      }//Seccion()
      
      Miles(num) {
        let divisor = 1000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)
      
        let strMiles = this.Seccion(num, divisor, 'UN MIL', 'MIL');
        let strCentenas = this.Centenas(resto);
      
        if(strMiles == '')
            return strCentenas;
      
        return strMiles + ' ' + strCentenas;
      }//Miles()
      
      Millones(num) {
        let divisor = 1000000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)
      
        let strMillones = this.Seccion(num, divisor, 'UN MILLON', 'MILLONES');
        let strMiles = this.Miles(resto);
      
        if(strMillones == '')
            return strMiles;
      
        return strMillones + ' ' + strMiles;
      }//Millones()
      
      numeroALetras(num, currency) {
        currency = currency || {};
        let data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: '',
            letrasMonedaPlural: currency.plural || 'PESOS COLOMBIANOS',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
            letrasMonedaSingular: currency.singular || 'PESO COLOMBIANO', //'PESO', 'Dólar', 'Bolivar', 'etc'
            letrasMonedaCentavoPlural: currency.centPlural || 'CENTAVOS',
            letrasMonedaCentavoSingular: currency.centSingular || 'CENTAVO'
        };
      
        if (data.centavos > 0) {
            let centavos = ''
            if (data.centavos == 1)
                centavos = this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
            else
                centavos =  this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
            data.letrasCentavos = 'CON ' + centavos
        };
      
        if(data.enteros == 0)
            return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
        if (data.enteros == 1)
            return this.Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
        else
            return this.Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
      };

}

