import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent implements OnInit {


  @Input() animation: string = 'pulse'; // Animación por defecto: sin animación
  @Input() alignment: string = 'left'; 
  @Input() padding: string = '0';
  @Input() width: string = '4rem';
  @Input() height: string = '15px';
  @Input() marginBottom: string = '0';
  @Input() marginRight: string = '0';
  @Input() marginLeft: string = '0';
  @Input() marginTop: string = '0';

  @Input() borde: string = 'none';
  @Input() borderRadius: string = '50px';

  constructor() { }

  ngOnInit() {
  }


  getAlignmentClass() {
    // Retorna la clase CSS correspondiente a la alineación
    switch (this.alignment) {
      case 'left':
        return 'd-flex justify-content-start align-items-left';
      case 'center':
        return 'd-flex justify-content-center align-items-center';
      case 'right':
        return 'd-flex justify-content-end align-items-right';
      default:
        return '';
    }
  }

}
