import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { logoSumi } from '../logoSumi';

export class BalanceDePruebaPDF {

    private cp:CurrencyPipe  = new CurrencyPipe('en-US');

    
    constructor(){}

    public GenerarBalanceDePrueba(data:any){

        const doc = new jsPDF('p', 'pt', 'letter')
        //tabla de valores y paginas
        let productos = []
        for (let x of data.reporte) {
          

         

          let p = [{
            content: x.cuenta.codigo,
            styles: {
              cellWidth: 50,
              halign: 'left'
            }
          },
          {
            content: x.cuenta.nombre,
            styles: {
              cellWidth: 220,
            }
          },
          {
            content: this.cp.transform(x.saldoAnterior),
    
            styles: {
    
              cellWidth: 70,
              halign: 'right'
    
    
            }
          },
          {
            content: this.cp.transform(x.totalDebito),
    
            styles: {
    
              cellWidth: 70,
              halign: 'right'
    
    
            }
          },
          {
           content: this.cp.transform(x.totalCredito),
    
            styles: {
    
              cellWidth: 70,
              halign: 'right'
    
    
            
            }
          },
          {
            content: this.cp.transform(x.saldoAnterior + x.saldoActual),
    
            styles: {
    
              cellWidth: 70,
              halign: 'right'
    
    
            }
          },
          {
            content: x.cuenta.naturaleza,
            styles: {
          
              cellWidth: 30,
              halign: 'center'
    
    
            }
          }
          
          ]
    
          productos.push(p);

         

        }
        let totalpage = 1
        autoTable(doc, {
          head: [
            [{
              content: 'CUENTA',
              styles: {
                halign: 'center',
                
                
              }
    
            },
              '',
            {
              content: 'SALDO ANTERIOR',
              styles: {
                halign: 'center'
              }
    
            }, {
              content: 'DEBITOS',
              styles: {
                halign: 'center'
              }
    
            },
            {
              content: 'CREDITOS',
              styles: {
                halign: 'center'
              }
    
            },
            {
              content: 'SALDO ACTUAL',
              styles: {
                halign: 'center'
              }
    
            }, {
              content: 'N',
              styles: {
                halign: 'center'
              }
    
            }
            ]],
          body: productos,
          horizontalPageBreak: true,
    
          margin: {
            top: 150,
            bottom: 65,
            left: 15,
            right: 15,
    
          },
          // metodo que se repite en cad pagina
          didDrawPage: ({ pageNumber, doc: jsPDF }) => {
            totalpage++;

            // imagen logo empresa
            doc.addImage(logoSumi, 'PNG', 20, 20,150, 80)

            // elaborado
            doc.setFontSize(6)
            doc.setFont(undefined, 'bold')
            doc.text("Elaborado, impreso y enviado por SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 10, 560, { angle: 90 })



            // solucion propia
            doc.setFontSize(7)
            doc.setFont(undefined, 'bold')
            doc.text("© Sarp Soft Nube (Software propio) - SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 307, 785,{ align: "center" })



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


            // Titulo
            doc.setFont(undefined, 'bold')
            doc.setFontSize(14)
            doc.text('BALANCE DE PRUEBA', 307, 125, { align: "center" })
            doc.setFontSize(7)
            doc.line(15, 145, 595, 145, 'F')


            doc.setFont(undefined, 'bold')
            doc.text('DESDE: '+moment(data.fechaInicial).format(" dddd DD MMMM YYYY").toUpperCase() +'    HASTA: '+moment(data.fechaFinal).format("dddd DD MMMM YYYY").toUpperCase(), 307, 140, { align: "center" })
            
            doc.line(15, 145, 595, 145, 'F')
    
            // //  texto en cuadro
            // doc.setDrawColor(0);
            // doc.setFillColor(255, 255, 255);
            // doc.roundedRect(15, 155, 285, 85, 3, 3);
    
            // // inicio del texto 1
            // doc.setFont(undefined, 'bold')
            // doc.setFontSize(9)
            // doc.text("Cuenta Inicial:", 27, 175)
            // doc.setFont(undefined, 'normal')
            // doc.text("130505", 90, 175)
    
            // doc.setFont(undefined, 'bold')
            // doc.setFontSize(9)
            // doc.text("Fecha Inicial:", 30, 195)
            // doc.setFont(undefined, 'normal')
            // doc.text(moment(new Date).format(" dddd DD/MM MMMM YYYY").toUpperCase(), 88, 195)
    
            // doc.setFont(undefined, 'bold')
            // doc.setFontSize(9)
            // doc.text("Terceros:", 46, 215, { alig: "right" })
            // doc.setFont(undefined, 'bold')
            // var tts = doc.splitTextToSize("INVERSIONES MEDICAS BARU S.A.S", 200)
            // doc.text(tts, 90, 215)
    
            // // texto en cuadro 2
            // doc.roundedRect(310, 155, 285, 85, 3, 3);
            // doc.setFont(undefined, 'bold')
            // doc.setFontSize(9)
            // doc.text("Cuenta Final:", 317, 175)
            // doc.setFont(undefined, 'normal')
            // doc.text("130505", 375, 175)
    
            // doc.setFont(undefined, 'bold')
            // doc.setFontSize(9)
            // doc.text("Fecha Final:", 320, 195)
            // doc.setFont(undefined, 'normal')
            // doc.text(moment(new Date).format(" dddd DD/MM MMMM YYYY").toUpperCase(), 373, 195)
    
            // // Cuenta y Saldo
            // doc.text("CUENTA", 15, 265)
            // doc.text("SALDO ANTERIOR", 95, 265)
            // doc.text("SALDO ACTUAL", 225, 265)
            // doc.line(15, 270, 595, 270, 'F')
            // doc.setFont(undefined, 'bold')
            // doc.text("130505", 15, 285)
            // doc.text(this.cp.transform(0), 95, 285)
            // doc.text(this.cp.transform(0), 225, 285)
            // doc.setFont(undefined, 'normal')
            
           

            
    
          },
          foot: [
    
            // ['', '', '', '', '', '', '', '', ''],
            // ['', '', '', '', '', '', '', { content: this.cp.transform(20000000), styles: {  halign: 'right' } }, { content: this.cp.transform(20000000), styles: {  halign: 'right' } },'','']
    
    
          ],
          theme: 'grid',
          headStyles: {
            fillColor: '#41B6FF',
    
    
    
          },
    
          columnStyles: {
            0: { halign: 'center'},
            1: { halign: 'left' },
            2: { halign: 'center' },
            3: { halign: 'center' },
            4: { halign: 'center' },
            5: { halign: 'center' },
            6: { halign: 'right' },
            7: { halign: 'right' },
            8: { halign: 'right' },
            9: { halign: 'left' },
          },
    
          styles: {
            fontSize: 6,
            fontStyle: 'bold',
            
          },
          bodyStyles: {
            fontStyle:'bold'
          },
          footStyles: {
    
            // fontSize: 12,
            fillColor: '#ffffff',
            textColor: '#000000',
    
    
          },
          alternateRowStyles: {
            // fillColor: '#B2B1B1',
    
          },
    
    
        });
        
        const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
        // For each page, print the page number and the total pages
        for (let i = 1; i <= pageCount; i++) {
    
          // console.log(pageCount);
    
          doc.setFontSize(10);
          // Go to page i
          doc.setPage(i);
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 500, 135); //data.settings.margin.left if you want it on the left
        }
        
     
    
        return doc;


    }

    public GenerarEstadoFinanciero(data:any){
      const doc = new jsPDF('p', 'pt', 'letter');

        
        this.setEncabezadoReporte(doc,data);
        let startY     = 150;
        let startYText = 162;

        doc.setDrawColor('#000000');
            
        this.setEncabezadoTabla(doc,startY,startYText,data);
        startY+=18;
        startYText+=18

         /* ACTIVOS CORRIENTES */
        this.setEncabezadoGrupo(doc,startY,startYText,'ACTIVOS CORRIENTES')
        let totalActivosC = 0;
        for (let x of data.ActivosCorrientes) {
          startY+=18
          startYText+=18
          
          if(x.cuenta.codigo.toString().length == 2){
            totalActivosC+= x.saldo;
          }

          if(startY >= 711){
              doc.addPage();
              startY     = 150;
              startYText = 162;
              this.setEncabezadoTabla(doc,startY,startYText,data);
              startY+=18;
              startYText+=18
          
              this.setEncabezadoGrupo(doc,startY,startYText,'ACTIVOS CORRIENTES')
              startY+=18
              startYText+=18
              
          }
          doc.rect(15,startY,581,18);
          this.setDivicionesEInformacion(doc,startY,startYText,x);
      }
      startY+=18
      startYText+=18
      
      this.setFinalGrupo(doc,startY,startYText,'TOTAL ACTIVOS CORRIENTES',totalActivosC);

      startY+=36
      startYText+=36
      this.setEncabezadoGrupo(doc,startY,startYText,'ACTIVOS NO CORRIENTES')
        let totalActivosNC = 0;
        for (let x of data.ActivosNoCorrientes) {
          startY+=18
          startYText+=18
          
          if(x.cuenta.codigo.toString().length == 2){
            totalActivosNC+= x.saldo;
          }

          if(startY >= 711){
              doc.addPage();
              startY     = 150;
              startYText = 162;
              this.setEncabezadoTabla(doc,startY,startYText,data);
              startY+=18;
              startYText+=18
          
              this.setEncabezadoGrupo(doc,startY,startYText,'ACTIVOS NO CORRIENTES')
              startY+=18
              startYText+=18
              
          }
          doc.rect(15,startY,581,18);
          this.setDivicionesEInformacion(doc,startY,startYText,x);
      }
      startY+=18
      startYText+=18
      
      this.setFinalGrupo(doc,startY,startYText,'TOTAL ACTIVOS NO CORRIENTES',totalActivosNC);
      
      startY+=20
      startYText+=20
      
      this.setFinalGrupo(doc,startY,startYText,'TOTAL ACTIVOS',(totalActivosC+totalActivosNC));
      startY+=36
      startYText+=36
      if(startY < 700){

        this.setEncabezadoGrupo(doc,startY,startYText,'PASIVOS CORRIENTES')
      }

      
        let totalPasivosC = 0;
        for (let x of data.PasivosCorrientes) {
          startY+=18
          startYText+=18
          
          if(x.cuenta.codigo.toString().length == 2){
            totalPasivosC+= x.saldo;
          }

          if(startY >= 711){
              doc.addPage();
              startY     = 150;
              startYText = 162;
              this.setEncabezadoTabla(doc,startY,startYText,data);
              startY+=18;
              startYText+=18
          
              this.setEncabezadoGrupo(doc,startY,startYText,'PASIVOS CORRIENTES')
              startY+=18
              startYText+=18
              
          }
          doc.rect(15,startY,581,18);
          this.setDivicionesEInformacion(doc,startY,startYText,x);
      }
      startY+=18
      startYText+=18
      
      this.setFinalGrupo(doc,startY,startYText,'TOTAL PASIVOS CORRIENTES',totalPasivosC);

      startY+=36
      startYText+=36
      if(startY < 700){

        this.setEncabezadoGrupo(doc,startY,startYText,'PASIVOS NO CORRIENTES')
      }

      
        let totalPasivosNC = 0;
        for (let x of data.PasivosNoCorrientes) {
          startY+=18
          startYText+=18
          
          if(x.cuenta.codigo.toString().length == 2){
            totalPasivosNC+= x.saldo;
          }

          if(startY >= 711){
              doc.addPage();
              startY     = 150;
              startYText = 162;
              this.setEncabezadoTabla(doc,startY,startYText,data);
              startY+=18;
              startYText+=18
          
              this.setEncabezadoGrupo(doc,startY,startYText,'PASIVOS NO CORRIENTES')
              startY+=18
              startYText+=18
              
          }
          doc.rect(15,startY,581,18);
          this.setDivicionesEInformacion(doc,startY,startYText,x);
      }
      startY+=18
      startYText+=18
      
      this.setFinalGrupo(doc,startY,startYText,'TOTAL PASIVOS NO CORRIENTES',totalPasivosNC);

      startY+=36
      startYText+=36
      if(startY < 700){

        this.setEncabezadoGrupo(doc,startY,startYText,'PATRIMONIO')
      }

      
        let totalPatrimonio = 0;
        for (let x of data.Patrimonio) {
          startY+=18
          startYText+=18
          
          if(x.cuenta.codigo.toString().length == 2){
            totalPatrimonio+= x.saldo;
          }

          if(startY >= 711){
              doc.addPage();
              startY     = 150;
              startYText = 162;
              this.setEncabezadoTabla(doc,startY,startYText,data);
              startY+=18;
              startYText+=18
          
              this.setEncabezadoGrupo(doc,startY,startYText,'PATRIMONIO')
              startY+=18
              startYText+=18
              
          }
          doc.rect(15,startY,581,18);
          this.setDivicionesEInformacion(doc,startY,startYText,x);
      }
      startY+=18
      startYText+=18
      
      this.setFinalGrupo(doc,startY,startYText,'TOTAL PATRIMONIO',totalPatrimonio);
      
      startY+=20
      startYText+=20
      
      this.setFinalGrupo(doc,startY,startYText,'TOTAL PASIVOS Y PATRIMONIO',(totalPasivosC+totalPasivosNC+totalPatrimonio));

      const pageCount = (doc as any).internal.getNumberOfPages(); //was doc.internal.getNumberOfPages(); 
      // For each page, print the page number and the total pages
      
      for (let i = 1; i <= pageCount; i++) {
        
        // console.log(pageCount);
  
        doc.setFontSize(10);
        // Go to page i
        doc.setPage(i);
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 500, 135); //data.settings.margin.left if you want it on the left
        this.setEncabezadoReporte(doc,data);
      }
      
     
  
      return doc;
    }


    setEncabezadoTabla(doc:jsPDF, startY:number, startYText:number,data:any){
      doc.setFillColor("#41B6FF");
      doc.rect(15,startY,581,18,'FD');

      
      doc.line(500,startY,500,startY+18);


      doc.setTextColor("#FFF");

      doc.setFontSize(10);
      doc.setFont(undefined,'bold');
      doc.text("CUENTA",52.5, startYText,{align:"center"});
      
      doc.text(moment(data.fechaInicial).format("YYYY").toUpperCase(),550, startYText,{align:"center"});
      doc.setTextColor("#000");
    }




    setEncabezadoReporte(doc:jsPDF,data:any){
      // imagen logo empresa
      doc.addImage(logoSumi, 'PNG', 20, 20,150, 80)

      // elaborado
      doc.setFontSize(6)
      doc.setFont(undefined, 'bold')
      doc.text("Elaborado, impreso y enviado por SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 10, 560, { angle: 90 })



      // solucion propia
      doc.setFontSize(7)
      doc.setFont(undefined, 'bold')
      doc.text("© Sarp Soft Nube (Software propio) - SUMIPROD DE LA COSTA S.A.S. NIT: 901648084-9", 307, 785,{ align: "center" })



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


      // Titulo
      doc.setFont(undefined, 'bold')
      doc.setFontSize(14)
      doc.text('ESTADO DE SITUACIÓN FINANCIERA', 307, 125, { align: "center" })
      doc.setFontSize(7)
      doc.line(15, 145, 595, 145, 'F')
      doc.text("Fecha de impresión: "+moment(new Date()).format("DD/MM/YYYY"), 307, 15,{ align: "center" })

      doc.setFont(undefined, 'bold')
      doc.text('DESDE: '+moment(data.fechaInicial).format("MMMM YYYY").toUpperCase() +' HASTA: '+moment(data.fechaFinal).format("MMMM YYYY").toUpperCase(), 307, 140, { align: "center" })
      
      doc.line(15, 145, 595, 145, 'F')
    }


    setEncabezadoGrupo(doc:jsPDF, startY:number, startYText:number,nombreGrupo:string){
      doc.setFillColor("#CECECE");
      doc.rect(15,startY,581,18,'FD');

      doc.setFontSize(8);
      doc.setFont(undefined,'bold');
      doc.text(nombreGrupo, 307, startYText, { align: "center" });
      
    }


    setDivicionesEInformacion(doc:jsPDF, startY:number,startYText:number,x:any){
      // console.log(startYText);
      
      doc.line(500,startY,500,startY+18);


      doc.setTextColor("#000");

      doc.setFontSize(8);
      doc.setFont(undefined,'normal');

      doc.text(x.cuenta.codigo+' - '+x.cuenta.nombre,18, startYText,{align:"left"});
      doc.setFont(undefined,'bold');

      doc.text(this.cp.transform(x.saldo),590, startYText,{align:"right"});
    }

    setFinalGrupo(doc:jsPDF, startY:number,startYText:number,grupo:string,total:number){
      // console.log(startYText);
      // doc.setFillColor("#CECECE");
      doc.setFillColor("#000");
      doc.rect(15,startY,581,18,'FD');
      doc.line(500,startY,500,startY+18);


      doc.setTextColor("#FFF");

      doc.setFontSize(8);
      doc.setFont(undefined,'bold');

      doc.text(grupo,37.5, startYText,{align:"left"});
      doc.setFontSize(9);
      doc.text(this.cp.transform(total),590, startYText,{align:"right"});

      doc.setTextColor("#000");
    }

}
