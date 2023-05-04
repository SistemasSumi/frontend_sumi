import { PermisosUsuario } from "../components/auth/permisosUsuario";
import { Empresa } from "../components/dashboard/components/configuracion/interfaces";


export class UserModel{
    private idUser:string;
    private tokenUser:string;
    private username:string;
    private email:string;
    private avatar:string;
    private nombres:string;
    private apellidos:string;
    private genero:string;
    private ultimoAcceso:string;
    private empresa:Empresa;
    private permisos?:PermisosUsuario;


    public getNombreCorto(){

        if(this.nombres != "" && this.apellidos != ""){
            let nombre = this.nombres.split(' ');
            let apellido = this.apellidos.split(' ');
            return nombre[0]+ ' ' + apellido[0]
        }
        return this.username
    }

    public getEmpresa(): Empresa {
        return this.empresa;
    }
    public setEmpresa(empresa:Empresa): any {
        this.empresa = empresa;
    }


    public getIdUser(): string {
        return this.idUser;
    }

    public setIdUser(idUser: string): void {
        this.idUser = idUser;
    }

    public getTokenUser(): string {
        return this.tokenUser;
    }

    public setTokenUser(tokenUser: string): void {
        this.tokenUser = tokenUser;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getAvatar(): string {
        if(this.avatar){
            return this.avatar;
        }
        else{
            return "../assets/theme/img/svg/avatar.svg"
        }
    }

    public setAvatar(avatar: string): void {
        this.avatar = avatar;
    }

    public getNombres(): string {
        return this.nombres;
    }

    public setNombres(nombres: string): void {
        this.nombres = nombres;
    }

    public getApellidos(): string {
        return this.apellidos;
    }

    public setApellidos(apellidos: string): void {
        this.apellidos = apellidos;
    }

    public getGenero(): string {
        return this.genero;
    }

    public setGenero(genero: string): void {
        this.genero = genero;
    }

    public getUltimoAcceso(): string {
        return this.ultimoAcceso;
    }

    public setUltimoAcceso(ultimoAcceso: string): void {
        this.ultimoAcceso = ultimoAcceso;
    }


    public getPermisos(): PermisosUsuario {
        return this.permisos;
    }

    public setPermisos(permisos: PermisosUsuario): void {
        this.permisos = permisos;
    }

     
    
    constructor(){
        
    }



}