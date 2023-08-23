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


  user:UserModel;

  ngOnInit() {
    this.user = this.auth.currentUser;
    if (this.user.is_vendedor) {
      this.auth.obtenerVentasVendedor().subscribe(resp => {
        this.auth.balance = resp.balance;
        console.log(resp);

      });
    }
  }

}
