import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SeguridadService } from '../../../../../../src/app/components/auth/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class Empleados_nominaService {

constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) { }


getTiposDocumentos() {
  return this.http.get('/assets/data/data.json');
}

}


