import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';// This is where I import map operator
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { cobrosPermisos, contabilidadPermisos, empleadosPermisos, facturacionPermisos, inventarioPermisos, pagosPermisos, PermisosUsuario } from './permisosUsuario';
import { DbService } from './db.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  SubjectdataEditUser  : BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  salir:number = 0;
  currentUser:UserModel;
  // permisos:any;


  contabilidad: contabilidadPermisos;
  facturacion : facturacionPermisos;
  inventario  : inventarioPermisos;
  cobros      : cobrosPermisos;
  pagos       : pagosPermisos;
  empleados   : empleadosPermisos;

  
  balance:number = 0;


  constructor(private http: HttpClient,  public router:Router,private db:DbService) { 
    this.getCurrentUser();
     // DECLARACION DE MIS OPCIONES DE CABEZERA PARA MIS PETICIONES HTTP
     const csrftoken = this.getCookie('csrftoken');
     this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    if(this.currentUser.is_vendedor){
      this.obtenerVentasVendedor().subscribe(resp =>{
        this.balance = resp.balance;
      });

    }
    
  }
    // VARIABLE PRIVADA PARA LAS OPCIONES DE LOS HEADERS DE MIS PETICIONES HTTP
    private httpOptions: any;
  
    


  // METODO PARA ASIGNARLE UN USUARIO A MI MODELO USUARIO 
  setUser(id:string,token:string,username:string,email:string,avatar:string,nombres:string,apellidos: string,genero: string,ultimoAcceso:string,empresa:any,is_vendedor:boolean,grupo:string){
        this.currentUser = new UserModel();
        this.currentUser.setIdUser(id);
        this.currentUser.setTokenUser(token);
        this.currentUser.setUsername(username);
        this.currentUser.setEmail(email);
        this.currentUser.setNombres(nombres);
        this.currentUser.setApellidos(apellidos);
        this.currentUser.setGenero(genero);
        this.currentUser.setGrupo(grupo);
        this.currentUser.setAvatar(avatar);
        this.currentUser.setUltimoAcceso(ultimoAcceso);
        this.currentUser.setEmpresa(empresa);
        this.currentUser.setVendedor(is_vendedor);
        localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
  }

  setPermisosUser(permisos:any){
    let user = this.currentUser;
    if(permisos){
      
   
      user.setPermisos(permisos);
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
    }

    
  }

   // METODO PARA INICIAR SECCION VIA EMAIL & PASSWORD
   login(form: FormGroup) {
    var url   = environment.BACKEND_DIR+"auth/users/api/tradicional-login/";
  
    const authData = {
      correo: form.value.Correo,
      password: form.value.Password,
      returnSecureToken: true
    };
   
    
    return this.http.post<any>(url,JSON.stringify(authData),this.httpOptions).pipe(
      map((resp:any) => {
      

       

        this.setUser(resp.user.id,resp.token,resp.user.username,resp.user.email,resp.user.avatar_url,resp.user.nombres,resp.user.apellidos,resp.user.genero,resp.user.last_login,resp.user.empresa,resp.user.is_vendedor,resp.user.grupo);
       

     
        // localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
        // localStorage.setItem("permisos",JSON.stringify(resp.permisos));
        this.obtenerPermisos(resp.user.username)
        // this.router.navigateByUrl('home');
        // window.location.reload();
        return this.currentUser;
        
      })
    ); 
     
        
    }

  obtenerPermisos(username:string){

    this.db.getDoc('permisos',username).subscribe((resp:PermisosUsuario) => {
     
      // localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
 
      this.setPermisosUser(resp);
      if(!this.sonObjetosIguales(this.currentUser.getPermisos(),resp)){

        this.logout();
        // this.router.navigateByUrl('home');
        window.location.reload();
      }
      this.router.navigateByUrl('home');
      window.location.reload();
    });
  }

  


  sonObjetosIguales(objeto1, objeto2) {
    // Obtener las claves (propiedades) de los objetos
    const clavesObjeto1 = Object.keys(objeto1);
    const clavesObjeto2 = Object.keys(objeto2);
  
    // Verificar si la cantidad de propiedades es la misma
    if (clavesObjeto1.length !== clavesObjeto2.length) {
 
      return false;
    }
  
    // Verificar si las propiedades y valores son los mismos
    for (let clave of clavesObjeto1) {
      if (objeto1[clave] !== objeto2[clave]) {
        const clavesObjeto3 = Object.keys(objeto1[clave]);
        const clavesObjeto4 = Object.keys(objeto2[clave]);
        for (let x of clavesObjeto3) {
          let objeto3 = objeto1[clave];
          let objeto4 = objeto2[clave];
          if (objeto3[x] !== objeto4[x]) {
            return false;
          }
        }
      
        
      }
    }
  
    // Los objetos son iguales
    return true;
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
     
      this.setUser(user.idUser,user.tokenUser,user.username, user.email, user.avatar, user.nombres, user.apellidos,user.genero,user.ultimoAcceso,user.empresa,user.is_vendedor,user.grupo);
      this.setPermisosUser(user.permisos);


      this.db.getDoc('permisos',user.username).subscribe((resp:PermisosUsuario) => {
        
        if(!this.sonObjetosIguales(this.currentUser.getPermisos(),resp)){
  
          this.logout();
          // this.router.navigateByUrl('home');
          window.location.reload();
        }
       
      });
      // this.obtenerPermisos(user.username);
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



  obtenerVentasVendedor(){
    const  url = environment.BACKEND_DIR+'facturacion/ventas_x_vendedor/';
    const token = this.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
   
   
  
  
  
    return this.http.get<any>(url,{headers: httpHeaders});
    
  }

  ActualizarUsuario(data){
    const  url = environment.BACKEND_DIR+'auth/users/api/users/update/';
    const token = this.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
   
   
  
  
  
    return this.http.post<any>(url,data,{headers: httpHeaders});
    
  }

  ListadoUsuarios(){
    const  url = environment.BACKEND_DIR+'auth/users/api/users/';
    const token = this.currentUser.getTokenUser();
    const httpHeaders = new HttpHeaders().set('Authorization', 'Token '+token);
   
   
  
  
  
    return this.http.get<any>(url,{headers: httpHeaders});
    
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

  editPermisosUser(user:UserModel){
    this.SubjectdataEditUser.next(user);
    
  }


  }

