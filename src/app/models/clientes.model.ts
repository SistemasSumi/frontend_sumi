export class ClientesModel{
    private id       : number; 
    private documento: string; 
    private nombres  : string;
    private apellidos: string;
    private direccion: string;
    private telefonos: string;
 

   
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getDocumento(): string {
        return this.documento;
    }

    public setDocumento(cedula: string): void {
        this.documento = cedula;
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


 
  
   
    public getDireccion(): string {
        return this.direccion;
    }

    public setDireccion(direccion: string): void {
        this.direccion = direccion;
    }

    public getTelefono(): string {
        return this.telefonos;
    }

    public setTelefono(telefonos: string): void {
        this.telefonos = telefonos;
    }

   



    
    constructor(  ){
         
            


    }



}