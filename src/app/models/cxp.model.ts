export class CxpModel{
    private id: number;
    private fecha_creacion: string;
    private total: string;
    private estado:boolean;
    private corte:any;
    private barbero:[];

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getFecha_creacion(): string {
        return this.fecha_creacion;
    }

    public setFecha_creacion(fecha_creacion: string): void {
        this.fecha_creacion = fecha_creacion;
    }

    public getTotal(): string {
        return this.total;
    }

    public setTotal(total: string): void {
        this.total = total;
    }

    public isEstado(): boolean {
        return this.estado;
    }

    public setEstado(estado: boolean): void {
        this.estado = estado;
    }

    public getCorte(): any {
        return this.corte;
    }

    public setCorte(corte: any): void {
        this.corte = corte;
    }

    public getBarbero(): [] {
        return this.barbero;
    }

    public setBarbero(barbero: []): void {
        this.barbero = barbero;
    }



    constructor(){

    }

    
}