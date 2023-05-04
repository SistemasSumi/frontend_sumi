import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { contabilidadPermisos, PermisosUsuario } from '../components/auth/permisosUsuario';
import { SeguridadService } from '../components/auth/seguridad.service';
import { MetodosShared } from '../components/shared/metodos/metodos';

@Injectable({
  providedIn: 'root'
})
export class ContaGuard implements CanActivate {

  permisos:PermisosUsuario;
  metodos:MetodosShared = new MetodosShared();
  constructor(private auth: SeguridadService,
    private router: Router) {
      this.permisos = this.auth.currentUser.getPermisos()
      console.log(this.permisos)
  }
  canActivate(): boolean {
    



  if(this.permisos.contabilidad.puc){
     return true;

  }

  // this.router.navigate(['/login'])
  this.metodos.AlertDenegado('ACCESO DENEGADO');
  return false;
  
  
 }
  
}
