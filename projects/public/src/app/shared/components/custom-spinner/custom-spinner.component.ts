import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-spinner',
  templateUrl: './custom-spinner.component.html',
  styleUrls: ['./custom-spinner.component.scss']
})
export class CustomSpinnerComponent implements OnInit {

  @Input() height : string = '200px';
  @Input() bgColor : string = 'rgba(216, 216, 216, 0.2)';
  @Input() size : string = '';
  // small default medium large
  constructor() { }

  ngOnInit(): void {
  }

}
