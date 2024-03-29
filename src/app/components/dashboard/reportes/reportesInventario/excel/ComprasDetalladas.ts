
import * as moment from 'moment';
import { Borders, ImagePosition, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { BasicPurchaseOrder } from '../../../components/inventario/ordenDeCompra/models/BasicPurchaseOrder';
import { logoSumi } from '../../logoSumi';
import { Cell } from 'jspdf-autotable';


export class ComprasDetalladas {
    private _workbook!: Workbook;



    public async dowloadExcel(dataExcel: any,fecha_inicial,fecha_final): Promise<void> {
        this._workbook = new Workbook();
    
        this._workbook.creator = 'Sarp Soft';
    
        this._createHeroTable(dataExcel);
    
        this._workbook.xlsx.writeBuffer().then((data) => {
          const blob = new Blob([data]);
          fs.saveAs(blob, 'Compras Detalladas.xlsx');
        });
    }


    private async _createHeroTable(data: any): Promise<void> {
        // CREAMOS LA PRIMERA HOJA
        const sheet = this._workbook.addWorksheet("Reporte");
        sheet.properties.showGridLines = false;

        // // Establecer la protección de la hoja con contraseña
        // sheet.protect(data.documento, {
        //   selectLockedCells: true,
        //   selectUnlockedCells: true,
        //   formatCells: true,
        //   formatColumns: true,
        //   formatRows: true,
        //   insertColumns: true,
        //   insertRows: true,
        //   insertHyperlinks: true,
        //   deleteColumns: true,
        //   deleteRows: true,
        //   sort: true,
        //   autoFilter: true,
        //   pivotTables: true
        // });
    
        // ESTABLECEMOS EL ANCHO Y ESTILO DE LAS COLUMNAS
        sheet.getColumn('A').width = 20;
        sheet.getColumn('B').width = 20;
        sheet.getColumn('C').width = 50;
        sheet.getColumn('D').width = 20;

        sheet.getColumn('E').width = 25;
        sheet.getColumn('F').width = 20;
        sheet.getColumn('G').width = 20;
        sheet.getColumn('H').width = 20;
        sheet.getColumn('I').width = 20;
        sheet.getColumn('J').width = 20;
        sheet.getColumn('K').width = 20;
        sheet.getColumn('L').width = 20;
        sheet.getColumn('M').width = 20;
        sheet.getColumn('N').width = 20;
        sheet.getColumn('O').width = 20;
  
        sheet.getColumn('A').alignment = {horizontal:'center'};
        sheet.getColumn('B').alignment = {horizontal:'center'};
        sheet.getColumn('C').alignment = {horizontal:'center'};
        sheet.getColumn('D').alignment = {horizontal:'center'};
        sheet.getColumn('I').alignment = {horizontal:'right'};
        sheet.getColumn('J').alignment = {horizontal:'right'};
        sheet.getColumn('K').alignment = {horizontal:'right'};
        sheet.getColumn('L').alignment = {horizontal:'right'};
        sheet.getColumn('M').alignment = {horizontal:'right'};
        sheet.getColumn('N').alignment = {horizontal:'right'};
        sheet.getColumn('O').alignment = {horizontal:'right'};
        

    
        sheet.columns.forEach((column) => {
          column.alignment = { vertical: 'middle', wrapText: true };
        });
    
        //CREAMO E INSERTAMOS EL LOGO EN LA COLUMNA "B"
        const logoId = this._workbook.addImage({
          base64: logoSumi,
          extension: 'png',
        });
    
        const position: ImagePosition = {
          tl: { col: 1.40, row: 2.3 },
          ext: { width: 350, height: 180 },
        };
    
        ///sheet.addImage(logoId, 'B2:B7');
        sheet.addImage(logoId, position);


    
        //AGREGAMOS UN TITULO
        const cellEncabezadoData = [
          { cell: 'F3', value: 'SUMIPROD DE LA COSTA S.A.S.', font: { bold: true, size: 24 } },
          { cell: 'F4', value: 'NIT: 901648084-9', font: { bold: true, size: 14 } },
          { cell: 'F5', value: 'Régimen: Responsable de IVA', font: { bold: true, size: 11 } },
          { cell: 'F6', value: 'Persona Jurídica', font: { bold: true, size: 11 } },
          { cell: 'F7', value: 'CALLE 44B #21G-11 Urb Santa Cruz, Santa Marta', font: { bold: true, size: 11 } },
          { cell: 'F8', value: 'Tel: (5) 432-7722 - Cel: (301) 302-2986', font: { bold: true, size: 11 } },
          { cell: 'F9', value: 'Email: sumiprodelacosta@gmail.com', font: { bold: true, size: 11 } }
        ];
        
        for (let i = 0; i < cellEncabezadoData.length; i++) {
          const currentCell = sheet.getCell(cellEncabezadoData[i].cell);
          currentCell.value = cellEncabezadoData[i].value;
          currentCell.style.font = cellEncabezadoData[i].font;
        
          const nextCell = sheet.getCell(cellEncabezadoData[i].cell.replace('F', 'J'));
          nextCell.value = '';
          nextCell.style.font = cellEncabezadoData[i].font;
        
          sheet.mergeCells(cellEncabezadoData[i].cell + ':' + nextCell.address);
          currentCell.alignment = { horizontal: 'center', vertical: 'middle' };
        }

        const tituloReporteCell = sheet.getCell('F11');
        tituloReporteCell.value =  'COMPRAS DETALLADAS DEL '+moment(data.fecha_incial).format("DD-MM-YYYY").toUpperCase() + ' AL '+moment(data.fecha_final).format("DD-MM-YYYY").toUpperCase();
        tituloReporteCell.style.font = { bold: true, size: 18 };

        const nextCell = sheet.getCell('J11');
        nextCell.value = '';
        nextCell.style.font = { bold: true, size: 18 };

        sheet.mergeCells('F11:J11');

        tituloReporteCell.alignment = { horizontal: 'center', vertical: 'middle' };
        tituloReporteCell.style.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '41B6FF' },
          bgColor: { argb: '41B6FF' }
        };


        
      


       
     





        //CREAMOS LOS TITULOS PARA LA CABECERA
    
        const headerRow = sheet.getRow(13);
        // ESTAMOS JALANDO TODAS LAS COLUMNAS DE ESA FILA, "A","B","C"..etc
        headerRow.values = [
          'Orden N°', // column A
          'Factura N°', // column B
          'Proveedor', // column C
          'Fecha Factura.', // column D
          'Fecha Vence', // column E
          'Forma de pago', // column F
          'Estado', // column G
          'Nota crédito ?',
          'Subtotal', // column H
          'Descuento', // column I
          'Iva', // column J
          'Retención', // column K
          'Valor Factura', // column L
          'Valor Abonado', // column M
          'Saldo', // column N
        ];
        


        headerRow.font = { bold: true, size: 12 };
        headerRow.alignment = { horizontal:'center' };
        headerRow.font.color = {
            argb:'FFFFFF'
          
            
        };
        [ 'A13',
          'B13',
          'C13',
          'D13',
          'E13',
          'F13',
          'G13',
          'H13',
          'I13',
          'J13',
          'K13',
          'L13',
          'M13',
          'N13',
          'O13',
        ].map(key => {
          const cell = sheet.getCell(key);
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '41B6FF' },
            bgColor: { argb: '41B6FF' }
          };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      
        sheet.autoFilter = {
          from: { row: 13, column: 1 },
          to: { row: 13, column: 11 },
        };

       
        
     
        
       
        // INSERTAMOS LOS DATOS EN LAS RESPECTIVAS COLUMNAS
       
        const rowsToInsert = sheet.getRows(14, data.length)!;
       
    

        for (let index = 0; index < rowsToInsert.length; index++) {
          const itemData = data[index]; // obtenemos el item segun el index de la iteracion (recorrido)
          // console.log(itemData)
          const row = rowsToInsert[index]; // obtenemos la primera fila segun el index de la iteracion (recorrido)
    
          //  los valores de itemData seran asignados a "row" (fila actual en la iteracion)
    
          row.values = [
            itemData.orden,
            itemData.n_factura,
            itemData.tercero,
            moment(itemData.fecha_compra).format("DD/MM/YYYY"),
            moment(itemData.fecha_vence).format("DD/MM/YYYY"),
            itemData.convenio, 
            itemData.pagada,
            itemData.nota,
            itemData.subtotal,
            itemData.descuento,
            itemData.Iva,
            itemData.retencion,
            itemData.valorFactura,
            itemData.abono,
            itemData.saldo,
            
          ];
          row.height = 15;
          row.eachCell((cell,cellNumber )=> {
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
            // const fechaVencimiento = moment(itemData.fechaVencimiento);
            // const fechaActual = moment();
      
            // if (fechaVencimiento.isBefore(fechaActual, 'day')) {
            //   if (cellNumber === 11) { // Columna K (índice 11)
            //     cell.font = { bold: true, color: { argb: 'FF0000' } }; // Texto en negrita y color ROJO
            //   }
             
            // } else if (fechaVencimiento.diff(fechaActual, 'days') <= 15) {
            //   if (cellNumber === 11) { // Columna K (índice 11)
            //     cell.font = { bold: true, color: { argb: 'e5be01' } }; // Texto en negrita y color AMARILLLO
            //   }
            // }
          });
          
 
    
          
        }
       

        

      }
}
