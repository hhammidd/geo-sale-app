import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalepointOverviewComponent } from './salepoint-overview.component';

describe('SalepointOverviewComponent', () => {
  let component: SalepointOverviewComponent;
  let fixture: ComponentFixture<SalepointOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalepointOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalepointOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
