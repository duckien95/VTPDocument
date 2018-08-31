import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertDocumentComponent } from './insert-document.component';

describe('InsertDocumentComponent', () => {
  let component: InsertDocumentComponent;
  let fixture: ComponentFixture<InsertDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
