import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-NEmpleados',
  templateUrl: './NEmpleados.component.html',
  styleUrls: ['./NEmpleados.component.css']
})
export class NEmpleadosComponent implements OnInit {
  
  constructor() { }


  ano = new Date().getFullYear();
  ngOnInit() {
  }

}
