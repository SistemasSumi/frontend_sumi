export interface PermisosUsuario {
    contabilidad:contabilidadPermisos
}



export interface contabilidadPermisos {
    puc                  : boolean,
    comprobantesContables: boolean,
    informes             : boolean,
    libroAux             : boolean,
    conciliacion         : boolean,
} 