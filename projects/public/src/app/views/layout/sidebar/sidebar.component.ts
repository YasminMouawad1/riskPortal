import { Component, Input, OnInit } from '@angular/core';
import { routingAnimation } from '../../../shared/animations/rouuting';
import { MENU } from './menu';
import { MenuItem } from './menu.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls:['./sidebar.component.scss'],
  animations:[routingAnimation],
})
export class SidebarComponent implements OnInit {
  @Input() isCondensed = true;
  menu: any;
  menuItems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initialize();


  }
  /**
     * Initialize
     */
  initialize(): void {
    this.menuItems = MENU;
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }





}
