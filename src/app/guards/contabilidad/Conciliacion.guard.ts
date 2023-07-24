import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { contabilidadPermisos, PermisosUsuario } from '../../components/auth/permisosUsuario';
import { SeguridadService } from '../../components/auth/seguridad.service';
import { MetodosShared } from '../../components/shared/metodos/metodos';

@Injectable({
  providedIn: 'root'
})
export class ConciliacionGuard implements CanActivate {

  permisos:PermisosUsuario;
  metodos:MetodosShared = new MetodosShared();
  constructor(private auth: SeguridadService,
    private router: Router) {
      this.permisos = this.auth.currentUser.getPermisos()
      console.log(this.permisos)
  }
  canActivate(): boolean {
    

  if(this.permisos){
    if(this.permisos.contabilidad.conciliacion || this.permisos.superusuario){
       return true;
  
    }else{
      this.metodos.AlertDenegado('NO TIENE LOS PERMISOS ADECUADOS');
      return false;
  
    }

  }else{

    this.router.navigate(['/home']);
    // return false;
  }


  
  
 }
  
}
