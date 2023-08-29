import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';

export class RetencionEnLaFuenteGeneral {
    private cp:CurrencyPipe = new CurrencyPipe('en-US');

    constructor(){}
    

    public ReporteRetencionEnLaFuenteGeneral(data:any){
        let doc = new jsPDF('p', 'pt', 'letter');

        let currentPage = 0;
        let startY     = 146;
        let startYText = 158;
        // console.log(data.resultados)

        for(let x of data.resultados.retenciones){
            // console.log(x)
            let facturas = x.detalle;


            if(startY == 146){
                // this.setEncabezado(doc);
            }
       
            

            doc.setDrawColor('#000000');
            
            this.setEncabezadoCliente(doc,startY,startYText,x.nombre,'hola');

            startY+=18;
            startYText+=18
            this.setEncabezadoTabla(doc,startY,startYText);
            
           
            // doc.text("FORMA DE PAGO:", 375, startYText);
           
            doc.setDrawColor('#000000');
            let index = 0,base = 0,rtf = 0;
            
            for (let j of facturas) {
                index++;
                startY+=18
                startYText+=18
   
                if(startY >= 711){
                    doc.addPage();
                    startY     = 146;
                    startYText = 158;
                
                    this.setEncabezadoCliente(doc,startY,startYText,x.nombre,x.formaPago);
                    startY+=18;
                    startYText+=18
                    this.setEncabezadoTabla(doc,startY,startYText);
                    startY+=18;
                    startYText+=18
                    
                }
                doc.rect(15,startY,581,18);
                this.setDivicionesEInformacion(doc,startY,startYText,index,j);

                base += j.base;
                rtf += j.retencion;
            }
           
            let finalY = startY+18;
            doc.setFillColor("#CECECE");
            doc.rect(15,finalY,581,18,'FD');
            
            // doc.line(38,finalY,38,finalY+18);
            doc.line(330,finalY,330,finalY+18);
        
            
            doc.line(450,finalY,450,finalY+18);
            doc.line(475,finalY,475,finalY+18);

            
            doc.setFontSize(9);
            doc.setFont(undefined,'bold');
            doc.text("TOTAL",19, finalY+12);
            



            doc.text(this.cp.transform(base),447,finalY+12,{align:'right'});
            doc.text(this.cp.transform(rtf),590, finalY+12,{align:"right"});


            startY+=56
            startYText+= 56;

            // console.log("Final:"+ finalY);

            if(finalY >= 711){
                doc.addPage();
                startY = 146;
                startYText = 158;
            }
            
            
        }


        let finalYY = startY+18;
            doc.setFillColor("#41B6FF");
            doc.rect(15,finalYY,581,18,'FD');
            
            // doc.line(38,finalY,38,finalY+18);
            doc.line(330,finalYY,330,finalYY+18);
        
            
            doc.line(450,finalYY,450,finalYY+18);
            doc.line(475,finalYY,475,finalYY+18);

            
            doc.setFontSize(9);
            doc.setFont(undefined,'bold');
            doc.setTextColor("#FFF");
            doc.text("TOTAL A PRESENTAR",19, finalYY+12);
            



            doc.text(this.cp.transform(data.total_bases),447,finalYY+12,{align:'right'});
            doc.text(this.cp.transform(data.total_retenciones),590, finalYY+12,{align:"right"});
            doc.setTextColor("#000");

            startY+=56
            startYText+= 56;

            // console.log("Final:"+ finalYY);

            if(finalYY >= 711){
                doc.addPage();
                startY = 146;
                startYText = 158;
            }

            
        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        // For each page, print the page number and the total pages
        for (let i = 1; i <= pageCount; i++) {
    
         
    
            doc.setFontSize(8);
           
            doc.setPage(i);
            var pageSize = doc.internal.pageSize;
            var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 530, 141,{
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
                   doc.text('INFORME DE RETENCIÓN EN LA FUENTE', 307, 105, { align: "center" })
                   doc.setFontSize(9) 
                   doc.text('DE:  '+moment(data.fecha_inicio).format("DD/MM/YYYY")+' HASTA: '+ moment(data.fecha_final).format("DD/MM/YYYY"), 307, 125, { align: "center" })
                
       
                  
    }

    setEncabezadoCliente(doc:jsPDF, startY:number, startYText:number, nombre:string,formaPago:string){
        doc.rect(15,startY,581,18);

        doc.setFontSize(8);
        doc.setFont(undefined,'bold');
        doc.text(nombre,17, startYText);
       
    }

    setEncabezadoTabla(doc:jsPDF, startY:number, startYText:number){
        doc.setFillColor("#41B6FF");
        doc.rect(15,startY,581,18,'FD');

        doc.line(38,startY,38,startY+18);
        doc.line(330,startY,330,startY+18);
       
        
        doc.line(450,startY,450,startY+18);
        doc.line(475,startY,475,startY+18);


        doc.setTextColor("#FFF");

        doc.setFontSize(8);
        doc.setFont(undefined,'bold');
        doc.text("#",26.25, startYText,{align:"center"});
        doc.text("TERCERO",169, startYText,{align:"center"});
       
     
        doc.text("BASE",390, startYText,{align:"center"});
        doc.text("%",462.5, startYText,{align:"center"});
        doc.text("VALOR RETENIDO",538, startYText,{align:"center"});
        doc.setTextColor("#000");
    }


    setDivicionesEInformacion(doc:jsPDF, startY:number,startYText:number,index:number,rtf:any){
        // console.log(startYText);
        
        doc.line(38,startY,38,startY+18);
        doc.line(330,startY,330,startY+18);
       
        
        doc.line(450,startY,450,startY+18);
        doc.line(475,startY,475,startY+18);


        doc.setTextColor("#000");

        doc.setFontSize(8);
        doc.setFont(undefined,'bold');

        doc.text(index+'',26.25, startYText,{align:"center"});
        doc.setFont(undefined,'normal');
        doc.text(rtf.tercero,40, startYText,{align:"left"});
        doc.setFont(undefined,'bold');
        doc.text(this.cp.transform(rtf.base),447, startYText,{align:"right"});
        doc.text(Number((rtf.retencion/rtf.base*100).toFixed(1))+'%',462.5, startYText,{align:"center"});
        doc.text(this.cp.transform(rtf.retencion),590, startYText,{align:"right"});
    

      
    }

}


