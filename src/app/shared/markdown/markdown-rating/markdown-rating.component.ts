import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { MarkdownTaskItemService } from '../markdown-task-item/markdown-task-item.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'markdown-rating',
  templateUrl: './markdown-rating.component.html',
  styleUrls: ['./markdown-rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownRatingComponent),
      multi: true
    }
  ]
})
export class MarkdownRatingComponent implements OnInit, ControlValueAccessor {
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

  }

  changeForm($event: any, item: any) {
    console.log($event, item);
  }
}
