import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserItemComponent } from './header-user-item.component';

describe('HeaderUserItemComponent', () => {
  let component: HeaderUserItemComponent;
  let fixture: ComponentFixture<HeaderUserItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderUserItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
