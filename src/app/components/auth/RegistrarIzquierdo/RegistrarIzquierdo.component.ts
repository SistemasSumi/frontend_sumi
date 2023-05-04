import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-RegistrarIzquierdo',
  templateUrl: './RegistrarIzquierdo.component.html',
  styleUrls: ['./RegistrarIzquierdo.component.css']
})
export class RegistrarIzquierdoComponent implements OnInit {


  username:string;
  email:string;
  password:string;


  constructor(private auth:SeguridadService) { }

  ngOnInit() {
  }

  guardar(){
    let data = {
      "username":this.username,
      "email":this.email,
      "password":this.password
    }
    this.auth.registrarUsuario(data).subscribe(resp => {
      console.log(resp)
    })
  }

}
