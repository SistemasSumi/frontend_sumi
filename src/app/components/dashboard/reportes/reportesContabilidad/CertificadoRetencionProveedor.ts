import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';
import { firma_contador } from '../logoSumi';
import { BasicPurchaseOrder } from '../../components/inventario/ordenDeCompra/models/BasicPurchaseOrder';


export class CertificadoRetencionProveedor{
    private cp:CurrencyPipe = new CurrencyPipe('en-US');
   


    
    constructor(){}
  
    public CertificadoRetencionProveedor(data:any){
        
        let doc = new jsPDF('p','pt','letter')
        

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
                   doc.text('E-mail: sumiprodelacosta@gmail.com', 307, 90, { align: "center" })
                   doc.setFontSize(14)
                   doc.setFont(undefined,'bold');

                   doc.text('CERTIFICADO DE RETENCION EN LA FUENTE A TITULO DE', 307, 120, { align: "center" })
                   doc.text('IMPUESTO DE RENTA Y COMPLEMENTARIOS', 307, 135, { align: "center" })
       
                   doc.setFontSize(10)
                   doc.setFont(undefined,'normal');
                   doc.text(`Certifica que practicó durante Enero-Diciembre del año gravable de ${data.año} las siguientes retenciones de`, 307, 160, { align: "center" })
                   doc.text('RETEFUENTE por los conceptos señalados a continuación:', 307, 171, { align: "center" })

                   doc.setFontSize(10)
                   doc.setFont(undefined,'normal');
                   doc.text(`Nombre a quien se le practicó la Retención: ${data.nombre}`, 307, 190, { align: "center" })
                   doc.text(`Identificación: ${data.documento}`, 307, 201, { align: "center" })

                   doc.setFillColor("#41B6FF");
                    doc.rect(155.5,115+100,285,18,'FD');

                    doc.line(230.5,115+100,230.5,115+118);
                    doc.line(300.5,115+100,300.5,115+118);
                    doc.line(370.5,115+100,370.5,115+118);
                    doc.line(440.5,115+100,440.5,115+118);
                    

                    doc.setTextColor("#FFF");

                    doc.setFontSize(8);
                    doc.setFont(undefined,'bold');
                    doc.text("CONCEPTO", 193, 127+100,{align:"center"});
                    doc.text("BASE",265.5, 127+100,{align:"center"});
                    doc.text("PORCENTAJE",335.5, 127+100,{align:"center"});
                    doc.text("V. RETENIDO",405.5, 127+100,{align:"center"});
                    doc.setTextColor("#000");

                    doc.rect(155.5,133+100,285,18);

                    doc.line(230.5,133+100,230.5,133+118);
                    doc.line(300.5,133+100,300.5,133+118);
                    doc.line(370.5,133+100,370.5,133+118);
                    doc.line(440.5,133+100,440.5,133+118);

                    doc.setFont(undefined,'bold');
                    doc.text(`${data.tipo ? data.tipo.substring(0,data.tipo.indexOf(' ')) : 'RETEFUENTE'}` ,193, 145+100,{align:"center"});
                    doc.text(`${this.cp.transform(data.base)}`,265.5, 145+100,{align:"center"});
                    doc.text(`${data.porcentaje ? data.porcentaje : '2.5'}`,335.5, 145+100,{align:"center"});
                    doc.text(`${this.cp.transform(data.valor)}`,405.5, 145+100,{align:"center"});

                    doc.setFontSize(10);
                    doc.setFont(undefined,'normal');
                    doc.text('Valor en letras', 307, 310, { align: "center" })
                    doc.text(convertirNumeroATexto(Math.round(data.valor)), 307, 322, { align: "center" })


                    doc.text('Este valor fue consignado en la ciudad de Santa Marta', 307, 360, { align: "center" })
                    doc.text('Se expide esta certificación el día: '+moment(new Date()).format("DD/MM/YYYY"), 307, 372, { align: "center" })


                    doc.addImage(firma_contador, 'JPG', 100, 405,140, 70)

                    doc.text('___________________________', 100, 420+50, )
                    doc.text('FIRMA Y SELLO', 100, 432+50, )

                    doc.text('Este documento no requiere para si validez firma autógrafa de acuerdo con el articulo 7 del', 307, 460+50,{ align: "center" } )
                    doc.text('Decreto 380 de 1996, recopilado en el articulo 1.6.1.12.13 del DUT 1625 de octubre de 2016', 307, 472+50,{ align: "center" } )
                    // Movimiento #Est
                    // Movimiento #
                    function convertirNumeroATexto(numero: number): string {
                        const unidades = ['', 'Un', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve'];
                        const decenas = ['', 'Diez', 'Veinte', 'Treinta', 'Cuarenta', 'Cincuenta', 'Sesenta', 'Setenta', 'Ochenta', 'Noventa'];
                        const especiales = ['Diez', 'Once', 'Doce', 'Trece', 'Catorce', 'Quince', 'Dieciséis', 'Diecisiete', 'Dieciocho', 'Diecinueve'];
                        const centenas = ['', 'Ciento', 'Doscientos', 'Trescientos', 'Cuatrocientos', 'Quinientos', 'Seiscientos', 'Setecientos', 'Ochocientos', 'Novecientos'];
                      
                        const unidadesMillon = ['', 'Millón', 'Dos Millones', 'Tres Millones', 'Cuatro Millones', 'Cinco Millones', 'Seis Millones', 'Siete Millones', 'Ocho Millones', 'Nueve Millones'];
                      
                        if (numero === 0) {
                          return 'Cero pesos y 00 ctvos';
                        }
                      
                        const numeroTexto = numero.toFixed(2).toString(); // Convertir a texto con dos decimales
                      
                        const partes = numeroTexto.split('.');
                        const parteEntera = parseInt(partes[0], 10);
                        const parteDecimal = parseInt(partes[1], 10);
                      
                        const convertirGrupo = (grupo: number): string => {
                          const unidadesGrupo = grupo % 10;
                          const decenasGrupo = Math.floor((grupo % 100) / 10);
                          const centenasGrupo = Math.floor(grupo / 100);
                      
                          let textoGrupo = '';
                      
                          if (centenasGrupo > 0) {
                            textoGrupo += centenas[centenasGrupo] + ' ';
                          }
                      
                          if (decenasGrupo > 0) {
                            if (decenasGrupo === 1) {
                              textoGrupo += especiales[unidadesGrupo] + ' ';
                            } else {
                              textoGrupo += decenas[decenasGrupo] + ' ';
                              if (unidadesGrupo > 0) {
                                textoGrupo += 'y ' + unidades[unidadesGrupo] + ' ';
                              }
                            }
                          } else {
                            if (unidadesGrupo > 0) {
                              textoGrupo += unidades[unidadesGrupo] + ' ';
                            }
                          }
                      
                          return textoGrupo;
                        };
                      
                        let textoEntero = '';
                      
                        if (parteEntera > 0) {
                          const millones = Math.floor(parteEntera / 1000000);
                          const miles = Math.floor((parteEntera % 1000000) / 1000);
                          const unidadesEntero = parteEntera % 1000;
                      
                          if (millones > 0) {
                            textoEntero += convertirGrupo(millones) + (millones === 1 ? ' Millón ' : ' Millones ');
                          }
                      
                          if (miles > 0) {
                            textoEntero += convertirGrupo(miles) + (miles === 1 ? ' Mil ' : ' Mil ');
                          }
                      
                          if (unidadesEntero > 0) {
                            textoEntero += convertirGrupo(unidadesEntero);
                          }
                        } else {
                          textoEntero = 'Cero';
                        }
                      
                        let textoDecimal = '';
                      
                        if (parteDecimal > 0) {
                          textoDecimal += 'y ' + (parteDecimal < 10 ? '0' : '') + parteDecimal.toString() + ' ctvos';
                        }
                      
                        return textoEntero + ' pesos ' + textoDecimal;
                      }
                   
                   
        return doc;
    


}
      

}