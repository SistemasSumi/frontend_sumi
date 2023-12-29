import { FormaPagoOrder } from "./FormaPagoOrder";
import { ProveedorOrder } from "./ProveedorOrder";

export class BasicPurchaseOrder {

    id:          number;
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
    numeracion:  number;
    proveedor:   ProveedorOrder;
    formaPago:   FormaPagoOrder;
    usuario:     string;

    constructor(){}

}
