import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LandingComponent } from './views/landing/landing.component';
import { LandingModule } from './views/landing/landing.module';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { LoaderService } from './core/services/loader/loader.service';
import { LightboxModule } from 'ngx-lightbox';
import { AuthInterceptorService } from './core/services/interceptor/auth-interceptor.service';
 
import { TokenInterceptorInterceptor } from './core/services/interceptor/token-interceptor.interceptor';
import {ClipboardModule} from '@angular/cdk/clipboard';

import { ToastrModule } from 'ngx-toastr'; 

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
  ],
  imports: [ 
  BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LandingModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbTooltipModule,
    NgbModule,
    CarouselModule,
    LightboxModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ScrollToModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    NgWizardModule.forRoot(ngWizardConfig),
    ClipboardModule


  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorInterceptor,multi:true}, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
