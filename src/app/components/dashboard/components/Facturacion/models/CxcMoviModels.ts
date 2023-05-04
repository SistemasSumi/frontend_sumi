export class CxcMoviModels {
    id:               number;
    formaPago:        FormaPago;
    cliente:          Cliente;
    productos:        DetalleCxc[];
    consecutivo:      number;
    numero:           string;
    prefijo:          string;
    valor:            number;
    fecha:            Date;
    fechaVencimiento: Date;
    abono:            number;
    descuento:        number;
    valorDomicilio:   number;
    valorLetras:      string;
    observacion:      null;
    pagada:           boolean;
    xmlEstado:        boolean;
    cufe:             null;
    proformada:       boolean;
    qr:               null;
    statusFac:        null;
    valorIva:         number;
    valorReteFuente:  number;
    subtotal:         number;
    despachado:       boolean;
    correoEnviado:    boolean;
    numeracion:       number;
    vendedor:         number;
    usuario:          number;

    constructor(){}
}

interface listaPrecios  {
    id:number,
    tipo:string,
    precio1:number
    precio2:number
    precio3:number
    precioMinimo:number
}

 interface Cliente {
    id:                       number;
    tipoDocumento:            string;
    documento:                string;
    dv:                       string;
    nombreComercial:          string;
    nombreContacto:           string;
    direccion:                string;
    telefonoContacto:         string;
    correoContacto:           string;
    correoFacturas:           string;
    tipoPersona:              string;
    regimen:                  string;
    obligaciones:             string;
    matriculaMercantil:       string;
    codigoPostal:             string;
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
    cuenta_x_pagar:           null;
    cuenta_saldo_a_cliente:   number;
    cuenta_saldo_a_proveedor: null;
    listaPrecios:             listaPrecios;
}

 interface FormaPago {
    id:     number;
    nombre: string;
    plazo:  number;
}

 export interface DetalleCxc {
    id?:          number;
    producto:    ProductoProducto;
    valorCompra: number;
    valor:       number;
    cantidad:    number;
    vence:       string;
    lote:        string;
    laboratorio?: string;
    subtotal:    number;
    descuento:   number;
    iva:         number;
    total:       number;
    factura?:     number;
}

 interface ProductoProducto {
    id:                number;
    tipoProducto:      TipoProducto;
    bodega:            Bodega;
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

 interface Bodega {
    id:     number;
    nombre: string;
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
