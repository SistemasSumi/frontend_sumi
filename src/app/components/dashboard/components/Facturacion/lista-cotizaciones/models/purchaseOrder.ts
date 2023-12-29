export class PurchaseOrder {
    id:          number;
    numeracion:  Numeracion;
    proveedor:   Proveedor;
    formaPago:   FormaPago;
    numero:      string;
    consecutivo: number;
    prefijo:     string;
    fecha:       Date;
    observacion: string;
    subtotal:    number;
    iva:         number;
    retencion:   number;
    ingresada:   boolean;
    descuento:   number;
    total:       number;
    usuario:     number;
    productos:   detalle[];



}



interface FormaPago {
    id:     number;
    nombre: string;
    plazo:  number;
}

interface Numeracion {
    id:                number;
    tipoDocumento:     string;
    nombre:            string;
    prefijo:           string;
    proximaFactura:    number;
    desde:             number;
    hasta:             number;
    resolucion:        string;
    fecha_vencimiento: Date;
    estado:            boolean;
    empresa:           number;
    numero:            string;
}

interface detalle {
    id:          number;
    cantidad:    number;
    valorUnidad: number;
    descuento:   number;
    iva:         number;
    orden:       number;
    producto:    ProductoProducto;
}

export interface ProductoProducto {
    id:     number;
    nombre: string;
    codigo: string;
    unidad: string;
}

interface Proveedor {
    id             : number;
    nombreComercial: string;
    tipoDocumento  : string;
    documento      : string;
    telefono       : string;
    direccion      : string;
}

