importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');



firebase.initializeApp({
    apiKey: "AIzaSyBfS3l6O7C_xlAWy_QRMrlBZmLU7ZXXcZE",
    authDomain: "sarpsoft-5482d.firebaseapp.com",
    projectId: "sarpsoft-5482d",
    storageBucket: "sarpsoft-5482d.appspot.com",
    messagingSenderId: "878300652896",
    appId: "1:878300652896:web:3bb912009ac802ea53aa05"
  });
const messaging = firebase.messaging();

// Escucha las notificaciones push en primer plano
self.addEventListener('push', (event) => {
    const payload = event.data.json();

    const { title, body, image, icon,  vibrate, // Activar la vibración del dispositivo al recibir la notificación
    requireInteraction,} = payload.notification;

    event.waitUntil(
        self.registration.showNotification(title, {
        body: body,
        image:image,
        icon:icon,
        vibrate:vibrate,
        requireInteraction:requireInteraction
        
        })
    );
  });

// Configura el servicio de mensajería en segundo plano
messaging.onBackgroundMessage((payload) => {
   

  
});