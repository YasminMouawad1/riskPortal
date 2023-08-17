import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthEndpoints } from '../../../shared/services/endpoints/auth.endpoint.service';

import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  errorMsg:boolean = false;
  token: string|undefined;
  show: boolean = false;

  // set the currenr year
  year: number = new Date().getFullYear();
  constructor(private formBuilder: FormBuilder, private _authEndpoints: AuthEndpoints, private router: Router,private toastr: ToastrService,private _spinnerService: SpinnerService) { 
    this.token = undefined;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userNameOrEmailAddress: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

  }

  password() {
    this.show = !this.show;
}

  get f() { return this.loginForm.controls; }


  public sendCaptcha(form: NgForm): boolean {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return false;
    }
  return true;
  }

   onSubmit() {

    this._spinnerService.requestStarted();

    this.submitted = true;

   
    const loginData = {
      MobileNumber: this.f['userNameOrEmailAddress'].value,
      Password: this.f['password'].value
    };

    if (this.loginForm.invalid ) {
      return;
    } else {
      this._authEndpoints.postTokenAuthAuthenticate(loginData)
        .subscribe(
         ( res) => {  
          if(res.status){
            this.toastr.success("",  'Login successfully');
            this.router.navigate(['layout']);
            sessionStorage.setItem('access_token', res.data);
             
          }
          else{
            this.toastr.error( 'Wrong username or password!');
            // this.error = 'invalid usernamr or password';
            // this.errorMsg = true;

            // setTimeout(() => {
            //   this.errorMsg = false;
            // }, 4000); 
             
          }
              
        this._spinnerService.requestEnded(); 

          },
          error => {
            this.error = error ? error : '';
          });
    }

    this._spinnerService.requestEnded(); 
  }

}
