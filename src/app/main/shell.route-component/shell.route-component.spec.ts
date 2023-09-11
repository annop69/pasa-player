import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellRouteComponent } from './shell.route-component';

describe('ShellRouteComponent', () => {
  let component: ShellRouteComponent;
  let fixture: ComponentFixture<ShellRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShellRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
