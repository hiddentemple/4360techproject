import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicingRoutingModule } from './invoicing-routing.module';
import { AccountDashboardPageComponent } from './components/account-dashboard-page/account-dashboard-page.component';
import { AccountListComponent } from './containers/account-list/account-list.component';
import { AccountSummaryPageComponent } from './components/account-summary-page/account-summary-page.component';
import { InvoicePageComponent } from './components/invoice-page/invoice-page.component';


@NgModule({
  declarations: [AccountDashboardPageComponent, AccountListComponent, AccountSummaryPageComponent, InvoicePageComponent],
  imports: [
    CommonModule,
    InvoicingRoutingModule
  ]
})
export class InvoicingModule { }
