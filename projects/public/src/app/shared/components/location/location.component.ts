import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit {

  constructor() { }

  @Input() userItem:any;
  

  ngOnInit(): void {
  }

}
