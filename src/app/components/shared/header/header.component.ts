import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SeguridadService } from '../../auth/seguridad.service';
import { Router } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Empresa } from 'src/app/interfaces/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { DbService } from '../../auth/db.service';
import { mergeMap, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';
import { Notificaciones } from '../../auth/permisosUsuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Precios_bajos_modalComponent } from '../../dashboard/components/Facturacion/precios_bajos_modal/precios_bajos_modal.component';


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

  notificaciones: Notificaciones[];
  count_noti:number = 0;
  
  notificacionesPendientes: Notificaciones[];
  haynotificaciones = false;


  @Output() evento = new EventEmitter();


  constructor(private modalService: NgbModal,private http:HttpClient ,private dbService:DbService,private firestore: AngularFirestore,public $auth:SeguridadService, private $router: Router,private afMessaging: AngularFireMessaging) { }

  ngOnInit(): void {
    this.setOnTheme();
    this.registerToken();
    this.obtenerNotificaciones();
    
    // this.loadScript('../assets/js/app.js');
  }

  openModalPreciosBajos(notificacion:Notificaciones) {
    const modalRef = this.modalService.open(Precios_bajos_modalComponent,{ size: 'lg' ,centered: true,animation: true  });
    const componenteModal = modalRef.componentInstance;
    componenteModal.notificacion = notificacion;
    componenteModal.instanciaModal = modalRef;
  }

  obtenerNotificaciones(){
    console.log(this.$auth.currentUser.getGrupo());
    const condiciones = [
      { parametro: 'receiver_users', condicion: 'array-contains', busqueda: this.$auth.currentUser.getUsername() },
      { parametro: 'grupo', condicion: '==', busqueda:  this.$auth.currentUser.getGrupo() },
      
    ];
    
    const path = 'notificaciones';
    
    this.dbService.getCollectionQueryCondicionesOr<Notificaciones>(path, condiciones).subscribe(notificaciones => {
      // Aquí puedes trabajar con las notificaciones que cumplen con al menos una de las condiciones
      this.notificaciones = notificaciones.sort((a, b) => b.fecha - a.fecha);
      this.count_noti  = notificaciones.filter(notificacion => !notificacion.vistas?.includes(this.$auth.currentUser.getUsername())).length;



      console.log('noti:',this.count_noti);
      if(this.count_noti > 0){
        this.haynotificaciones = true;
      }else{
        this.haynotificaciones = false;
      }
    });
  }

  verificarVistaUsuario(notificacion: Notificaciones): boolean {
 
    if (notificacion.vistas && notificacion.vistas.includes(this.$auth.currentUser.getUsername())) {
      return false;
    } else {
      return true;
    }
  }

  revisarNoti(notificacion: Notificaciones){

    if (!notificacion.vistas.includes(this.$auth.currentUser.getUsername())) {
        notificacion.vistas.push(this.$auth.currentUser.getUsername());
        this.dbService.createDoc(notificacion,'notificaciones',notificacion.id)
    }

    this.openModalPreciosBajos(notificacion);

  }

  onDragStart(event: DragEvent) {
    // Evita el arrastre del enlace
    event.preventDefault();

    // Obtiene el contenido del enlace
    const contenidoEnlace = (event.target as HTMLElement).textContent;
    
    // Inicia la operación de copiado del contenido
    event.dataTransfer?.setData('text/plain', contenidoEnlace);
  }
  registerToken() {
    if(this.$auth.estaLogueado){
      if(this.$auth.currentUser.getIdUser() != undefined){

        this.afMessaging.requestToken.subscribe(
          (token) => {
            console.log('Permiso para recibir notificaciones concedido!');
            console.log('Token de registro:', token);
    
            // Guardar el token de registro en Firebase
            const userId = this.$auth.currentUser.getUsername(); // ID del usuario al que pertenece el dispositivo
    
            // Obtener los tokens de registro actuales del usuario
            let currentTokens: string[] = [];
            this.firestore.collection('usuariosNotificacion').doc(userId).get().subscribe((doc) => {
              if (doc.exists) {
                const userData:any = doc.data();
                currentTokens = userData.tokens  || [] ;
              }
    
            
              // Verificar si el token ya existe en la lista
              if (!currentTokens.includes(token)) {
                // Agregar el nuevo token a la lista
                currentTokens.push(token);
    
                // Guardar la lista actualizada de tokens de registro en Firebase
                this.firestore.collection('usuariosNotificacion').doc(userId).set({
                  grupo:'CONTABILIDAD',
                  tokens: currentTokens
                }).then(() => {
                  console.log('Token de registro guardado exitosamente en Firebase');
                }).catch((error) => {
                  console.error('Error al guardar el token de registro en Firebase:', error);
                });
              }
            });
          },
          (error) => {
            console.error('Error al solicitar permiso para recibir notificaciones:', error);
          }
        );
      }
    }
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
