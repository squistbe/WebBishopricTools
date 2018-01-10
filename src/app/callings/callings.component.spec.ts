import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallingsComponent } from './callings.component';

describe('CallingsComponent', () => {
  let component: CallingsComponent;
  let fixture: ComponentFixture<CallingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
