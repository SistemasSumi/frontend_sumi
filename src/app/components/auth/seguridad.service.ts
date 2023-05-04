import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';// This is where I import map operator
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { contabilidadPermisos, PermisosUsuario } from './permisosUsuario';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  
 
  salir:number = 0;
  currentUser:UserModel;
  // permisos:any;

  constructor(private http: HttpClient,  public router:Router,private db:DbService) { 
    this.getCurrentUser();
     // DECLARACION DE MIS OPCIONES DE CABEZERA PARA MIS PETICIONES HTTP
     const csrftoken = this.getCookie('csrftoken');
     this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    
  }
    // VARIABLE PRIVADA PARA LAS OPCIONES DE LOS HEADERS DE MIS PETICIONES HTTP
    private httpOptions: any;
  
    


  // METODO PARA ASIGNARLE UN USUARIO A MI MODELO USUARIO 
  setUser(id:string,token:string,username:string,email:string,avatar:string,nombres:string,apellidos: string,genero: string,ultimoAcceso:string,empresa:any){
        this.currentUser = new UserModel();
        this.currentUser.setIdUser(id);
        this.currentUser.setTokenUser(token);
        this.currentUser.setUsername(username);
        this.currentUser.setEmail(email);
        this.currentUser.setNombres(nombres);
        this.currentUser.setApellidos(apellidos);
        this.currentUser.setGenero(genero);
        this.currentUser.setAvatar(avatar);
        this.currentUser.setUltimoAcceso(ultimoAcceso);
        this.currentUser.setEmpresa(empresa);
        localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
  }

  setPermisosUser(permisos:PermisosUsuario){
    let user = this.currentUser;
    user.setPermisos(permisos);
    localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
    
  }

   // METODO PARA INICIAR SECCION VIA EMAIL & PASSWORD
   login(form: FormGroup) {
    var url   = environment.BACKEND_DIR+"auth/users/api/tradicional-login/";
    console.log(url)
    const authData = {
      correo: form.value.Correo,
      password: form.value.Password,
      returnSecureToken: true
    };
    console.log(authData);
    
    return this.http.post<any>(url,JSON.stringify(authData),this.httpOptions).pipe(
      map((resp:any) => {
        console.log(resp);

       

        this.setUser(resp.user.id,resp.token,resp.user.username,resp.user.email,resp.user.avatar_url,resp.user.nombres,resp.user.apellidos,resp.user.genero,resp.user.last_login,resp.user.empresa);
        this.obtenerPermisos(resp.user.username);

        console.log(this.currentUser);
        localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
        // localStorage.setItem("permisos",JSON.stringify(resp.permisos));

        this.router.navigateByUrl('home');
        window.location.reload();
        return this.currentUser;
        
      })
    ); 
     
        
    }

  obtenerPermisos(username:string){

    this.db.getDoc('permisos/',username).subscribe((resp:PermisosUsuario) => {
      console.log(resp)
      this.salir +=1;
      this.setPermisosUser(resp);
      if(this.salir > 1){

        this.logout();
        // this.router.navigateByUrl('home');
        window.location.reload();
      }
    })
  }

  


  
  

  logout(){
    var url   = environment.BACKEND_DIR+"auth/users/api/logout/";
    this.currentUser = new UserModel();
    localStorage.clear();
    return this.http.get<any>(url,this.httpOptions);
  }

 // METODO PARA OBTENER ROL
 obtenerRol(): string {
  return "admin"
}

  // VALIDACION SI SE ESTA LOGUEADO O NO
  estaLogueado(): boolean{
    let resp = false;
    if(this.currentUser){
      if(this.currentUser.getTokenUser()){
        resp = true;
      }
    }else{
       resp = false; 
    }

    return resp;
  }

  // METODO PARA OBTENER Y GUARDAR EN MI MODELO DE USUARIO LA INFORMACION DEL MISMO
  getCurrentUser(){
    if(localStorage.getItem('currentUser')){
      const user = JSON.parse(localStorage.getItem('currentUser'))
      // this.permisos = JSON.parse(localStorage.getItem('permisos'))
     
      this.setUser(user.idUser,user.tokenUser,user.username, user.email, user.avatar, user.nombres, user.apellidos,user.genero,user.ultimoAcceso,user.empresa);
      this.obtenerPermisos(user.username);
    }else{
      this.currentUser = new UserModel();
    }
  }

  registrarUsuario(data){
    const  url = environment.BACKEND_DIR+'auth/users/api/users/create/';
    const token = this.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
   
   
  
  
  
    return this.http.post<any>(url,data,{headers: httpHeaders});
    
  }

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
      }
      return cookieValue;
  }


  }

