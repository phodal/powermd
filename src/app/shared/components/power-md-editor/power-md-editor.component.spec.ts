import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerMdEditorComponent } from './power-md-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared.module';
import { FeaturesModule } from '../../../features/features.module';

describe('MarkdownEditorComponent', () => {
  let component: PowerMdEditorComponent;
  let fixture: ComponentFixture<PowerMdEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
        FeaturesModule
      ],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerMdEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
