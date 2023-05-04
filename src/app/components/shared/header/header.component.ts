import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SeguridadService } from '../../auth/seguridad.service';
import { Router } from '@angular/router';

import { Empresa } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  empresas:Empresa[] = [];

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.getElementById("cajascript");
    const script = document.createElement('script');
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }



themeDark = false;
icono = "";

  @Output() evento = new EventEmitter();


  constructor(public $auth:SeguridadService, private $router: Router) { }

  ngOnInit(): void {
    this.setOnTheme();
    // this.loadScript('../assets/js/app.js');
  }


  public setOnTheme(){
    if(this.themeDark){
      console.log(this.themeDark);

      this.evento.emit(this.themeDark)
      this.icono = "fas fa-sun";
      this.themeDark = false;
    }else{
      console.log(this.themeDark);
      
      this.evento.emit(this.themeDark)
      this.icono = "fas fa-moon ";

      this.themeDark = true;
    }
   
  }


  salir(){
   this.$auth.logout().subscribe(resp => {
      console.log(resp);
      this.$router.navigateByUrl('login');
      
   });
  }


}
