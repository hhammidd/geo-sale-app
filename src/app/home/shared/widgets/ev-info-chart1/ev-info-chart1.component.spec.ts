import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvInfoChart1Component } from './ev-info-chart1.component';

describe('EvInfoChart1Component', () => {
  let component: EvInfoChart1Component;
  let fixture: ComponentFixture<EvInfoChart1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvInfoChart1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvInfoChart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
