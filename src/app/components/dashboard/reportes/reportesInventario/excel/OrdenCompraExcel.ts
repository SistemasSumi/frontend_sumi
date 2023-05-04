
import * as moment from 'moment';
import { ImagePosition, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { BasicPurchaseOrder } from '../../../components/inventario/ordenDeCompra/models/BasicPurchaseOrder';
import { logoSumi } from '../../logoSumi';


export class OrdenCompraExcel {
    private _workbook!: Workbook;



    public async dowloadExcel(dataExcel: BasicPurchaseOrder[]): Promise<void> {
        this._workbook = new Workbook();
    
        this._workbook.creator = 'Sarp Soft';
    
        this._createHeroTable(dataExcel);
    
        this._workbook.xlsx.writeBuffer().then((data) => {
          const blob = new Blob([data]);
          fs.saveAs(blob, 'Ordenes.xlsx');
        });
    }


    private async _createHeroTable(data: BasicPurchaseOrder[]): Promise<void> {
        // CREAMOS LA PRIMERA HOJA
        const sheet = this._workbook.addWorksheet('Ordenes de compras');
    
        // ESTABLECEMOS EL ANCHO Y ESTILO DE LAS COLUMNAS
        sheet.getColumn('A').width = 15;
        sheet.getColumn('B').width = 20;
        sheet.getColumn('C').width = 20;
        sheet.getColumn('D').width = 70;

        sheet.getColumn('E').width = 20;
        sheet.getColumn('F').width = 20;
        sheet.getColumn('G').width = 20;
        sheet.getColumn('H').width = 20;
  
        sheet.getColumn('E').alignment = {horizontal:'right'};
        sheet.getColumn('F').alignment = {horizontal:'right'};
        sheet.getColumn('G').alignment = {horizontal:'right'};
        sheet.getColumn('H').alignment = {horizontal:'right'};
        

    
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
        const titleCell = sheet.getCell('D3');
        titleCell.value = 'SUMIPROD DE LA COSTA S.A.S.';
        titleCell.style.font = { bold: true, size: 24 };
        titleCell.style.alignment = {horizontal:'center'}


        const NITCell = sheet.getCell('D4');
        NITCell.value = 'NIT: 901648084-9';
        NITCell.style.font = { bold: true, size: 14 };
        NITCell.style.alignment = {horizontal:'center'}

        const regimenCell = sheet.getCell('D5');
        regimenCell.value = 'Régimen:  Responsable de IVA';
        regimenCell.style.font = { bold: true, size: 11 };
        regimenCell.style.alignment = {horizontal:'center'}


        const tipoPersonaCell = sheet.getCell('D6');
        tipoPersonaCell.value = 'Persona Judírica';
        tipoPersonaCell.style.font = { bold: true, size: 11 };
        tipoPersonaCell.style.alignment = {horizontal:'center'}


        const direccionCell = sheet.getCell('D7');
        direccionCell.value = 'CALLE 44B #21G-11 Urb Santa Cruz, Santa Marta';
        direccionCell.style.font = { bold: true, size: 11 };
        direccionCell.style.alignment = {horizontal:'center'}

        const telefonosCell = sheet.getCell('D8');
        telefonosCell.value = 'Tel: (5) 432-7722 - Cel: (301) 302-2986';
        telefonosCell.style.font = { bold: true, size: 11 };
        telefonosCell.style.alignment = {horizontal:'center'}
    
        const correoCell = sheet.getCell('D9');
        correoCell.value = 'Email: sumiprodelacosta@gmail.com';
        correoCell.style.font = { bold: true, size: 11 };
        correoCell.style.alignment = {horizontal:'center'}

        const tituloReporteCell = sheet.getCell('D11');
        tituloReporteCell.value = 'REPORTE ORDENES DE COMPRA';
        tituloReporteCell.style.font = { bold: true, size: 18 };
        tituloReporteCell.style.alignment = {horizontal:'center'}
        tituloReporteCell.style.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '41B6FF' },
            bgColor: { argb: '41B6FF' }
        }


 


        //CREAMOS LOS TITULOS PARA LA CABECERA
    
        const headerRow = sheet.getRow(13);
        // ESTAMOS JALANDO TODAS LAS COLUMNAS DE ESA FILA, "A","B","C"..etc
        headerRow.values = [
          'Orden N°', // column B
          'Forma de pago', // column D
          'Fecha Creación', // column E
          'Proveedor', // column C
          'Subtotal', // column F
          'Iva', // column 
          'Descuento', // column F
          'Total', // column F
        ];
        


        headerRow.font = { bold: true, size: 12 };
        headerRow.alignment = { horizontal:'center' };
        headerRow.font.color = {
            argb:'FFFFFF'
          
            
        };
        ['A13',
        'B13',
        'C13',
        'D13',
        'E13',
        'F13',
        'G13',
        'H13',
        ].map(key => {
            sheet.getCell(key).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '41B6FF' },
            bgColor: { argb: '41B6FF' }
          };
        });
        // headerRow.fill = {
        //     type: 'pattern',
        //     pattern: 'solid',
        //     fgColor: { argb: '41B6FF' },
        //     bgColor: { argb: '41B6FF' }
        // }
    
        // INSERTAMOS LOS DATOS EN LAS RESPECTIVAS COLUMNAS
        const rowsToInsert = sheet.getRows(14, data.length)!;
    

        for (let index = 0; index < rowsToInsert.length; index++) {
          const itemData = data[index]; // obtenemos el item segun el index de la iteracion (recorrido)
          const row = rowsToInsert[index]; // obtenemos la primera fila segun el index de la iteracion (recorrido)
    
          //  los valores de itemData seran asignados a "row" (fila actual en la iteracion)
    
          row.values = [
            itemData.numero,
            itemData.formaPago.nombre, 
            moment(itemData.fecha).format("DD/MM/YYYY"),
            itemData.proveedor.nombreComercial, 
            itemData.subtotal, 
            itemData.iva, 
            itemData.descuento, 
            itemData.total, 
            
      
          ];
    
          
        }
      }
}
