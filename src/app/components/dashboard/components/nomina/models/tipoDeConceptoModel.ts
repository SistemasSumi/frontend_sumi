export class TipoDeConceptoModel {
    id       : number;
    conceptos: Concepto[];
    nombre   : string;

}


interface Concepto {
    id           : number;
    nombre       : string;
    valor        : number;
    empleado     : number;
    empleador    : number;
    cuenta       : any;
    contrapartida: any;
    tipo         : number;
    isEdit?      : boolean;
}

