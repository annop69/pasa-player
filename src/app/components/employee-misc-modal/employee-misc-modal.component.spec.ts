import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMiscModalComponent } from './employee-misc-modal.component';

describe('EmployeeMiscModalComponent', () => {
  let component: EmployeeMiscModalComponent;
  let fixture: ComponentFixture<EmployeeMiscModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeMiscModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeMiscModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
