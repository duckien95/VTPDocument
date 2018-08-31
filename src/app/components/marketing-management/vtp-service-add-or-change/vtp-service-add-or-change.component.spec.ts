import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtpServiceAddOrChangeComponent } from './vtp-service-add-or-change.component';

describe('VtpServiceAddOrChangeComponent', () => {
  let component: VtpServiceAddOrChangeComponent;
  let fixture: ComponentFixture<VtpServiceAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtpServiceAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtpServiceAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
