/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CcfFormComponent } from './CcfForm.component';

describe('CcfFormComponent', () => {
  let component: CcfFormComponent;
  let fixture: ComponentFixture<CcfFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcfFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcfFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
