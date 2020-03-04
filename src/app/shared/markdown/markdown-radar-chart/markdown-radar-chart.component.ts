import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MarkdownTaskModel } from '../model/markdown.model';
import { MarkdownTaskItemService } from '../markdown-task-item/markdown-task-item.service';

import RadarChart from './RadarChart.js';
import d3 from 'd3';

@Component({
  selector: 'component-markdown-radar-chart',
  templateUrl: './markdown-radar-chart.component.html',
  styleUrls: ['./markdown-radar-chart.component.scss']
})
export class MarkdownRadarChartComponent implements OnInit, AfterViewInit {
  @ViewChild('baseElement', {}) baseElement: ElementRef;
  tasks: MarkdownTaskModel[];

  constructor(private markdownTaskItemService: MarkdownTaskItemService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.render();
  }

  /* tslint:disable */
  render() {
    const element = this.baseElement.nativeElement;

    const w = 500;
    const h = 500;

    let colorscale = d3.scale.category10();

    let LegendOptions = ['Smartphone', 'Tablet'];
    let data = [
      [
        {axis: 'Email', value: 4},
        {axis: 'Social Networks', value: 2},
        {axis: 'Internet Banking', value: 3},
        {axis: 'News Sportsites', value: 2},
        {axis: 'Search Engine', value: 5}
      ], []
    ];

    // Options for the Radar chart, other than default
    let mycfg = {
      width: w,
      height: h,
      maxValue: 5,
      levels: 5,
      ExtraWidthX: 300
    };

    RadarChart.draw('#chart', data, mycfg);

    let svg = d3.select('#body')
      .selectAll('svg')
      .append('svg')
      .attr('width', w + 300)
      .attr('height', h);

    let legend = svg.append('g')
      .attr('class', 'legend')
      .attr('height', 100)
      .attr('width', 200)
      .attr('transform', 'translate(90,20)')
    ;

    legend.selectAll('rect')
      .data(LegendOptions)
      .enter()
      .append('rect')
      .attr('x', w - 65)
      .attr('y', (d, i) => i * 20)
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d, i) {
        return colorscale(i.toString());
      })
    ;

    legend.selectAll('text')
      .data(LegendOptions)
      .enter()
      .append('text')
      .attr('x', w - 52)
      .attr('y', function(d, i) {
        return i * 20 + 9;
      })
      .attr('font-size', '11px')
      .attr('fill', '#737373')
      .text(function(d) {
        return d;
      })
    ;
  }

}
