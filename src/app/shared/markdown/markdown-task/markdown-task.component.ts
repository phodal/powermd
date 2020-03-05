import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MarkdownTaskItemService } from './markdown-task-item.service';

@Component({
  selector: 'component-markdown-task',
  templateUrl: './markdown-task.component.html',
  styleUrls: ['./markdown-task.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownTaskComponent),
      multi: true
    }
  ]
})
export class MarkdownTaskComponent implements OnInit, ControlValueAccessor {
  @Input() list: [];

  private disabled = false;

  onChange(_) {
  }

  onTouched(_) {
  }

  constructor(private markdownTaskItemService: MarkdownTaskItemService) {

  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    if (obj !== null) {
      this.list = obj;
    }
  }

  checkValue($event: any, item) {
    this.markdownTaskItemService.updateTask($event, item);
  }

  changeForm($event: any, item: any) {
    this.markdownTaskItemService.updateTask($event, item);
  }
}
