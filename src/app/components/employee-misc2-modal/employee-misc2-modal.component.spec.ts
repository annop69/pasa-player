import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMisc2ModalComponent } from './employee-misc2-modal.component';

describe('EmployeeMisc2ModalComponent', () => {
  let component: EmployeeMisc2ModalComponent;
  let fixture: ComponentFixture<EmployeeMisc2ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeMisc2ModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeMisc2ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
