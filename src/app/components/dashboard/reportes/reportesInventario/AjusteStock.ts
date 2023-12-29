import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';
import { AcortarTextPipe } from 'src/app/pipes/acortarText.pipe';

export class AjusteStock{

    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    totalEntradas = 0;
    totalSalidas  = 0;
    constructor(){}
       
    public ReporteAjusteStock(data:any){
        let doc = new jsPDF('p', 'pt', 'letter');



        
        let detalle = []
        let p = [
          {
            content: 'AJUSTES DE ENTRADA',
            colSpan: 7,
            styles: {
              halign: 'center',
              fillColor: "#C5C6C6",
              textColor: "#fff",
              fontSize:9
            }
          },
         
      
        ]
        detalle.push(p)
        let fp = [
        {
          content: "CONCEPTO",
          styles: {
            fillColor: "#41B6FF",
            textColor: "#fff",
            halign: 'center'
          }
          },
        
          {
            content: "PRODUCTO",
            styles: {
              halign: 'left',
              fillColor: "#41B6FF",
              textColor: "#fff",
            }
          },
          {
            content: "COSTO",
            styles: {
              fillColor: "#41B6FF",
              textColor: "#fff",
              halign: 'right'
            }
          },
          {
            content: "EXISTENCIA",
            styles: {
              fillColor: "#41B6FF",
              textColor: "#fff",
              halign: 'center'
            }
          },
          {
            
            content: "CANT.",
            styles: {
              fillColor: "#41B6FF",
              textColor: "#fff",
              halign: 'center'
            }
          },
          {
            content: "TOTAL",
            styles: {
             
              fillColor: "#41B6FF",
              textColor: "#fff",
              halign: 'right'
            }
          }
          
         
      
        ]
        detalle.push(fp)
        let entradas = data.productos.filter(item => item.isEntrada == true);
        console.log("entradas",entradas);
        for (let x of entradas) {
          let p = [
            {
              content: x.tipoAjuste.nombre,
              styles: {
              
              }
            },
           
            {
              content: x.producto.codigoDeBarra +  ' - ' + x.producto.nombreymarcaunico +' L: '+ x.lote +' V:'+ x.fechaVencimiento,
              styles: {
                cellWidth: 225

              }
            },
            {
              content: this.cp.transform(x.costo),
              styles: {
              }
            },
            {
              content: x.existencia,
              styles: {
              }
            },
            {
              content: x.cantidad,
              styles: {
              }
            },
            {
              content: this.cp.transform(x.total),
              styles: {
              }
            }
          ]
          this.totalEntradas += x.total;
          detalle.push(p)
        }
        if(entradas.length == 0){
          p = [
          
            {
              content: 'SIN AJUSTES',
              colSpan: 6,
              styles: {
                halign: 'center',
                fillColor: "",
                textColor: "#C5C6C6",
                fontSize:9
              }
            }
          ]
          detalle.push(p)
        }
        p = [
          
          {
            content: 'TOTAL ENTRADAS',
            colSpan: 5,
            styles: {
              halign: 'right',
              fillColor: "#C5C6C6",
              textColor: "#fff",
              fontSize:9
            }
          },
          {
            content: this.cp.transform(this.totalEntradas),
            colSpan: 1,
            
            styles: {
              halign: 'right',
              fillColor: "#C5C6C6",
              textColor: "#fff",
              fontSize:9
            }
          },
      
        ]
        detalle.push(p)

        let M = [
          {
            content: '',
            colSpan: 7,
            styles: {
              halign: 'center',
              fillColor: "#FFF",
              textColor: "#fff",
              fontSize:9
            }
          },
         
      
        ]
        detalle.push(M)


        let foot = [
          {
            content: 'AJUSTES DE SALIDA ',
            colSpan: 7,
            styles: {
              halign: 'center',
              fillColor: "#C5C6C6",
              textColor: "#fff",
              fontSize:9
            }
          },
         
      
        ]
        detalle.push(foot)
        let fH = [
          {
            content: "CONCEPTO",
            styles: {
              fillColor: "#41B6FF",
              textColor: "#fff",
              halign: 'center'
            }
            },
          
            {
              content: "PRODUCTO",
              styles: {
                halign: 'left',
                fillColor: "#41B6FF",
                textColor: "#fff",
              }
            },
            {
              content: "COSTO",
              styles: {
                fillColor: "#41B6FF",
                textColor: "#fff",
                halign: 'right'
              }
            },
            {
              content: "EXISTENCIA",
              styles: {
                fillColor: "#41B6FF",
                textColor: "#fff",
                halign: 'center'
              }
            },
            {
              
              content: "CANT.",
              styles: {
                fillColor: "#41B6FF",
                textColor: "#fff",
                halign: 'center'
              }
            },
            {
              content: "TOTAL",
              styles: {
               
                fillColor: "#41B6FF",
                textColor: "#fff",
                halign: 'right'
              }
            }
            
           
        
          ]
        detalle.push(fH)
        let salidas = data.productos.filter(item => item.isSalida ==   true);
        for (let x of salidas) {
          let p = [
            {
              content: x.tipoAjuste.nombre,
              styles: {
              
              }
            },
           
            {
              content: x.producto.codigoDeBarra +  ' - ' + x.producto.nombreymarcaunico +' L: '+ x.lote +' V:'+ x.fechaVencimiento,
              styles: {
                cellWidth: 225

              }
            },
            {
              content: this.cp.transform(x.costo),
              styles: {
              }
            },
            {
              content: x.existencia,
              styles: {
              }
            },
            {
              content: x.cantidad,
              styles: {
              }
            },
            {
              content: this.cp.transform(x.total),
              styles: {
              }
            }
          ]
          this.totalSalidas += x.total;
          detalle.push(p)
        }
        if(salidas.length == 0){
          p = [
          
            {
              content: 'SIN AJUSTES',
              colSpan: 6,
              styles: {
                halign: 'center',
                fillColor: "",
                textColor: "#C5C6C6",
                fontSize:9
              }
            }
          ]
          detalle.push(p)
        }
        p = [
          
          {
            content: 'TOTAL SALIDAS',
            colSpan: 5,
            styles: {
              halign: 'right',
              fillColor: "#C5C6C6",
              textColor: "#fff",
              fontSize:9
            }
          },
          {
            content: this.cp.transform(this.totalSalidas),
            colSpan: 1,
            
            styles: {
              halign: 'right',
              fillColor: "#C5C6C6",
              textColor: "#fff",
              fontSize:9
            }
          },
      
        ]
        detalle.push(p)
       
        autoTable(doc, {

          showHead:'never',
          head: [
            [
           
            {
              content: "CONCEPTO",
              styles: {
                halign: 'center'
              }
            },
            
            {
              content: "PRODUCTO",
              styles: {
                halign: 'left'
              }
            },
            {
              content: "COSTO",
              styles: {
                halign: 'right'
              }
            },
            {
              content: "EXISTENCIA",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "CANT.",
              styles: {
                halign: 'center'
              }
            },
            {
              content: "TOTAL",
              styles: {
                halign: 'right'
              }
            }]
          ],
          body: detalle,
          horizontalPageBreak: true,
          margin: {
            top: 155,
            bottom: 50,
            left: 15,
            right: 15
          },
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {
      
            
    
    

           
    
          },
          theme: 'grid',
          headStyles: {
            fillColor: "#41B6FF",
            fontSize: 9
          },
          columnStyles: {
            0: { halign: 'center' },
            1: { halign: 'left' },
            2: { halign: 'right' },
            3: { halign: 'center' },
            4: { halign: 'center' },
            5: { halign: 'right' },
          
          
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
            // fillColor: '#B2B1B1',
    
          },
        });
        // For each page, print the page number and the total pages
        
    
       

        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        for (let i = 1; i <= pageCount; i++) {
          // console.log(pageCount);
          doc.setFontSize(10);
          this.setEncabezado(doc,data)
          // Go to page i
          doc.setPage(i);
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
         
          
          doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 525, 145); 
        }
        


        doc.setFontSize(12);

        if(this.totalEntradas > 0 && this.totalSalidas > 0){

          doc.text('Diferencia: ' + this.cp.transform(this.totalSalidas - this.totalEntradas), 15, doc.lastAutoTable.finalY + 20); //data.settings.margin.left if you want it on the left
        }
        
        if(this.totalSalidas == 0){
          doc.text('Diferencia: ' + this.cp.transform( this.totalEntradas), 15, doc.lastAutoTable.finalY + 20); //data.settings.margin.left if you want it on the left

        }
        if(this.totalEntradas == 0){
          doc.text('Diferencia: ' + this.cp.transform(this.totalSalidas), 15, doc.lastAutoTable.finalY + 20); //data.settings.margin.left if you want it on the left

        }
    
        // doc.line(15, doc.lastAutoTable.finalY + 10, 595, doc.lastAutoTable.finalY + 10)
        // doc.setFont(undefined, 'normal')
        doc.setFontSize(9)
        doc.text('Observaciones: '+data.observacion, 15, doc.lastAutoTable.finalY + 50,{"maxWidth":520})
        return doc


    }
    

    setEncabezado(doc,data){
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
      doc.text("Ajuste No.", 473, 45, "center")
      doc.text("Fecha", 549, 45, "center")
      doc.setFont(undefined, 'normal')
      doc.text(data.numero, 473, 75, "center")
      doc.text(moment(data.fecha).format("DD/MM/YYYY"), 549, 75, "center")
      doc.line(510, 25, 510, 85)

      //Titulo
      doc.setFont(undefined, 'bold')
      doc.setFontSize(14)
      doc.text('AJUSTE DE INVENTARIO', 307, 125, { align: "center" })
      doc.setFont(undefined, 'normal')
      doc.setFontSize(9)

      doc.text('Impreso:', 15, 145)
      doc.text(moment(new Date()).format("DD/MM/YYYY h:mm:ss a"), 50, 145)
      const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
      doc.setFont(undefined, 'bold')
    }

}
