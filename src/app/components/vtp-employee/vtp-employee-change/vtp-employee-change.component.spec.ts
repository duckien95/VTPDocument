import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtpEmployeeChangeComponent } from './vtp-employee-change.component';

describe('VtpEmployeeChangeComponent', () => {
  let component: VtpEmployeeChangeComponent;
  let fixture: ComponentFixture<VtpEmployeeChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtpEmployeeChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtpEmployeeChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
