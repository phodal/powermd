import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownRadarChartComponent } from './markdown-radar-chart.component';

describe('MarkdownRadarChartComponent', () => {
  let component: MarkdownRadarChartComponent;
  let fixture: ComponentFixture<MarkdownRadarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownRadarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownRadarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
