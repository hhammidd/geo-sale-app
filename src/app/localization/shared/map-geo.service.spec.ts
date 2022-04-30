import { TestBed } from '@angular/core/testing';

import { MapGeoService } from './map-geo.service';

describe('MapGeoService', () => {
  let service: MapGeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapGeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
