import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';
import { range } from 'rxjs';
import { NumeroALetrasPipe } from 'src/app/pipes/NumeroALetras.pipe';
import { AcortarTextPipe } from 'src/app/pipes/acortarText.pipe';

export class ConciliacionBancos {
    private cp:CurrencyPipe = new CurrencyPipe('en-US');
    private NL:NumeroALetrasPipe = new NumeroALetrasPipe();
    private AT:AcortarTextPipe = new AcortarTextPipe();


    constructor(){}
    

    public ReporteConciliacion(data:any){
        let doc = new jsPDF('p', 'pt', 'letter');
        let currentPage = 0;
        let startY     = 156;
        let startYText = 168;
       
       
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
                   doc.text('CONCILIACIÓN BANCARIA', 307, 105, { align: "center" })
       
                
                    // Movimiento #
                   doc.setFontSize(10)
                   doc.text('CONCILIACIÓN N°.', 495, 55, { align: "center" })
                   doc.setFont(undefined, 'normal')
                   doc.text("0001", 495, 70, { align: "center" })
                   doc.setFontSize(7)

                    doc.setFillColor("#41B6FF");
                    doc.rect(20, 80, 500, 18, 'FD');
                    doc.line(230.5, 115, 230.5, 115 + 18);
                    doc.line(300.5, 115, 300.5, 115 + 18);
                    doc.line(370.5, 115, 370.5, 115 + 18);
                    doc.line(440.5, 115, 440.5, 115 + 18);

                    doc.setTextColor("#FFF");
                    doc.setFontSize(8);
                    doc.setFont(undefined, 'bold');
                    doc.text("FECHA INICIO", 50.5, 127, { align: "center" });
                    doc.text("SALDO INICIAL", 235.5, 127, { align: "center" });
                    doc.text("BANCO", 300.5, 127, { align: "center" });
                    doc.text("FECHA CIERRE", 370.5, 127, { align: "center" });
                    doc.text("SALDO FINAL", 440.5, 127, { align: "center" });

                    doc.setTextColor("#000");

                    doc.rect(20, 133, 500, 18);

                    doc.line(230.5, 133, 230.5, 133 + 18);
                    doc.line(300.5, 133, 300.5, 133 + 18);
                    doc.line(370.5, 133, 370.5, 133 + 18);
                    doc.line(440.5, 133, 440.5, 133 + 18);

                    doc.setFont(undefined, 'bold');
                    doc.text("01/01/2023", 125.5, 145, { align: "center" });
                    doc.text("00000", 235.5, 145, { align: "center" });
                    doc.text("BANCOLOMBIA" || "0.00", 300.5, 145, { align: "center" });
                    doc.text("09/09/2023 " || "01/0/2023", 370.5, 145, { align: "center" });
                    doc.text("12345", 440.5, 145, { align: "center" });
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
