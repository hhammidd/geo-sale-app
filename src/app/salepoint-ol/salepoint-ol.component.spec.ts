import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalepointOlComponent } from './salepoint-ol.component';

describe('SalepointOlComponent', () => {
  let component: SalepointOlComponent;
  let fixture: ComponentFixture<SalepointOlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalepointOlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalepointOlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
