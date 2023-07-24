import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { DbService } from '../db.service';
import { cobrosPermisos, contabilidadPermisos, empleadosPermisos, facturacionPermisos, inventarioPermisos, pagosPermisos, PermisosUsuario } from '../permisosUsuario';
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
      console.log(resp)

      if(resp){
        this.cargarPermisos(resp.username);
      }else{
        
      }
    })
  }




  cargarPermisos(username) {
    console.log(username)
    this.db.getDoc('permisos',username).subscribe((resp:PermisosUsuario) => {
      
      console.log(resp);
      this.permisos = resp;
      console.log(this.permisos);
    })
  }

  initPermisosDefault(){

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



    let permisos = {
      superusuario:false,
      wtablas:false,
      contabilidad:this.contabilidad,
      facturacion:this.facturacion,
      inventario:this.inventario,
      pagos:this.pagos,
      cobros:this.cobros,
      empleados:this.empleados

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
