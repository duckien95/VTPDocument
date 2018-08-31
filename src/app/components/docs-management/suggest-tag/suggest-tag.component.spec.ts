import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestTagComponent } from './suggest-tag.component';

describe('SuggestTagComponent', () => {
  let component: SuggestTagComponent;
  let fixture: ComponentFixture<SuggestTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
