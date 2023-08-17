import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vsc-card',
  templateUrl: './vsc-card.component.html',
  styleUrls: ['./vsc-card.component.scss']
})
export class VscCardComponent implements OnInit {
  @Input() list!: Array<{label?:string , value:string , type?:string}>
  constructor() { }

  ngOnInit(): void {
  }

}
