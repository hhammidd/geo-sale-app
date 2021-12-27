import { TestBed } from '@angular/core/testing';

import { SalepointOlService } from './salepoint-ol.service';

describe('SalepointOlService', () => {
  let service: SalepointOlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalepointOlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
