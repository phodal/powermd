import {
  ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
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
  styleUrls: ['./domain-design.component.scss']
})
export class DomainDesignComponent implements OnInit {
  @ViewChild('domainObjectMenu', null) userMenu: TemplateRef<any>;
  @ViewChildren('txtArea', null) textAreas: QueryList<ElementRef>;

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
    this.dragulaService.createGroup('PARENT', {
      direction: 'vertical',
      moves: (el, source, handle) => handle.className === 'group-handle'
    });

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

  private usedTestData() {
    const testData: DomainObject[] = [
      {
        isRoot: true,
        isEntity: true,
        name: '订单',
        newItem: {
          editable: false,
          name: ''
        },
        valueObjects: [
          {name: '订单ID'},
          {name: '币种'},
          {name: '汇率'},
          {name: '总价'},
          {name: '总数'},
          {name: '收货信息'},
          {name: '订单状态'},
          {name: '支付信息'},
        ]
      },
      {
        isRoot: true,
        isEntity: true,
        name: '订单项',
        newItem: {
          editable: false,
          name: ''
        },
        valueObjects: [
          {name: '订单项ID'},
          {name: '订单ID'},
          {name: '单价'},
          {name: '小计'},
          {name: '数量'},
          {name: '快照ID'},
          {name: '配货单ID'},
          {name: '出库单ID'},
          {name: '发库单ID'},
        ]
      }
    ];

    for (const domainData of testData) {
      domainData.id = shortid.generate();
      for (const vo of domainData.valueObjects) {
        vo.id = shortid.generate();
      }
    }

    this.inputData = {
      aggregates: [{
        domainObjects: testData,
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

  //
  // mergeGroup(domainObjects: DomainObject[]) {
  // }


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
