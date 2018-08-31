import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioAddOrChangeComponent } from './radio-add-or-change.component';

describe('RadioAddOrChangeComponent', () => {
  let component: RadioAddOrChangeComponent;
  let fixture: ComponentFixture<RadioAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
