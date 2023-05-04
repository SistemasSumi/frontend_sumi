import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetodosShared } from './metodos';


@NgModule({
  exports:[
    MetodosShared
  ],
  imports: [
    CommonModule,
    
  ],
  declarations: []
})
export class MetodosModule { }
