import { Component, OnInit } from '@angular/core';
import { routingAnimation } from '../../shared/animations/rouuting';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  animations:[routingAnimation]

})
export class LayoutComponent implements OnInit {
  isCondensed = false;
  constructor() { }

  ngOnInit(): void {
  }
  /**
     * On mobile toggle button clicked
     */
  onToggleMobileMenu() {
    //this.isCondensed = !this.isCondensed;
    document.body.classList.toggle('sidebar-enable');
    document.body.classList.toggle('vertical-collpsed');

    if (window.screen.width <= 768) {
      document.body.classList.remove('vertical-collpsed');
    }
  }

  /**
  * on settings button clicked from topbar
  */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
  }
}
