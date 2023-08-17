import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'atom-img',
  template: `<img [alt]="meta" [title]="title" [src]="branding + name" />`,
})
export class AtomImageComponent implements OnInit {
  @Input('name') name: string = '';
  @Input('title') title: string = '';
  @Input('branding') branding: string = './assets/branding/images/';
  public meta: string = '';

  constructor() {}

  ngOnInit() {
    this.meta = this.name.replace(/(.png)|(.jpg)|(.jpeg)|(.svg)/g, '');
  }
}
