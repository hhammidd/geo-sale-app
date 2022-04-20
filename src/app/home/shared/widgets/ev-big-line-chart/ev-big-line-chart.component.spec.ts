import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvBigLineChartComponent } from './ev-big-line-chart.component';

describe('EvBigLineChartComponent', () => {
  let component: EvBigLineChartComponent;
  let fixture: ComponentFixture<EvBigLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvBigLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvBigLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
