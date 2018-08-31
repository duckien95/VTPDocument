import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtpEmployeeComponent } from './vtp-employee.component';

describe('VtpEmployeeComponent', () => {
  let component: VtpEmployeeComponent;
  let fixture: ComponentFixture<VtpEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtpEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtpEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
