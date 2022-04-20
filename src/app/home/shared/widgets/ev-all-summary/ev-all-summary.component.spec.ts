import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvAllSummaryComponent } from './ev-all-summary.component';

describe('EvAllSummaryComponent', () => {
  let component: EvAllSummaryComponent;
  let fixture: ComponentFixture<EvAllSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvAllSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvAllSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
