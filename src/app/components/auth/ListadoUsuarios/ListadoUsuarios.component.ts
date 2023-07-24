import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-ListadoUsuarios',
  templateUrl: './ListadoUsuarios.component.html',
  styleUrls: ['./ListadoUsuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {


  listadoUsuario:UserModel[] = [];

  constructor(private auth:SeguridadService, private router:Router) { }

  ngOnInit() {
    this.ObtenerListado();
  }

  ObtenerListado(){
    this.auth.ListadoUsuarios().subscribe(resp => {
      console.log(resp);
      for(let x of resp){
        let u:UserModel = new UserModel();


        u.setIdUser(x.id);
        u.setTokenUser(x.token);
        u.setUsername(x.username);
        u.setEmail(x.email);
        u.setNombres(x.nombres);
        u.setApellidos(x.apellidos);
        u.setGenero(x.genero);
        u.setAvatar(x.avatar_url);
        u.setUltimoAcceso(x.ultimoAcceso);
        u.setEmpresa(x.empresa);
        u.setVendedor(x.is_vendedor);

        this.listadoUsuario.push(u)
      }

    });
  }


  editarPermisos(user){
    this.auth.editPermisosUser(user);
    this.router.navigateByUrl("settings/permisos-usuarios");
  }



}
