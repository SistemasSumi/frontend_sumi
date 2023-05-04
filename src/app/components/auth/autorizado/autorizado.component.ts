import { Component, OnInit, Input } from '@angular/core';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrls: ['./autorizado.component.css']
})
export class AutorizadoComponent implements OnInit {

  @Input()
  rol: string;
  
  constructor(private auth: SeguridadService) { }


  ngOnInit(): void {
  }
  

  estaAutorizado(): boolean{
    if(this.rol){
     return this.auth.obtenerRol() === this.rol;
    }else{
      return this.auth.estaLogueado();
    }
  }
}
