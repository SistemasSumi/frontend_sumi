import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  Optional,
  Host,
  OnInit,
} from '@angular/core';

import { NgControl } from '@angular/forms';
@Directive({
  selector: '[onblur]',
})
export class BlurFormatDirective implements OnInit {
  @Input('onblur') transform: (string) => string | null;


  @HostListener('blur') onBlur() {
    if (this.transform && this.control){
     
       this.el.nativeElement.value = this.transform(this.control.value);
    }
  }
  
  @HostListener('focus') onFocus() {
    if (this.transform && this.control)
      this.el.nativeElement.value = this.control.value?this.control.value:'';
  }


  
  
  constructor(
    private el: ElementRef,
    @Optional() @Host() private control: NgControl
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.onBlur()
    });
  }
}
