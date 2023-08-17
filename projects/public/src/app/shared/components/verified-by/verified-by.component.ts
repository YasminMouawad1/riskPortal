import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../services/endpoints/spinner.service';
import { UsersService } from '../../services/endpoints/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verified-by',
  templateUrl: './verified-by.component.html',
  styleUrls:['./verified-by.component.scss']
})
export class VerifiedByComponent implements OnInit {


  @Output() verifyCheck = new EventEmitter();
  
  userId!: string;
  userItem!: any;
  verify_list :any[] = [];
  reject_list :any[] = [];
  bending_list :any[] = [];

  constructor( 
    private _userService: UsersService,
    private route: ActivatedRoute, 
    private _spinnerService: SpinnerService, 
     
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.userId = params['id']));

    this.getUserByID();
  }

  getUserByID(){
    this._spinnerService.requestStarted();

    this._userService.getUserById(this.userId).subscribe((res) => {

this.userItem = res.data; 
  if(this.userItem.verify_Valifay == 1){
    this.verify_list.push('assets/images/Verified_3.png');
 }else if(this.userItem.verify_Valifay == 2){
  this.reject_list.push('assets/images/Verified_3.png');
 }else{
  this.bending_list.push('assets/images/Verified_3.png');
 }

 if(this.userItem.verify_I_ScoreNationalID == 1){
  this.verify_list.push('assets/images/Verified_2.png');
}else if(this.userItem.verify_I_ScoreNationalID == 2){
    this.reject_list.push('assets/images/Verified_2.png');
}else {
    this.bending_list.push('assets/images/Verified_2.png');
}

if(this.userItem.verify_BlockedClient == 1){
  this.verify_list.push('assets/images/Verified_4.png');
}else if(this.userItem.verify_BlockedClient == 2){
    this.reject_list.push('assets/images/Verified_4.png');
}else{
    this.bending_list.push('assets/images/Verified_4.png');
}

if(this.userItem.verify_CBE == 1){
  this.verify_list.push('assets/images/Verified_1.png');
}else if(this.userItem.verify_CBE == 2){
    this.reject_list.push('assets/images/Verified_1.png');
}else{
    this.bending_list.push('assets/images/Verified_1.png');
}

    this._spinnerService.requestEnded();

    if(this.userItem.verify_Valifay == 1 && this.userItem.verify_I_ScoreNationalID == 1 &&
       this.userItem.verify_BlockedClient == 1 && this.userItem.verify_CBE == 1)
      {
        this.verifyCheck.emit(true);
      }
 });


 this._spinnerService.requestEnded();
}


  changeVerifiedStatus(img:string){
    debugger
        if(img !="assets/images/Verified_2.png")
        return;
        this._spinnerService.requestStarted();
        this._userService.callNationalId(this.userItem.nationalId).subscribe( res =>{
          this._spinnerService.requestEnded();
          if( res.data.status == 3 || res.data.status == -1  ){
    
            this.userItem.rejectionList = res.data.clientRejectionResones.map(function(item:any) {  return {name:  item["comment"]}})
            Swal.fire({
              icon: 'error',
              title: 'Something wrong happened please contact with sysadmin '
            })
          }
          else if ( res.data.status == 1 )
          {
             Swal.fire({
              icon: 'error',
              title: 'Rjected from national ID'
            })
            setTimeout(() => {
              window.location.reload()
            }, 3000);
          }
          else if ( res.data.status == 0 )
          {
             Swal.fire({
              icon: 'success',
              title: 'approved from national ID'
            })
            setTimeout(() => {
              window.location.reload()
            }, 3000);
          }
    
        })
    }
}

