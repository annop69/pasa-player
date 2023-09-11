import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueCreatorComponent } from './value-creator.component';

describe('ValueCreatorComponent', () => {
  let component: ValueCreatorComponent;
  let fixture: ComponentFixture<ValueCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
