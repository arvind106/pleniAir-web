import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavPopComponent } from './fav-pop.component';

describe('FavPopComponent', () => {
  let component: FavPopComponent;
  let fixture: ComponentFixture<FavPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
