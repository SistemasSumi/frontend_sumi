import { ModelTerceroCompleto } from "../../../configuracion/models/ModelTerceroCompleto";
import { Bodegas } from "./Bodega";
import { Producto } from "./producto";

export class Kardex {  
    id:          number;
    producto:    Producto;
    bodega:      Bodegas;
    tercero:     ModelTerceroCompleto;
    descripcion: string;
    tipo:        string;
    unidades:    number;
    fecha:       Date;
    balance:     number;
    precio:      number;

}
