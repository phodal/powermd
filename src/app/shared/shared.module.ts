import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CustomMaterialModule } from './custom-material.module';
import { NgxTreeDndModule } from './third-party/ngx-tree-dnd/ngx-tree-dnd.module';
import { ContentEditableDirective } from './directives/content-editable.directive';
import { DraggableEditableSectionComponent } from './components/draggable-editable-section/draggable-editable-section.component';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { GridEditorComponent } from './components/grid-editor/grid-editor.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RichTextEditorComponent } from './components/rich-text-editor/rich-text-editor.component';
import { MarkdownTasksEditorComponent } from './markdown/markdown-task-editor/markdown-tasks-editor.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { MarkdownTaskItemComponent } from './markdown/markdown-task-item/markdown-task-item.component';
import { MarkdownTaskRenderComponent } from './markdown/markdown-task-render/markdown-task-render.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MarkdownTaskItemService } from './markdown/markdown-task-item/markdown-task-item.service';
import { MindMapModule } from './modules/mind-map/mind-map.module';
import { MarkdownTaskItemFormComponent } from './markdown/markdown-task-item-form/markdown-task-item-form.component';
import { AngularSplitModule } from 'angular-split';
import { MarkdownKanbanComponent } from './markdown/markdown-kanban/markdown-kanban.component';
import { MarkdownRadarChartComponent } from './markdown/markdown-radar-chart/markdown-radar-chart.component';
import { MarkdownRatingComponent } from './markdown/markdown-rating/markdown-rating.component';
import { MarkdownRatingItemComponent } from './markdown/markdown-rating-item/markdown-rating-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    NgxTreeDndModule,
    EcoFabSpeedDialModule,
    FlexLayoutModule,
    FlatpickrModule.forRoot(),
    AngularSplitModule.forRoot(),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true
        },
      },
    }),
    MindMapModule
  ],
  declarations: [
    DraggableEditableSectionComponent,
    ContentEditableDirective,
    GridEditorComponent,

    MarkdownTasksEditorComponent,
    MarkdownTaskItemComponent,
    RichTextEditorComponent,
    MarkdownTaskRenderComponent,
    MarkdownTaskItemFormComponent,
    MarkdownKanbanComponent,
    MarkdownRadarChartComponent,

    MarkdownRatingComponent,
    MarkdownRatingItemComponent
  ],
  providers: [
    ContentEditableDirective,
    MarkdownTaskItemService
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    NgxTreeDndModule,
    FlexLayoutModule,
    FlatpickrModule,
    MindMapModule,
    AngularSplitModule,

    DraggableEditableSectionComponent,
    GridEditorComponent,

    MarkdownTasksEditorComponent,
    MarkdownTaskItemComponent,
    MarkdownTaskRenderComponent,
    RichTextEditorComponent,
    MarkdownTaskItemFormComponent,
    MarkdownKanbanComponent,
    MarkdownRadarChartComponent,
    MarkdownRatingComponent,
    MarkdownRatingItemComponent
  ],
  entryComponents: [
    MarkdownTaskItemFormComponent
  ]
})
export class SharedModule {
}
