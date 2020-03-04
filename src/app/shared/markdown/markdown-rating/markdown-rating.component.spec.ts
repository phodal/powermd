import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownRatingComponent } from './markdown-rating.component';

describe('MarkdownRatingComponent', () => {
  let component: MarkdownRatingComponent;
  let fixture: ComponentFixture<MarkdownRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
