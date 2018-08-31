import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAddOrChangeComponent } from './post-add-or-change.component';

describe('PostAddOrChangeComponent', () => {
  let component: PostAddOrChangeComponent;
  let fixture: ComponentFixture<PostAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
