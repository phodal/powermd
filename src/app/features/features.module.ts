import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

import { TodoComponent } from './components/todo/todo.component';
import { ChecklistComponent } from './components/checklist/checklist.component';

@NgModule({
  declarations: [
    // Components
    TodoComponent, ChecklistComponent
  ],
  exports: [
    // Components
    TodoComponent, ChecklistComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    CommonModule
  ]
})
export class FeaturesModule {
}
