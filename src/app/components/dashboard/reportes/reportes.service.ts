import { Injectable } from '@angular/core';
import { OrdenDeCompra } from '../components/inventario/interfaces/interfaces';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { Base64Image } from './Base64';
import { logoSumi } from './logoSumi';
import { facturaElectronicaReport } from './reportesFacturacion/facturaElectronica';
moment.locale('es')

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

constructor(private cp: CurrencyPipe) { }
public generarPDFOrden(data:any){ 

  const doc = new jsPDF('l','pt','letter');
  var imgDataQR = '';






 
  let totalpage = 1;
  var dataImgNote = '';


  // variable productos a recorrer en el pdf
  let productos = [];
  console.log(data);

  // for para recorrer productos y diseñar la tabla
  for(let x =0; x < data.productos.length; x++){
    let p = [ {
      content: x+1,
      styles:{
        cellWidth:20
      }
    },
    {
      content:  data.productos[x].producto.nombreymarcaunico,
      styles:{
        cellWidth:320
      }
    },
    {
      content: data.productos[x].cantidad ,
      styles:{

        cellWidth:60,
      
        

      }
    },
    {
      content: this.cp.transform(data.productos[x].valorUnidad),
      styles:{

        cellWidth:80,
        halign: 'right'
        

      }
    },
    {
      content: this.cp.transform(data.productos[x].descuento),
      styles:{

        cellWidth:60,
      
        

      }
    },
    {
      content: this.cp.transform(data.productos[x].iva),
      styles:{

        cellWidth:80,
      
        

      }
    },
    {
      content: this.cp.transform(data.productos[x].total),
      cellWidth:130,
    },
  ]

  productos.push(p);
  }

  // tabla productos
  autoTable(doc, {
    head: [
      [{
        content:'#',
        styles:{
          halign:'center'
        }
        
       },
       'PRODUCTO',
       {
        content:'CANT.',
        styles:{
          halign:'center'
        }
        
       }, {
        content:'VALOR UND',
        styles:{
          halign:'right'
        }
        
       },
       {
        content:'DESC.',
        styles:{
          halign:'right'
        }
        
       },
        {
        content:'IVA',
        styles:{
          halign:'right'
        }
        
       }, {
        content:'TOTAL',
        styles:{
          halign:'right'
        }
        
       }
    ]],
    body: productos,
    horizontalPageBreak: true,
    margin:{
      top:225,
    },

    // metodo que se repite en cad pagina
    didDrawPage: ({pageNumber,doc:jsPDF}) => {
      totalpage ++;



      // imagen logo empresa
      // doc.addImage(imgData, 'PNG', 315, 20,150, 110);



      // tabla encabezado consecutivo y fecha
      autoTable(doc, {
        
        columnStyles:{
            0:{
              fillColor:'#ff8000'
            }
        } ,
        body: [
          [
            {
              content: 'FACTURA DE VENTA N°: '+data.factura,
              styles: {
                
                halign: 'center',
                fillColor:'#ff8000',
                textColor:'#fff',
                fontStyle:'bold',
                cellWidth:236.666666666
              }
            },
            {
              content: '',
              styles: {
                
                halign: 'center',
                // fillColor:'#fff',
                // textColor:'#fff',
                cellWidth:236.666666666
              }
            },
            {
              content: moment(data.fecha_creacion).format('dddd DD / MMMM YYYY').toUpperCase(),
              styles: {
                fontStyle:'bold',
                halign: 'center',
                fillColor:'#ff8000',
                textColor:'#fff',
                cellWidth:236.666666666
              }
            },
            
          ],
        ],
        theme: 'plain',
        styles:{
          halign:'right'
        }
      });

      autoTable(doc, {
       
        body: [
          [

            

            {
              content: '\nCLIENTE:'
              +'\nRazón social: '+data.tercero.nombreComercial.toUpperCase()+' ('+data.tercero.documento+'-'+data.tercero.dv+')'
              +'\nDir: '+data.tercero.direccion
              +'\nCorreo: '+data.tercero.correoContacto
              +'\nTel: '+data.tercero.telefonoContacto
              +'\n'+ data.tercero.municipio.municipio + ', '+data.tercero.departamento.departamento,
              styles: {
                halign: 'left'
              }
            },
           
            {
              content: '\nEMPRESA:'
              +'\n'+data.empresa.razon_social.toUpperCase()+' ('+data.empresa.nit+')'
              +'\nCARRERA 7 NO. 6-46 - CIENAGA - MAGDALENA'
              +'\n'+data.empresa.correo
              +'\n'+data.empresa.telefono
              +'\n'+ data.empresa.municipio.municipio + ', '+data.empresa.departamento.departamento,
              styles: {
                halign: 'right'
              }
            }
          ],
        ],
        theme: 'plain'
      });
      
      doc.line(40, 178, 750, 178 , 'F') 
      doc.line(40, 195, 750, 195 , 'F') 
      // doc.line(560, 465, 750, 465 , 'F') 
      doc.line(40, 580, 750, 580 , 'F') 
      doc.setFontSize(9)

      // BARRA ENCIMA DE LA TABLA PRODUCTOS INFORMACION RELEVANTE
      // doc.text('• Forma de pago: '+data.tercero.formaPago.nombre+'\t\t'+'• Fecha: '+ moment(data.fecha_creacion).format('DD-MM-YYYY').toUpperCase()+'\t\t'+'• Total productos: '+data.productos.length+'\t\t'+'• Usuario: '+data.usuario.username.toUpperCase(),120,190)
    
      
      // doc.setFontSize(9)

      // doc.addImage(imgDataQR, 'PNG', 40, 450,70, 70); 
      // doc.text('INFORMACIÓN DE PAGO\n\nCTA AHORRO N°: 51735172135\n'+'A/C NOMBRE: '+'JAILIN ALEJANDRA FERRER MARQUEZ\n'+'BANCO: Bancolombia S.A.\n'+'Santa Marta, Magdalena',120,460)


 

      // doc.text('Términos & Condiciones ',40,532).setFontSize(11)

      // doc.setFontSize(9)
      // doc.text('• Resolución DIAN # 18764033364979 del 11/08/2022. Numeración habilitada desde DS-0001\n   al DS-10000 con vigencia de 6 meses hasta 11/02/2023\n • NO SOMOS RESPONSABLES DE IVA\n • NO SOMOS GRANDES CONTRIBUYENTES ',40,545)


      // imagen de la nota
      // doc.addImage(dataImgNote, 'PNG', 295, 588,8, 8);



       let totalPage = 0;
      for(let x in doc.internal.pages){
        totalPage++;
        console.log(totalPage);
      }
      
      // var str = "Página " + doc.internal.pages;
      // if (typeof doc.putTotalPages === 'function') {
      //     str = str + " de " + totalPagesExp;
      // }
      doc.text('Pag. '+pageNumber+' De: '+totalPage,40,595)
      
      
      doc.text('NOTA:',265,595)
      doc.setFontSize(6)



      doc.text('.',305,595)
     
    },

    foot: [
     
      ['','','', '', '', '', '', ''],
      ['', '','','', '', {content:'Subtotal:',styles:{fontSize:8,halign:'right'}}, {content:this.cp.transform(data.total),styles:{fontSize:8,halign:'right'}}],
      [ '','','','', '', {content:'IVA',styles:{fontSize:8,halign:'right'}}, {content:this.cp.transform(data.iva),styles:{fontSize:8,halign:'right'}}],
      ['', '','','', '', {content:'Descuento:',styles:{fontSize:8,halign:'right'}}, {content:this.cp.transform(data.descuento),styles:{fontSize:8,halign:'right'}}],
      ['','','', '', '', {content:'Retención:',styles:{fontSize:8,halign:'right'}}, {content:this.cp.transform(data.retencion),styles:{fontSize:8,halign:'right'}}],
      ['','','', '', '',{content:'TOTAL:',styles:{fontSize:12,halign:'right'}}, {content:this.cp.transform(data.total - data.retencion - data.descuento + data.iva),styles:{fontSize:12,halign:'right'}}],
      
    ],
    theme: 'striped',
    headStyles:{
      fillColor: '#5C5C5C',
     
      

    },
    columnStyles: { 
      0: { halign: 'center'},
      2: { halign: 'center'},
      3: { halign: 'center'},
      4: { halign: 'right'},
      5: { halign: 'right'},
      6: { halign: 'right'},
      7: { halign: 'right'},
      8: { halign: 'right'},
    },
    styles:{
      fontSize:7,
      fontStyle:'bold'
    },
    bodyStyles:{
       
    },
    footStyles:{
     
      fillColor:'#ffffff',
      textColor:'#000000',
      

    },
    alternateRowStyles:{
      fillColor: '#B2B1B1',
      
    },
    
    
  });
 
 

 
  

  return doc.save("invoice");

}

public geerarPDFFacturaHospimed(data:any){
  
  // let report = new facturaElectronicaReport(this.cp, null);

  // report.geerarPDFFacturaSumi();

 
}

public geerarPDFFactura(data:any){
  let logo:any;
 
  
 const doc = new jsPDF('p','pt','letter');
  var imgDataQR = '';
  let totalpage = 1;
  var dataImgNote = '';


// variable productos a recorrer en el pdf
let productos = [];
console.log(data);

// for para recorrer productos y diseñar la tabla
for(let x =0; x < data.productos.length; x++){

  let p = [ {
    content: x+1,
    styles:{
      cellWidth:20
    }
  },
  {
    content:  data.productos[x].producto.nombreymarcaunico,
    styles:{
      cellWidth:260
    }
  },
  {
    content: data.productos[x].cantidad ,
    styles:{

      cellWidth:30,
    
      

    }
  },
  {
    content: this.cp.transform(data.productos[x].valorUnidad),
    styles:{

      cellWidth:60,
      halign: 'right'
      

    }
  },
  {
    content: this.cp.transform(data.productos[x].descuento),
    styles:{

      cellWidth:60,
    
      

    }
  },
  {
    content: this.cp.transform(data.productos[x].iva),
    styles:{

      cellWidth:60,
    
      

    }
  },
  {
    content: this.cp.transform(data.productos[x].total),
    cellWidth:110,
  },
]

productos.push(p);
}

// tabla productos
autoTable(doc, {
  head: [
    [{
      content:'#',
      styles:{
        halign:'center'
      }
      
     },
     'PRODUCTO',
     {
      content:'CANT.',
      styles:{
        halign:'center'
      }
      
     }, {
      content:'VALOR UND',
      styles:{
        halign:'right'
      }
      
     },
     {
      content:'DESC.',
      styles:{
        halign:'right'
      }
      
     },
      {
      content:'IVA',
      styles:{
        halign:'right'
      }
      
     }, {
      content:'TOTAL',
      styles:{
        halign:'right'
      }
      
     }
  ]],
  body: productos,
  horizontalPageBreak: true,
  margin:{
    top:225,
    bottom:205,
    left:15,
    right:15,

  },

  // metodo que se repite en cad pagina
  didDrawPage: ({pageNumber,doc:jsPDF}) => {
    totalpage ++;


    
    // imagen logo empresa
    // doc.addImage(Base64Image.logo, 'PNG', 40, 20,110, 80)
    doc.setFontSize(9)
    
    doc.setFont(undefined, 'bold');
    doc.text('COMCOLVENZ HMB SAS',190,30)
    doc.setFontSize(7)
    doc.text('Actividades económicas: 7112',190,40)
    doc.setFont(undefined, 'normal');
    doc.text('NIT: 900102343-4',190,50)
    doc.text('Régimen: Impuesto sobre las ventas - IVA',190,60)
    doc.text('Persona Judírica',190,70)
    doc.text('Dirección: CL 68B 24C 17 BARRANQUILLA(ATLANTICO),',190,80)
    doc.text('Tel. (300)219-9215',190,90)
    doc.text('Email. comcolvenzh913@gmail.com',190,100)






    // tabla encabezado consecutivo y fecha
  
    
    doc.line(15, 110, 595, 110,'F') 
    doc.setDrawColor(0);
    doc.setFillColor(255,255,255);
    doc.roundedRect(15, 120, 285, 100, 3, 3);
    doc.line(20, 185, 295, 185,'s') 
    
    doc.setFont(undefined, 'bold');
    doc.text('Cliente: ',27,137)
    doc.text('NIT: ',27,148)
    doc.text("Dirección:",27,159)
    doc.text('Teléfono: ',27,170)
    doc.text('Email: ',27,181)
    doc.text('Total lineas: ',27,195)
    doc.text('Vendedor: ',27,206)  



    doc.setFont(undefined, 'normal');
    doc.text(data.tercero.nombreComercial,70,137)
    doc.text(data.tercero.documento+'-'+data.tercero.dv,70,148)
    doc.text(data.tercero.direccion+','+data.tercero.municipio.municipio,70,159)
    doc.text(data.tercero.telefonoContacto,70,170)
    doc.text(data.tercero.correoContacto,70,181)
    doc.text(data.productos.length+"",70,195)
    doc.text(data.usuario.username.toString().toUpperCase(),70,206)









    doc.roundedRect(310, 120, 285, 100, 3, 3);
    doc.line(315, 140, 585, 140,'s') 
    doc.line(315, 155, 585, 155,'s') 
    doc.line(315, 170, 585, 170,'s') 
    doc.line(315, 185, 585, 185,'s')
    doc.line(315, 200, 585, 200,'s')


    doc.setFont(undefined, 'bold');
    doc.text('REMISIÓN DE VENTA N°: ',317,137)
    doc.text(data.factura+"",405,137)
    doc.setFont(undefined, 'normal');
    doc.text('MONEDA: ',317,152)
    doc.setFont(undefined, 'bold');
    doc.text("COP Colombia,Pesos",405,152)
    doc.setFont(undefined, 'normal');
    doc.text('FECHA EMISIÓN: ',317,167)
    doc.setFont(undefined, 'bold');
    doc.text(moment(data.fecha_creacion).format('dddd DD / MMMM YYYY').toUpperCase(),405,167)
    doc.setFont(undefined, 'normal');
    doc.text('FECHA VENCIMIENTO: ',317,182)
    doc.setFont(undefined, 'bold');
    doc.text(moment(data.fecha_vencimiento).format('dddd DD / MMMM YYYY').toUpperCase(),405,182)
    doc.setFont(undefined, 'normal');
    doc.text('TIPO DE NEGOCIACIÓN: ',317,197)
    doc.setFont(undefined, 'bold');
    doc.text(data.tercero.formaPago.nombre,405,197)

    // doc.line(40, 195, 750, 195 , 'F') 
    // doc.line(560, 465, 750, 465 , 'F') 
    // doc.line(40, 580, 750, 580 , 'F') 
    // doc.setFontSize(9)

    // BARRA ENCIMA DE LA TABLA PRODUCTOS INFORMACION RELEVANTE
    // doc.text('• Forma de pago: '+data.tercero.formaPago.nombre+'\t\t'+'• Fecha: '+ moment(data.fecha_creacion).format('DD-MM-YYYY').toUpperCase()+'\t\t'+'• Total productos: '+data.productos.length+'\t\t'+'• Usuario: '+data.usuario.username.toUpperCase(),120,190)
  
    
    // doc.setFontSize(9)

    // doc.addImage(imgDataQR, 'PNG', 40, 450,70, 70); 
    // doc.text('INFORMACIÓN DE PAGO\n\nCTA AHORRO N°: 51735172135\n'+'A/C NOMBRE: '+'JAILIN ALEJANDRA FERRER MARQUEZ\n'+'BANCO: Bancolombia S.A.\n'+'Santa Marta, Magdalena',120,460)




    // doc.text('Términos & Condiciones ',40,532).setFontSize(11)

 
    doc.roundedRect(15, 590, 580, 195, 3, 3);


    // imagen de la nota
    // doc.addImage(dataImgNote, 'PNG', 295, 588,8, 8);

    doc.setDrawColor(0);
    doc.setFillColor(255,255,255);
    // RECTANGULO DEL TOTAL
    doc.roundedRect(40, 610, 530, 70, 3, 3);

    //LINEAS HORIZONTALES DE LOS TOTALES
    doc.line(400, 620, 570, 620,'s')
    doc.line(400, 630, 570, 630,'s')
    doc.line(400, 640, 570, 640,'s')
    doc.line(400, 650, 570, 650,'s')
    doc.line(400, 660, 570, 660,'s')
    doc.line(400, 670, 570, 670,'s')
  

    // LINEAS VERTICALES DE LOS TOTALES
    doc.line(400, 610, 400, 680,'s')
    doc.line(485, 610, 485, 680,'s')

  // TEXO DE LOS TOTALES
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8)
    doc.text("Subtotal:",402,618)
    doc.text("Cargos:",402,628)
    doc.text("Descuento:",402,638)
    doc.text("IVA:",402,648)
    doc.text("TOTAL:",402,658)
    doc.text("ReteRenta:",402,668)
    doc.text("Neto Factura:",402,678)

    // totales en numeros
    doc.setFont(undefined, 'normal');
    doc.text(this.cp.transform(data.total),567,618,"right")
    doc.text(this.cp.transform(0),567,628,"right")
    doc.text(this.cp.transform(data.descuento),567,638,"right")
    doc.text(this.cp.transform(data.iva),567,648,"right")
    doc.text(this.cp.transform(data.total + data.iva - data.descuento),567,658,"right")
    doc.text(this.cp.transform(data.retencion),567,668,"right")
    doc.text(this.cp.transform(data.total + data.iva - data.descuento - data.retencion),567,678,"right")









    // LINEA DIVISORA DE NOTAS Y TOTAL EN LETRAS
    doc.line(45, 650, 390, 650,'s')


    // NOTAS 
    doc.setFont(undefined, 'bold');
    doc.setFontSize(7)
    doc.text("NOTAS:",48,635)

    // TOTAL EN LETRAS
    doc.setFont(undefined, 'bold');
    doc.setFontSize(6)
    doc.text("SON:",48,660)
    doc.setFont(undefined, 'normal');
    var splitTitle2 = doc.splitTextToSize("("+this.numeroALetras(data.total - data.retencion - data.descuento + data.iva,'')+")",320)
    doc.text(65,660,splitTitle2)

    
    doc.setFont(undefined, 'normal');
    doc.setFontSize(7)
    var splitTitle = doc.splitTextToSize("A esta factura de venta aplican las normas relativas a la letra de cambio (artículo 5 Ley 1231 de 2008). Con esta el Comprador declara haber recibido real y materialmente las mercancías o prestación de servicios descritos.  ", 320);
    doc.text(45,700,splitTitle)

    doc.setFont(undefined, 'bold');
    doc.setFontSize(8)
    // doc.text("Representación grafica de la Factura de Venta.",45,750)



    doc.addImage(Base64Image.codigoQR, 'PNG', 495, 30,70,70)
   
    let totalPage = 0;
    for(let x in doc.internal.pages){
      totalPage++;
      console.log(totalPage);
    }
    doc.setFontSize(6)
    doc.text("Pagina: "+totalPage,45,780)
    
    // var str = "Página " + doc.internal.pages;
    // if (typeof doc.putTotalPages === 'function') {
    //     str = str + " de " + totalPagesExp;
    // }
    // doc.text('Pag. '+pageNumber+' De: '+totalPage,40,595)
    
    
    // doc.text('NOTA:',265,595)
    // doc.setFontSize(6)



    // doc.text('.',305,595)
   
  },

  // foot: [
   
  //   ['','','', '', '', '', '', ''],
  //   ['', '','','', '', {content:'Subtotal:',styles:{fontSize:8,halign:'right'}}, {content:this.cp.transform(data.total),styles:{fontSize:8,halign:'right'}}],
  //   [ '','','','', '', {content:'IVA',styles:{fontSize:8,halign:'right'}}, {content:this.cp.transform(data.iva),styles:{fontSize:8,halign:'right'}}],
  //   ['', '','','', '', {content:'Descuento:',styles:{fontSize:8,halign:'right'}}, {content:this.cp.transform(data.descuento),styles:{fontSize:8,halign:'right'}}],
  //   ['','','', '', '', {content:'Retención:',styles:{fontSize:8,halign:'right'}}, {content:this.cp.transform(data.retencion),styles:{fontSize:8,halign:'right'}}],
  //   ['','','', '', '',{content:'TOTAL:',styles:{fontSize:12,halign:'right'}}, {content:this.cp.transform(data.total - data.retencion - data.descuento + data.iva),styles:{fontSize:12,halign:'right'}}],
    
  // ],
  theme: 'grid',
  headStyles:{
    fillColor: '#5C5C5C',
   
    

  },
  columnStyles: { 
    0: { halign: 'center'},
    2: { halign: 'center'},
    3: { halign: 'center'},
    4: { halign: 'right'},
    5: { halign: 'right'},
    6: { halign: 'right'},
    7: { halign: 'right'},
    8: { halign: 'right'},
  },
  styles:{
    fontSize:7,
    fontStyle:'bold'
  },
  bodyStyles:{
     
  },
  footStyles:{
   
    fillColor:'#ffffff',
    textColor:'#000000',
    

  },
  alternateRowStyles:{
    // fillColor: '#B2B1B1',
    
  },
  
  
});






return doc.save("invoice");

 
}


public generarOrdenCompra(data: any) {
  let doc = new jsPDF('p', 'pt', 'letter')
  let detalle = []
  for (let x = 0; x < 25; x++) {
    let p = [
      {
        content: "TRA09",
        styles: {
        }
      },
      {
        content: "Tramadol 100mg Ampolla Inv: 2010M-0013188 (Vitalis)Tramadol 100mg Ampolla Inv: 2010M-0013188 (Vitalis)",
        styles: {
          cellWidth: 220
        }
      },
      {
        content: 400,
        styles: {
          cellWidth: 30
        }
      },
      {
        content: "Ampolla",
        styles: {
        }
      },
      {
        content: this.cp.transform(100000),
        styles: {
        }
      },
      {
        content: this.cp.transform(100000),
        styles: {
        }
      },
      {
        content: this.cp.transform(100000),
        styles: {
        }
      },
      {
        content: this.cp.transform(18000000),
        styles: {
        }
      }
    ]
    detalle.push(p)
  }
  let totalPage = 1
  autoTable(doc, {
    head: [
      [{
        content: "Código",
        styles: {
          halign: 'center'
        }
      },
      {
        content: "Descripción del Producto",
        styles: {
          halign: 'center'
        }
      },
      {
        content: "Cant.",
        styles: {
          halign: 'center'
        }
      },
      {
        content: "Unidad",
        styles: {
          halign: 'center'
        }
      },
      {
        content: "Dto.",
        styles: {
          halign: 'right'
        }
      },
      {
        content: "Iva",
        styles: {
          halign: 'right'
        }
      },
      {
        content: "Valor Unit.",
        styles: {
          halign: 'right'
        }
      },
      {
        content: "Subtotal",
        
        styles: {
          halign: 'right'
        }
      }]
    ],
    body: detalle,
    horizontalPageBreak: true,
    margin: {
      top: 230,
      bottom: 210,
      left: 15,
      right: 15
    },
    didDrawPage: ({ pageNumber, doc: jsPDF }) => {
      totalPage++;
      // Datos de la Empresa
      doc.setFontSize(9)
      doc.setFont(undefined, 'bold');
      doc.text('HOSPIMED DE LA COSTA', 307, 30, { align: "center" })
      doc.setFontSize(7)
      doc.text('Cesar Rodriguez Marquez', 307, 40, { align: "center" })
      doc.setFont(undefined, 'normal');
      doc.text('NIT: 12620553-5-4', 307, 50, { align: "center" })
      doc.text('Régimen: No responsable de iva', 307, 60, { align: "center" })
      doc.text('Persona Natural', 307, 70, { align: "center" })
      doc.text('Dirección: CL 7 6 46 BRR KENNEDY, Cienaga(Mag)', 307, 80, { align: "center" })
      doc.text('Tel. (300)710-0231', 307, 90, { align: "center" })
      doc.text('Email. hospimedelacosta@gmail.com', 307, 100, { align: "center" })

      doc.setFont(undefined, 'bold')
      // recuadro y info
      doc.setDrawColor(0);
      doc.roundedRect(430, 25, 155, 60, 3, 3)
      doc.line(430, 55, 585, 55)

      doc.setFontSize(9)
      doc.text("Orden No.", 473, 45, "center")
      doc.text("Fecha", 549, 45, "center")
      doc.setFont(undefined, 'normal')
      doc.text("4041", 473, 75, "center")
      doc.text(moment(new Date()).format("DD/MM/YYYY"), 549, 75, "center")
      doc.line(510, 25, 510, 85)

      //Titulo
      doc.setFont(undefined, 'bold')
      doc.setFontSize(14)
      doc.text('ORDEN DE COMPRA', 307, 125, { align: "center" })
      doc.setFont(undefined, 'normal')
      doc.setFontSize(9)

      // Datos adicionales
      doc.text('Realizado por:', 30, 140)
      doc.text('MHERNANDEZ01', 90, 140)
      doc.text('Hora:', 435, 140)
      doc.text(moment(new Date()).format("h:mm:ss a").toUpperCase(), 465, 140)
      doc.setFont(undefined, 'bold')

      // Primer panel
      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(15, 145, 285, 75, 3, 3);
      doc.setFont(undefined, 'bold');
      doc.text('Solicitado a: ', 27, 162)
      doc.text('VITALIS S.A C.I', 27, 173)
      doc.text("NIT:", 27, 189)
      doc.text('830068119-1', 50, 189)
      doc.text('Telf: ', 27, 201)
      doc.text('4257000', 50, 201)
      doc.text('Dirección: ', 27, 213)
      doc.text('Cd 69 No. 94A 45 of 702', 74, 213)

      // Segundo Panel
      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(310, 145, 285, 75, 3, 3);
      doc.setFont(undefined, 'bold');
      doc.text('Enviar a: ', 322, 162)
      doc.text('SUMIPROD DE LA COSTA', 322, 173)
      doc.text('Dirección: ', 322, 189)
      doc.text('Cd 69 No. 94A 45 of 702', 370, 189)

      // Linea Inferior
      doc.line(15, 650, 595, 650)
      doc.setFont(undefined, 'bold')
      doc.setFontSize(10)
      doc.text("Nota: No se acepta fecha de vencimiento inferior a un año.", 25, 660)
      doc.text("Forma de Pago:", 25, 675)
      doc.setFont(undefined, 'normal')
      doc.text("Crédito 90 Dias", 105, 675)
      doc.setFont(undefined, 'bold')
      doc.text("Observación:", 25, 690)
      doc.setFont(undefined, 'normal')
      doc.text("0.0", 90, 690)

      // Panel de resultado
      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(337, 655, 258, 105, 3, 3);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(11)
      doc.text("Subtotal:", 350, 670)
      doc.text("Descuento:", 350, 690)
      doc.text("IVA:", 350, 710)
      doc.text("RETENCIÓN:", 350, 731)
      doc.text("TOTAL:", 350, 751)
      doc.text(this.cp.transform(20000000), 585, 670, "right")
      doc.text(this.cp.transform(20000000), 585, 690, "right")
      doc.text(this.cp.transform(20000000), 585, 710, "right")
      doc.text(this.cp.transform(20000000), 585, 731, "right")
      doc.text(this.cp.transform(80000000), 585, 751, "right")
    },
    theme: 'grid',
    headStyles: {
      fillColor: "#41B6FF",
      fontSize: 9
    },
    columnStyles: {
      0: { halign: 'center', fontSize: 7  },
      1: { halign: 'left',   fontSize: 7   },
      2: { halign: 'center', fontSize: 7  },
      3: { halign: 'center',fontSize : 7 },
      4: { halign: 'right',fontSize  : 7  },
      5: { halign: 'right' ,fontSize : 7 },
      6: { halign: 'right' ,fontSize : 7 },
      7: { halign: 'right' ,fontSize : 7 },
    },
    styles: {
      fontSize: 6,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 9
    },
    footStyles: {
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

    console.log(pageCount);

    doc.setFontSize(10);
    // Go to page i
    doc.setPage(i);
    var pageSize = doc.internal.pageSize;
    var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), 525, 140); //data.settings.margin.left if you want it on the left
  }

  return doc.save("orden-compra")
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

  let strMillones = this.Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
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



