import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';


export class ReporteNomina{
    private cp:CurrencyPipe = new CurrencyPipe('en-US');

    constructor(){}
  
    public NuevoReporteNomina(){
        const doc = new jsPDF('l', 'pt', 'letter');

      
        doc.setProperties({
            title: 'REPORTE DE NOMINA - '+moment(new Date()).format("DD/MM/YYYY"),
            subject: 'REPORTE DE NOMINA'+' - '+moment(new Date()).format("DD/MM/YYYY"),		
            author: 'Sarp Soft Nube',
            keywords: '',
            creator: 'Sarp Soft'
        });
        let facturas = [];
        for (let i =0; i<=13; i++) {
          let f = [{
            content: i+1,
            styles: {
             
            }
          },
          {
            content: `MARIA ALEJANDRA HERNANDEZ GUERRERO`,
            styles: {
            
            }
          },
          {
            content: `1082965162`,
            styles: {
    
            }
          },
          {
            content: 'COORDINADOR DE VENTAS',
            styles: {
    
            }
          },
          {
            content:  30,
            styles: {
            }
          },
          {
            content:  0,
            styles: {
            }
          },
          {
            content:  0,
            styles: {
            }
          },
          {
            content: this.cp.transform(351878) ,
            styles: {
            }
          },
          {
            content: this.cp.transform(28121),
          
          },
          {
            content: this.cp.transform(0),
          
          },
          {
            content: this.cp.transform(0),
          },
          {
            content:  this.cp.transform(380000),
            styles: {
            }
          },
          {
            content:  this.cp.transform(30400),
            styles: {
            }
          },
          {
            content:  this.cp.transform(0),
            styles: {
            }
          },
          {
            content:  this.cp.transform(100000),
            styles: {
            }
          },
          {
            content:  this.cp.transform(249600),
            styles: {
            }
          }
          ]
    
          facturas.push(f);
        }
        let totalpage = 1
        autoTable(doc, {
          head: [
            [{
              content: 'ITEM',
              styles: {
                
                halign: 'center'
              }
    
            },
            {
              content: 'NOMBRE DEL EMPLEADO',
              styles: {
                halign: 'center'
              }
    
            }, {
              content: 'CEDULA',
              styles: {
                halign: 'center'
              }
    
            },
            {
              content: 'CARGO',
              styles: {
                halign: 'center'
              }
    
            },
            {
              content: 'DIAS',
              colSpan: 3,
              styles: {
                halign: 'center'
                
              }
    
            },
            
        
            
            {
              content: 'BASICO',
              styles: {
                halign: 'center'
              }
    
            }, {
              content: 'AUXILIO',
              styles: {
                halign: 'center'
              }
    
            }, {
              content: 'RODAMIENTO',
              styles: {
                halign: 'center'
              }
    
            }, {
              content: 'P. EXTRA',
              styles: {
                halign: 'center'
              }
            },
            {
                content: 'DEVENGADO',
                styles: {
                  halign: 'center'
                }
            },
            {
                content: 'D. SALUD D. PENSION',
                styles: {
                  halign: 'center'
                }
            },
            {
                content: 'DESCUENTO',
                styles: {
                  halign: 'center'
                }
            },
            {
                content: 'ANTICIPO',
                styles: {
                  halign: 'center'
                }
            },
            {
                content: 'NETO PAGO',
                styles: {
                  halign: 'center'
                }
            },
           
            
            ],
            
           
            [
                { content: '', styles: { halign: 'center' },colSpan:4 },
                // { content: '', styles: { halign: 'center' } },
                // { content: '', styles: { halign: 'center' } },
                // { content: '', styles: { halign: 'center' } },
                
                // Subcolumnas de "DÍAS" que aparecerán dentro de la columna "DÍAS"
                { content: 'LAB',  styles: { halign: 'center', cellWidth:22,  } },
                { content: 'INC', styles: { halign: 'center',cellWidth:22, } },
                { content: 'VAC', styles: { halign: 'center',cellWidth:22, } },

                { content: '', styles: { halign: 'center' },colSpan:9 },

                
                // Se añaden celdas vacías para compensar el colSpan de "DÍAS"
                
              ],],
          body: facturas,
          horizontalPageBreak: false,
          
    
          margin: {
            top: 150,
            bottom: 65,
            left: 15,
            right: 15,
    
          },
          // metodo que se repite en cad pagina
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {

            // const firstRowPosY = 170; // Ajusta esto según la posición de tu primera fila
            //     const lineWidth = 0.1; // Ajusta esto según el grosor de la línea
            //     jsPDF.setDrawColor('#000000'); // Ajusta esto según el color que desees
            //     jsPDF.setLineWidth(lineWidth);
            //     jsPDF.line(15, firstRowPosY, 777, firstRowPosY);
            // totalpage++;

            // imagen logo empresa
            doc.addImage(logoSumi, 'PNG', 20, 20,150, 80 )

            // elaborado
            doc.setFontSize(6)
            doc.setFont(undefined, 'bold')
            doc.text("Elaborado, impreso y enviado por SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 10, 433   ,{ angle:90})



            // solucion propia
            doc.setFontSize(7)
            doc.setFont(undefined, 'bold')
            doc.text("© Sarp Soft Nube (Software propio) - SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 396, 600,{ align: "center" })



            // Datos de la Empresa
            doc.setFontSize(13);
            doc.setFont(undefined, 'bold');
            doc.text('SUMIPROD DE LA COSTA S.A.S.', 396, 30, { align: "center" });
            doc.setFontSize(7);
            
            doc.setFont(undefined, 'normal');
            doc.text('NIT: 901648084-9', 396, 42, { align: "center" });
            doc.text('Régimen: Responsable de IVA', 396, 52, { align: "center" });
            doc.text('Persona Judírica', 396, 62, { align: "center" });
            doc.text('Calle 44B #21G-11 Urb Santa Cruz, Santa Marta', 396, 72, { align: "center" });
            doc.text('Tel. (5) 432-7722 - Cel: (301) 302-2986', 396, 82, { align: "center" });
            doc.text('Email. sumiprodelacosta@gmail.com', 396, 92, { align: "center" });
            

            doc.setFont(undefined, 'bold');
            doc.setFontSize(8);
            doc.text('FECHA', 707, 38, { align: "center" });
            doc.setFont(undefined, 'normal');
            doc.setFontSize(8);
            doc.text(moment(new Date()).format("DD/MM/YYYY"), 707, 53, { align: "center" });
            
            


            // Titulo
            doc.setFont(undefined, 'bold');
            doc.setFontSize(12);
            doc.text('NOMINA PERIODO DE PAGO '+moment('31/01/2024').format("DD MMMM YYYY").toUpperCase(), 396, 117, { align: "center" });
            
            
    
            
    
            // doc.setDrawColor('#000000');
            // doc.line(15, 128, 777, 128,);
    
            // doc.setFontSize(9);
            // // Cuenta y Saldo
            // doc.text("Referencia:",15, 143);
            // doc.text("data.documento", 65, 143);
            // doc.text("Cliente:",130,143)
            // doc.text("data.cliente",170,143)
            // doc.text("Forma de pago:",550,143)
            // doc.text("data.formaPago",620,143)
  
            
    
          },
          foot: [
            // ['', '','','', { content: this.cp.transform(1000), styles: {  halign: 'right' } }, { content: this.cp.transform(1000), styles: {  halign: 'right' } }
            // , { content: this.cp.transform(1000), styles: {  halign: 'right' } }, { content: this.cp.transform(1000), styles: {  halign: 'right' } }
            // , { content: this.cp.transform(1000), styles: {  halign: 'right' } }, { content: this.cp.transform(1000), styles: {  halign: 'right' } }
            // , { content: this.cp.transform(1000), styles: {  halign: 'right' } }]
    
    
          ],
    
          theme: 'grid',
          headStyles: {
            fontSize: 6,
            // lineWidth:0.1,
            fillColor: '#41B6FF',  // Color del borde de las celdas del encabezado
          },
        
    
          columnStyles: {
            0: { halign: 'center', },
            1: { halign: 'left' },
            2: { halign: 'left' },
            3: { halign: 'left' },
            4: { halign: 'center' },
            5: { halign: 'right' },
            6: { halign: 'right' },
            7: { halign: 'right' },
            8: { halign: 'right' },
            9: { halign: 'right' },
            10: { halign: 'right' },
            11: { halign: 'right' },
            12: { halign: 'right' },
            13: { halign: 'right' },
            14: { halign: 'right' },
            15: { halign: 'right' },
            16: { halign: 'right' },
          },
          
    
          styles: {
            fontSize: 6,
            fontStyle: 'bold',
          },
          bodyStyles: {
    
          },
          footStyles: {
    
             fontSize: 9,
            fillColor: '#ffffff',
            textColor: '#000000',
    
    
          },
          alternateRowStyles: {
            // fillColor: '#B2B1B1',
    
          },
    
          //TABLA TOTALES
        });
        autoTable(doc, {
            // Configuración de la segunda tabla
            head: [ 
                [ 
                {
                    content: 'TOTAL DEDUCCIONES.',
                    styles:{
                        halign: 'center',
                        cellWidth: 100
                    }
                },
                {
                    content: 'TOTAL PAGADO.',
                    styles:{
                        halign: 'center',
                        cellWidth: 100
                    }
                },
                {
                    content: '',
                    styles:{
                        halign: 'center',
                        cellWidth: 30,
                        fillColor:'#ffffff'
                    }
                },
                {
                    content: 'PRIMAS.',
                    styles:{
                        halign: 'center',
                        cellWidth: 100
                    }
                },
                {
                    content: 'CESANTIA E INTERESES.',
                    styles:{
                        halign: 'center',
                        cellWidth: 100
                    }
                },
                {
                    content: 'VACACIONES',
                    styles:{
                        halign: 'center',
                        cellWidth: 100
                    }
                },
                {
                    content: 'TOTAL PRESTACIÓN',
                    styles:{
                        halign: 'center',
                        cellWidth: 100
                    }
                },
                ]
            ],
            body: [
                [
                    {
                        content: this.cp.transform(380000),
                        styles: {
                            halign: 'right'
                        
                        }
                      },
                      {
                        content: this.cp.transform(380000),
                        styles: {
                            halign: 'right'
                        }
                      },
                      {
                        content: ``,
                        styles: {
                            halign: 'right',
                            fillColor: '#ffffff',
                            lineWidth:0,
                            lineColor: 'ffffff'

                        }
                      },
                      {
                        content: this.cp.transform(380000),
                        styles: {
                            halign: 'right'
                        }
                      },
                      {
                        content: this.cp.transform(380000),
                        styles: {
                            halign: 'right'
                        }
                      },
                      {
                        content: this.cp.transform(380000),
                        styles: {
                            halign: 'right'
                        }
                      },
                      {
                        content: this.cp.transform(380000),
                        styles: {
                            halign: 'right'
                        }
                      },
                ]
                // Contenido de la segunda tabla
                // ...
            ],
            startY: doc.lastAutoTable.finalY + 10, // Ajusta la posición de inicio según tus necesidades
            theme: 'grid',
            headStyles: {
            fontSize: 6,
            // lineWidth:0.1,
            fillColor: '#41B6FF',  // Color del borde de las celdas del encabezado
            },
            styles: {
                fontSize: 7,
                fontStyle: 'bold',
              },
              bodyStyles: {
        
              },
              footStyles: {
        
                 fontSize: 10,
                fillColor: '#ffffff',
                textColor: '#000000',
        
        
              },
              alternateRowStyles: {
                // fillColor: '#B2B1B1',
        
              },
        });
        

        // TABLA PRIMAS; CESANTIAS E INTERESES, VACACIONES, TOTAL PRESTACIÓN
        

        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        // For each page, print the page number and the total pages
        for (let i = 1; i <= pageCount; i++) {
            
    
          // console.log(pageCount);
    
          doc.setFontSize(9);
          // Go to page i
          doc.setPage(i);
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 700, 118,{
            align:'left'
        }); //data.settings.margin.left if you want it on the left
        }


        // doc.setDrawColor('#000000');
        // let FinalY = doc.lastAutoTable.finalY + 20;
        // doc.setFontSize(10);
        // doc.setFont(undefined, 'bold')
        // doc.line(15, FinalY, 777, FinalY,);
        // doc.text("Total Facturas:   ",15, FinalY+15);
        // doc.text(1000+"",88, FinalY+15);
        // doc.text("Total Saldo:",125, FinalY+15);
        // doc.text(this.cp.transform(1000),185,FinalY+15);
        


        return doc;
    }


}