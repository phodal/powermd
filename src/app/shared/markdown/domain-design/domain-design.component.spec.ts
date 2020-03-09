import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainDesignComponent } from './domain-design.component';
import { SharedModule } from '../../shared.module';

describe('DomainDesignComponent', () => {
  let component: DomainDesignComponent;
  let fixture: ComponentFixture<DomainDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ DomainDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
