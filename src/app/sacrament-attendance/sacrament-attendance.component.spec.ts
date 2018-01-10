import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SacramentAttendanceComponent } from './sacrament-attendance.component';

describe('SacramentAttendanceComponent', () => {
  let component: SacramentAttendanceComponent;
  let fixture: ComponentFixture<SacramentAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacramentAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacramentAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
