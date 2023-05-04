export class ModelAsiento {
    id:           number;
    detalle:      Detalle[];
    numero:       string;
    fecha:        Date;
    mes:          string;
    anio:         string;
    concepto:     string;
    totalDebito:  number;
    totalCredito: number;
    empresa:      number;
    usuario:      number;

}


interface Detalle {
    id:      number;
    debito:  number;
    credito: number;
    fecha:   Date;
    mes:     string;
    anio:    string;
    asiento: number;
    tercero: Tercero;
    cuenta:  Cuenta;
}


interface Tercero {
    id:              number;
    nombreComercial: string;
}


interface Cuenta {
    id:               number;
    tipoDeCuenta:     string;
    naturaleza:       string;
    nombre:           string;
    codigo:           number;
    estadoFinanciero: boolean;
    estadoResultado:  boolean;
    padre:            null;
}
