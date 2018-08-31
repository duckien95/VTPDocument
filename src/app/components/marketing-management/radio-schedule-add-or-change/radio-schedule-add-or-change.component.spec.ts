import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioScheduleAddOrChangeComponent } from './radio-schedule-add-or-change.component';

describe('RadioScheduleAddOrChangeComponent', () => {
  let component: RadioScheduleAddOrChangeComponent;
  let fixture: ComponentFixture<RadioScheduleAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioScheduleAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioScheduleAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
