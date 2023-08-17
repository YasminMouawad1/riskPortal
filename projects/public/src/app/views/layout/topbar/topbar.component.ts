import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../../core/services/language/language.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthEndpoints } from '../../../shared/services/endpoints/auth.endpoint.service';



@Component({
  selector: 'app-topbar',
  templateUrl:'./topbar.component.html',
  styleUrls:['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  element: any;
  flagvalue: any;
  countryName: any;
  valueset: any;
  langPath:string = '';
  elem: any;


  notifications:number = 14;
  displayNotifications:string= '';

  constructor(@Inject(DOCUMENT) private document: any, private router: Router,
    private _languageService: LanguageService, private translate: TranslateService, private _authEndpoints:AuthEndpoints) { }

    ngOnInit(): void {
      if(localStorage.getItem('DEFAULT_LANGUAGE') == 'en')
            this.langPath = 'assets/images/flags/us.jpg';
      else
          this.langPath = 'assets/images/flags/arabic.png';

          this.elem = document.documentElement;

          if(this.notifications > 9)
             this.displayNotifications = '9 +';
          else
             this.displayNotifications = '' + this.notifications;


        this._authEndpoints.saveUserData();
   }

  //  public SwitchLangToAr() {
  //   if(localStorage.getItem('DEFAULT_LANGUAGE') !== 'en'){
  //     this.langPath = 'assets/images/flags/arabic.png';
  //  }else{
  //    this.langPath = 'assets/images/flags/arabic.png';
  //    this._languageService.switchLanguageAndStyleDir();
  //  }
  // }

  public onSwitchLanguages(lang:string) {

    let currentLang = localStorage.getItem('DEFAULT_LANGUAGE');
    if(currentLang == lang)
       return
    if(lang == 'en')
       this.langPath = 'assets/images/flags/us.jpg';
    else if(lang == 'ar')
       this.langPath = 'assets/images/flags/arabic.png';

    this._languageService.switchLanguageAndStyleDir();
  }


  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();



  /**
  * Toggle the menu bar when having mobile screen
  */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Fullscreen method
   */
   fullscreen() {
    document.body.classList.toggle('fullscreen-enable');

    if(! this.elem.requestFullscreen || !this.elem.mozRequestFullScreen || !this.elem.msRequestFullscreen){
       if (this.elem.requestFullscreen) {
         this.elem.requestFullscreen();
        } else if (this.elem.mozRequestFullScreen) {
          /* Firefox */
          this.elem.mozRequestFullScreen();
        } else if (this.elem.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          this.elem.webkitRequestFullscreen();
        } else if (this.elem.msRequestFullscreen) {
          /* IE/Edge */
          this.elem.msRequestFullscreen();
        }
      }else{
        if (this.elem.exitFullscreen) {
          this.elem.exitFullscreen();
        } else if (this.elem.mozCancelFullScreen) {
          /* Firefox */
          this.elem.mozCancelFullScreen();
        } else if (this.elem.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          this.elem.webkitExitFullscreen();
        } else if (this.elem.msExitFullscreen) {
          /* IE/Edge */
          this.elem.msExitFullscreen();
        }
      }
  }



  /**
 * Logout the user
 */
  logout() {

    this.router.navigate(['/auth']);
  }

}
