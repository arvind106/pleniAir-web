import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFavSessionComponent } from './get-fav-session.component';

describe('GetFavSessionComponent', () => {
  let component: GetFavSessionComponent;
  let fixture: ComponentFixture<GetFavSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFavSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFavSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
