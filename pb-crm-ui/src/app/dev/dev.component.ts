import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {AccountModel} from '@hiddentemple/api-interfaces';
import {ActivatedRoute, Router} from '@angular/router';

export enum TableSize { FULL, COMPACT }


@Component({
  selector: 'app-dev',
  templateUrl: '../invoicing/components/account-summary-page/account-summary-page-component.html',
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
export class DevComponent{
  dataSource: MatTableDataSource<AccountModel>;

  @ViewChild(MatTable) dataTable: MatTable<any>;

  @Output() delete = new EventEmitter<AccountModel>();
  @Output() edit = new EventEmitter<AccountModel>();
  @Output() view = new EventEmitter<AccountModel>();

  @Input() size: TableSize;
  @Input() set accounts(accounts: AccountModel[]) { this.setAccounts(accounts); }

  get displayedColumns(): string[] { return this.getColumns(); }

  constructor(private router: Router, private route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get('id'); // get the id from the URL
    this.dataSource = new MatTableDataSource([]);

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

  onEdit(account: AccountModel) { this.edit.emit(account); }
  onDelete(account: AccountModel) { this.delete.emit(account); }
  onView(account: AccountModel) { this.view.emit(account); }


  private setAccounts(accounts: AccountModel[]) {
    if ((!accounts) || accounts === []) {
      console.log('Accounts received a falsey value: ', accounts);
      return;
    }

    console.log('Account Table received new contacts: ', accounts);
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
