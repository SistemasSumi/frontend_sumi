

export class CargosModel{
    private id: string;
    private cargo:string;
    private description:string;
    private empresa:[];
    private estado:boolean;
    private usuario:[]
    private fecha_creacion:string;
    
  

    constructor(){

    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getCargo(): string {
        return this.cargo;
    }

    public setCargo(cargo: string): void {
        this.cargo = cargo;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getEmpresa(): [] {
        return this.empresa;
    }

    public setEmpresa(empresa: []): void {
        this.empresa = empresa;
    }

    public isEstado(): boolean {
        return this.estado;
    }

    public setEstado(estado: boolean): void {
        this.estado = estado;
    }

    public getUsuario(): [] {
        return this.usuario;
    }

    public setUsuario(usuario: []): void {
        this.usuario = usuario;
    }

    public getFecha_creacion(): string {
        return this.fecha_creacion;
    }

    public setFecha_creacion(fecha_creacion: string): void {
        this.fecha_creacion = fecha_creacion;
    }



}