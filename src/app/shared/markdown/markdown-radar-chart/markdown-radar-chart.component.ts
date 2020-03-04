import { Component, OnInit } from '@angular/core';
import { MarkdownTaskModel } from '../model/markdown.model';
import { MarkdownTaskItemService } from '../markdown-task-item/markdown-task-item.service';

@Component({
  selector: 'component-markdown-radar-chart',
  templateUrl: './markdown-radar-chart.component.html',
  styleUrls: ['./markdown-radar-chart.component.scss']
})
export class MarkdownRadarChartComponent implements OnInit {
  tasks: MarkdownTaskModel[];

  constructor(private markdownTaskItemService: MarkdownTaskItemService) {
  }

  ngOnInit() {

  }
}
