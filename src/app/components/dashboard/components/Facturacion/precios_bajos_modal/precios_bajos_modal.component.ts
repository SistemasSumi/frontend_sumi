import { Component, Input, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/components/auth/db.service';
import { Notificaciones } from 'src/app/components/auth/permisosUsuario';
import { SeguridadService } from 'src/app/components/auth/seguridad.service';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';
import { ConfiguracionService } from '../../configuracion/Configuracion.service';
import { ModelTerceroCompleto } from '../../configuracion/models/ModelTerceroCompleto';

@Component({
  selector: 'app-precios_bajos_modal',
  templateUrl: './precios_bajos_modal.component.html',
  styleUrls: ['./precios_bajos_modal.component.css']
})
export class Precios_bajos_modalComponent implements OnInit {


  metodos:MetodosShared = new MetodosShared();

  @Input() notificacion: Notificaciones;
  @Input() instanciaModal: NgbModalRef;

  clientes:ModelTerceroCompleto[] = [];
  cliente:ModelTerceroCompleto;
  venta:any;

  constructor(private toastr: ToastrService,private fire_db:DbService, private config:ConfiguracionService, private auth:SeguridadService) { 
   
  }

  ngOnInit() {

    this.config.SubjectdataCliente.subscribe(resp => {
      this.clientes = resp;
    });
    this.consultarFactura();
  }


  consultarFactura(){
    let sub:Subscription = this.fire_db.getDoc('autorizacionFacturas',this.notificacion.data?.codigo).subscribe((resp:any) => {
      
      console.log(resp);
      this.venta = resp;
      this.cliente = this.metodos.getObjectByValue<ModelTerceroCompleto>(this.clientes,resp.factura.cliente,"id")
      
      
      sub.unsubscribe();
    });
  }

  rechazar(){
    let notify:Notificaciones = {
      id:'',
      usuario:{avatar:this.auth.currentUser.getAvatar(),nombre:this.auth.currentUser.getNombreCorto(),username:this.auth.currentUser.getUsername()},
      mensaje:`<p>Tu solicitud de precios bajos para: <b>${this.cliente.nombreComercial}</b> fue: <span class="badge badge-outline-danger    font-size-12">RECHAZADA</span></p>`,
      fecha:new Date().getTime(),
      sender_user:this.auth.currentUser.getUsername(),
      data:{'codigo':this.venta.id},
      receiver_users:[this.notificacion.sender_user],
      tipo:'PRECIOS_BAJOS',
      grupo:'',
      vistas:[]
    }


    new MetodosShared().AlertQuestion(`Seguro desea rechazar la solicitud de: ${this.notificacion.sender_user}? `)
    .then((result) => {
      if (result.isConfirmed) {
        
        this.fire_db.crearNotificacion(notify);
    
    
        let msj = `Tu solicitud de precios bajos para: ${this.cliente.nombreComercial} fue rechazada`
        this.fire_db.crearNotificacionPush(msj,this.auth.currentUser,null,this.notificacion.sender_user);
    
    
        this.venta.estado = false;
        this.venta.autorizado = this.auth.currentUser.getUsername();
        this.fire_db.createDoc(this.venta,'autorizacionFacturas',this.venta.id).then(()=>{
      
          this.toastr.success("Solicitud rechazada.");
          this.instanciaModal.dismiss();
        });
      }
    });

  }

  aprobar(){
    let notify:Notificaciones = {
      id:'',
      usuario:{avatar:this.auth.currentUser.getAvatar(),nombre:this.auth.currentUser.getNombreCorto(),username:this.auth.currentUser.getUsername()},
      mensaje:`<p>Tu solicitud de precios bajos para: <b>${this.cliente.nombreComercial}</b> fue: <span class="badge badge-outline-success   font-size-12">APROBADA</span></p>`,
      fecha:new Date().getTime(),
      sender_user:this.auth.currentUser.getUsername(),
      data:{'codigo':this.venta.id},
      receiver_users:[this.notificacion.sender_user],
      tipo:'PRECIOS_BAJOS',
      grupo:'',
      vistas:[]
    }


    new MetodosShared().AlertQuestion(`Seguro desea aprobar la solicitud de: ${this.notificacion.sender_user}? `)
    .then((result) => {
      if (result.isConfirmed) {
        
        this.fire_db.crearNotificacion(notify);
    
    
        let msj = `Tu solicitud de precios bajos para: ${this.cliente.nombreComercial} fue aprobada`
        this.fire_db.crearNotificacionPush(msj,this.auth.currentUser,null,this.notificacion.sender_user);
    
    
        this.venta.estado = true;
        this.venta.autorizado = this.auth.currentUser.getUsername();
        this.fire_db.createDoc(this.venta,'autorizacionFacturas',this.venta.id).then(()=>{
      
          this.toastr.success("Solicitud aprobada.");
          this.instanciaModal.dismiss();

        });
      }
    });

  }

}
