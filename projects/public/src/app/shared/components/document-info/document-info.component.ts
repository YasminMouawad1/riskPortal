import { Component, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { SpinnerService } from '../../services/endpoints/spinner.service';
import { UsersService } from '../../services/endpoints/users.service';

@Component({
  selector: 'app-document-info',
  templateUrl: './document-info.component.html',
  styleUrls:['./document-info.component.scss']
})
export class DocumentInfoComponent implements OnInit {

  allContractImages: any [] = [];
  userId!: string;
  imgSrc:string ='';
  degree:number = 0;

  constructor( 
    private _spinnerService: SpinnerService,private _userService: UsersService, 
    private route: ActivatedRoute, private _sanitizer: DomSanitizer,private lightbox: Lightbox,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.userId = params['id']));

    this.getUserByID();

  }

  getUserByID(){
    this._spinnerService.requestStarted();

    this._userService.getUserById(this.userId).subscribe((res) => {

      this.allContractImages = res.data.userDocuments;

      this.allContractImages.forEach(element => {

       element.content = element.content
       element.content =this._sanitizer.bypassSecurityTrustUrl(element.content)
     });

     if(res.data.userDocuments.length > 0)
     this.imgSrc = res.data.userDocuments[0].content;

     this._spinnerService.requestEnded();
  
    });

    this._spinnerService.requestEnded();
  }

  showImg(index:number){
    this.imgSrc = this.allContractImages[index].content;
 }

 openLightbox(index: number): void {

  // open lightbox
  this.lightbox.open(this.allContractImages, index);
}

  
rotateImg(){

  let image = document.getElementById('imageRot');
  if(this.degree < 360){
    this.degree += 90;
    this.renderer.setStyle(
      image,
      'transform',
      `rotate(${this.degree}deg)`
    );
  }else{
    this.degree = 0;
  }

 }

}
