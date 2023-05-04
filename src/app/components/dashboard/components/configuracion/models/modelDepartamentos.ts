import { ModelMunicipios } from "./modelMunicipios";

export class ModelDepartamentos {
    id          : number;
    codigo      : string;
    departamento: string;
    municipios? : ModelMunicipios[];

    constructor(){}
}
