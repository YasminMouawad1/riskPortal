import { Component, OnInit } from '@angular/core'; 
import { AddNotificationService } from '../../../shared/services/endpoints/add-notification.service';
import { NotifierServiceService } from '../../../shared/services/endpoints/notifier-service.service';




@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
})
export class NotifierComponent implements OnInit {


  counter : any = 0;
  constructor(private _toast:NotifierServiceService, private _addNotificationService:AddNotificationService) { }

  ngOnInit(): void {
  }

  showSuccess(){
    this._toast.showSuccess('toastr totorial','toastr added success');
  }

  showError(){
    this._toast.showError('toastr totorial','toastr added Error');
  }

  showWarning(){
    this._toast.showWarning('toastr totorial','toastr added warning');
  }

  addNotification(){
    this._addNotificationService.increment();
    this.counter = this._addNotificationService.getCount();
  }

}
