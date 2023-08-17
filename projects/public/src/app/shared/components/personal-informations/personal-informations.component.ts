import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-informations',
  templateUrl: './personal-informations.component.html',
})
export class PersonalInformationsComponent implements OnInit {

  @Input() userItem:any;
  
  constructor() { }

  ngOnInit(){
  }

}
