import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SpinnerService } from '../../../shared/services/endpoints/spinner.service';
import { UsersService } from '../../../shared/services/endpoints/users.service';

@Component({
  selector: 'app-grid-with-checkbox',
  templateUrl: './grid-with-checkbox.component.html',
  styleUrls:['./grid-with-checkbox.component.scss']
})
export class GridWithCheckboxComponent implements OnInit {

  usersList: any[] = [];

  numberRows:number = 10;
  currentPage: number = 1;
  showTable :boolean = false;
  isClicked: boolean = false;

  term:string = '';

  checkedList: any[] = []; 
  masterSelected:boolean = false;

  constructor(private _userService: UsersService , private _sanitizer: DomSanitizer,private _spinnerService: SpinnerService) { }

  ngOnInit() {
    this._spinnerService.requestStarted();
  
       this._userService.getRejectedProfilePlusSystemErrors().subscribe(res => {
  
       if(res.data != null)
         this.usersList = res.data ;
  
         this._spinnerService.requestEnded();
             this.showTable = this.usersList.length == 0 ?false : true
            //  this.personalImg = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            //  + res.data.result.personalImage);
  
  
      }
        )
  
        this._spinnerService.requestEnded();
    }
  

    checkUncheckAll(){
      for (var i = 0; i < this.usersList.length; i++) {
        this.usersList[i].isSelected = this.masterSelected;
      } 
      this.getCheckedItemList()
      }

      isAllSelected() {
        this.masterSelected = this.usersList.every(function(item:any) {
            return item.isSelected == true;
          })
        this.getCheckedItemList();
      }

      getCheckedItemList(){
        this.checkedList = []; 
  
        for (var i = 0; i < this.usersList.length; i++) {
          if (this.usersList[i].isSelected) { 
            this.checkedList.push(this.usersList[i]); 
          }}  
      }

    onSbmit(){
      console.log(this.checkedList)
    }
}
