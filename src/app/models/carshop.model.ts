
export class CarshopModel{
    private id: string;
    private tipoServicio:number;
    private idProducto:number;
    private idServicio:number;
    private producto:string;
    private precio:number;
    private descuento:number;
    private cantidad:number;
    private subtotal:number;



    public getDescuento(): number {
        return this.descuento;
    }

    public setDescuento(descuento: number): void {
        this.descuento = descuento;
    }


    public getPrecio(): number {
        return this.precio;
    }

    public setPrecio(precio: number): void {
        this.precio = precio;
    }

  

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getTipoServicio(): number {
        return this.tipoServicio;
    }

    public setTipoServicio(tipoServicio: number): void {
        this.tipoServicio = tipoServicio;
    }

    public getIdProducto(): number {
        return this.idProducto;
    }

    public setIdProducto(idProducto: number): void {
        this.idProducto = idProducto;
    }

    public getIdServicio(): number {
        return this.idServicio;
    }

    public setIdServicio(idServicio: number): void {
        this.idServicio = idServicio;
    }

    public getProducto(): string {
        return this.producto;
    }

    public setProducto(producto: string): void {
        this.producto = producto;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
    }

    public getSubtotal(): number {
        return this.subtotal
    }

    public setSubtotal(subtotal: number): void {
        this.subtotal = subtotal;
    }


    constructor(){

    }

}