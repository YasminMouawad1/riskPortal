import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { interval } from 'rxjs';
import { map } from 'rxjs';
import { LanguageService } from '../../core/services/language/language.service';
// import { OwlOptions } from 'ngx-owl-carousel-o';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-landing',
  // template:`<h1>test</h1>`
  templateUrl: './landing.component.html',
  styleUrls:['./landing.scss']
})
export class LandingComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  currentSection = 'home';
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 4
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  private _trialEndsAt: any;

  private _diff?: number;
  _days?: number;
  _hours?: number;
  _minutes?: number;
  _seconds?: number;


  //img src for team section
  imgSrc:string="../../../assets/images/";
  name:string='';
  desc:string='';


  constructor(private _languageService: LanguageService) {
  }
  public onSwitchLanguages() {
    this._languageService.switchLanguageAndStyleDir();
  }
  ngOnInit() {
    this._trialEndsAt = "2021-12-31";

    interval(3000).pipe(
      map((x) => {
        this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
      })).subscribe((x) => {
        this._days = this.getDays(this._diff);
        this._hours = this.getHours(this._diff);
        this._minutes = this.getMinutes(this._diff);
        this._seconds = this.getSeconds(this._diff);
      });
  }

  getDays(t: any) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t: any) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t: any) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t: any) {
    return Math.floor((t / 1000) % 60);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
  /**
   * Window scroll method
   */
  windowScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
        navbar.classList.add('nav-sticky')
      } else {
        navbar.classList.remove('nav-sticky')
      }
    }
  }

  /**
   * Toggle navbar
   */
  toggleMenu() {
    document.getElementById('topnav-menu-content')?.classList.toggle('show');
  }

  /**
   * Section changed method
   * @param sectionId specify the current sectionID
   */
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  /*Download As Pdf*/

  // openPDF(): void {
  //   let DATA: any = document.getElementById('htmlData');
  //   html2canvas(DATA).then((canvas) => {
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     const FILEURI = canvas.toDataURL('image/png');
  //     let PDF = new jsPDF('p', 'mm', 'a4');
  //     let position = 0;
  //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //     PDF.save('angular-demo.pdf');
  //   });
  // }


  showTeam(name:string,dec:string,img:string){
    this.name = name;
    this.desc=dec;
    this.imgSrc =  this.imgSrc + img;
    //console.log(this.imgSrc);
  }
}

