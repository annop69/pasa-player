import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleDeveloperComponent } from './people-developer.component';

describe('PeopleDeveloperComponent', () => {
  let component: PeopleDeveloperComponent;
  let fixture: ComponentFixture<PeopleDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleDeveloperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
