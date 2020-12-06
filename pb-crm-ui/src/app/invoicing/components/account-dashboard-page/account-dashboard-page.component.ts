import { Component, OnInit } from '@angular/core';
import {AccountModel} from "@hiddentemple/api-interfaces";
import {InvoicePageCacheService} from "../../services/invoice-page-cache.service";
import {AccountCacheService} from "../../services/account-cache.service";

@Component({
  selector: 'app-account-dashboard-page',
  template: `
    <p>
      account-dashboard-page works!
    </p>
    <app-account-list [accounts]="accounts"></app-account-list>
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
