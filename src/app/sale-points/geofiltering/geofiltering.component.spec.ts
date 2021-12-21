import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofilteringComponent } from './geofiltering.component';

describe('GeofilteringComponent', () => {
  let component: GeofilteringComponent;
  let fixture: ComponentFixture<GeofilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeofilteringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
