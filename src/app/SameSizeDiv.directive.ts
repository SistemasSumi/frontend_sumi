import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[SameSizeDiv]'
})
export class SameSizeDivDirective implements  AfterViewInit  {

  constructor(private el: ElementRef,private renderer: Renderer2) { 
 
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const divs = this.el.nativeElement.getElementsByClassName('divs-iguales');
      let maxHeight = 0;

      for (let i = 0; i < divs.length; i++) {
        const div = divs[i];
        const height = div.offsetHeight;
        maxHeight = Math.max(maxHeight, height);
      }

      for (let i = 0; i < divs.length; i++) {
        const div = divs[i];
        this.renderer.setStyle(div, 'height', maxHeight + 'px');
      }
    });
  }



}
