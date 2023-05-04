export class ModelPuc {
    id:               number;
    tipoDeCuenta:     string;
    naturaleza:       string;
    nombre:           string;
    codigo:           null | string;
    estadoFinanciero: boolean | null;
    estadoResultado:  boolean | null;
    padre:            null | string;
    grupoReporte:     null | string;


    public constructor(){}
}
