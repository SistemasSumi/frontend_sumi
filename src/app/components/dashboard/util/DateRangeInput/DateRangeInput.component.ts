import { Component, Input, forwardRef, OnInit, AfterViewInit, ChangeDetectorRef, AfterContentInit, AfterContentChecked } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MetodosShared } from 'src/app/components/shared/metodos/metodos';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './DateRangeInput.component.html',
  styleUrls: ['./DateRangeInput.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeInputComponent),
      multi: true,
    },
  ],
})
export class DateRangeInputComponent implements ControlValueAccessor    {
 

  @Input() startDate: Date;
  @Input() endDate: Date;
  
  onChange: any = () => {};
  onTouched: any = () => {};
  
  metodos: MetodosShared = new MetodosShared();
  
  
  
  
  writeValue(value: any) {
    if (value) {
      this.startDate = value.startDate;
      this.endDate = value.endDate;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {}

  updateModel() {
    this.onChange({
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }

  loQueVaDelMes() {
    const result = this.metodos.loQueVaDelMes();

    this.startDate = result.startDate;
    this.endDate = result.endDate;
    this.updateModel();
  }

  mesAnterior() {
    const result = this.metodos.mesAnterior();

    this.startDate = result.startDate;
    this.endDate = result.endDate;
    this.updateModel();
  }

  yearActual() {
    const result = this.metodos.yearActual();

    this.startDate = result.startDate;
    this.endDate = result.endDate;
    this.updateModel();
  }

  yearAnterior() {
    const result = this.metodos.yearAnterior();

    this.startDate = result.startDate;
    this.endDate = result.endDate;
    this.updateModel();
  }

  semanaActual() {
    const result = this.metodos.semanaActual();

    this.startDate = result.startDate;
    this.endDate = result.endDate;
    this.updateModel();
  }

  semanaAnterior() {
    const result = this.metodos.semanaAnterior();

    this.startDate = result.startDate;
    this.endDate = result.endDate;
    this.updateModel();
  }
}
