import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicingRoutingModule } from './invoicing-routing.module';
import { AccountDashboardPageComponent } from './components/account-dashboard-page/account-dashboard-page.component';
import { AccountListComponent } from './containers/account-list/account-list.component';
import { AccountDetailPageComponent } from './components/account-detail-page/account-detail-page.component';
import { InvoicePageComponent } from './components/invoice-page/invoice-page.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { InvoiceTableComponent } from './containers/invoice-table/invoice-table.component';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [AccountDashboardPageComponent, AccountListComponent, AccountDetailPageComponent, InvoicePageComponent, InvoiceTableComponent, AccountListComponent],
  imports: [
    CommonModule,
    InvoicingRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatSortModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    AccountDetailPageComponent,
    AccountListComponent
  ]
})
export class InvoicingModule { }
