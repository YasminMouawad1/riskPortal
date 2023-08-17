import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridWithCheckboxComponent } from './grid-with-checkbox.component';

describe('GridWithCheckboxComponent', () => {
  let component: GridWithCheckboxComponent;
  let fixture: ComponentFixture<GridWithCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridWithCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridWithCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
