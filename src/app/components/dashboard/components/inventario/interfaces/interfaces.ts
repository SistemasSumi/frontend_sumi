import { Empresa } from "../../configuracion/interfaces";

export interface Unidades {
    id:     number;
    nombre: string;
}
export interface Marcas {
    id:     number;
    nombre: string;
}
export interface Bodegas {
    id:     number;
    nombre: string;
}

export interface Productos {
    id:                number;
    unidad:            Unidades;
    marca:             Marcas;
    bodega:            Bodegas;
    nombre:            string;
    invima:            string;
    cum:               string;
    habilitado:        boolean;
    iva:               number;
    codigoDeBarra:     string;
    creado:            Date;
    modificado:        Date;
    nombreymarcaunico: string;
    empresa:Empresa;
    usuario:           number;
}



export interface OrdenDeCompra {
    id:                 number;
    productos:          OrdenCompraDetalle[];
    fecha_creacion:     Date;
    fecha_modificacion: Date;
    estado:             boolean;
    iva:                number;
    descuento:          number;
    retencion:          number;
    total:              number;
    observaciones:      string;
    usuario:            number;
    empresa:            Empresa;
    tercero:            number;
}



export interface OrdenCompraDetalle {
    id?         : number;
    orden?      : string;
    producto   : Productos;
    cantidad   : number;
    valorUnidad: number;
    descuento  : number;
    iva        : number;
    total      : number; 
}