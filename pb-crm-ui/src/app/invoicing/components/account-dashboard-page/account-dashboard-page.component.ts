import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-dashboard-page',
  template: `
    <p>
      account-dashboard-page works!
    </p>
    <app-account-list></app-account-list>
  `,
  styles: [
  ]
})
export class AccountDashboardPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
