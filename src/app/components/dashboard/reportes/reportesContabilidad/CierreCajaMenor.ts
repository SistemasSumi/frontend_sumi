import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';
import { range } from 'rxjs';
import { NumeroALetrasPipe } from 'src/app/pipes/NumeroALetras.pipe';
import { AcortarTextPipe } from 'src/app/pipes/acortarText.pipe';

export class CierreCajaMenor {
    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    private NL:NumeroALetrasPipe = new NumeroALetrasPipe();
    private AT:AcortarTextPipe = new AcortarTextPipe();


    constructor(){}
    

    public ReporteCierreCajaMenor(data:any){
        let doc = new jsPDF('p', 'pt', 'letter');
        // console.log(data)
        let currentPage = 0;
        let startY     = 156;
        let startYText = 168;
        for(let x of clientes){
            // console.log(x)
            let facturas = x.facturas;


            if(startY == 136){
                // this.setEncabezado(doc);
            }
       
            

            doc.setDrawColor('#000000');
            
       

            startY+=18;
            startYText+=18
            this.setEncabezadoTabla(doc,startY,startYText);
            
           
            // doc.text("FORMA DE PAGO:", 375, startYText);
           
            doc.setDrawColor('#000000');
            startY+=18
            startYText+=18

            doc.rect(15,startY,581,18);
            doc.line(90,startY,90,startY+18);

            doc.line(160,startY,160,startY+18);
            doc.line(230,startY,230,startY+18);
          


            doc.setTextColor("#000");

            doc.setFontSize(8);
            doc.setFont(undefined,'bold');

            doc.text(data.numero_str,52.5, startYText,{align:"center"});
            doc.text(data.fecha,125, startYText,{align:"center"});
            doc.text(this.cp.transform(data.valor),227, startYText,{align:"right"});
            doc.text(data.tercero.nombreComercial,233, startYText,{align:"left"});

            startY+=18
            startYText+=18

            doc.rect(15,startY,581,18);
            doc.setFillColor("#41B6FF");

            doc.rect(15,startY,75,18,'FD');

            doc.line(90,startY,90,startY+18);

            // doc.line(160,startY,160,startY+18);
            // doc.line(230,startY,230,startY+18);
            // doc.line(300,startY,300,startY+18);
            // doc.line(335,startY,335,startY+18);
            // doc.line(405,startY,405,startY+18);


            doc.setTextColor("#FFF");

            doc.setFontSize(8);
            doc.setFont(undefined,'bold');

            doc.text("CONCEPTO",52.5, startYText,{align:"center"});
            doc.setTextColor("#000");
            doc.setFontSize(7);
            doc.text(this.AT.transform(data.concepto,"119"),92, startYText,{align:"left"});
            doc.setFontSize(8);
            doc.setTextColor("#000");
            

            
           
            let finalY = startY+18;
            doc.setFillColor("#F7F4F4");
            doc.rect(15,finalY,581,18,'FD');
            doc.setFontSize(8);
            doc.setFont(undefined,'bold');
            doc.text("SON: ",19, finalY+12);
            doc.text(this.NL.transform(data.valor), 40, finalY+12);
            

            
           

            startY+=28
            startYText+= 28;

            // console.log("Final:"+ finalY);

            if(finalY >= 700){
                doc.addPage();
                startY = 156;
                startYText = 168;
            }
            
            
        }

       
        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        // For each page, print the page number and the total pages
        for (let i = 1; i <= pageCount; i++) {
    
         
    
            doc.setFontSize(8);
           
            doc.setPage(i);
            var pageSize = doc.internal.pageSize;
            var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 530, 169,{
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
                   doc.text('CIERRE CONTABLE CAJA MENOR', 307, 105, { align: "center" })
       
                
                    // Movimiento #
                   doc.setFontSize(10)
                   doc.text('CAJA N°.', 495, 55, { align: "center" })
                   doc.setFont(undefined, 'normal')
                   doc.text(data.caja.numero_str, 495, 70, { align: "center" })
                   doc.setFontSize(7)

                    doc.setFillColor("#41B6FF");
                    doc.rect(155.5,115,285,18,'FD');

                    doc.line(230.5,115,230.5,115+18);
                    doc.line(300.5,115,300.5,115+18);
                    doc.line(370.5,115,370.5,115+18);
                    doc.line(440.5,115,440.5,115+18);
                  

                    doc.setTextColor("#FFF");

                    doc.setFontSize(8);
                    doc.setFont(undefined,'bold');
                    doc.text("FECHA INICIO",193, 127,{align:"center"});
                    doc.text("SALDO INICIAL",265.5, 127,{align:"center"});
                    doc.text("TOTAL GASTOS",335.5, 127,{align:"center"});
                    doc.text("FECHA CIERRE",405.5, 127,{align:"center"});
                    doc.setTextColor("#000");

                    doc.rect(155.5,133,285,18);

                    doc.line(230.5,133,230.5,133+18);
                    doc.line(300.5,133,300.5,133+18);
                    doc.line(370.5,133,370.5,133+18);
                    doc.line(440.5,133,440.5,133+18);

                    doc.setFont(undefined,'bold');
                    doc.text(data.caja.fecha_apertura,193, 145,{align:"center"});
                    doc.text(this.cp.transform(data.caja.saldo_inicial),265.5, 145,{align:"center"});
                    doc.text(this.cp.transform(data.caja.total_gastos) || "0.00",335.5, 145,{align:"center"});
                    doc.text(data.caja.fecha_cierre || "01/0/2023",405.5, 145,{align:"center"});
    }

   

    setEncabezadoTabla(doc:jsPDF, startY:number, startYText:number){
        doc.setFillColor("#41B6FF");
        doc.rect(15,startY,581,18,'FD');

        doc.line(90,startY,90,startY+18);
        doc.line(160,startY,160,startY+18);
        doc.line(230,startY,230,startY+18);
        // doc.line(300,startY,300,startY+18);
        // doc.line(335,startY,335,startY+18);
        // doc.line(405,startY,405,startY+18);


        doc.setTextColor("#FFF");

        doc.setFontSize(8);
        doc.setFont(undefined,'bold');
        doc.text("PAGO N°",52.5, startYText,{align:"center"});
        doc.text("FECHA",125, startYText,{align:"center"});
        doc.text("VALOR",195, startYText,{align:"center"});
        doc.text("PAGADO A",395, startYText,{align:"center"});
        // doc.text("DIAS",317.5, startYText,{align:"center"});
        // doc.text("SALDO",370, startYText,{align:"center"});
        // doc.text("OBSERVACIÓN",493, startYText,{align:"center"});
        doc.setTextColor("#000");
    }


    setDivicionesEInformacion(doc:jsPDF, startY:number,startYText:number,factura:any){
        // console.log(startYText);
        
        doc.line(90,startY,90,startY+18);
        doc.line(160,startY,160,startY+18);
        doc.line(230,startY,230,startY+18);
        // doc.line(300,startY,300,startY+18);
        // doc.line(335,startY,335,startY+18);
        // doc.line(405,startY,405,startY+18);


        doc.setTextColor("#000");

        doc.setFontSize(8);
        doc.setFont(undefined,'bold');

        doc.text("1",52.5, startYText,{align:"center"});
        doc.text("17/05/2023",125, startYText,{align:"center"});
        doc.text("26.000.00",227, startYText,{align:"right"});
        // doc.text(factura.estado,265, startYText,{align:"center"});
        // doc.text(factura.dias+"",317.5, startYText,{align:"center"});
        // doc.text(this.cp.transform(factura.saldo),402, startYText,{align:"right"});

      
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
            }
            
        
                
        ]
