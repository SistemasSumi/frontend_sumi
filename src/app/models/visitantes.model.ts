export class EmpleadosModel{
    private cedula:string;
    private nombresCompleto:string;
    private telefono: string;
    private finca:[];

    public getCedula(): string {
        return this.cedula;
    }

    public setCedula(cedula: string): void {
        this.cedula = cedula;
    }

    public getNombresCompleto(): string {
        return this.nombresCompleto;
    }

    public setNombresCompleto(nombresCompleto: string): void {
        this.nombresCompleto = nombresCompleto;
    }

    public getTelefono(): string {
        return this.telefono;
    }

    public setTelefono(telefono: string): void {
        this.telefono = telefono;
    }

    public getFinca(): [] {
        return this.finca;
    }

    public setFinca(finca: []): void {
        this.finca = finca;
    }


  
    
    constructor(){
        
    }



}