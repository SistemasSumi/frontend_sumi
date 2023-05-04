import { Component, Input, OnInit } from '@angular/core';
import { Kardex } from '../stock/models/kardex';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {

  @Input() listado:Kardex[] = [];

  constructor() { }

  ngOnInit() {
  }

}
