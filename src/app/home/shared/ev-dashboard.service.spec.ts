import { TestBed } from '@angular/core/testing';

import { EvDashboardService } from './ev-dashboard.service';

describe('EvDashboardService', () => {
  let service: EvDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
