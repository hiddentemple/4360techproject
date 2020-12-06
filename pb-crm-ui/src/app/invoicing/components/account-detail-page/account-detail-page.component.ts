import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountModel} from '@hiddentemple/api-interfaces';
import {AccountCacheService} from '../../services/account-cache.service';

@Component({
  selector: 'app-account-summary-page',
  template: `
    <div class="container">
      <h1>{{account?.name}}</h1>
      <app-invoice-table [invoices]="account?.invoices" [accountId]="id"></app-invoice-table>
    </div>
  `,
  styles: []
})

export class AccountDetailPageComponent implements OnInit {
  account: AccountModel;
  id: string;

  constructor(private accountCache: AccountCacheService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.accountCache.getAccount(this.id).subscribe(account => this.account = account);
  }

}
