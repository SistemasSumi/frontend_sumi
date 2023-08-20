import { Usuario } from "src/app/interfaces/interfaces";
import { UserModel } from "src/app/models/user.model";

export interface PermisosUsuario {
    superusuario?: boolean,
    contabilidad?: contabilidadPermisos,
    facturacion ?: facturacionPermisos,
    inventario  ?: inventarioPermisos,
    pagos       ?: pagosPermisos,
    cobros      ?: cobrosPermisos,
    empleados   ?: empleadosPermisos,
    wtablas     ?: boolean
    settings    ?: settingsPermisos,
    informes    ?: informesPermisos,


}



export interface settingsPermisos {
    crearUser             ?: boolean,
    verUser               ?: boolean,
}

export interface informesPermisos {
    inv_inventario?       : boolean,
    inv_inventarioVencido?: boolean,

    oc_comprasDetalladas?: boolean,
    oc_rotacionProductos?: boolean,
    oc_retenciones?: boolean,


    fac_rotacionProductos?: boolean,
    fac_ventasDetalladas?: boolean,
    fac_ventasXVendedor?: boolean,
    fac_retenciones?: boolean,


    conta_balancePrueba?: boolean,
    conta_EstadoFinanciero?: boolean,
    conta_EstadoResultado?: boolean,
    conta_libroAux?: boolean,
    conta_cxc?: boolean,
    conta_cxp?: boolean,
    conta_abonosRecibidos?: boolean,

    cliente_estadoCartera?:boolean,
    cliente_carteraVencida?:boolean,
    cliente_listado?:boolean,


    proveedor_estadoCartera?:boolean,
    proveedor_listado?:boolean,
}
export interface contabilidadPermisos {
    puc                   ?: boolean,
    comprobantesContables ?: boolean,
    informes              ?: boolean,
    libroAux              ?: boolean,
    conciliacion          ?: boolean,
    traslados             ?: boolean

} 
export interface facturacionPermisos {
    crear                ?: boolean,
    proforma             ?: boolean,
    cotizacion           ?: boolean,
    listado              ?: boolean,
    despachos            ?: boolean, 
    notaCreditoV          ?: boolean,
    notaDebitoV           ?: boolean,
    firmarFactura?:boolean,
    darDeAltaFactura?:boolean,
} 
export interface inventarioPermisos {
    bodegas              ?: boolean,
    orden                ?: boolean,
    crearOrden           ?: boolean,
    ingresarOrden        ?: boolean,
    productos            ?: boolean,
    listadoProductos     ?: boolean,
    notaCredito          ?: boolean,
    crearNotaCredito     ?: boolean,
    ajuste               ?: boolean,
    consumo              ?: boolean,
    kardex               ?: boolean,
} 
export interface pagosPermisos {
    cxp?    : boolean,
    egresos?: boolean,
    crear?  : boolean,   
    pagos?  : boolean,   
} 
export interface cobrosPermisos {
    cxc?    : boolean,
    ingreso?: boolean,
    crear?  : boolean,   
} 
export interface empleadosPermisos {
    crear?  : boolean,
    listado?: boolean,
    
  
} 


export interface user_noti {
    avatar  : string,
    nombre: string,
    username:string
    
  
} 

type TipoNotificacion =  'NORMAL' | 'PRECIOS_BAJOS' | 'DESPACHOS' | 'FACTURA' | 'INGRESO' ;

/**
 * Interfaz para representar una notificación.
 */
export interface Notificaciones {
    id:string;
    usuario: user_noti; // Usuario que generó la notificación
    mensaje:string;
    grupo?: string; // Grupo al que pertenece la notificación
    data?: { [key: string]: any }; // Datos adicionales de la notificación
    sender_user: string; // Usuario que envió la notificación
    receiver_users: string[]; // Usuarios receptores de la notificación
    fecha: number; // Fecha de creación de la notificación
    tipo: TipoNotificacion; // Tipo de la notificación (tipo1, tipo2, tipo3)
    vistas?: string[]; // Usuarios que han visto la notificación
  }
