import { Component, OnInit, HostBinding } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { OverlayContainer } from '@angular/cdk/overlay';
import { contabilidadPermisos, PermisosUsuario } from './components/auth/permisosUsuario';
import { SeguridadService } from './components/auth/seguridad.service';
import { DbService } from './components/auth/db.service';
import { ConfiguracionService } from './components/dashboard/components/configuracion/Configuracion.service';
declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FrontEnd';
  
  themeDark:boolean = true;



  @HostBinding('class') componnentCssClass:any;
  
  loadAPI: Promise<any>;

constructor(private config:ConfiguracionService,public overlay:OverlayContainer, public auth:SeguridadService, public db:DbService) {        
    // this.loadAPI = new Promise((resolve) => {
    //     this.loadScript();
    //     resolve(true);
    // });

    this.config.obtenerProveedores();
    this.config.obtenerClientes();
}

public onSetTheme(e:boolean){
  const body = <HTMLDivElement> document.body;
  if(e){
    this.overlay.getContainerElement().classList.add("theme-dark");
    body.setAttribute("data-layout-mode", "dark");
    body.setAttribute("data-topbar", "dark");
    body.setAttribute("data-sidebar", "dark");
    this.componnentCssClass = "theme-dark";
  }else{
    this.overlay.getContainerElement().classList.add("theme-light");
    body.setAttribute("data-layout-mode", "light");
    body.setAttribute("data-topbar", "light");
    body.setAttribute("data-sidebar", "light");
    this.componnentCssClass = "theme-light";
  }
  
}

public loadScript(url: string) {
  const body = <HTMLDivElement> document.getElementById("cajascript");
  const script = document.createElement('script');
  script.src = url;
  script.async = false;
  script.defer = true;
  body.appendChild(script);
}



guardarPermisos(id:string,data:PermisosUsuario){
  const path = 'permisos/';

   this.db.createDoc(data, path, id).then( () => {
        
   });
}

ngOnInit(): void {


  // let permisos: PermisosUsuario;
  

  // let contabilidad:contabilidadPermisos = {
  //   puc:false,
  //   comprobantesContables:true,
  //   libroAux:true,
  //   informes:false,
  //   conciliacion:false
  // }
  // permisos = {
    
  //   contabilidad:contabilidad,
  // }

  // this.guardarPermisos(this.auth.currentUser.getUsername(),permisos);

 
  // firebase.initializeApp(environment.firebaseConfig);
  this.cargarScritp();
  this.overlay.getContainerElement().classList.add("theme-light");
  this.componnentCssClass = "theme-light";
}


cargarScritp():void{
  this.loadScript('../assets/libs/bootstrap/js/bootstrap.bundle.min.js');
  this.loadScript('../assets/libs/metismenujs/metismenujs.min.js');  
  this.loadScript('../assets/libs/simplebar/simplebar.min.js');                   
  this.loadScript('../assets/libs/feather-icons/feather.min.js'); 
  this.loadScript('../assets/js/app.js');     
           


  // this.loadScript('../assets/theme/plugins/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js');
  // this.loadScript('../assets/theme/plugins/@ckeditor/ckeditor5-build-classic/build/translations/de.js');   
  // this.loadScript('../assets/theme/plugins/jvectormap-next/jquery-jvectormap.min.js');   
  // this.loadScript('../assets/theme/plugins/apexcharts/dist/apexcharts.min.js');   
  // this.loadScript('../assets/theme/js/demo/dashboard-v3.js');   

}


}


