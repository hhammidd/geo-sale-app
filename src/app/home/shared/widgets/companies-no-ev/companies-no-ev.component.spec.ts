import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesNoEvComponent } from './companies-no-ev.component';

describe('CompaniesNoEvComponent', () => {
  let component: CompaniesNoEvComponent;
  let fixture: ComponentFixture<CompaniesNoEvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesNoEvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesNoEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
