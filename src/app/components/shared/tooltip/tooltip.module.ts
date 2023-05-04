import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { OverlayModule } from '@angular/cdk/overlay'
import { TooltipProductoComponent } from './tooltip-producto/tooltip-producto.component';
import { TooltipProductoDirective } from './tooltip-producto/tooltip.directive';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    TooltipProductoComponent,
    TooltipProductoDirective
  ],
  imports: [
    CommonModule,
    OverlayModule,
    MatListModule,
    PipesModule
  ],
  exports: [
    TooltipProductoDirective,
    MatListModule
  ]
})
export class TooltipModule { }
