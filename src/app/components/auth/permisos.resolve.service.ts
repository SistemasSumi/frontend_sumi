
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DbService } from './db.service';
import { PermisosUsuario } from './permisosUsuario';
import { SeguridadService } from './seguridad.service';

@Injectable({
 providedIn: 'root'
})
export class PermisosResolveService implements Resolve<any>{

    constructor(private auth:SeguridadService,private db:DbService) { 
        
        
    }
 resolve() : Observable<any>{
    return this.db.getDoc('permisos',this.auth.currentUser.getUsername())
    
 }
}