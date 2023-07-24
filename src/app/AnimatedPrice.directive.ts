import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appAnimatedPrice]'
})
export class AnimatedPriceDirective implements OnChanges {
  @Input('appAnimatedPrice') priceValue: number = 0;
  animDuration: number = 1500;
  minAnimDuration: number = 50;
  timer: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.priceValue && changes.priceValue.currentValue !== undefined) {
      const newValue = changes.priceValue.currentValue;
      const oldValue = changes.priceValue.previousValue !== undefined ? changes.priceValue.previousValue : 0;

      if (isNaN(newValue) || newValue === oldValue) return;

      clearInterval(this.timer);

      let range = newValue - oldValue;
      let duration = Math.max(this.animDuration, this.minAnimDuration);
      let start = new Date().getTime();
      let end = start + duration;

      const animate = () => {
        let currentTime = new Date().getTime();
        let remaining = Math.max(end - currentTime, 0);
        let progress = duration - remaining;
        let currValue = Math.round(oldValue + (progress / duration) * range);

        if (range > 0 && currValue >= newValue) {
          currValue = newValue;
        } else if (range < 0 && currValue <= newValue) {
          currValue = newValue;
        }

        let formattedValue = this.currencyPipe.transform(currValue, 'USD', 'symbol-narrow');
        this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', formattedValue);

        if (remaining <= 0) {
          clearInterval(this.timer);
          this.priceValue = newValue; // Actualizar el valor actual
        }
      };

      this.timer = setInterval(animate, this.minAnimDuration);
      animate();
    }
  }
}
