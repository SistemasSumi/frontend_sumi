export class NotaCreditoCompras {
    id:            number;
    tipoNota:      string;
    numeracion:    Numeracion;
    ingreso:       Ingreso;
    productos:     NotaCreditoComprasProducto[];
    proveedor:     IngresoProveedor;
    numero:        string;
    consecutivo:   number;
    prefijo:       string;
    tipoCorrecion: null;
    fecha:         Date;
    anulada:       boolean;
    factura:       string;
    contabilizado: boolean;
    observacion:   string;
    numeroNota:    null;
    subtotal:      number;
    iva:           number;
    retencion:     number;
    total:         number;
    usuario:       string;
}


interface Ingreso {
    id:          number;
    numeracion:  Numeracion;
    orden:       Orden;
    proveedor:   IngresoProveedor;
    formaPago:   IngresoFormaPago;
    usuario:     Usuario;
    productos:   ProductoElement[];
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

interface IngresoFormaPago {
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
    formaPago:   OrdenFormaPago;
    usuario:     string;
}

interface OrdenFormaPago {
    id:     number;
    nombre: string;
}

interface OrdenProveedor {
    id:              number;
    nombreComercial: string;
    correo:          string;
}

interface ProductoElement {
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
    producto:         ProductoProducto;
}

interface ProductoProducto {
    id:                number;
    nombreymarcaunico: string;
    codigoDeBarra:     string;
    unidad:            string;
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

interface NotaCreditoComprasProducto {
    id:          number;
    producto:    FluffyProducto;
    lote:        string;
    laboratorio?: string;
    cantidad:    number;
    valorUnidad: number;
    iva:         number;
    subtotal:    number;
    nota:        number;
}



 interface FluffyProducto {
    id:                number;
    tipoProducto:      TipoProducto;
    bodega?:           number;
    impuesto:          Impuesto;
    nombre:            string;
    Filtro:            string;
    invima:            null;
    cum:               null;
    valorCompra:       number;
    valorVenta:        number;
    valorventa1:       number;
    valorventa2:       number;
    fv:                boolean;
    regulado:          boolean;
    valorRegulacion:   number;
    stock_inicial:     number;
    stock_min:         number;
    stock_max:         number;
    habilitado:        boolean;
    codigoDeBarra:     string;
    unidad:            string;
    creado:            Date;
    modificado:        Date;
    nombreymarcaunico: string;
    usuario:           number;
}

 interface Impuesto {
    id:         number;
    nombre:     string;
    porcentaje: number;
    base:       number;
    compras:    number;
    ventas:     number;
}

 interface TipoProducto {
    id:     number;
    nombre: string;
    bodega: number;
    c_tipo: number;
}

