import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private webSocketSubject: WebSocketSubject<any>;

  constructor() {
    // Configura la URL de WebSocket
    
  }

  // Conectar al servidor WebSocket y autenticarse
  connect(canal:string,token: string): void {
  
    // console.log(environment.WEBSOCKETURL+'ws/'+canal+'/')
    // this.webSocketSubject = webSocket(environment.WEBSOCKETURL+'ws/'+canal+'/?token='+token);
    
    // this.webSocketSubject.next({ token });
  }

  // Suscribirse a notificaciones
  subscribeToNotifications(): WebSocketSubject<any> {
    return this.webSocketSubject;
  }

  

}
