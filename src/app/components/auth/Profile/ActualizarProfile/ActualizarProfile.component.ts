import { Component, Input, OnInit } from '@angular/core';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { UserModel } from 'src/app/models/user.model';
import { SeguridadService } from '../../seguridad.service';

@Component({
  selector: 'app-ActualizarProfile',
  templateUrl: './ActualizarProfile.component.html',
  styleUrls: ['./ActualizarProfile.component.css']
})
export class ActualizarProfileComponent implements OnInit {


  @Input()
  user:UserModel;

  metodos:MetodosShared = new MetodosShared();
  constructor(private auth:SeguridadService) { }

  ngOnInit() {
  }

  guardar(){
    this.auth.ActualizarUsuario(this.user).subscribe(resp =>{
        // this.auth.setUser(resp.id,resp.token,resp.user.username,resp.user.email,resp.user.avatar_url,resp.user.nombres,resp.user.apellidos,resp.user.genero,resp.user.last_login,resp.user.empresa);
        localStorage.setItem("currentUser",JSON.stringify(this.auth.currentUser));
        this.metodos.AlertOK('Datos actualizados')
      })
  }

}
 