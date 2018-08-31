import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAgencyUpdateComponent } from './register-agency-update.component';

describe('RegisterAgencyUpdateComponent', () => {
  let component: RegisterAgencyUpdateComponent;
  let fixture: ComponentFixture<RegisterAgencyUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAgencyUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAgencyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
