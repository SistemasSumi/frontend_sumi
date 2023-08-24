import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public auth:SeguridadService) { }

  ventas:any;
  totalVendido:any;
  resumen:any;


  user:UserModel;

  ngOnInit() {
    this.user = this.auth.currentUser;
    if (this.user.is_vendedor) {
      this.auth.obtenerVentasVendedor().subscribe(resp => {
        this.totalVendido = 0;
        this.resumen = resp.resumen;
        this.ventas = [];
        this.auth.balance = resp.resumen.monto_total;
        this.ventas = resp.ventas;
        for(let x of this.ventas){
          this.totalVendido+=x.total;
        }

      });
    }
  }

}
