import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {AccountModel, InvoiceModel} from '@hiddentemple/api-interfaces';

@Component({
  selector: 'app-account-summary-page',
  templateUrl: './account-summary-page-component.html',
  styles: [
      `table {
      width: 100%;
    }`,
      `mat-form-field {
      font-size: 14px;
      width: 100%;
    }`,
      `td, th {
      width: auto;
    }`
  ]
})

export class AccountSummaryPageComponent implements AfterViewInit {

  constructor(private invoiceCache: InvoiceCache) {
  }
}
