import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownRatingItemComponent } from './markdown-rating-item.component';

describe('MarkdownRatingItemComponent', () => {
  let component: MarkdownRatingItemComponent;
  let fixture: ComponentFixture<MarkdownRatingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownRatingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownRatingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
