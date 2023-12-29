// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  secretKey:"SARP2023",
  firebaseConfig : {
    apiKey: "AIzaSyBfS3l6O7C_xlAWy_QRMrlBZmLU7ZXXcZE",
    authDomain: "sarpsoft-5482d.firebaseapp.com",
    projectId: "sarpsoft-5482d",
    storageBucket: "sarpsoft-5482d.appspot.com",
    messagingSenderId: "878300652896",
    appId: "1:878300652896:web:3bb912009ac802ea53aa05"
  },
  languageDataTable: {
    "sProcessing":  "<span class='fa-stack fa-lg'><i class='fa fa-spinner fa-spin fa-stack-2x fa-fw'></i></span>&nbsp;&nbsp;&nbsp;&nbsp;Processing ...",
    "sLengthMenu": "Mostrar _MENU_ ",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sSearch": "Buscar:",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
      "sFirst": "Primero",
      "sLast": "Último",
      "sNext": "Siguiente",
      "sPrevious": "Anterior"
    },
    "oAria": {
      "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
      "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
      "copy": "Copiar",
      "colvis": "Visibilidad"
    }

  },

  BACKEND_DIR:"https://backend.sumiprodelacosta.com/",
  // BACKEND_DIR:"http://localhost:8000/",
  // WEBSOCKETURL: "ws://localhost:8000/"
  // WEBSOCKETURL: "ws://backend.sumiprodelacosta.com/"

};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
