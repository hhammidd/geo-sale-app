import { TestBed } from '@angular/core/testing';

import { SpmainService } from './spmain.service';

describe('SpmainService', () => {
  let service: SpmainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpmainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
