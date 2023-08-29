import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PermisosUsuario } from 'src/app/components/auth/permisosUsuario';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';


@Injectable({
  providedIn: 'root'
})
export class DarDeAltaGuard implements CanActivate {

  permisos:PermisosUsuario;
  metodos:MetodosShared = new MetodosShared();
  constructor(private auth: SeguridadService,
    private router: Router) {
      this.permisos = this.auth.currentUser.getPermisos()
      // console.log(this.permisos)
  }
  canActivate(): boolean {
    

  if(this.permisos){
    if(this.permisos.facturacion.darDeAltaFactura || this.permisos.superusuario){
       return true;
  
    }else{
      this.metodos.AlertDenegado('NO TIENE LOS PERMISOS ADECUADOS');
      return false;
  
    }

  }else{
    this.router.navigate(['/home']);
  }


  
  
 }
  
}
