import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomImageComponent } from './atom-image.component';

describe('AtomImageComponent', () => {
  let component: AtomImageComponent;
  let fixture: ComponentFixture<AtomImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtomImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtomImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
