import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';


import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class AccesoFincaService {
  httpOptions: any;
  constructor(private http: HttpClient,private auth:SeguridadService, public afAuth:AngularFireAuth) { }

  getPerson(cedula){
    const url = "http://localhost:8000/acceso/registrar/entrada/"
    const token = this.auth.currentUser.getTokenUser();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token
     })
    };
    return this.http.get(url+'?cedula='+cedula, this.httpOptions);
 }

 async sendSmsVerification(phoneNumber,applicationVerifier){
   return await this.afAuth.signInWithPhoneNumber(phoneNumber,applicationVerifier);
 }

}


