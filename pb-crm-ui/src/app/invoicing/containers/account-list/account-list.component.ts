import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import { AccountModel, InvoiceModel, PaymentModel } from '@hiddentemple/api-interfaces';
import {ApiService} from '../../../api/api.service';
import {InvoicingRoutes} from '../../invoicing-routing.module';
import {Router} from '@angular/router';
import {MatListModule} from '@angular/material/list'

@Component({
  selector: 'app-account-list',
  template: `
    <mat-list>
      <mat-list-item matRipple *ngFor = "let account of _accounts" (click)="goToAccount(account.id)">
        {{account.name}}
      </mat-list-item>
    </mat-list>
  `,
  styles: [
  ]
})
export class AccountListComponent {
  _accounts: AccountModel[];

  @Input() set accounts(accounts: AccountModel[]) {
    accounts.sort((a, b) => a.name.localeCompare(b.name))
    this._accounts = accounts
  };

  constructor(private router: Router) {}

  goToAccount(id: string){
    this.router.navigate([InvoicingRoutes.accountWithoutID, id]);
  }
}
