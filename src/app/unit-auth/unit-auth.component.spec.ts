import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitAuthComponent } from './unit-auth.component';

describe('UnitAuthComponent', () => {
  let component: UnitAuthComponent;
  let fixture: ComponentFixture<UnitAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
