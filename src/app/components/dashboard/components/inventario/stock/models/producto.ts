import { ModelImpuestos } from "../../../configuracion/models/ModelImpuestos";
import { Bodegas } from "./Bodega";
import { TipoProducto } from "./tipoProducto";

export class Producto {
    id               ?: number;
    tipoProducto     ?: TipoProducto;
    bodega           ?: Bodegas;
    nombre           ?: string;
    marca            ?: string;
    Filtro           ?: string;
    invima           ?: string;
    cum              ?: string;
    valorCompra      ?: number;
    valorVenta       ?: number;
    valorventa1      ?: number;
    valorventa2      ?: number;
    fv               ?: boolean;
    regulado         ?: boolean;
    valorRegulacion  ?: number;
    stock_inicial    ?: number;
    stock_min        ?: number;
    stock_max        ?: number;
    habilitado       ?: boolean;
    codigoDeBarra    ?: string;
    unidad           ?: string;
    laboratorio      ?: string;
    creado           ?: Date;
    modificado       ?: Date;
    nombreymarcaunico?: string;
    impuesto         ?: ModelImpuestos;
    usuario          ?: number;

    constructor(){}
}
