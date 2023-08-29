import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { DbService } from '../db.service';
import { cobrosPermisos, contabilidadPermisos, empleadosPermisos, facturacionPermisos, informesPermisos, inventarioPermisos, pagosPermisos, PermisosUsuario, settingsPermisos } from '../permisosUsuario';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-PermisosUsuarios',
  templateUrl: './PermisosUsuarios.component.html',
  styleUrls: ['./PermisosUsuarios.component.css']
})
export class PermisosUsuariosComponent implements OnInit,OnDestroy {
  
  usuario:UserModel;
  permisos:PermisosUsuario;

  contabilidad: contabilidadPermisos;
  facturacion : facturacionPermisos;
  inventario  : inventarioPermisos;
  cobros      : cobrosPermisos;
  pagos       : pagosPermisos;
  empleados   : empleadosPermisos;
  settings    : settingsPermisos;
  informes    : informesPermisos



 sub:Subscription 

  constructor(private toastr:ToastrService,private db:DbService,private auth:SeguridadService,private router:Router) { }
  
  
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

 
  
  

  ngOnInit() {
    this.permisos = this.initPermisosDefault();
    this.sub = this.auth.SubjectdataEditUser.subscribe(resp => {
      this.usuario = resp;

      if(resp){
        this.cargarPermisos(resp.username);
      }else{
        
      }
    })
  }




  cargarPermisos(username) {
    this.db.getDoc('permisos',username).subscribe((resp:PermisosUsuario) => {
      
      this.permisos = resp;
    })
  }

  initPermisosDefault(){


    this.settings = {
      crearUser             : false,
      verUser               : false,
    }

    this.informes = {
      inv_inventario         : false,
      inv_inventarioVencido  : false,
      oc_comprasDetalladas   : false,
      oc_rotacionProductos   : false,
      oc_retenciones         : false,
      fac_rotacionProductos  : false,
      fac_ventasDetalladas   : false,
      fac_ventasXVendedor    : false,
      fac_retenciones        : false,
      conta_balancePrueba    : false,
      conta_EstadoFinanciero : false,
      conta_EstadoResultado  : false,
      conta_libroAux         : false,
      conta_cxc              : false,
      conta_cxp              : false,
      conta_abonosRecibidos  : false,
      cliente_estadoCartera  : false,
      cliente_carteraVencida : false,
      cliente_listado        : false,
      proveedor_estadoCartera: false,
      proveedor_listado      : false,
    }

    this.contabilidad = {
      puc                  : false,
      comprobantesContables: false,
      conciliacion         : false,
      informes             : false,
      libroAux             : false,
      traslados            : false
    }

    this.facturacion = {
      cotizacion  : false,
      crear       : false,
      despachos   : false,
      listado     : false,
      proforma    : false,
      notaDebitoV : false,
      notaCreditoV: false,
      darDeAltaFactura:false,
      firmarFactura:false,

    }

    this.inventario = {
      bodegas          : false,
      orden            : false,
      crearOrden       : false,
      ingresarOrden    : false,
      crearNotaCredito : false,
      productos        : false,
      listadoProductos : false,
      notaCredito      : false,
      ajuste           : false,
      consumo          : false,
      kardex           : false,
    } 
    this.pagos = {
        cxp    : false,
        egresos: false,
        crear  : false,   
        pagos:false,
    } 
    this.cobros = {
        cxc    : false,
        ingreso: false,
        crear  : false,   
    } 
    this.empleados = {
        crear  : false,
        listado: false,
      
    } 



    let permisos:PermisosUsuario = {
      superusuario:false,
      wtablas:false,
      contabilidad:this.contabilidad,
      facturacion:this.facturacion,
      inventario:this.inventario,
      pagos:this.pagos,
      cobros:this.cobros,
      empleados:this.empleados,
      informes:this.informes,
      settings:this.settings,

    }

    return  permisos;


  }

  guardarPermisos(){
    this.db.createDoc(this.permisos,'permisos/',this.usuario.username).then(() =>{
      this.toastr.success('permisos creados');
      this.router.navigateByUrl('settings/listado-usuarios');
    });
  }

}
