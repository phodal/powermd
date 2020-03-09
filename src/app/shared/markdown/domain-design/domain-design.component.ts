import {
  ChangeDetectorRef,
  Component,
  ElementRef, forwardRef, HostListener,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild, ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { DragulaService } from 'ng2-dragula';
import Mousetrap from 'mousetrap';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import shortid from 'shortid';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface ValueObject {
  id?: string;
  editable?: boolean;
  name: string;
}

interface DomainObject {
  id?: string;
  isRoot: boolean;
  isEntity: boolean;
  name: string;
  editable?: boolean;
  newItem?: ValueObject;
  valueObjects: ValueObject[];
}

interface AggregateItem {
  domainObjects?: DomainObject[];
  newGroup?: DomainObject;
}

interface AggregateGroup {
  aggregates: AggregateItem[];
}

@Component({
  selector: 'markdown-domain-design',
  templateUrl: './domain-design.component.html',
  styleUrls: ['./domain-design.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DomainDesignComponent),
      multi: true
    }
  ]
})
export class DomainDesignComponent implements OnInit, ControlValueAccessor {
  @ViewChild('domainObjectMenu', null) userMenu: TemplateRef<any>;
  @ViewChildren('txtArea', null) textAreas: QueryList<ElementRef>;
  items: any[];
  data: any[] = [];
  value: any;
  private disabled: boolean;

  overlayRef: OverlayRef | null;
  sub: Subscription;
  newDomainGroup: AggregateItem = {
    domainObjects: [],
    newGroup: this.createNewGroup()
  };

  @Input()
  inputData: AggregateGroup = {
    aggregates: [
      {
        domainObjects: [],
        newGroup: this.createNewGroup()
      }
    ]
  };

  private changeHistory: any[] = [];
  private lastElement: ValueObject;

  constructor(private dragulaService: DragulaService,
              private cd: ChangeDetectorRef,
              private overlay: Overlay,
              private eRef: ElementRef,
              private viewContainerRef: ViewContainerRef
  ) {
    const parentGroup = this.dragulaService.find('PARENT');
    if (!parentGroup) {
      this.dragulaService.createGroup('PARENT', {
        direction: 'vertical',
        moves: (el, source, handle) => handle.className === 'group-handle'
      });
    }

    this.bindKeyboardEvent();
  }

  ngOnInit() {
    const that = this;
    // localforage.getItem('domain-design-key', (err, value) => {
    //   if (err) {
    //     this.usedTestData();
    //     return;
    //   }
    //
    //   if (value) {
    //     that.inputData = value as any;
    //   } else {
    //     this.usedTestData();
    //   }
    // });
  }

  onChange(value: any) {

  }

  onTouched() {
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
    this.value = obj;
    if (!this.value) {
      return;
    }

    this.items = this.value;
    const domainData: DomainObject[] = [];
    for (const task of this.items) {
      const vos: ValueObject[] = [];
      for (const children of task.childrens) {
        vos.push({
          id: shortid.generate(),
          editable: false,
          name: children.item.text
        });
      }

      const domain: DomainObject = {
        id: shortid.generate(),
        name: task.item.text,
        isRoot: false,
        isEntity: false,
        valueObjects: vos,
        editable: false,
        newItem: {
          editable: false,
          name: ''
        },
      };

      domainData.push(domain);
    }

    this.taskToDDDModel(domainData);
  }


  private taskToDDDModel(data: DomainObject[]) {
    console.log(data);
    this.inputData = {
      aggregates: [{
        domainObjects: data,
        newGroup: this.createNewGroup()
      }]
    };
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {

  }

  changeAggregateModel($event, groupIndex: number) {

  }

  onRightClick($event) {
    $event.preventDefault();
    alert('onRightClick');
  }

  storageData() {
    // localforage.setItem('domain-design-key', this.inputData);
  }

  onResizeEnd($event: ResizeEvent) {

  }

  private bindKeyboardEvent() {
    const that = this;
    Mousetrap.bind(['command+z', 'ctrl+z'], () => {
      if (that.changeHistory.length < 1) {
        return;
      }
      that.inputData = that.changeHistory.pop();
      that.cd.detectChanges();
      return true;
    });
  }

  openContext($event: MouseEvent, group: DomainObject) {
    $event.preventDefault();
    this.close();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({
        x: $event.x, y: $event.y
      })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(this.userMenu, this.viewContainerRef, {
      $implicit: group
    }));

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.close());
  }

  close() {
    // tslint:disable-next-line:no-unused-expression
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  deleteDomain(domain) {

  }

  enableEdit(x: ValueObject) {
    if (this.lastElement) {
      this.lastElement.editable = false;
    }

    x.editable = true;
    this.lastElement = x;

    setTimeout(() => {
      this.textAreas.toArray()[0].nativeElement.focus();
    });
  }

  onTextareaEnter(x: ValueObject) {
    x.editable = false;
  }

  mergeGroup($event) {
    this.inputData.aggregates.push({
        domainObjects: this.newDomainGroup.domainObjects,
        newGroup: this.createNewGroup()
      }
    );
    this.newDomainGroup = {
      domainObjects: [],
      newGroup: this.createNewGroup()
    };
    this.cd.detectChanges();
    this.storageData();
  }

  addValueObject(newItem: ValueObject, valueObjects: ValueObject[]) {
    valueObjects.push({
      id: shortid.generate(),
      name: newItem.name
    });
    newItem.editable = false;
    newItem.name = '';

    this.storageData();
  }

  private createNewGroup() {
    return {
      name: '',
      isEntity: false,
      isRoot: false,
      valueObjects: [],
      editable: false,
      newItem: {
        name: '',
        editable: false
      }
    };
  }

  addNewAggregate(domainGroup: AggregateItem) {
    domainGroup.newGroup.id = shortid.generate();
    domainGroup.domainObjects.push(domainGroup.newGroup);
    domainGroup.newGroup = this.createNewGroup();

    this.storageData();
  }

  enableNewGroupEdit(newGroup: DomainObject) {
    if (this.lastElement) {
      this.lastElement.editable = false;
    }

    newGroup.editable = true;
    this.lastElement = newGroup;

    setTimeout(() => {
      newGroup.editable = true;
      this.textAreas.toArray()[0].nativeElement.focus();
    }, 50);
  }
}
