import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {InvoiceModel} from '@hiddentemple/api-interfaces';
import {InvoicingRoutes} from '../../invoicing-routing.module';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-invoice-table',
  template: `
    <table mat-table [dataSource]="dataSource" matSort matSortActive="itemNumber" matSortDirection="asc">

      <!-- Item Number Column -->
      <ng-container matColumnDef="invoiceNumber">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Invoice Number</th>
        <td mat-cell *matCellDef="let invoice" >{{invoice.invoiceNumber}}</td>
      </ng-container>

      <!-- Type Column -->
      <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Type</th>
        <td mat-cell *matCellDef="let invoice">{{invoice.type}}</td>
      </ng-container>

      <!-- Date Column -->
      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Date</th>
        <td mat-cell *matCellDef="let invoice"> {{invoice.date}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let invoice; columns: displayedColumns;" (click)="onClick(invoice)"></tr>

      <!-- Row shown when there is no matching data. -->
      <tr class="mat-row" *matNoDataRow>
        <td class="mat-cell" colspan="6">No invoices in database.</td>
      </tr>
    </table>
  `,
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
export class InvoiceTableComponent implements AfterViewInit {

  dataSource = new MatTableDataSource<InvoiceModel> ([]);
  displayedColumns = ['invoiceNumber', 'type', 'date'];

  @Input() set invoices(invoices: InvoiceModel[]) {
    if (invoices){
      this.dataSource.data = invoices;
    }
  }

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(invoice: InvoiceModel) {
    this.router.navigate([InvoicingRoutes.invoicesWithoutID, invoice.id]);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
