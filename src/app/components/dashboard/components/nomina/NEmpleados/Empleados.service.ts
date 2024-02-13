import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {


  SubjectdataEmpleados: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public router:Router, private http:HttpClient, private auth:SeguridadService) {
    this.actualizarEmpleados();
  }



  actualizarEmpleados(){
    this.ListEmpleados().subscribe(
      (resp) => {
        // console.log(resp);
        this.SubjectdataEmpleados.next(resp);
        // console.log(resp)

      },
      (error) => {
        // console.log(error);
      }
    );
  }

  SaveEmpleado(data){
    const  url = environment.BACKEND_DIR+'nomina/empleados/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
  
   

    return this.http.post<any>(url,data,{headers: httpHeaders});
  
  }

  UpdateEmpleado(data){
    const  url = environment.BACKEND_DIR+'nomina/empleados/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
    return this.http.put<any>(url,data,{headers: httpHeaders});
  }

  UpdateContratoEmpleado(data){
    const  url = environment.BACKEND_DIR+'nomina/empleadosContrato/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
    return this.http.put<any>(url,data,{headers: httpHeaders});
  
  }

  
  ListEmpleados(){
    const  url = environment.BACKEND_DIR+'nomina/empleados/';
    const token = this.auth.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);

   
  
   

    return this.http.get<any>(url,{headers: httpHeaders});
  
  }

}

