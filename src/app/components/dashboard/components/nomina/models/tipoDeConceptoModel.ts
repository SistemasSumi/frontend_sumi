import { ModelPuc } from "../../Contabilidad/models/ModelPuc";

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
    cuenta       : ModelPuc;
    contrapartida: ModelPuc;
    tipo         : number;
    isEdit?      : boolean;
}

