
import * as moment from 'moment';
import { Borders, ImagePosition, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { BasicPurchaseOrder } from '../../../components/inventario/ordenDeCompra/models/BasicPurchaseOrder';
import { logoSumi } from '../../logoSumi';
import { Cell } from 'jspdf-autotable';


export class EstadoDeCarteraProveedor {
    private _workbook!: Workbook;



    public async dowloadExcel(dataExcel: any): Promise<void> {
        this._workbook = new Workbook();
    
        this._workbook.creator = 'Sarp Soft';
    
        this._createHeroTable(dataExcel);
    
        this._workbook.xlsx.writeBuffer().then((data) => {
          const blob = new Blob([data]);
          fs.saveAs(blob, 'EstadoCartera.xlsx');
        });
    }


    private async _createHeroTable(data: any): Promise<void> {
        // CREAMOS LA PRIMERA HOJA
        const sheet = this._workbook.addWorksheet(data.cliente);
        sheet.properties.showGridLines = false;

        // Establecer la protección de la hoja con contraseña
        sheet.protect(data.documento, {
          selectLockedCells: true,
          selectUnlockedCells: true,
          formatCells: true,
          formatColumns: true,
          formatRows: true,
          insertColumns: true,
          insertRows: true,
          insertHyperlinks: true,
          deleteColumns: true,
          deleteRows: true,
          sort: true,
          autoFilter: true,
          pivotTables: true
        });
    
        // ESTABLECEMOS EL ANCHO Y ESTILO DE LAS COLUMNAS
        sheet.getColumn('A').width = 20;
        sheet.getColumn('B').width = 20;
        sheet.getColumn('C').width = 20;
        sheet.getColumn('D').width = 20;

        sheet.getColumn('E').width = 20;
        sheet.getColumn('F').width = 20;
        sheet.getColumn('G').width = 20;
        sheet.getColumn('H').width = 20;
        sheet.getColumn('I').width = 20;
        sheet.getColumn('J').width = 20;
        sheet.getColumn('K').width = 20;
  
        sheet.getColumn('A').alignment = {horizontal:'center'};
        sheet.getColumn('B').alignment = {horizontal:'center'};
        sheet.getColumn('C').alignment = {horizontal:'center'};
        sheet.getColumn('D').alignment = {horizontal:'center'};
        sheet.getColumn('E').alignment = {horizontal:'right'};
        sheet.getColumn('F').alignment = {horizontal:'right'};
        sheet.getColumn('G').alignment = {horizontal:'right'};
        sheet.getColumn('H').alignment = {horizontal:'right'};
        sheet.getColumn('I').alignment = {horizontal:'right'};
        sheet.getColumn('J').alignment = {horizontal:'right'};
        sheet.getColumn('K').alignment = {horizontal:'right'};
        

    
        sheet.columns.forEach((column) => {
          column.alignment = { vertical: 'middle', wrapText: true };
        });
    
        //CREAMO E INSERTAMOS EL LOGO EN LA COLUMNA "B"
        const logoId = this._workbook.addImage({
          base64: logoSumi,
          extension: 'png',
        });
    
        const position: ImagePosition = {
          tl: { col: 0.40, row: 2.3 },
          ext: { width: 350, height: 180 },
        };
    
        ///sheet.addImage(logoId, 'B2:B7');
        sheet.addImage(logoId, position);


    
        //AGREGAMOS UN TITULO
        const cellEncabezadoData = [
          { cell: 'D3', value: 'SUMIPROD DE LA COSTA S.A.S.', font: { bold: true, size: 24 } },
          { cell: 'D4', value: 'NIT: 901648084-9', font: { bold: true, size: 14 } },
          { cell: 'D5', value: 'Régimen: Responsable de IVA', font: { bold: true, size: 11 } },
          { cell: 'D6', value: 'Persona Jurídica', font: { bold: true, size: 11 } },
          { cell: 'D7', value: 'CALLE 44B #21G-11 Urb Santa Cruz, Santa Marta', font: { bold: true, size: 11 } },
          { cell: 'D8', value: 'Tel: (5) 432-7722 - Cel: (301) 302-2986', font: { bold: true, size: 11 } },
          { cell: 'D9', value: 'Email: sumiprodelacosta@gmail.com', font: { bold: true, size: 11 } }
        ];
        
        for (let i = 0; i < cellEncabezadoData.length; i++) {
          const currentCell = sheet.getCell(cellEncabezadoData[i].cell);
          currentCell.value = cellEncabezadoData[i].value;
          currentCell.style.font = cellEncabezadoData[i].font;
        
          const nextCell = sheet.getCell(cellEncabezadoData[i].cell.replace('D', 'H'));
          nextCell.value = '';
          nextCell.style.font = cellEncabezadoData[i].font;
        
          sheet.mergeCells(cellEncabezadoData[i].cell + ':' + nextCell.address);
          currentCell.alignment = { horizontal: 'center', vertical: 'middle' };
        }

        const tituloReporteCell = sheet.getCell('D11');
        tituloReporteCell.value = 'ESTADO DE CARTERA A CORTE DE '+moment(data.fecha_corte).format("DD MMMM YYYY").toUpperCase();
        tituloReporteCell.style.font = { bold: true, size: 18 };

        const nextCell = sheet.getCell('H11');
        nextCell.value = '';
        nextCell.style.font = { bold: true, size: 18 };

        sheet.mergeCells('D11:H11');

        tituloReporteCell.alignment = { horizontal: 'center', vertical: 'middle' };
        tituloReporteCell.style.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '41B6FF' },
          bgColor: { argb: '41B6FF' }
        };


        
        // Crea la celda fusionada para la razon social del cliente
        const clienteCell = sheet.getCell('A13:C13');
        clienteCell.value = 'PROVEEDOR - RAZON SOCIAL';
        clienteCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'C5C6C6' },
          bgColor: { argb: 'C5C6C6' }
        };
        clienteCell.font = { bold: true };
        clienteCell.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
        };
        clienteCell.alignment = { horizontal: 'center', vertical: 'middle' };
        sheet.mergeCells('A13:C13');

        // asignamos el nombre del cliente a la fila debajo 

        const clienteCellValue = sheet.getCell('A14:C14');
        clienteCellValue.value = data.documento+' - '+data.proveedor;
        clienteCellValue.font = { bold: true };
        clienteCellValue.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
        };
        clienteCellValue.alignment = { horizontal: 'center', vertical: 'middle' };
        sheet.mergeCells('A14:C14');


        const formaPagoCell = sheet.getCell('E13');
        formaPagoCell.value = "FORMA DE PAGO"
        formaPagoCell.font = { bold: true };
        formaPagoCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'C5C6C6' },
          bgColor: { argb: 'C5C6C6' }
        };
        formaPagoCell.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
        };
        formaPagoCell.alignment = { horizontal: 'center', vertical: 'middle' };

        const formaPagoCellValue = sheet.getCell('E14');
        formaPagoCellValue.value = data.formaPago
        formaPagoCellValue.font = { bold: true };
       
        formaPagoCellValue.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
        };
        formaPagoCellValue.alignment = { horizontal: 'center', vertical: 'middle' };







        //CREAMOS LOS TITULOS PARA LA CABECERA
    
        const headerRow = sheet.getRow(15);
        // ESTAMOS JALANDO TODAS LAS COLUMNAS DE ESA FILA, "A","B","C"..etc
        headerRow.values = [
          'Factura N°', // column A
          'Fecha', // column B
          'Fecha Vence', // column C
          'Dias Fact.', // column D
          '0 - 30', // column E
          '31 - 60', // column F
          '61 - 90', // column G
          '91 - 120', // column H
          '121 - 150', // column I
          '151 - 180', // column J
          '181 - mas', // column K
        ];
        


        headerRow.font = { bold: true, size: 12 };
        headerRow.alignment = { horizontal:'center' };
        headerRow.font.color = {
            argb:'FFFFFF'
          
            
        };
        [ 'A15',
          'B15',
          'C15',
          'D15',
          'E15',
          'F15',
          'G15',
          'H15',
          'I15',
          'J15',
          'K15',
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
          from: { row: 15, column: 1 },
          to: { row: 15, column: 11 },
        };

       
        
     
        
       
        // INSERTAMOS LOS DATOS EN LAS RESPECTIVAS COLUMNAS
       
        const rowsToInsert = sheet.getRows(16, data.facturas.length)!;
       
    

        for (let index = 0; index < rowsToInsert.length; index++) {
          const itemData = data.facturas[index]; // obtenemos el item segun el index de la iteracion (recorrido)
          console.log(itemData)
          const row = rowsToInsert[index]; // obtenemos la primera fila segun el index de la iteracion (recorrido)
    
          //  los valores de itemData seran asignados a "row" (fila actual en la iteracion)
    
          row.values = [
            itemData.factura,
            moment(itemData.fecha).format("DD/MM/YYYY"),
            moment(itemData.fechaVencimiento).format("DD/MM/YYYY"),
            itemData.dias_factura, 
            itemData.totales_x_rango['0_30'],
            itemData.totales_x_rango['31_60'],
            itemData.totales_x_rango['61_90'],
            itemData.totales_x_rango['91_120'],
            itemData.totales_x_rango['121_150'],
            itemData.totales_x_rango['151_180'],
            itemData.totales_x_rango['181++'], 
          ];
          row.height = 15;
          row.eachCell(cell => {
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
          });
    
          
        }
        const lastDataRowNumber = 15 + data.facturas.length; // Obtener el número de la última fila de datos
        const lastColumnIndex = headerRow.values.length; // Obtener el índice de la última columna del encabezado
        
        // Aplicar bordes a todas las celdas de la última fila de datos hasta la última columna del encabezado
        for (let colIndex = 1; colIndex < lastColumnIndex; colIndex++) {
          const cell = sheet.getCell(lastDataRowNumber + 1, colIndex);
          cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } }
          };
        }

        const totalesCell = sheet.getCell(`A${lastDataRowNumber + 1}:D${lastDataRowNumber + 1}`);
        totalesCell.value = 'TOTALES POR RANGO DE DIAS';
        totalesCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'C5C6C6' },
          bgColor: { argb: 'C5C6C6' }
        };
        totalesCell.font = { bold: true };
        totalesCell.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
        };
        totalesCell.alignment = { horizontal: 'center', vertical: 'middle' };
        sheet.mergeCells(`A${lastDataRowNumber + 1}:D${lastDataRowNumber + 1}`);
        [ 
        `E${lastDataRowNumber + 1}`,
        `F${lastDataRowNumber + 1}`,
        `G${lastDataRowNumber + 1}`,
        `H${lastDataRowNumber + 1}`,
        `I${lastDataRowNumber + 1}`,
        `J${lastDataRowNumber + 1}`,
        `K${lastDataRowNumber + 1}`,
      ].map((key, index) => {
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
        const valores:any = Object.values(data.totales_por_rango);
        cell.value = valores[index]
        cell.font = {color:{argb:'FFFFFF'}, bold: true };
        cell.alignment = { horizontal: 'right', vertical: 'middle' };
        
      });

        

        const totalFacturasRow = sheet.addRow([]);
        totalFacturasRow.getCell('A').value = 'TOTAL FACTURAS';
        totalFacturasRow.getCell('A').font = { bold: true, color: { argb: 'FFFFFF' } };
        totalFacturasRow.getCell('A').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '41B6FF' },
          bgColor: { argb: '41B6FF' }
        };
        totalFacturasRow.getCell('B').value = data.total_facturas;
        totalFacturasRow.getCell('B').alignment = { horizontal: 'right' };
        totalFacturasRow.getCell('B').font = { bold: true };

        const totalCarteraRow = sheet.addRow([]);
        totalCarteraRow.getCell('A').value = 'TOTAL CARTERA';
        totalCarteraRow.getCell('A').font = { bold: true, color: { argb: 'FFFFFF' } };
        totalCarteraRow.getCell('A').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '41B6FF' },
          bgColor: { argb: '41B6FF' }
        };
        totalCarteraRow.getCell('B').value = data.saldo_total;
        totalCarteraRow.getCell('B').alignment = { horizontal: 'right' };
        totalCarteraRow.getCell('B').font = { bold: true };
    
        const borderStyle: Partial<Borders> = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
        };
    
        totalFacturasRow.getCell('A').border = borderStyle;
        totalFacturasRow.getCell('B').border = borderStyle;
        totalCarteraRow.getCell('A').border = borderStyle;
        totalCarteraRow.getCell('B').border = borderStyle;
      }
}
