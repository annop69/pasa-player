import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceFactorComponent } from './performance-factor.component';

describe('PerformanceFactorComponent', () => {
  let component: PerformanceFactorComponent;
  let fixture: ComponentFixture<PerformanceFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceFactorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
