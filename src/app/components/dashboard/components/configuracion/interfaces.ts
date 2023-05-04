export interface Empresa {
    id:           number;
    datosFE:      DatosFE;
    logo:         string;
    slogan:       string;
    razon_social: string;
    correo:       string;
    departamento: Departamento;
    municipio:    Municipio;
    nit:          string;
    telefono:     string;
}

export interface DatosFE {
    id:                 number;
    ambiente:           number;
    nit:                string;
    dv:                 string;
    actividadEconomica: number;
    obligaciones:       string;
    nombreComercial:    string;
    tipoPersona:        number;
    prefijo:            string;
    numeracionMin:      number;
    numeracionMax:      number;
    fechaInicioFE:      Date;
    fechaFinalFE:       Date;
    resolucionFE:       string;
    registroMercantil:  string;
    nombreContacto:     string;
    telefonoContacto:   string;
    correoContacto:     string;
}

export interface Departamento {
    id:           number;
    codigo:       string;
    departamento: string;
}

export interface Municipio {
    id:           number;
    codigo:       string;
    municipio:    string;
    departamento: number;
}

export interface FormaPago {
    id:           number;
    nombre:       string;

}



export interface Terceros {
    idTercero:          number;
    fecha_creacion:     Date;
    fecha_modificacion: Date;
    estado:             boolean;
    tipoDocumento:      string;
    documento:          string;
    dv:                 string;
    nombreComercial:    string;
    nombreContacto:     string;
    direccion:          string;
    telefonoContacto:   string;
    correoContacto:     string;
    vendedor:           string;
    formaPago:          FormaPago;
    plazo:              string;
    tipoPersona:        number;
    regimen:            number;
    obligaciones:       string;
    matriculaMercantil: string;
    tipoRegimen:        string;
    reteICA:            number;
    reteFuente:         number;
    reteCree:           number;
    isCliente:          boolean;
    isProveedor:        boolean;
    isContabilidad:     boolean;
    isCompras:          boolean;
    isPos:              boolean;
    isElectronico:      boolean;
    montoCredito:       number;
    usuario:            number;
    empresa:            number;
    departamento:       Departamento;
    municipio:          Municipio;
}
