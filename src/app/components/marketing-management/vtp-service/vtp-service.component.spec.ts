import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtpServiceComponent } from './vtp-service.component';

describe('VtpServiceComponent', () => {
  let component: VtpServiceComponent;
  let fixture: ComponentFixture<VtpServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtpServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtpServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
