import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <app-loading-bar></app-loading-bar>
    <app-nav-bar></app-nav-bar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'pb-crm-ui';
}
