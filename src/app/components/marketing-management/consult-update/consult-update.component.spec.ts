import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultUpdateComponent } from './consult-update.component';

describe('ConsultUpdateComponent', () => {
  let component: ConsultUpdateComponent;
  let fixture: ComponentFixture<ConsultUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
