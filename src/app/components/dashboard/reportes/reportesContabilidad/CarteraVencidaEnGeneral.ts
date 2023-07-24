import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';

export class CarteraVencidaEnGeneral {
    private cp:CurrencyPipe = new CurrencyPipe('en-US');

    constructor(){}
    

    public ReporteCarteraVencidaEnGeneral(data:any){
        let doc = new jsPDF('p', 'pt', 'letter');
        console.log(data)
        let currentPage = 0;
        let startY     = 116;
        let startYText = 128;
        for(let x of data){
            console.log(x)
            let facturas = x.facturas;


            if(startY == 116){
                // this.setEncabezado(doc);
            }
       
            

            doc.setDrawColor('#000000');
            
            this.setEncabezadoCliente(doc,startY,startYText,x.cliente,x.formaPago);

            startY+=18;
            startYText+=18
            this.setEncabezadoTabla(doc,startY,startYText);
            
           
            // doc.text("FORMA DE PAGO:", 375, startYText);
           
            doc.setDrawColor('#000000');
            for (let j of facturas) {
                startY+=18
                startYText+=18
   
                if(startY >= 711){
                    doc.addPage();
                    startY     = 116;
                    startYText = 128;
                
                    this.setEncabezadoCliente(doc,startY,startYText,x.cliente,x.formaPago);
                    startY+=18;
                    startYText+=18
                    this.setEncabezadoTabla(doc,startY,startYText);
                    startY+=18;
                    startYText+=18
                    
                }
                doc.rect(15,startY,581,18);
                this.setDivicionesEInformacion(doc,startY,startYText,j);
            }
           
            let finalY = startY+18;
            doc.setFillColor("#CECECE");
            doc.rect(15,finalY,581,18,'FD');
            doc.setFontSize(8);
            doc.setFont(undefined,'bold');
            doc.text("N° Facturas:",19, finalY+12);
            doc.text(x.total_facturas+"", 67, finalY+12);
            doc.text(this.cp.transform(x.saldo),402,finalY+12,{align:'right'});

            startY+=56
            startYText+= 56;

            console.log("Final:"+ finalY);

            if(finalY >= 711){
                doc.addPage();
                startY = 116;
                startYText = 128;
            }
            
            
        }

       
        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        // For each page, print the page number and the total pages
        for (let i = 1; i <= pageCount; i++) {
    
         
    
            doc.setFontSize(8);
           
            doc.setPage(i);
            var pageSize = doc.internal.pageSize;
            var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 530, 111,{
                align:'left'
            }); 
            this.setEncabezado(doc);
        }


           
            
           

        
           

        return doc;
    }


    setEncabezado(doc:jsPDF){
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
                   doc.text('CARTERA VENCIDA EN GENERAL', 307, 105, { align: "center" })
       
                
       
                  
    }

    setEncabezadoCliente(doc:jsPDF, startY:number, startYText:number, nombre:string,formaPago:string){
        console.log(nombre)
        doc.rect(15,startY,581,18);

        doc.setFontSize(8);
        doc.setFont(undefined,'bold');
        doc.text("CLIENTE:",17, startYText);
        doc.text(nombre, 56, startYText);
        doc.text("FORMA DE PAGO:", 445, startYText);
        doc.text(formaPago.toUpperCase(), 519, startYText);
    }

    setEncabezadoTabla(doc:jsPDF, startY:number, startYText:number){
        doc.setFillColor("#41B6FF");
        doc.rect(15,startY,581,18,'FD');

        doc.line(90,startY,90,startY+18);
        doc.line(160,startY,160,startY+18);
        doc.line(230,startY,230,startY+18);
        doc.line(300,startY,300,startY+18);
        doc.line(335,startY,335,startY+18);
        doc.line(405,startY,405,startY+18);


        doc.setTextColor("#FFF");

        doc.setFontSize(8);
        doc.setFont(undefined,'bold');
        doc.text("N° FACTURA",52.5, startYText,{align:"center"});
        doc.text("FECHA",125, startYText,{align:"center"});
        doc.text("VENCE",195, startYText,{align:"center"});
        doc.text("ESTADO",265, startYText,{align:"center"});
        doc.text("DIAS",317.5, startYText,{align:"center"});
        doc.text("SALDO",370, startYText,{align:"center"});
        doc.text("OBSERVACIÓN",493, startYText,{align:"center"});
        doc.setTextColor("#000");
    }


    setDivicionesEInformacion(doc:jsPDF, startY:number,startYText:number,factura:any){
        console.log(startYText);
        
        doc.line(90,startY,90,startY+18);
        doc.line(160,startY,160,startY+18);
        doc.line(230,startY,230,startY+18);
        doc.line(300,startY,300,startY+18);
        doc.line(335,startY,335,startY+18);
        doc.line(405,startY,405,startY+18);


        doc.setTextColor("#000");

        doc.setFontSize(8);
        doc.setFont(undefined,'bold');

        doc.text(factura.factura,52.5, startYText,{align:"center"});
        doc.text(factura.fecha,125, startYText,{align:"center"});
        doc.text(factura.fechaVencimiento,195, startYText,{align:"center"});
        doc.text(factura.estado,265, startYText,{align:"center"});
        doc.text(factura.dias+"",317.5, startYText,{align:"center"});
        doc.text(this.cp.transform(factura.saldo),402, startYText,{align:"right"});

      
    }

}


        var  clientes = [
            {
                nombre   : "ARMONIA MEDICAL S.A.S",
                formaPago: "Credito 30 Dias",
                noFacturas: "7",
                total: 7000000,
                facturas:[
           
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            }
        ]
            },   
            {
                nombre   : "DISFARMA S.A.S",
                formaPago: "Credito 30 Dias",
                noFacturas: "7",
                total: 7000000,
                facturas:[
           
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            }
        ]
            },   
            {
                nombre   : "SUMIPROD DE LA COSTA S.A.S",
                formaPago: "Credito 30 Dias",
                noFacturas: "7",
                total: 7000000,
                facturas:[
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
        
          
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
            {
                noFactura:"SUM-00012",
                fecha:"01/11/2022",
                vence:"01/11/2022",
                estado:"vencida",
                dias:"12",
                saldo:11014.88,
                Observacion:""
            },
        
        ]
    },   
]
