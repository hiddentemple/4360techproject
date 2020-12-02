import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InvoicingRoutes} from '../../invoicing-routing.module';
import {ContactModel} from '@hiddentemple/api-interfaces';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {AccountModel} from '../../../../../../../api-interfaces/src/invoicing';

export enum TableSize { FULL, COMPACT }


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
  dataSource: MatTableDataSource<ContactModel>;

  @ViewChild(MatTable) dataTable: MatTable<any>;

  @Output() delete = new EventEmitter<ContactModel>();
  @Output() edit = new EventEmitter<ContactModel>();
  @Output() view = new EventEmitter<ContactModel>();

  @Input() size: TableSize;
  @Input() set accounts(accounts: AccountModel[]) { this.setAccounts(accounts); }

  get displayedColumns(): string[] { return this.getColumns(); }

  constructor(private router: Router, private route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get('id'); // get the id from the URL
    // Get the account from cache
  }

  // goToDashboard() {
  //   this.router.navigate([InvoicingRoutes.home])
  // }
  //
  // goToInvoice() {
  //   const id = "asgasdf2" // id of invoice
  //   this.router.navigate([InvoicingRoutes.invoicesWithoutID, id])
  // }


  onView(accounts: AccountModel) { this.view.emit(accounts); }

  ngAfterViewInit(): void {
  }

  onEdit(accounts: AccountModel) { this.edit.emit(accounts); }
  onDelete(accounts: AccountModel) { this.delete.emit(accounts); }
  onView(accounts: AccountModel) { this.view.emit(accounts); }


  private setAccounts(accounts: AccountModel[]) {
    if ((!accounts) || accounts === []) {
      console.log('Contacts received a falsey value: ', accounts);
      return;
    }

    console.log('Contact Table received new contacts: ', accounts);
    this.dataSource.data = accounts;
    if (this.dataTable) {
      console.log('Data table is present, rendering rows');
      this.dataTable.renderRows();
    }
  }

  private getColumns(): string[] {
    switch (this.size){
      case TableSize.COMPACT:
        return ['Item Number', 'Type', 'Date'];
      case TableSize.FULL:
        return ['Item Number', 'Type', 'Date'];
    }
  }

  onClick(account: any) {

  }
}
