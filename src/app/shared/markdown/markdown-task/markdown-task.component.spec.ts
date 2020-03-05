import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MarkdownTaskComponent } from './markdown-task.component';
import { SharedModule } from '../../shared.module';
import { FeaturesModule } from '../../../features/features.module';

describe('MarkdownTaskItemComponent', () => {
  let component: MarkdownTaskComponent;
  let fixture: ComponentFixture<MarkdownTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
        FeaturesModule
      ],
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
