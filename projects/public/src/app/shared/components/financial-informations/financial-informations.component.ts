import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/endpoints/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-financial-informations',
  templateUrl: './financial-informations.component.html',
})
export class FinancialInformationsComponent implements OnInit {

  isEditRiskLimit : boolean = false;
  isClientActivation :boolean = false;
  isShowRiskLimit:boolean=false;
  isEnableActions :boolean = false;
  riskApprovedLimit :number = 0 ;
  oldRiskApprovedLimit : number = 0;
  isriskApprovedLimitChanged : boolean = false

  constructor(
    private _userService: UsersService,
    private toastr: ToastrService,
    public _TranslateService:TranslateService,
  ) { }

  @Input() userItem:any;
  
  ngOnInit(): void {
  }

  editRiskLimit(cancel : boolean = false){

    this.isEditRiskLimit =  !this.isEditRiskLimit;

    if(cancel)
     {
      this.riskApprovedLimit = this.oldRiskApprovedLimit;
      this.isriskApprovedLimitChanged = false;
      this.isEditRiskLimit = false;
      return;
    }
    if (this.isriskApprovedLimitChanged)
     {  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title:this._TranslateService.instant('USERITEMINFO.areYouSure'),
        text: this._TranslateService.instant('USERITEMINFO.msgEidtrisk') +this.oldRiskApprovedLimit + this._TranslateService.instant('USERITEMINFO.to') +this.riskApprovedLimit,
        icon: 'warning',
        confirmButtonText: this._TranslateService.instant('USERITEMINFO.yesChange'),
        cancelButtonText: this._TranslateService.instant('USERITEMINFO.noRollback'),
        showCancelButton: true
      })
      .then(result => {


        if (result.value) {
          this.oldRiskApprovedLimit = this.riskApprovedLimit;
          this.isriskApprovedLimitChanged =false;
          swalWithBootstrapButtons.fire({
            title:this._TranslateService.instant('USERITEMINFO.yesTitle'),
            text:this._TranslateService.instant('USERITEMINFO.yesMsg'),
            confirmButtonText:this._TranslateService.instant('USERITEMINFO.ok'),
            icon:'success'
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title:this._TranslateService.instant('USERITEMINFO.rollTitle'),
            text:this._TranslateService.instant('USERITEMINFO.rollMsg'),
            confirmButtonText:this._TranslateService.instant('USERITEMINFO.ok'),
            icon:'error'
          });
          this.isEditRiskLimit =  !this.isEditRiskLimit;
          this.riskApprovedLimit = this.oldRiskApprovedLimit ;
        }
        else{
          this.isriskApprovedLimitChanged = false;
          this.riskApprovedLimit = this.oldRiskApprovedLimit ;
        }
      });}
      this.isriskApprovedLimitChanged = true;
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  clientActivation (mobileNumber : string){

    this.isClientActivation =  true;

    this._userService.getClientActivation(mobileNumber) .subscribe((result) => {

      if(result.messege.length >0)
      {

        this.toastr.error("",  result.messege);

        return;}
   // console.log(result)
    this.isShowRiskLimit = true;
    this.userItem.creditLimit =  result.data
    this.isClientActivation =  false;
    this.isEnableActions = true;
    })
  }

  openPdf(){
    window.open(this.userItem.iscoreFile); 
  }
  
}
