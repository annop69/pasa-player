import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthAccomplishmentComponent } from './strength-accomplishment.component';

describe('StrengthAccomplishmentComponent', () => {
  let component: StrengthAccomplishmentComponent;
  let fixture: ComponentFixture<StrengthAccomplishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrengthAccomplishmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrengthAccomplishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
