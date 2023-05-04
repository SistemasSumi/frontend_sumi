import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import {
  OverlayRef,
  Overlay,
  OverlayPositionBuilder,
  ConnectionPositionPair,
  OriginConnectionPosition,
  OverlayConnectionPosition,
} from '@angular/cdk/overlay';

import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipProductoComponent } from './tooltip-producto.component';
import { Producto } from 'src/app/components/dashboard/components/inventario/stock/models/producto';

export const POSITIONS = ['top', 'right', 'bottom', 'left'];

@Directive({
  selector: '[tooltipProducto]',
})
export class TooltipProductoDirective {
  private _tooltipPosition: string = 'bottom';

  @Input('tooltipProducto') data:Producto;

  @Input('tooltipProducto-position') set tooltipPosition(position: string) {
    this._tooltipPosition = POSITIONS.includes(position) ? position : 'bottom';
  }

  get tooltipPosition(): string {
    return this._tooltipPosition;
  }

  private overlayRef: OverlayRef;
  private tooltipRef: ComponentRef<TooltipProductoComponent>;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {}

  createTooltip() {
    const chosenPosition = this.setPositon();

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        chosenPosition,
        //caso não tenha espaço na sua tooltip o cdk vai tentar as posições do ConnectionPositionPair
        //bottom
        new ConnectionPositionPair(
          { originX: 'center', originY: 'bottom' },
          { overlayX: 'center', overlayY: 'top' },
          0,
          10
        ),
        //top
        new ConnectionPositionPair(
          { originX: 'center', originY: 'top' },
          { overlayX: 'center', overlayY: 'bottom' },
          0,
          -10
        ),
        //left
        new ConnectionPositionPair(
          { originX: 'start', originY: 'center' },
          { overlayX: 'end', overlayY: 'center' },
          -10,
          0
        ),
        //right
        new ConnectionPositionPair(
          { originX: 'end', originY: 'center' },
          { overlayX: 'start', overlayY: 'center' },
          10,
          0
        ),
      ]);

    this.overlayRef = this.overlay.create({ positionStrategy });

    this.tooltipRef = this.overlayRef.attach(
      new ComponentPortal(TooltipProductoComponent)
    );
  }

  setPositon() {
    let originPosition!: OriginConnectionPosition;
    let overlayPosition!: OverlayConnectionPosition;
    let offSet = {};

    if (!this.tooltipPosition || this.tooltipPosition === 'bottom') {
      originPosition = { originX: 'center', originY: 'bottom' };
      overlayPosition = { overlayX: 'center', overlayY: 'top' };
      offSet = { offsetY: 5 };      
    } else if (this.tooltipPosition === 'top') {
      originPosition = { originX: 'center', originY: 'top' };
      overlayPosition = { overlayX: 'center', overlayY: 'bottom' };
      offSet = { offsetY: -5 };
    } else if (this.tooltipPosition === 'left') {
      originPosition = { originX: 'start', originY: 'center' };
      overlayPosition = { overlayX: 'end', overlayY: 'center' };
      offSet = { offsetX: -5 };
    } else if (this.tooltipPosition === 'right') {
      originPosition = { originX: 'end', originY: 'center' };
      overlayPosition = { overlayX: 'start', overlayY: 'center' };
      offSet = { offsetX: 5 };
    }

    return {
      ...originPosition,
      ...overlayPosition,
      ...offSet,
    }
  }

  @HostListener('mouseenter')
  show() {
    this.createTooltip();
    this.tooltipRef.instance.data = this.data;
    this.tooltipRef.instance.overlayRef = this.overlayRef;
  }

  @HostListener('mouseleave')
  

  @HostListener('focusout')
  hide() {
    
      this.tooltipRef.destroy();
      this.overlayRef.detach();
    
  }
  
}

//todas as posições pra sua tooltip

//BOTTOM
// originX: 'center',
// originY: 'bottom',
// overlayX: 'center',
// overlayY: 'top',
// offsetY: 10,

//bottom-left
// originX: 'center',
// originY: 'bottom',
// overlayX: 'end',
// overlayY: 'top',
// offsetY: 10,

//bottom-rigth
// originX: 'center',
// originY: 'bottom',
// overlayX: 'start',
// overlayY: 'top',
// offsetY: 10,

//TOP
// originX: 'center',
// originY: 'top',
// overlayX: 'center',
// overlayY: 'bottom',
// offsetY: -10,

//top-left
// originX: 'center',
// originY: 'top',
// overlayX: 'end',
// overlayY: 'bottom',
// offsetY: -10,

//top-rigth
// originX: 'center',
// originY: 'top',
// overlayX: 'start',
// overlayY: 'bottom',
// offsetY: -10,

//LEFT
// originX: 'start',
// originY: 'center',
// overlayX: 'end',
// overlayY: 'center',
// offsetX: -10,

//left-bottom
// originX: 'start',
// originY: 'center',
// overlayX: 'end',
// overlayY: 'top',
// offsetX: -10,

//left-top
// originX: 'start',
// originY: 'center',
// overlayX: 'end',
// overlayY: 'bottom',
// offsetX: -10,

//RIGHT
// originX: 'end',
// originY: 'center',
// overlayX: 'start',
// overlayY: 'center',
// offsetX: 10

//right-top
// originX: 'end',
// originY: 'center',
// overlayX: 'start',
// overlayY: 'bottom',
// offsetX: 10,

//right-bottom
// originX: 'end',
// originY: 'center',
// overlayX: 'start',
// overlayY: 'bottom',
// offsetX: 10,
