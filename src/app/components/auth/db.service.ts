import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Observable, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/messaging';

import { AngularFireFunctions } from '@angular/fire/functions';
import { Notificaciones } from './permisosUsuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class DbService {



  


  constructor(private http:HttpClient, private functions: AngularFireFunctions,public database: AngularFirestore, private afMessaging: AngularFireMessaging) { }

  /**
   * Crea un nuevo documento en la base de datos.
   * @param data - Datos a guardar en el documento.
   * @param path - Ruta de la colección en la base de datos.
   * @param id - ID único del documento.
   * @returns Una promesa que se resuelve cuando se completa la operación.
   */
  createDoc(data: any, path: string, id: string): Promise<void> {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  /**
   * Obtiene un documento de la base de datos.
   * @param path - Ruta de la colección en la base de datos.
   * @param id - ID del documento a obtener.
   * @returns Un `Observable` que emite el documento.
   */
  getDoc<tipo>(path: path, id: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  /**
   * Elimina un documento de la base de datos.
   * @param path - Ruta de la colección en la base de datos.
   * @param id - ID del documento a eliminar.
   * @returns Una promesa que se resuelve cuando se completa la operación.
   */
  deleteDoc(path: string, id: string): Promise<void> {
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }

  /**
   * Actualiza un documento en la base de datos.
   * @param data - Datos a actualizar en el documento.
   * @param path - Ruta de la colección en la base de datos.
   * @param id - ID del documento a actualizar.
   * @returns Una promesa que se resuelve cuando se completa la operación.
   */
  updateDoc(data: any, path: string, id: string): Promise<void> {
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }

  /**
   * Genera un ID único para un nuevo documento.
   * @returns Un ID único generado por Firebase.
   */
  getId(): string {
    return this.database.createId();
  }

  /**
   * Obtiene una colección de documentos de la base de datos.
   * @param path - Ruta de la colección en la base de datos.
   * @returns Un `Observable` que emite un array de documentos.
   */
  getCollection<tipo>(path: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }

  /**
   * Obtiene una colección de documentos de la base de datos que cumple con una condición de búsqueda.
   * @param path - Ruta de la colección en la base de datos.
   * @param parametro - Nombre del campo en el que se realiza la búsqueda.
   * @param condicion - Condición de búsqueda (por ejemplo, '==', '>', '<', 'array-contains', etc.).
   * @param busqueda - Valor o cadena a buscar.
   * @returns Un `Observable` que emite un array de documentos que cumplen con la condición de búsqueda.
   */
  getCollectionQuery<tipo>(path: string, parametro: string, condicion: any, busqueda: string) {
    const collection = this.database.collection<tipo>(path, 
      ref => ref.where(parametro, condicion, busqueda));
    return collection.valueChanges();
  }

  /**
   * Obtiene una colección de documentos de la base de datos que cumple con múltiples condiciones de búsqueda.
   * @param path - Ruta de la colección en la base de datos.
   * @param condiciones - Condiciones de búsqueda especificadas como un array de objetos.
   * Cada objeto debe tener las propiedades `parametro`, `condicion` y `busqueda`.
   * @returns Un `Observable` que emite un array de documentos que cumplen con las condiciones de búsqueda.
   */
  getCollectionQueryVariosParametros<tipo>(
    path: string,
    condiciones: { parametro: string; condicion: any; busqueda: string }[]
  ): Observable<tipo[]> {
    const queryFn: QueryFn = ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

      condiciones.forEach(condicion => {
        query = query.where(condicion.parametro, condicion.condicion, condicion.busqueda);
      });

      return query;
    };

    return this.database.collection<tipo>(path, queryFn).valueChanges();
  }

  /**
 * Obtiene una colección de documentos de la base de datos que cumple con al menos una condición de búsqueda.
 * @param path - Ruta de la colección en la base de datos.
 * @param condiciones - Condiciones de búsqueda especificadas como un array de objetos.
 * Cada objeto debe tener las propiedades `parametro`, `condicion` y `busqueda`.
 * @returns Un `Observable` que emite un array de documentos que cumplen con al menos una de las condiciones de búsqueda.
 */
  getCollectionQueryCondicionesOr<tipo>(
    path: string,
    condiciones: { parametro: string; condicion: any; busqueda: string }[]
  ): Observable<tipo[]> {
    return new Observable<tipo[]>(observer => {
      const unsubscribe = this.database.collection<tipo>(path).valueChanges().subscribe(docs => {
        const filteredDocs = docs.filter(doc => {
          return condiciones.some(condicion => {
            const fieldValue = doc[condicion.parametro];
            const busquedaValue = condicion.busqueda;

            // Verificar si se cumple la condición de búsqueda
            if (condicion.condicion === '==') {
              return fieldValue === busquedaValue;
            } else if (condicion.condicion === 'array-contains') {
              return Array.isArray(fieldValue) && fieldValue.includes(busquedaValue);
            }

            // Si la condición no coincide, se excluye el documento
            return false;
          });
        });

        observer.next(filteredDocs);
        
      });

      // Cancelar la suscripción cuando se complete el Observable
      return () => unsubscribe.unsubscribe();
    });
  }
  /**
   * Obtiene una colección de documentos de la base de datos que cumple con una condición de búsqueda,
   * ordenada por un campo específico y limitada por el número máximo de resultados.
   * @param path - Ruta de la colección en la base de datos.
   * @param parametro - Nombre del campo en el que se realiza la búsqueda.
   * @param condicion - Condición de búsqueda (por ejemplo, '==', '>', '<', 'array-contains', etc.).
   * @param busqueda - Valor o cadena a buscar.
   * @param startAt - Valor de inicio para paginación.
   * @returns Un `Observable` que emite un array de documentos que cumplen con la condición de búsqueda.
   */
  getCollectionAll<tipo>(path: string, parametro: string, condicion: any, busqueda: string, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.database.collectionGroup<tipo>(path, 
      ref => ref.where(parametro, condicion, busqueda)
                .orderBy('fecha', 'desc')
                .limit(1)
                .startAfter(startAt)
    );
    return collection.valueChanges();
  }

  /**
   * Obtiene una colección de documentos de la base de datos ordenada por un campo específico y limitada por el número máximo de resultados.
   * @param path - Ruta de la colección en la base de datos.
   * @param limit - Número máximo de resultados.
   * @param startAt - Valor de inicio para paginación.
   * @returns Un `Observable` que emite un array de documentos.
   */
  getCollectionPaginada<tipo>(path: string, limit: number, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.database.collection<tipo>(path, 
      ref => ref.orderBy('fecha', 'desc')
                .limit(limit)
                .startAfter(startAt)
    );
    return collection.valueChanges();
  }

  /**
   * Guarda el token de un usuario en la base de datos.
   * @param userId - ID único del usuario.
   * @param token - Token de registro del dispositivo.
   * @returns Una promesa que se resuelve cuando se completa la operación.
   */
  saveUserToken(userId: string, token: string): Promise<void> {
    const collection = this.database.collection('usuarios');
    return collection.doc(userId).update({
      tokens: firebase.firestore.FieldValue.arrayUnion(token)
    }).catch((error) => {
      console.error('Error al guardar el token de usuario:', error);
      throw error;
    });
  }

   /**
   * Obtiene los tokens de un usuario desde la base de datos.
   * @param userId - ID único del usuario.
   * @returns Una promesa que se resuelve con la lista de tokens del usuario.
   */
   async getUserTokenFromDatabase(userId: string): Promise<string[]> {
    const doc = await this.database.collection('usuarios').doc(userId).get().toPromise();
    if (doc.exists) {
      const userData = doc.data() as { tokens: string[] }; // Asigna el tipo de datos correctamente
      return userData.tokens || [];
    } else {
      throw new Error('No se encontró el usuario en la base de datos.');
    }
  }

  // /**
  //  * Envía una notificación push a un dispositivo.
  //  * @param token - Token de registro del dispositivo.
  //  * @param title - Título de la notificación.
  //  * @param body - Cuerpo de la notificación.
  //  * @returns Una promesa que se resuelve cuando se completa el envío de la notificación.
  //  */
  // async sendPushNotification(token: string, title: string, body: string): Promise<void> {
  //   try {
  //     const sendPushNotification = this.functions.httpsCallable('sendPushNotification');
  //     const response = await sendPushNotification({ token, title, body }).toPromise();
  //     // console.log('Notificación enviada con éxito:', response);
  //   } catch (error) {
  //     console.error('Error al enviar la notificación push:', error);
  //     throw error;
  //   }
  // }


  crearNotificacion(notificacion:Notificaciones){
    
    notificacion.id = this.getId();
    this.createDoc(notificacion,'notificaciones',notificacion.id).then(()=>{
  
    });
  }


  crearNotificacionPush(mensaje:string,sender:UserModel,grupoUser?:string,user?:string){


    if(grupoUser){
      this.getCollectionQuery<string>('usuariosNotificacion', 'grupo', '==' ,grupoUser).subscribe(usuario => {
        usuario.forEach((user:any) => {
         
          user.tokens.forEach(token => {
       
            this.sendPushNotification(token,sender,mensaje);
            
          })
          // Enviar la notificación push a cada token
        });
      });
    }

    if(user){
      this.getDoc("usuariosNotificacion",user).subscribe((resp:any) => {
        resp.tokens.forEach(token => {
       
          this.sendPushNotification(token,sender,mensaje);
          
        })
      });
    }
    
   
  }

  sendPushNotification(token:string,usuario:UserModel,mensaje:string){
    const base64Image = usuario.getAvatar();

    // Convierte la imagen en Base64 a una URL válida
    const blob = this.dataURItoBlob(base64Image);
    const url_img = URL.createObjectURL(blob);
    const  url = 'https://fcm.googleapis.com/fcm/send';
            
    const httpHeaders = new HttpHeaders()
    .set('Authorization', 'key=AAAAzH7MZWA:APA91bGYBaaS02lnGnk0o8YYByShtsiYOT-qg3InRoLWpjOx37BHQiCu2iQKpNEYxMfIqfrfVIlg4-un28E0Ty1wGOYEj6SHSpJVcXcErf8fV3OgbRZu_r_tGd2V_LLDPMom0C_Mzsft')
    .set('Content-Type', 'application/json');


    

    const message = {
      notification: {
        title: usuario.getNombreCorto(),
        body: mensaje,
        image:'',
        icon: url_img, // URL de una imagen para mostrar en la notificación
        // icon: this.$auth.currentUser.getAvatar(), // URL de un icono para mostrar en la notificación
        // badge: '', // URL de un distintivo para mostrar en la notificación (para dispositivos iOS)
        // clickAction: '', // URL o acción a realizar cuando se hace clic en la notificación
          //sound: '', // URL de un archivo de sonido para reproducir al recibir la notificación
          vibrate: true, // Activar la vibración del dispositivo al recibir la notificación
          requireInteraction: true, // Mantener la notificación visible hasta que se interactúe con ella
        
        // actions: [
          
        // ] // Lista de acciones para mostrar en la notificación (botones o enlaces)
      },
      to:token,
    };

    let sub:Subscription = this.http.post<any>(url,message,{headers: httpHeaders}).subscribe(
      (response) => {
        sub.unsubscribe();
        
      },
      (error) => {
        sub.unsubscribe();

        
      }
    );
  }


  

    // Función para convertir una imagen en Base64 a Blob
    private dataURItoBlob(dataURI: string): Blob {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }






}

/**
 * Tipo de dato para representar una ruta válida en la base de datos.
 * Puede ser una de las siguientes opciones:
 * - 'notificaciones'
 * - 'autorizacionFacturas'
 * - 'permisos'
 * - 'usuariosNotificacion'
 */
type path = 
  'notificaciones' | 
  'autorizacionFacturas' | 
  'permisos' |
  'usuariosNotificacion';