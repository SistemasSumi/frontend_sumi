export class InventoryEntry {
    id:          number;
    numeracion:  Numeracion;
    orden:       Orden;
    proveedor:   IngresoProveedor;
    formaPago:   FormaPago;
    usuario:     Usuario;
    productos:   Producto[];
    numero:      string;
    consecutivo: number;
    prefijo:     string;
    factura:     string;
    fecha:       Date;
    observacion: string;
    subtotal:    number;
    iva:         number;
    retencion:   number;
    descuento:   number;
    total:       number;
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

interface Orden {
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
    proveedor:   OrdenProveedor;
    formaPago:   ProductoClass;
    usuario:     string;
}


interface ProductoClass {
    id               : number;
    nombreymarcaunico: string;
    codigoDeBarra    : string;
    unidad           : string;
}

interface OrdenProveedor {
    id:              number;
    nombreComercial: string;
    correo:          string;
}


interface Producto {
    id:               number;
    cantidad:         number;
    fechaVencimiento: Date;
    laboratorio?:      string;
    lote:             string;
    valorUnidad:      number;
    descuento:        number;
    iva:              number;
    subtotal:         number;
    total:            number;
    ingreso:          number;
    producto:         ProductoClass;
}

interface IngresoProveedor {
    id:                       number;
    tipoDocumento:            string;
    documento:                string;
    dv:                       string;
    nombreComercial:          string;
    nombreContacto:           string;
    direccion:                string;
    telefonoContacto:         null;
    correoContacto:           string;
    correoFacturas:           string;
    tipoPersona:              string;
    regimen:                  string;
    obligaciones:             string;
    matriculaMercantil:       null;
    codigoPostal:             null;
    saldoAFavorProveedor:     number;
    saldoAFavorCliente:       number;
    isRetencion:              boolean;
    isCliente:                boolean;
    isProveedor:              boolean;
    isContabilidad:           boolean;
    isCompras:                boolean;
    isPos:                    boolean;
    isElectronico:            boolean;
    montoCreditoProveedor:    number;
    montoCreditoClientes:     number;
    fecha_creacion:           Date;
    fecha_modificacion:       Date;
    estado:                   boolean;
    departamento:             string;
    municipio:                string;
    vendedor:                 number;
    formaPago:                number;
    cuenta_x_cobrar:          number;
    cuenta_x_pagar:           number;
    cuenta_saldo_a_cliente:   number;
    cuenta_saldo_a_proveedor: number;
}

interface Usuario {
    id:         number;
    email:      string;
    username:   string;
    avatar_url: string;
    nombres:    string;
    apellidos:  string;
    genero:     string;
    empresa:    null;
}
