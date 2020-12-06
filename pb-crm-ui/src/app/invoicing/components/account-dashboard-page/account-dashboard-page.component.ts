import { Component, OnInit } from '@angular/core';
import {AccountModel} from "@hiddentemple/api-interfaces";
import {InvoicePageCacheService} from "../../services/invoice-page-cache.service";
import {AccountCacheService} from "../../services/account-cache.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-account-dashboard-page',
  template: `
    <div class="container">
      <h1>Account List</h1>
      <app-account-list [accounts]="accounts"></app-account-list>
    </div>
  `,
  styles: [
  ]
})
export class AccountDashboardPageComponent implements OnInit {
  accounts: AccountModel[];

  constructor(private accountCache: AccountCacheService) { }

  ngOnInit(): void {
    this.accountCache.accounts$.subscribe(accounts => this.accounts = accounts)
  }

}
