import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../components/auth/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private auth: SeguridadService,
    private router: Router) {

}
canActivate(): boolean {

  if(this.auth.estaLogueado()){
     return true;

  }

  this.router.navigate(['/login'])
  return false;
  
  
 }
  
}
