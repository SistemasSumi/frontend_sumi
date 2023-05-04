export interface Empresa {
    id_empresa:         number;
    usuario:            Usuario;
    cargos:             Cargo[];
    areas:              Area[];
    operador_pila:      OperadorPila;
    logo:               string;
    slogan:             string;
    razon_social:       string;
    correo:             string;
    tipo_documento:     string;
    numero_documento:   string;
    telefono:           number;
    frecuencia_pago:    string;
    medio_pago:         string;
    banco:              string;
    tipo_cuenta:        string;
    numero_cuenta:      string;
    fecha_creacion:     Date;
    fecha_modificacion: Date;
    estado:             boolean;
}


export interface Area {
    id_area:           number;
    nombre:             string;
    fecha_creacion:     Date;
    fecha_modificacion: Date;
    estado:             boolean;
    usuario:            number;
}

export interface Cargo {
    id_cargo:           number;
    nombre:             string;
    fecha_creacion:     Date;
    fecha_modificacion: Date;
    estado:             boolean;
    usuario:            number;
}

export interface OperadorPila {
    id_operador:    number;
    operador:       string;
    pago_exonerado: boolean;
    ley590:         boolean;
    ley1429:        boolean;
    decreto558:     boolean;
}

export interface Usuario {
    id:               number;
    genero:           string;
    password:         string;
    last_login:       Date;
    is_superuser:     boolean;
    username:         string;
    email:            string;
    nombres:          string;
    apellidos:        string;
    avatar_url:       string;
    is_staff:         boolean;
    is_active:        boolean;
    groups:           any[];
    user_permissions: any[];
}

export interface Cotizacion {
    id_cotizacion:      number;
    prodcutos:        Detalle[];
    fecha_creacion:     Date;
    fecha_modificacion: Date;
    estado:             boolean;
    cliente:            string;
    observacion:        string;
    iva:                string;
    descuento:          string;
    total:              string;
    usuario:            number;
}

export interface Detalle {
    id:          number;
    codigo:      string;
    precio:      string;
    iva:         string;
    total:       string;
    descuento:   string;
    cantidad:    number;
    id_producto: number;
}

export interface Tarifas {
    id_tarifa:      number;
    conductor:      Conductor;
    taxi:           Taxi;
    turno:          Turno;
    valor:          string;
    saldo:          string;
    fecha_creacion: Date;
}

export interface Conductor {
    id_conductor:   number;
    nombres:        string;
    apellidos:      string;
    tipo_documento: string;
    documento:      string;
    correo:         string;
    direccion:      string;
    telefono:       number;
}

export interface Taxi {
    id_taxi: number;
    placa:   string;
    soat:    Date;
    tecno:   Date;
    km:      number;
    km_fin:  number;
    modelo:  string;
}

export interface Turno {
    id_turno:  number;
    turno:     string;
    tarifa:    string;
    conductor: number;
    taxi:      number;
}


