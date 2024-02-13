import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logo_asopagos } from '../logoSumi';


export class ReporteAsopagos{
    private cp:CurrencyPipe = new CurrencyPipe('en-US');

    constructor(){}
  
    public NuevoReporteAsopagos(){
        const doc = new jsPDF('l', 'pt', 'letter');

        doc.addImage(logo_asopagos, 'PNG', 550, 40,220, 180 )

      
        doc.setProperties({
            title: 'REPORTE ASOPAGOS - '+moment(new Date()).format("DD/MM/YYYY"),
            subject: 'REPORTE ASOPAGOS'+' - '+moment(new Date()).format("DD/MM/YYYY"),		
            author: 'Sarp Soft Nube',
            keywords: '',
            creator: 'Sarp Soft'
        });
       
        let totalpage = 1
        autoTable(doc, {
          head: [
            [{
              content: 'DATOS GENERALES DEL APORTE',
              styles: {
                halign: 'center'
              },
              colSpan:9,
    
            },],

            [
            {
              content: 'IDENTIFICACION',
              styles: {
                halign: 'center',
                cellWidth:80,
              }
    
            }, {
              content: 'DV',
              styles: {
                halign: 'center',
                cellWidth:20,
              }
    
            },
            {
              content: 'RAZON SOCIAL',
              styles: {
                halign: 'center',
                cellWidth:90,
              }
    
            },
            {
              content: 'CLASE',
              styles: {
                halign: 'center',
                cellWidth:32,
              }
    
            },
            {
              content: 'CODIGO',
              styles: {
                halign: 'center',
                cellWidth:32,
              }
    
            }, {
              content: 'ARL',
              styles: {
                halign: 'center',
                cellWidth:70,
              }
    
            }, {
              content: 'F. PRESENTACIÓN',
              styles: {
                halign: 'center',
                cellWidth:70,
              }
    
            }, {
              content: 'ACT. ECO',
              styles: {
                halign: 'center',
                cellWidth:70,
              }
            },
            {
                content: 'TIPO DE EMPRESA',
                styles: {
                  halign: 'center',
                  cellWidth:70,
                }
            },
            ],
            
           
            ],
          body: [
            [
                {
                    content:'NI 901648084',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'9',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'SUMIPROD DE LA COSTA SAS',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'8',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'POSITIVA - 14-23',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'UNICA',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'4645',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'JURIDICA',
                    styles:{
                        halign: 'center',
                    }
                },
            ]
          ],
          horizontalPageBreak: false,
          
    
          margin: {
            // top: 40,
            // bottom: 65,
            left: 15,
            right: 15,
    
          },
         
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {

           
            // Titulo
            doc.setFont(undefined, 'bold');
            doc.setFontSize(12);
            doc.text('RESUMEN PLANILLA GENERADA',396, 30, { align: "center" });
          
          },
       
          theme: 'grid',
          headStyles: {
            fontSize: 6,
            // lineWidth:0.1,
            fillColor: '#41B6FF',  // Color del borde de las celdas del encabezado
          },
        
    
        
          
    
          styles: {
            fontSize: 5,
            fontStyle: 'bold',
          },
          bodyStyles: {
    
          },
        
          startY: 50,
        });
        autoTable(doc, {
            head: [   
              [
              {
                content: 'MUN-DEP',
                styles: {
                  halign: 'center',
                  cellWidth:80,
                }
      
              }, {
                content: 'DIRECCION',
                styles: {
                  halign: 'center',
                  cellWidth:110,
                },
                
      
              },
              {
                content: 'TELEFONO',
                styles: {
                  halign: 'center',
                  cellWidth:134,
                },
                
      
              },
              {
                content: 'EMAIL.',
                styles: {
                  halign: 'center',
                  cellWidth:140,
                },
               
      
              },
              {
                content: 'EXENTO DE PARAFISCALES',
                styles: {
                  halign: 'center',
                  cellWidth:70,
                }
      
              }
              ],
              
             
              ],
            body: [
              [
                  {
                      content:'47-1',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'CL 44B 21G-11 URB SANTA CRUZ',
                      styles:{
                          halign: 'center',
                      },
                      
                  },
                  
                  {
                      content:'4327722',
                      styles:{
                          halign: 'center',
                      },
                     
                  },
                  
                  
                  {
                      content:'SUMIPRODELACOSTA@GMIAL.COM',
                      styles:{
                          halign: 'center',
                      }
                  },
                  
                  {
                      content:'S',
                      styles:{
                          halign: 'center',
                      }
                  },
                  
                  
              ]
            ],
            horizontalPageBreak: false,
            
      
            margin: {
              // top: 40,
              // bottom: 65,
              left: 15,
              right: 15,
      
            },
           
           
         
            theme: 'grid',
            headStyles: {
              fontSize: 6,
              // lineWidth:0.1,
              fillColor: '#41B6FF',  // Color del borde de las celdas del encabezado
            },
          
      
            styles: {
              fontSize: 5,
              fontStyle: 'bold',
            },
            bodyStyles: {
      
            },
          
            startY: doc.lastAutoTable.finalY,
          });

        autoTable(doc, {
            head: [
              [{
                content: 'DATOS GENERALES DE LA LIQUIDACION',
                styles: {
                  halign: 'center'
                },
                colSpan:11,
      
              },],
  
              [
              {
                content: 'PERIODO PENSIÓN',
                styles: {
                  halign: 'center',
                  cellWidth:45,
                }
      
              }, {
                content: 'PERIODO SALUD',
                styles: {
                  halign: 'center',
                  cellWidth:45,
                }
      
              },
              {
                content: 'PLANILLA',
                styles: {
                  halign: 'center',
                  cellWidth:45,
                }
      
              },
              {
                content: 'TIPO PLANILLA',
                styles: {
                  halign: 'center',
                  cellWidth:45,
                }
      
              },
              {
                content: 'FECHA PAGO',
                styles: {
                  halign: 'center',
                  cellWidth:45,
                }
      
              }, {
                content: 'CENTRO DE TRABAJO',
                styles: {
                  halign: 'center',
                  cellWidth:55,
                }
      
              }, {
                content: 'DEPARTAMENTO',
                styles: {
                  halign: 'center',
                  cellWidth:50,
                }
      
              }, {
                content: 'MUNICIPIO',
                styles: {
                  halign: 'center',
                  cellWidth:54,
                }
              },
              {
                  content: 'VALOR PAGO',
                  styles: {
                    halign: 'center',
                    cellWidth:50,
                  }
              },
              {
                content: 'INTERES X MORA',
                styles: {
                  halign: 'center',
                  cellWidth:50,
                }
            },
            {
                content: 'ENTIDAD RECAUDO',
                styles: {
                  halign: 'center',
                  cellWidth:50,
                }
            },
              ],
              
             
              ],
            body: [
              [
                  {
                      content:'2023-06',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'2023-07',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'26959212',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'K',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'TODOS LOS CENTROS',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'TODOS',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'TODOS',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'6100',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
              ]
            ],
            horizontalPageBreak: false,
            
      
            margin: {
              // top: 40,
              // bottom: 65,
              left: 15,
              right: 15,
      
            },
           
            
         
            theme: 'grid',
            headStyles: {
              fontSize: 6,
              // lineWidth:0.1,
              fillColor: '#41B6FF',  // Color del borde de las celdas del encabezado
            },
          
            styles: {
              fontSize: 5,
              fontStyle: 'bold',
            },
            bodyStyles: {
      
            },
          
            startY: doc.lastAutoTable.finalY+10,
        });
        autoTable(doc, {
            head: [
              [{
                content: 'N AFILIADOS',
                styles: {
                  halign: 'center',
                  cellWidth:45,
                },
              },
  
              
              {
                content: 'REF. DE PAGO (PIN)',
                styles: {
                  halign: 'center',
                  cellWidth:45,
                }
      
              },
              {
                content: 'FECHA LIMITE PAGO',
                styles: {
                  halign: 'center',
                  cellWidth:45,
                }
              },
              {
                content: 'ESTADO PLANILLA',
                styles: {
                  halign: 'center',
                  cellWidth:45,
                }
      
              }
              ],
              
             
              ],
            body: [
              [
                  {
                      content:'1',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'26959212',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'2023-07-24',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'SIN PAGAR',
                      styles:{
                          halign: 'center',
                      }
                  },
                  
              ]
            ],
            horizontalPageBreak: false,
            
      
            margin: {
              // top: 40,
              // bottom: 65,
              left: 15,
              right: 15,
      
            },
           
            
         
            theme: 'grid',
            headStyles: {
              fontSize: 6,
              // lineWidth:0.1,
              fillColor: '#41B6FF',  // Color del borde de las celdas del encabezado
            },
          
            styles: {
              fontSize: 5,
              fontStyle: 'bold',
            },
            bodyStyles: {
      
            },
          
            startY: doc.lastAutoTable.finalY,
        });

        autoTable(doc, {
            head: [
              [{
                content: 'EMPLEADO',
                styles: {
                  halign: 'center'
                },
                colSpan:5
                
      
              },
              {
                content: 'NOVEDADES',
                styles: {
                  halign: 'center'
                },
                colSpan:18
              },
              {
                content: 'DIAS',
                styles: {
                  halign: 'center'
                },
                colSpan:4
              },
              {
                content: 'PENSIÓN',
                styles: {
                  halign: 'center'
                },
                colSpan:5
              },
              {
                content: 'SALUD',
                styles: {
                  halign: 'center'
                },
                colSpan:3
              },
              {
                content: 'CCF',
                styles: {
                  halign: 'center'
                },
                colSpan:3
              },
              {
                content: 'RIESGOS',
                styles: {
                  halign: 'center'
                },
                colSpan:2
              },
              {
                content: 'TARIFA',
                styles: {
                  halign: 'center'
                },
              },
              {
                content: 'PARAF',
                styles: {
                  halign: 'center'
                },
              },
              {
                content: 'SENA',
                styles: {
                  halign: 'center'
                },
              },
              {
                content: 'ICBF',
                styles: {
                  halign: 'center'
                },
              },
              {
                content: 'ESAP',
                styles: {
                  halign: 'center'
                },
              },
              {
                content: 'MIN',
                styles: {
                  halign: 'center'
                },
              },
              {
                content: '',
                styles: {
                  halign: 'center'
                },
              },
              {
                content: '',
                styles: {
                  halign: 'center'
                },
              },
              {
                content: '',
                styles: {
                  halign: 'center'
                },
              },
              {
                content: '',
                styles: {
                  halign: 'center'
                },
              },
              {
                content: '',
                styles: {
                  halign: 'center'
                },
              },
            
            ],
  
              [
              {
                content: 'N',
                styles: {
                  halign: 'center',
                 
                }
      
              }, {
                content: 'ID',
                styles: {
                  halign: 'center',
                  cellWidth:35
                }
      
              },
              {
                content: 'EMPLEADO',
                styles: {
                  halign: 'center',
                  cellWidth:40
                }
      
              },
              {
                content: 'SALARIO',
                styles: {
                  halign: 'center',
                  cellWidth:20
                }
      
              },
              {
                content: 'MODALIDAD DE HORARIO',
                styles: {
                  halign: 'center',
                  cellWidth:38
                  
                }
      
              }, {
                content: 'ING',
                styles: {
                  halign: 'center',
                }
      
              }, {
                content: 'RET',
                styles: {
                  halign: 'center',
                  
                }
      
              }, {
                content: 'IDE',
                styles: {
                  halign: 'center',
                  
                }
              },
              {
                  content: 'TAE',
                  styles: {
                    halign: 'center',
                    
                  }
              },
              {
                content: 'TDP',
                styles: {
                  halign: 'center',
                  
                }
            },
            {
                content: 'TAP',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'VSP',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'VTE',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'VST',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'SLN',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'IGE',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'LMA',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'VAC',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'AVP',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'VCT',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'IRL',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'EPST',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'AFPT',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'AFP',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'CCF',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'ARL',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'EPS',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'NOMBRE',
                styles: {
                  halign: 'center',
                  cellWidth:30
                 
                }
            },
            {
                content: 'IBC',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'COT',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'FNSOL',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'FNSUB',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'NOMBRE',
                styles: {
                  halign: 'center',
                  cellWidth:30
                }
            },
            {
                content: 'IBC',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'COT',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'NOMBRE',
                styles: {
                  halign: 'center',
                  cellWidth:30
                }
            },
            {
                content: 'IBC',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'COT',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'IBC',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'COT',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'ARL',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'IBC',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'COT',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'COT',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'COT',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'COT',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'TIPO COT',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'SUB TOTAL COT',
                styles: {
                  halign: 'center',
                 
                }
            },
            {
                content: 'TOTAL',
                styles: {
                  halign: 'center',
                  cellWidth:30
                }
            },
            {
                content: 'EXCENTO DE PARAFISCALES',
                styles: {
                  halign: 'center',
                  cellWidth:30
                }
            },
            {
                content: 'ACTIVIDAD ECONOMICA',
                styles: {
                  halign: 'center',
                  cellWidth:30
                }
            },
              ],
              
             
              ],
            body: [
              [
                  {
                      content:'1',
                      styles:{
                          halign: 'left',
                      }
                  },
                  {
                      content:'CC.1004372032',
                      styles:{
                          halign: 'left',
                      }
                  },
                  {
                      content:'SIERRA BLANCO LILIANA MARCELA',
                      styles:{
                          halign: 'left',
                      }
                  },
                  {
                      content:'1600000',
                      styles:{
                          halign: 'right',
                      }
                  },
                  {
                      content:'',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                  {
                    content:'X',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'30',
                    styles:{
                        halign: 'center',
                    }
                },

                  {
                      content:'SINAFP-SINAFP',
                      styles:{
                          halign: 'left',
                      }
                  },
                  {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'SINAFP-SINAFP',
                    styles:{
                        halign: 'left',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'SINAFP-SINAFP',
                    styles:{
                        halign: 'left',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                
                  {
                      content:'1160000',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'6100',
                      styles:{
                          halign: 'center',
                      }
                  },
                  {
                      content:'000522',
                      styles:{
                          halign: 'right',
                      }
                  },
                  {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'23',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'0',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'6100',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'N',
                    styles:{
                        halign: 'center',
                    }
                },
                {
                    content:'1152262252',
                    styles:{
                        halign: 'center',
                    }
                },
              ]
            ],
            horizontalPageBreak: false,
            
            
      
            margin: {
              // top: 40,
              // bottom: 65,
              left: 15,
              right: 15,
      
            },
           
            
         
            theme: 'grid',
            headStyles: {
              fontSize: 4.5,
              lineWidth:0.1,
              cellPadding:0,
              fillColor: '#41B6FF',  // Color del borde de las celdas del encabezado
            },
          
            styles: {
              fontSize: 4,
              // cellPadding:20,
              fontStyle: 'bold',
            },
            bodyStyles: {
                cellPadding:0
      
            },
          
            startY: doc.lastAutoTable.finalY+10,
          });

          autoTable(doc, {
            head: [
              [{
                content: 'TOTALES IBC',
                styles: {
                  halign: 'center'
                },
                colSpan:5,
      
              },],
  
              [
              {
                content: 'IBC PENSION',
                styles: {
                  halign: 'center',
                  cellWidth:60,
                }
      
              }, {
                content: 'IBC SALUD',
                styles: {
                  halign: 'center',
                  cellWidth:60,
                }
      
              },
              {
                content: 'IBC RIEGOS ',
                styles: {
                  halign: 'center',
                  cellWidth:60,
                }
      
              },
              {
                content: 'IBC CAJAS',
                styles: {
                  halign: 'center',
                  cellWidth:60,
                }
      
              },
              {
                content: 'IBC PARAF',
                styles: {
                  halign: 'center',
                  cellWidth:60,
                }
      
              },
              ],
              
             
              ],
            body: [
              [
                  {
                      content:'0',
                      styles:{
                        halign: 'right',
                      }
                  },
                  {
                      content:'0',
                      styles:{
                        halign: 'right',
                      }
                  },
                  {
                      content:'1160000',
                      styles:{
                        halign: 'right',
                      }
                  },
                  {
                      content:'0',
                      styles:{
                        halign: 'right',
                      }
                  },
                  {
                      content:'0',
                      styles:{
                          halign: 'right',
                      }
                  },
                  
              ]
            ],
            horizontalPageBreak: false,
            
      
            margin: {
              // top: 40,
              // bottom: 65,
              left: 15,
              right: 15,
      
            },
           
            
         
            theme: 'grid',
            headStyles: {
              fontSize: 6,
              // lineWidth:0.1,
              fillColor: '#41B6FF',  // Color del borde de las celdas del encabezado
            },
          
            styles: {
              fontSize: 5,
              fontStyle: 'bold',
            },
            bodyStyles: {
      
            },
          
            startY: doc.lastAutoTable.finalY+10,
        });

        autoTable(doc, {
            head: [
            //   [{
            //     content: 'TOTALES IBC',
            //     styles: {
            //       halign: 'center'
            //     },
            //     colSpan:5,
      
            //   },],
  
              [
              {
                content: 'SUBSISTEMA',
                styles: {
                  halign: 'center',
                  cellWidth:60,
                }
      
              }, {
                content: 'CODIGO',
                styles: {
                  halign: 'center',
                  cellWidth:30,
                }
      
              },
              {
                content: 'NIT',
                styles: {
                  halign: 'center',
                  cellWidth:30,
                }
      
              },
              {
                content: 'DV',
                styles: {
                  halign: 'center',
                  cellWidth:30,
                }
      
              },
              {
                content: 'AFILIADOS',
                styles: {
                  halign: 'center',
                  cellWidth:30,
                }
      
              },
              {
                content: 'VALOR LIQUIDADO',
                styles: {
                  halign: 'center',
                  cellWidth:40,
                }
      
              },
              {
                content: 'VALOR UPC',
                styles: {
                  halign: 'center',
                  cellWidth:40,
                }
      
              },
              {
                content: 'INTERES MORA',
                styles: {
                  halign: 'center',
                  cellWidth:40,
                }
      
              },
              {
                content: 'SALDOS E INCAPACIDADES DESCONTADOS',
                styles: {
                  halign: 'center',
                  cellWidth:40,
                }
      
              },
              {
                content: 'VALOR A PAGAR',
                styles: {
                  halign: 'center',
                  cellWidth:40,
                }
      
              },
              ],
              
             
              ],
            body: [
              [
                  {
                      content:'ARP(Administradoras:1)',
                      styles:{
                        halign: 'left',
                      },
                      colSpan:4
                  },
                  {
                      content:'1',
                      styles:{
                        halign: 'right',
                      }
                  },
                  {
                      content:'3100',
                      styles:{
                        halign: 'right',
                      }
                  },
                  {
                      content:'0',
                      styles:{
                        halign: 'right',
                      }
                  },
                  {
                      content:'0',
                      styles:{
                          halign: 'right',
                      }
                  },
                  {
                    content:'0',
                    styles:{
                        halign: 'right',
                    }
                },
                {
                    content:'6100',
                    styles:{
                        halign: 'right',
                    }
                },
                  
              ]
            ],
            horizontalPageBreak: false,
            
      
            margin: {
              // top: 40,
              // bottom: 65,
              left: 15,
              right: 15,
      
            },
           
            
         
            theme: 'grid',
            headStyles: {
              fontSize: 6,
              // lineWidth:0.1,
              fillColor: '#41B6FF',  // Color del borde de las celdas del encabezado
            },
          
            styles: {
              fontSize: 5,
              fontStyle: 'bold',
            },
            bodyStyles: {
      
            },
          
            startY: doc.lastAutoTable.finalY+10,
        });

        


        return doc;
    }


}