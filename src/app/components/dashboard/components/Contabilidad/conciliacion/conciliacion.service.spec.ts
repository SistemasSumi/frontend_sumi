/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConciliacionService } from './conciliacion.service';

describe('Service: Conciliacion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConciliacionService]
    });
  });

  it('should ...', inject([ConciliacionService], (service: ConciliacionService) => {
    expect(service).toBeTruthy();
  }));
});
