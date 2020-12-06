import {Component} from '@angular/core';
import {ContactBookRoutes} from '../../contact-book/contact-book-routing.module';
import {InvoicingRoutes} from "../../invoicing/invoicing-routing.module";

@Component({
  selector: 'app-nav-bar',
  template: `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <!-- Icon -->
      <img src="assets/img/peanut-butter.svg" width="30" height="30" alt="" loading="lazy">

      <!-- Title -->
      <a class="navbar-brand ml-2 mr-1" href="#">PB Falcon CRM</a>

      <!-- Hamburger Selection which appears when window is too small to display all links -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" routerLink="{{contactHomeRoute}}" routerLinkActive="active" href="#">Contacts</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="{{accountListRoute}}" routerLinkActive="active" href="#">Accounts</a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [
    `.example-spacer {
      flex: 1 1 auto;
    }`
  ]
})
export class NavBarComponent  {
  get accountListRoute() { return InvoicingRoutes.home; }
  get contactHomeRoute() { return ContactBookRoutes.home; }
}
