import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOperatorComponent } from './business-operator.component';

describe('BusinessOperatorComponent', () => {
  let component: BusinessOperatorComponent;
  let fixture: ComponentFixture<BusinessOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessOperatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
