import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialogStaticComponent } from './modal-dialog-static.component';

describe('ModalDialogStaticComponent', () => {
  let component: ModalDialogStaticComponent;
  let fixture: ComponentFixture<ModalDialogStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDialogStaticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
