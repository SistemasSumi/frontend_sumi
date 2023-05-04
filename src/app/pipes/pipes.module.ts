
import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { CerosPipe } from './ceros.pipe';
import { DatetimePipe } from './datetime.pipe';
import { DiffTimePipe } from './diffTime.pipe';
import { PagPipe } from './pag.pipe';
import { Base64ImagPipePipe } from './Base64ImagPipe.pipe';
import { TrimPipe } from './trim.pipe';
import { BooleanPipe } from './Boolean.pipe';
import { AcortarTextPipe } from './acortarText.pipe';
import { DatePipe } from './date.pipe';
;




@NgModule({
  declarations: [										
    FiltroPipe,
    CerosPipe,
      DatetimePipe,
      DiffTimePipe,
      PagPipe,
      Base64ImagPipePipe,
      TrimPipe,
      BooleanPipe,
      AcortarTextPipe,
      DatePipe
   ],
  exports: [
    FiltroPipe,
    CerosPipe,
    DatetimePipe,
    DiffTimePipe,
    PagPipe,
    TrimPipe,
    BooleanPipe,
    AcortarTextPipe

  ]
})
export class PipesModule { }
