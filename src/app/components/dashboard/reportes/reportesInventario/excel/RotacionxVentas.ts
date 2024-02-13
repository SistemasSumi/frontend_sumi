
import * as moment from 'moment';
import { Borders, ImagePosition, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { BasicPurchaseOrder } from '../../../components/inventario/ordenDeCompra/models/BasicPurchaseOrder';
import { logoSumi } from '../../logoSumi';
import { Cell } from 'jspdf-autotable';


export class RotacionxVentas {
    private _workbook!: Workbook;



    public async dowloadExcel(dataExcel: any,fechaInicio,fechaFin): Promise<void> {
        this._workbook = new Workbook();
    
        this._workbook.creator = 'Sarp Soft';
    
        this._createHeroTable(dataExcel,fechaInicio,fechaFin);
    
        this._workbook.xlsx.writeBuffer().then((data) => {
          const blob = new Blob([data]);
          fs.saveAs(blob, 'Rotacion por ventas.xlsx');
        });
    }


    private async _createHeroTable(data: any,fechaInicio,fechaFin): Promise<void> {
  
    
        // CREAMOS LA PRIMERA HOJA
        const sheet = this._workbook.addWorksheet("Rotacion x ventas");
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
        sheet.getColumn('A').width = 15;
        sheet.getColumn('B').width = 20;
        sheet.getColumn('C').width = 20;
        sheet.getColumn('D').width = 50;

        sheet.getColumn('E').width = 20;
        sheet.getColumn('F').width = 20;
        sheet.getColumn('G').width = 20;
        sheet.getColumn('H').width = 20;
        sheet.getColumn('I').width = 20;
        sheet.getColumn('J').width = 20;
        sheet.getColumn('K').width = 20;
        sheet.getColumn('L').width = 20;
      
  

        sheet.getColumn('H').alignment = {horizontal:'right'};
        sheet.getColumn('I').alignment = {horizontal:'right'};
       
        

    
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


    
        // // AGREGAMOS UN TITULO
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
        
          const nextCell = sheet.getCell(cellEncabezadoData[i].cell.replace('D', 'I'));
          nextCell.value = '';
          nextCell.style.font = cellEncabezadoData[i].font;
        
          sheet.mergeCells(cellEncabezadoData[i].cell + ':' + nextCell.address);
          currentCell.alignment = { horizontal: 'center', vertical: 'middle' };
        }

        const tituloReporteCell = sheet.getCell('D11');
        tituloReporteCell.value =  'ROTACIÓN POR VENTAS DEL '+moment(fechaInicio).format("DD-MM-YYYY").toUpperCase() + ' AL '+moment(fechaFin).format("DD-MM-YYYY").toUpperCase();
        tituloReporteCell.style.font = { bold: true, size: 18 };

        const nextCell = sheet.getCell('I11');
        nextCell.value = '';
        nextCell.style.font = { bold: true, size: 18 };

        sheet.mergeCells('D11:I11');

        tituloReporteCell.alignment = { horizontal: 'center', vertical: 'middle' };
        tituloReporteCell.style.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '41B6FF' },
          bgColor: { argb: '41B6FF' }
        };


        
        // Crea la celda fusionada para la razon social del cliente
        // const clienteCell = sheet.getCell('A13:C13');
        // clienteCell.value = 'PROVEEDOR - RAZON SOCIAL';
        // clienteCell.fill = {
        //   type: 'pattern',
        //   pattern: 'solid',
        //   fgColor: { argb: 'C5C6C6' },
        //   bgColor: { argb: 'C5C6C6' }
        // };
        // clienteCell.font = { bold: true };
        // clienteCell.border = {
        //   top: { style: 'thin', color: { argb: '000000' } },
        //   left: { style: 'thin', color: { argb: '000000' } },
        //   bottom: { style: 'thin', color: { argb: '000000' } },
        //   right: { style: 'thin', color: { argb: '000000' } }
        // };
        // clienteCell.alignment = { horizontal: 'center', vertical: 'middle' };
        // sheet.mergeCells('A13:C13');

        // // asignamos el nombre del cliente a la fila debajo 

        // const clienteCellValue = sheet.getCell('A14:C14');
        // clienteCellValue.value = data.proveedor;
        // clienteCellValue.font = { bold: true };
        // clienteCellValue.border = {
        //   top: { style: 'thin', color: { argb: '000000' } },
        //   left: { style: 'thin', color: { argb: '000000' } },
        //   bottom: { style: 'thin', color: { argb: '000000' } },
        //   right: { style: 'thin', color: { argb: '000000' } }
        // };
        // clienteCellValue.alignment = { horizontal: 'center', vertical: 'middle' };
        // sheet.mergeCells('A14:C14');


        
        // const formaPagoCell = sheet.getCell('E13');
        // formaPagoCell.value = "TODAS FACTURAS"
        // formaPagoCell.font = { bold: true };
        // formaPagoCell.fill = {
        //   type: 'pattern',
        //   pattern: 'solid',
        //   fgColor: { argb: 'C5C6C6' },
        //   bgColor: { argb: 'C5C6C6' }
        // };
        // formaPagoCell.border = {
        //   top: { style: 'thin', color: { argb: '000000' } },
        //   left: { style: 'thin', color: { argb: '000000' } },
        //   bottom: { style: 'thin', color: { argb: '000000' } },
        //   right: { style: 'thin', color: { argb: '000000' } }
        // };
        // formaPagoCell.alignment = { horizontal: 'center', vertical: 'middle' };

        // const formaPagoCellValue = sheet.getCell('E14');
        // formaPagoCellValue.value = data.facturas.length
        // formaPagoCellValue.font = { bold: true };
       
        // formaPagoCellValue.border = {
        //   top: { style: 'thin', color: { argb: '000000' } },
        //   left: { style: 'thin', color: { argb: '000000' } },
        //   bottom: { style: 'thin', color: { argb: '000000' } },
        //   right: { style: 'thin', color: { argb: '000000' } }
        // };
        // formaPagoCellValue.alignment = { horizontal: 'center', vertical: 'middle' };
     





        //CREAMOS LOS TITULOS PARA LA CABECERA
    
        const headerRow = sheet.getRow(13);
        // ESTAMOS JALANDO TODAS LAS COLUMNAS DE ESA FILA, "A","B","C"..etc
        headerRow.values = [
          'Código', // column A
          'Lotes', // column B
          'Marca', // column C
          'Nombre', // column D
          'Existencia', // column E
          'Ultima compra', // column F
          'Proveedor', // column G
          'Rotacion x compra', // column H
          'Ultima venta', // column I
          'Cliente', // column J
          'Rotacion x venta', // column J
          'ubicación', // column k
        
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
          to: { row: 13, column: 12 },
        };

       
        
     
        
       
        // INSERTAMOS LOS DATOS EN LAS RESPECTIVAS COLUMNAS
       
        const rowsToInsert = sheet.getRows(14, data.length)!;
       
    

        for (let index = 0; index < rowsToInsert.length; index++) {
          const itemData = data[index]; // obtenemos el item segun el index de la iteracion (recorrido)
       
          const row = rowsToInsert[index]; // obtenemos la primera fila segun el index de la iteracion (recorrido)
    
          //  los valores de itemData seran asignados a "row" (fila actual en la iteracion)
    
          row.values = [
            itemData.codigoDeBarra,
            itemData.num_lotes,
            itemData.laboratorio,
            itemData.nombreymarcaunico, 
            itemData.existencia,
            itemData.ultima_compra,
            itemData.proveedor,
            itemData.rotacion_compras,
            itemData.ultima_venta,
            itemData.cliente,
            itemData.rotacion_x_ventas,
            itemData.tipoDeProducto,
            
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
