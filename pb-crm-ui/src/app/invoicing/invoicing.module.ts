import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicingRoutingModule } from './invoicing-routing.module';
import { AccountDashboardPageComponent } from './components/account-dashboard-page/account-dashboard-page.component';
import { AccountListComponent } from './containers/account-list/account-list.component';
import { AccountSummaryPageComponent } from './components/account-summary-page/account-summary-page.component';
import { InvoicePageComponent } from './components/invoice-page/invoice-page.component';
import { LineItemTableComponent } from './containers/line-item-table/line-item-table/line-item-table.component';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [AccountDashboardPageComponent, AccountListComponent, AccountSummaryPageComponent, InvoicePageComponent, LineItemTableComponent],
    imports: [
        CommonModule,
        InvoicingRoutingModule,
        MatTableModule
    ]
})
export class InvoicingModule { }
