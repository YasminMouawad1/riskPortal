import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-dialog-static',
  templateUrl: './modal-dialog-static.component.html',
  styleUrls: ['./modal-dialog-static.component.scss'],
})
export class ModalDialogStaticComponent implements OnInit {
  @Input() status!: boolean;
  constructor() {}

  ngOnInit(): void {}
}
