import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioScheduleComponent } from './radio-schedule.component';

describe('RadioScheduleComponent', () => {
  let component: RadioScheduleComponent;
  let fixture: ComponentFixture<RadioScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
