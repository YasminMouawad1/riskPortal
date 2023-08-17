import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/endpoints/users.service'; 
import { FormBuilder, Validators, FormGroup ,FormControl } from '@angular/forms';
import { SpinnerService } from '../../services/endpoints/spinner.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-user-item',
  templateUrl: './header-user-item.component.html',
  styleUrls:['./header-user-item.component.scss']
})
export class HeaderUserItemComponent implements OnInit {

  @Input() userItem:any;

  riskApprovedLimit :number = 0 ;
  approveRiskComment : string = '';

  rejectionValidationForm!: FormGroup;
  editPersonalData! :FormGroup;
  rejectionReason : string = '';
  submitrejectform = false;
  rejectResponse :any [] = [];
  rejectRiskComment : string = '';
  maritalStatus:string='';
  maritalStatuses :any [] = [];

  PersonalIMG:boolean=true;
  pesonalImages:any;

  gender:string='';
  expireDate:string='';
  dateOfBirth:string = '';

  currentStatus : boolean = false;
  
  NoteMsg:string='';
  isEnableActions :boolean = false;
  isEditRiskLimit : boolean = false;
   
  userId: any;
  submitAcceptform!: boolean;


  @Input() verifycheckInput: boolean = false;

  constructor(
    private _userService: UsersService,
    private toastr: ToastrService,
    public _TranslateService:TranslateService,
    private _spinnerService: SpinnerService,
    private modalService: NgbModal,
    private _sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router : Router,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.rejectionValidationForm = this.formBuilder.group({
      rejectionReason: ['', [Validators.required]],
      rejectRiskComment: ['', [Validators.required]],
 });

 this.route.params.subscribe((params) => (this.userId = params['id']));

 this.getUserByID();

 this._userService.getRejectResponse().subscribe(res=>{
   this.rejectResponse = res.data
 })
  }

  get form() {
    return this.rejectionValidationForm.controls;
  }
  
  editRiskClientNote(){
    const data = {
     userMobile:this.userId,
     note:this.NoteMsg
    };


    this._userService.EditRiskClientNote(data).subscribe((res) => {
      if(res.status)
      {
       this.toastr.success("",  'Edit Note successfully');
      }
    });
   }

  updatePersonalData(){
    if (!this.editPersonalData.valid){
       return;
    }

    const data = {
      nameAr: this.editPersonalData.value.name,
      nameEn: this.editPersonalData.value.nameEn,
      job: this.editPersonalData.value.jobTitle,
      status : this.editPersonalData.value.maritalStatus,
      mobileNumber: this.editPersonalData.value.phoneNumber,
      gender:this.editPersonalData.value.gender,
      address:this.editPersonalData.value.homeAddress,
      expirationDate:this.editPersonalData.value.expiryDate,
      dateOfBirth:this.editPersonalData.value.dateOfBirth,
    };




    this._userService.EditUserNationalIdData(data).subscribe((res) => {
      if(res.status)
       {
        this.modalService.dismissAll()
        this.toastr.success("",  'Edit Data successfully');
       }
       this.getUserByID();

    });
    //EditUserNationalIdData
  }

  getUserByID(){
    this._spinnerService.requestStarted();

    this._userService.getUserById(this.userId).subscribe((res) => {

      this.userItem = res.data;

      this.currentStatus = ( res.data.verify_BlockedClient== 1 &&  res.data.verify_CBE==1  &&  res.data.verify_I_ScoreNationalID==1  &&  res.data.verify_Valifay ==1)
       

      this.editPersonalData = new FormGroup({
        name: new FormControl(this.userItem.name, Validators.required),
        nameEn: new FormControl(this.userItem.nameEn, Validators.required),
        jobTitle: new FormControl(this.userItem.jobTitle, Validators.required),
        maritalStatus: new FormControl(this.userItem.maritalStatus, Validators.required),
        phoneNumber : new FormControl(this.userItem.mobileNumber, Validators.required),
        gender: new FormControl(this.userItem.gender, Validators.required),
        homeAddress: new FormControl(this.userItem.homeAddress, Validators.required),
        expiryDate:new FormControl(this.userItem.expiryDate, Validators.required) ,
        dateOfBirth:new FormControl(this.userItem.dateOfBirth, Validators.required)
      });

      this.maritalStatus = this.userItem.maritalStatus;

      this._userService.getmaritalStatus().subscribe(res=>{
        this.maritalStatuses = res.data;
    });


    this.gender = this.userItem.gender;
    this.expireDate = this.userItem.expiryDate; 
    this.dateOfBirth = this.userItem.dateOfBirth;

    this.pesonalImages = this._sanitizer.bypassSecurityTrustResourceUrl(
       res.data.personalImage
    );

    if(res.data.personalImage == 'N/A')
        this.PersonalIMG = false;

        this.NoteMsg = this.userItem.note;

    });
  }
  accceptRiskApplication() {

    this.submitAcceptform = true;
    const data = {
      clientNationalId: this.userItem.nationalId,
      riskComment: this.approveRiskComment,
      riskApprovedLimit: this.riskApprovedLimit,
      clientStatus: true,

    };
    this.modalService.dismissAll()

      this._userService.softApproveUser(data).subscribe((res) =>{
      if(res.status){
        this.toastr.success("",  'Accept Risk successfully');
      // Swal.fire({
      //   title:this._TranslateService.instant('USERITEMINFO.acceptRisk'),
      //   text:this._TranslateService.instant('USERITEMINFO.acceptMsg1')+ this.userItem.name + this._TranslateService.instant('USERITEMINFO.acceptMsg2'),
      //   confirmButtonText:this._TranslateService.instant('USERITEMINFO.ok'),
      //   icon:'success'
      // });
      this.router.navigate(['/layout/system-rejected'])
      }
    } );
  }

  rejectRiskApplication(){
    this.submitrejectform = true;
    if (!this.rejectionValidationForm.valid)
       return;

    const data = {
      clientNationalId: this.userItem.nationalId,
      riskComment: this.rejectRiskComment,
      rejectionReason : this.rejectionReason,
      clientStatus: false,
    };
    this.modalService.dismissAll()
        this._userService.postUser(data).subscribe((res) =>{
if(res.status)
       {
      // Swal.fire({
      //   title:this._TranslateService.instant('USERITEMINFO.rejection'),
      //   text:this._TranslateService.instant('USERITEMINFO.rejectMsg1') + this.userItem.name + this._TranslateService.instant('USERITEMINFO.rejectMsg2'),
      //   confirmButtonText:this._TranslateService.instant('USERITEMINFO.ok'),
      //   icon:'error'
      //  });
      this.toastr.error("",  'Reject Risk successfully');
        this.router.navigate(['/layout/users-approval'])
       }
        } );
  }

  openModal(content: any) {

    this.modalService.open(content);
  }

}
