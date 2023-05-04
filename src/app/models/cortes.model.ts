export class CortesModel{
    private idCorte       : any;
    private Barbero       : [];
    private formaPago     : string;
    private Cliente       : [];
    private idCaja        : any;
    private total         : string;
    private fecha_creacion: string;

    public getIdCorte(): any {
        return this.idCorte;
    }

    public setIdCorte(idCorte: any): void {
        this.idCorte = idCorte;
    }

    public getBarbero(): [] {
        return this.Barbero;
    }

    public setBarbero(Barbero: []): void {
        this.Barbero = Barbero;
    }

    public getFormaPago(): string {
        return this.formaPago;
    }

    public setFormaPago(formaPago: string): void {
        this.formaPago = formaPago;
    }

    public getCliente(): [] {
        return this.Cliente;
    }

    public setCliente(Cliente: []): void {
        this.Cliente = Cliente;
    }

    public getIdCaja(): any {
        return this.idCaja;
    }

    public setIdCaja(idCaja: any): void {
        this.idCaja = idCaja;
    }

    public getTotal(): string {
        return this.total;
    }

    public setTotal(total: string): void {
        this.total = total;
    }

    public getFecha_creacion(): string {
        return this.fecha_creacion;
    }

    public setFecha_creacion(fecha_creacion: string): void {
        this.fecha_creacion = fecha_creacion;
    }

    constructor(){}
    
}