import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountModel} from '@hiddentemple/api-interfaces';
import {AccountCacheService} from '../../services/account-cache.service';

@Component({
  selector: 'app-account-summary-page',
  template: `
    <div class="container">
      <app-invoice-table [invoices]="account?.invoices"></app-invoice-table>
    </div>
  `,
  styles: []
})

export class AccountDetailPageComponent implements OnInit {
  account: AccountModel;

  constructor(private accountCache: AccountCacheService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.accountCache.getAccount(id).subscribe(account => this.account = account);
  }

}
