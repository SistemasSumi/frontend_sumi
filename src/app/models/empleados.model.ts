export class EmpleadosModel{
    private id       : number; 
    private cedula   : string; 
    private foto     : string;
    private nombres  : string;
    private apellidos: string;
    private cargo    : [];    
    private tipo_emp : [];    
    private direccion: string;
    private telefonos: string;
    private correo   : string;
    private finca    : [];   
    

   
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getCedula(): string {
        return this.cedula;
    }

    public setCedula(cedula: string): void {
        this.cedula = cedula;
    }

    public getFoto(): string {
        return this.foto;
    }

    public setFoto(foto: string): void {
        if (foto != null) {
            this.foto = foto;
        }else{
            this.foto =  "./assets/sigban/iconos/profile.svg"
        }
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

    public getCargo(): [] {
        return this.cargo;
    }

    public setCargo(cargo: []): void {
        this.cargo = cargo;
    }

    public getTipo_emp(): [] {
        return this.tipo_emp;
    }

    public setTipo_emp(tipo_emp: []): void {
        this.tipo_emp = tipo_emp;
    }

    public getDireccion(): string {
        return this.direccion;
    }

    public setDireccion(direccion: string): void {
        this.direccion = direccion;
    }

    public getTelefonos(): string {
        return this.telefonos;
    }

    public setTelefonos(telefonos: string): void {
        this.telefonos = telefonos;
    }

    public getCorreo(): string {
        return this.correo;
    }

    public setCorreo(correo: string): void {
        this.correo = correo;
    }

    public getFinca(): [] {
        return this.finca;
    }

    public setFinca(finca: []): void {
        this.finca = finca;
    }



    
    constructor(  ){
         
            


    }



}