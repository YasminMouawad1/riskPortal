import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
 
import { filter } from 'rxjs/operators';  
import { MenuItem } from '../../models/menuItem.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html' 
})
export class BreadcrumbComponent implements OnInit {
  @Input() home: MenuItem = { label: 'Home', url: '/' };

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  breadcrumpList: MenuItem[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.breadcrumpList = this.createBreadcrumbs(this.activatedRoute.root)
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.breadcrumpList = this.createBreadcrumbs(this.activatedRoute.root));
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): any {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      if ( label ) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }


}
