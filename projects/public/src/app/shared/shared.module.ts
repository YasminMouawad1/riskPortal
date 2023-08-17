import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { PersonalInformationsComponent } from './components/personal-informations/personal-informations.component';  

import { TranslateModule } from '@ngx-translate/core';
import { LocationComponent } from './components/location/location.component';
import { FinancialInformationsComponent } from './components/financial-informations/financial-informations.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderUserItemComponent } from './components/header-user-item/header-user-item.component';
import { DocumentInfoComponent } from './components/document-info/document-info.component';
import { VerifiedByComponent } from './components/verified-by/verified-by.component';

const sharedDeclarations: any[] | Type<any> = [
  LoaderComponent
];
const sharedImports: any[] | Type<any> = [
];

@NgModule({
  declarations: 
  [
    // sharedDeclarations
    LoaderComponent,
    PersonalInformationsComponent,
    LocationComponent,
    FinancialInformationsComponent,
    HeaderUserItemComponent,
    DocumentInfoComponent,
    VerifiedByComponent , 
  ],
  imports: [
  CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule, sharedImports
  ],
  exports: [
    // sharedDeclarations, sharedImports
    LoaderComponent, 
    PersonalInformationsComponent,
    LocationComponent,
    FinancialInformationsComponent,
    HeaderUserItemComponent,
    DocumentInfoComponent,
    VerifiedByComponent
  ]
})
export class SharedModule { }
