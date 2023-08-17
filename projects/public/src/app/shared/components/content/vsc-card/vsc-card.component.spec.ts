import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VscCardComponent } from './vsc-card.component';

describe('VscCardComponent', () => {
  let component: VscCardComponent;
  let fixture: ComponentFixture<VscCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VscCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VscCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
