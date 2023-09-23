
import * as moment from 'moment';
import { Borders, ImagePosition, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { BasicPurchaseOrder } from '../../../components/inventario/ordenDeCompra/models/BasicPurchaseOrder';
import { logoSumi } from '../../logoSumi';
import { Cell } from 'jspdf-autotable';


export class ventasXVendedorIndividual {
    private _workbook!: Workbook;



    public async dowloadExcel(dataExcel: any[]): Promise<void> {
        this._workbook = new Workbook();
    
        this._workbook.creator = 'Sarp Soft';
    
        this._createHeroTable(dataExcel);
    
        this._workbook.xlsx.writeBuffer().then((data) => {
          const blob = new Blob([data]);
          fs.saveAs(blob, 'ventasXVendedorIndividual.xlsx');
        });
    }


    private async _createHeroTable(data: any): Promise<void> {
        // CREAMOS LA PRIMERA HOJA
        const sheet = this._workbook.addWorksheet(data.cliente);
        sheet.properties.showGridLines = false;

        
    
        // ESTABLECEMOS EL ANCHO Y ESTILO DE LAS COLUMNAS
        sheet.getColumn('A').width = 100;
        sheet.getColumn('B').width = 30;
        sheet.getColumn('C').width = 30;
        sheet.getColumn('A').alignment = {horizontal:'left'};
        sheet.getColumn('B').alignment = {horizontal:'right'};
        sheet.getColumn('B').numFmt = '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)';
        sheet.getColumn('C').alignment = {horizontal:'center'};
      

    
        sheet.columns.forEach((column) => {
          column.alignment = { vertical: 'middle', wrapText: true };
        });
    
      





        //CREAMOS LOS TITULOS PARA LA CABECERA
    
        const headerRow = sheet.getRow(1);
        // ESTAMOS JALANDO TODAS LAS COLUMNAS DE ESA FILA, "A","B","C"..etc
        headerRow.values = [
          'CLIENTE - NOMBRE COMERCIAL', // column A
          'MONTO VENDIDO', // column B
          'FACTURAS', // column C
          
        ];
        


        headerRow.font = { bold: true, size: 12 };
        headerRow.alignment = { horizontal:'center' };
        headerRow.font.color = {
            argb:'FFFFFF'
          
            
        };
        [ 'A1',
          'B1',
          'C1',
          
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
          from: { row: 1, column: 1 },
          to: { row: 1, column: 2 },
        };

        
        
     
        
       
        // INSERTAMOS LOS DATOS EN LAS RESPECTIVAS COLUMNAS
       
        const rowsToInsert = sheet.getRows(2, data.ventas.length)!;
       
    

        for (let index = 0; index < rowsToInsert.length; index++) {
          const itemData = data.ventas[index]; // obtenemos el item segun el index de la iteracion (recorrido)
          // console.log(itemData)
          const row = rowsToInsert[index]; // obtenemos la primera fila segun el index de la iteracion (recorrido)
    
          //  los valores de itemData seran asignados a "row" (fila actual en la iteracion)
    
          row.values = [
            itemData.cliente__nombreComercial,
            
            itemData.total_venta,
            itemData.num_ventas
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
        

      }
}
