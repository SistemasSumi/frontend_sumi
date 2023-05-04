export class ModelTerceroBasic {
    id                      : number;
    tipoDocumento           : string;
    documento               : string;
    dv                      : string;
    nombreComercial         : string;
    nombreContacto          : string;
    direccion               : string;
    departamento            : number;
    municipio               : number;
    telefonoContacto        : string;
    correoContacto          : string;
    correoFacturas          : string;
    vendedor                : number;
    formaPago               : number;
    tipoPersona             : number
    regimen                 : string;
    matriculaMercantil      : string;
    tipoRegimen             : string;
    codigoPostal            : string;
    isCliente               : boolean;
    isProveedor             : boolean;
    isContabilidad          : boolean;
    isCompras               : boolean;
    isPos                   : boolean;
    isElectronico           : boolean;
    cuenta_x_cobrar         : number;
    cuenta_x_pagar          : number;
    cuenta_saldo_a_cliente  : number;
    cuenta_saldo_a_proveedor: number;
    
    constructor(){}
}
