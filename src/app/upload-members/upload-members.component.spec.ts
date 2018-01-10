import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMembersComponent } from './upload-members.component';

describe('UploadMembersComponent', () => {
  let component: UploadMembersComponent;
  let fixture: ComponentFixture<UploadMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
