import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SacramentCalendarComponent } from './sacrament-calendar.component';

describe('SacramentCalendarComponent', () => {
  let component: SacramentCalendarComponent;
  let fixture: ComponentFixture<SacramentCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacramentCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacramentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
