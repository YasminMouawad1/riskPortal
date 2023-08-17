import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollspyDirective } from './directives/scrollspy.directive';



@NgModule({
  declarations: [ScrollspyDirective],
  imports: [
    CommonModule
  ],
  exports: [ScrollspyDirective]
})
export class LandingModule { }
