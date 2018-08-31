import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtpChildServiceComponent } from './vtp-child-service.component';

describe('VtpChildServiceComponent', () => {
  let component: VtpChildServiceComponent;
  let fixture: ComponentFixture<VtpChildServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtpChildServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtpChildServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
