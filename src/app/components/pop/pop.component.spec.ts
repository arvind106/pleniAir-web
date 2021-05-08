import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { POPComponent } from './pop.component';

describe('POPComponent', () => {
  let component: POPComponent;
  let fixture: ComponentFixture<POPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ POPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(POPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
