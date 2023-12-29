import { TestBed } from '@angular/core/testing';

import { OrdenDeCotizacionService } from './orden-de-cotizacion.service';

describe('OrdenDeCotizacionService', () => {
  let service: OrdenDeCotizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdenDeCotizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
