
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
import { CurrentYearPipe } from './CurrentYear.pipe';
import { NumeroALetrasPipe } from './NumeroALetras.pipe';
import { FechaVencimientoPipe } from './FechaVencimiento.pipe';
import { SafeHtmlPipe } from './safeHtml.pipe';
import { FechaRelativaPipe } from './fechaRelativa.pipe';
import { ParseFloatPipe } from './parseFloat.pipe';
import { ObjectFilterPipe } from './ObjectFilter.pipe';





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
      DatePipe,
      CurrentYearPipe,
      NumeroALetrasPipe,
      FechaVencimientoPipe,
      SafeHtmlPipe,
      FechaRelativaPipe,
      ParseFloatPipe,
      ObjectFilterPipe
   ],
  exports: [
    FiltroPipe,
    CerosPipe,
    DatetimePipe,
    DiffTimePipe,
    PagPipe,
    TrimPipe,
    BooleanPipe,
    AcortarTextPipe,
    CurrentYearPipe,
    NumeroALetrasPipe,
    FechaVencimientoPipe,
    SafeHtmlPipe,
    FechaRelativaPipe,
    ParseFloatPipe,
    ObjectFilterPipe


  ]
})
export class PipesModule { }
