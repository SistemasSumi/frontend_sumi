import { TipoProducto } from "./tipoProducto";

export interface Bodegas {
    id:              number;
    nombre:          string;
    tiposDeProducto?: TipoProducto[];
}

