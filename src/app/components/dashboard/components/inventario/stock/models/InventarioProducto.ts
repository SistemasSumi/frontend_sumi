import { Bodegas } from "./Bodega";
import { Producto } from "./producto";

export class InventarioProducto {
    id         : number;
    idProducto : Producto;
    bodega     : Bodegas;
    vencimiento: Date;
    valorCompra: number;
    unidades   : number;
    lote       : string;
    laboratorio: string;
    estado     : boolean;

    constructor(){}
}
