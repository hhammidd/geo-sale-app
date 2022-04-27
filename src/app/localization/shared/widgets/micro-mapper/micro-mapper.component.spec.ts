import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroMapperComponent } from './micro-mapper.component';

describe('MicroMapperComponent', () => {
  let component: MicroMapperComponent;
  let fixture: ComponentFixture<MicroMapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroMapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
