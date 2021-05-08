import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFavPopComponent } from './get-fav-pop.component';

describe('GetFavPopComponent', () => {
  let component: GetFavPopComponent;
  let fixture: ComponentFixture<GetFavPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFavPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFavPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
