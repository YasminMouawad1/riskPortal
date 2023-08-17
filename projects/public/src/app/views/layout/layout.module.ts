import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbCollapseModule, NgbDatepickerModule, NgbDropdownModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SpinnerComponent } from './spinner/spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { NotifierComponent } from './notifier/notifier.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { GridWithCheckboxComponent } from './grid-with-checkbox/grid-with-checkbox.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyPipesModule } from '../../shared/pipe/PipesModule.module';


// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    TopbarComponent,
    SidebarComponent,
    RightsidebarComponent,
    SpinnerComponent,
    NotifierComponent,
    UnauthorizedComponent,
    GridWithCheckboxComponent, 
  ],
  imports: [
  CommonModule,
    LayoutRoutingModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    SimplebarAngularModule,
    TranslateModule,
    FormsModule,
    NgxPaginationModule,
        MyPipesModule, 
    ReactiveFormsModule,
    ToastrModule.forRoot({ 
       preventDuplicates:true,
       timeOut:3000,
       easing:'ease-in', 
       easeTime:2000,
       progressBar:true,
       positionClass:'toast-top-right'
       
    }),

  ]
})
export class LayoutModule { }
