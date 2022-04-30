import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmeComponent } from './formme.component';

describe('FormmeComponent', () => {
  let component: FormmeComponent;
  let fixture: ComponentFixture<FormmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
