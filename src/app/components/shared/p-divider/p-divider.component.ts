import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'p-divider',
  templateUrl: './p-divider.component.html',
  styleUrls: ['./p-divider.component.css']
})
export class PDividerComponent implements OnInit {


 @Input('text') text:string = "";
 @Input('align') align:string = "";

  constructor() { }

  ngOnInit() {
  }

}
