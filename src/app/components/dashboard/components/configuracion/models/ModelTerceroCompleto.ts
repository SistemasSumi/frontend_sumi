import { ModelDepartamentos } from "./modelDepartamentos";
import { ModelFormasPago } from "./ModelFormasPago";
import { ModelMunicipios } from "./modelMunicipios";
import { ModelPlazosClientes } from "./ModelPlazosClientes";
import { ModelPlazosProveedor } from "./ModelPlazosProveedor";
import { ModelRetencionesTercero } from "./ModelRetencionesTercero";
import { ModelVendedor } from "./ModelVendedor";

export class ModelTerceroCompleto {
    id                      : number;
    tipoDocumento           : string;
    listaPrecios            :listaPrecios;
    documento               : string;
    dv                      : string;
    nombreComercial         : string;
    nombreContacto          : string;
    direccion               : string;
    departamento            : ModelDepartamentos;
    municipio               : ModelMunicipios;
    telefonoContacto        : string;
    correoContacto          : string;
    correoFacturas          : string;
    vendedor                : ModelVendedor;
    formaPago               : ModelFormasPago;
    tipoPersona             : number
    regimen                 : string;
    matriculaMercantil      : string;
    tipoRegimen?            : string;
    codigoPostal            : string;
    isCliente               : boolean;
    isProveedor             : boolean;
    isContabilidad          : boolean;
    isCompras               : boolean;
    isPos                   : boolean;
    isElectronico           : boolean;
    isRetencion             : boolean;
    cuenta_x_cobrar         : number;
    cuenta_x_pagar          : number;
    cuenta_saldo_a_cliente  : number;
    cuenta_saldo_a_proveedor: number;
    descuentoCliente? : ModelPlazosClientes[];
    descuentoProveedor?: ModelPlazosProveedor[];
    retencionCliente  ?: ModelRetencionesTercero[];
    retencionProveedor?: ModelRetencionesTercero[];
    
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
