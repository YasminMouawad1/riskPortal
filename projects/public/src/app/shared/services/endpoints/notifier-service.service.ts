import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifierServiceService {

  constructor(private _tosatrService:ToastrService) { }

  showSuccess(title:any,message:any){
 
      this._tosatrService.success(message,title,{
        positionClass:'top-left', 
        progressBar:true
      });
  }


  showError(title:any,message:any){
    this._tosatrService.error(message,title,{
      progressBar:true,
      positionClass:'top-left'
    });
  }

  showWarning(title:any,message:any){
    this._tosatrService.warning(message,title,{
      progressBar:true,
      positionClass:'top-left'
    });
  }

}
