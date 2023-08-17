import { Component, OnInit } from '@angular/core'; 
import { LanguageService } from './core/services/language/language.service';
import { routingAnimation } from './shared/animations/rouuting';
import { AuthEndpoints } from './shared/services/endpoints/auth.endpoint.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations:[routingAnimation]
})
export class AppComponent implements OnInit {
  title = 'public';
  constructor(private _languageService: LanguageService,
    private _authEndpoints: AuthEndpoints) {
    this._languageService.loadDefaultLangAndStylesDirection();
  }

  ngOnInit(): void {
    let cerdinatilsData = {
      userNameOrEmailAddress: "",
      password: ""
    }
    // this._authEndpoints.postTokenAuthAuthenticate(cerdinatilsData).subscribe((data) => {
    //   console.log("data ", data);

    // })
  }
}
