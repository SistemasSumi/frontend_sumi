export class ClientesModel{
    private idProducto  : number;
    private nombre      : string;
    private marca       : string;
    private precioCompra: number;
    private precioVenta : number;
    private stock       : number;
    private observarcion: string;

    public getIdProducto(): number {
        return this.idProducto;
    }

    public setIdProducto(idProducto: number): void {
        this.idProducto = idProducto;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getMarca(): string {
        return this.marca;
    }

    public setMarca(marca: string): void {
        this.marca = marca;
    }

    public getPrecioCompra(): number {
        return this.precioCompra;
    }

    public setPrecioCompra(precioCompra: number): void {
        this.precioCompra = precioCompra;
    }

    public getPrecioVenta(): number {
        return this.precioVenta;
    }

    public setPrecioVenta(precioVenta: number): void {
        this.precioVenta = precioVenta;
    }

    public getStock(): number {
        return this.stock;
    }

    public setStock(stock: number): void {
        this.stock = stock;
    }

    public getObservarcion(): string {
        return this.observarcion;
    }

    public setObservarcion(observarcion: string): void {
        this.observarcion = observarcion;
    }


    constructor(  ){
         
            


    }



}