import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../auth/seguridad.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public auth:SeguridadService) { }

  ngOnInit(): void {

   
  }

}
