import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoSalesComponent } from './geo-sales.component';

describe('GeoSalesComponent', () => {
  let component: GeoSalesComponent;
  let fixture: ComponentFixture<GeoSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
