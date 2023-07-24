export class InvoceReport {
    id:               number;
    numeracion:       Numeracion;
    formaPago:        FormaPago;
    cliente:          Cliente;
    productos:        ProductoElement[];
    retenciones:      Retenciones[];
    impuestos:        Impuestos[];
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
    vendedor:         Vendedor;
    usuario:          string;
    enviadaDian:      boolean;
}


export interface Cliente {
    id                      ?: number;
    listaPrecios            ?: ListaPrecios;
    tipoDocumento           ?: string;
    documento               ?: string;
    dv                      ?: string;
    nombreComercial         ?: string;
    nombreContacto          ?: string;
    direccion               ?: string;
    telefonoContacto        ?: string;
    correoContacto          ?: string;
    correoFacturas          ?: string;
    tipoPersona             ?: any;
    regimen                 ?: string;
    obligaciones            ?: string;
    matriculaMercantil      ?: null | any;
    codigoPostal            ?: string;
    saldoAFavorProveedor    ?: number;
    saldoAFavorCliente      ?: number;
    isRetencion             ?: boolean;
    isCliente               ?: boolean;
    isProveedor             ?: boolean;
    isContabilidad          ?: boolean;
    isCompras               ?: boolean;
    isPos                   ?: boolean;
    isElectronico           ?: boolean;
    montoCreditoProveedor   ?: number;
    montoCreditoClientes    ?: number;
    fecha_creacion          ?: Date;
    fecha_modificacion      ?: Date;
    estado                  ?: boolean;
    departamento            ?: any;
    municipio               ?: any;
    vendedor                ?: any;
    formaPago               ?: any;
    cuenta_x_cobrar         ?: number;
    cuenta_x_pagar          ?: null | any;
    cuenta_saldo_a_cliente  ?: number;
    cuenta_saldo_a_proveedor?: null | any;
}

 interface ListaPrecios {
    id:           number;
    tipo:         string;
    precio1:      number;
    precio2:      number;
    precio3:      number;
    precioMinimo: number;
}

 interface FormaPago {
    id:     number;
    nombre: string;
    plazo:  number;
}

 interface Impuestos {
    id:         number;
    impuesto:  Impuesto;
    base:       number;
    procentaje: number;
    total:      number;
    factura:    number;

}
 interface Impuesto {
    id:         number;
    nombre:     string;
    porcentaje: number;
    base:       number;
    compras:    number;
    ventas:     number;

}
 interface Retenciones {
    id:         number;
    retencion:  retencion;
    base:       number;
    procentaje: number;
    total:      number;
    factura:    number;

}

interface retencion {
    id:         number;
    nombre:     string;
    porcentaje: number;
    base:       number;
    compras:    number;
    ventas:     number;
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
    textoResolucion:        string;
    fecha_vencimiento: Date;
    estado:            boolean;
    empresa:           number;
    numero:            string;
}

interface ProductoElement {
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
    invima?:           string;
    cum?:              string;
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
 interface Vendedor {
    id:     number;
    nombre: string;
}

 interface TipoProducto {
    id:     number;
    nombre: string;
    bodega: number;
    c_tipo: number;
}
