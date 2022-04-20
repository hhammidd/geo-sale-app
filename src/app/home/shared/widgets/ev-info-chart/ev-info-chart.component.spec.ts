import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvInfoChartComponent } from './ev-info-chart.component';

describe('EvInfoChartComponent', () => {
  let component: EvInfoChartComponent;
  let fixture: ComponentFixture<EvInfoChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvInfoChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvInfoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
