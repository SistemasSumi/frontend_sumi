export class institucional{
    private id       : number; 
    private codigo   : string; 
    private producto     : string;
    private marca  : string;
    private lote: string;
    private vence    : string;    
    private existencia : string;    
    private costo: string;
    private valorventa: string;
    private estado: string;

    public getEstado(): string {
        return this.estado;
    }

    public setEstado(estado: string): void {
        this.estado = estado;
    }


    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getCodigo(): string {
        return this.codigo;
    }

    public setCodigo(codigo: string): void {
        this.codigo = codigo;
    }

    public getProducto(): string {
        return this.producto;
    }

    public setProducto(producto: string): void {
        this.producto = producto;
    }

    public getMarca(): string {
        return this.marca;
    }

    public setMarca(marca: string): void {
        this.marca = marca;
    }

    public getLote(): string {
        return this.lote;
    }

    public setLote(lote: string): void {
        this.lote = lote;
    }

    public getVence(): string {
        return this.vence;
    }

    public setVence(vence: string): void {
        this.vence = vence;
    }

    public getExistencia(): string {
        return this.existencia;
    }

    public setExistencia(existencia: string): void {
        this.existencia = existencia;
    }

    public getCosto(): string {
        return this.costo;
    }

    public setCosto(costo: string): void {
        this.costo = costo;
    }

    public getValorventa(): string {
        return this.valorventa;
    }

    public setValorventa(valorventa: string): void {
        this.valorventa = valorventa;
    }

     
    

   
  


    
    constructor(  ){
         
            


    }



}