import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { EmpleadosModel } from '../../../../../models/empleados.model';
import { institucional } from '../../../../../models/institucional.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  httpOptions: { headers: any; };
  empleadosData:institucional[] = [];
  constructor(private auth: SeguridadService,private http: HttpClient ) { }

      
  getEmpleados(){
    this.empleadosData = [];
    const  url = environment.BACKEND_DIR+'acceso/listar/empleados/';
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
     })
    };
    return this.http.get<any>(url, this.httpOptions).pipe(
      map(resp => {
        console.log(resp);
        
        // for (let x in resp) {
        
    
        
            
        // }
        let producto = new institucional();
        producto.setId(1);
        producto.setCodigo("AGU03");
        producto.setProducto("Agua Oxigenada Galon Inv:2009M-010971-R2");
        producto.setMarca("JGB");
        producto.setLote("H0271A");
        producto.setExistencia("1");
        producto.setCosto("27.770");
        producto.setValorventa("39.671,43");
        producto.setVence("30/10/2022");
        producto.setEstado("1");
        
        
        this.empleadosData.push(producto);

        return this.empleadosData;
      })
    );
  
  }
}
