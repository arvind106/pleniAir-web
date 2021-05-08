import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavSessionComponent } from './fav-session.component';

describe('FavSessionComponent', () => {
  let component: FavSessionComponent;
  let fixture: ComponentFixture<FavSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
