import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {LineItemModel} from '@hiddentemple/api-interfaces';

@Component({
  selector: 'app-line-item-table',
  template: `
    <table mat-table [dataSource]="dataSource" matSort matSortActive="name" matSortDirection="asc">

      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
        <td mat-cell *matCellDef="let lineItem"> {{lineItem.name}} </td>
        <td mat-footer-cell *matFooterCellDef><strong>Total Cost</strong></td>
      </ng-container>

      <!-- Category Column -->
      <ng-container matColumnDef="itemCategory">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Category</th>
        <td mat-cell *matCellDef="let lineItem"> {{lineItem.itemCategory}} </td>
        <td mat-footer-cell *matFooterCellDef></td>
      </ng-container>

      <!-- Description Column -->
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Description</th>
        <td mat-cell *matCellDef="let lineItem"> {{lineItem.description}} </td>
        <td mat-footer-cell *matFooterCellDef></td>
      </ng-container>

      <!-- Quantity Column -->
      <ng-container matColumnDef="quantity">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Quantity</th>
        <td mat-cell *matCellDef="let lineItem"> {{lineItem.quantity}} </td>
        <td mat-footer-cell *matFooterCellDef></td>
      </ng-container>

      <!-- Unit Price Column -->
      <ng-container matColumnDef="unitPrice">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Unit Price</th>
        <td mat-cell *matCellDef="let lineItem"> {{lineItem.unitPrice | currency}} </td>
        <td mat-footer-cell *matFooterCellDef></td>
      </ng-container>

      <!-- Warranty Column -->
      <ng-container matColumnDef="warranty">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Warranty</th>
        <td mat-cell *matCellDef="let lineItem"> {{lineItem.warranty}} </td>
        <td mat-footer-cell *matFooterCellDef></td>
      </ng-container>

      <!-- Total Price Column -->
      <ng-container matColumnDef="totalPrice">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Total Price</th>
        <td mat-cell *matCellDef="let lineItem"> {{getTotalCostOfLineItem(lineItem) | currency}} </td>
        <td mat-footer-cell *matFooterCellDef> <strong>{{getTotalCost() | currency}}</strong> </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      <tr mat-footer-row *matFooterRowDef="displayedColumns"></tr>

    </table>
  `,
  styles: [
    `table {
      width: 100%;
    }`
  ]
})
export class LineItemTableComponent implements AfterViewInit {
  dataSource: MatTableDataSource<LineItemModel>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) dataTable: MatTable<any>;

  @Input() set lineItems(lineItems: LineItemModel[]) { this.setLineItems(lineItems); }
  get lineItems() { return this.dataSource?.data}

  displayedColumns: string[] = ['name', 'itemCategory', 'quantity', 'unitPrice', 'totalPrice'];

  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getTotalCostOfLineItem(lineItem: LineItemModel): number {
    return lineItem.unitPrice * lineItem.quantity;
  }

  getTotalCost(): number {
    if (!this.lineItems) return 0;

    const acc = 0;
    const reducer = (acc, lineItem) => acc + this.getTotalCostOfLineItem(lineItem);
    return Object.values(this.lineItems).reduce(reducer, acc);
  }

  private setLineItems(lineItems: LineItemModel[]) {
    if ((!lineItems) || lineItems === []) {
      console.log('Line Items received a falsey value: ', lineItems);
      return;
    }

    console.log('Line Item Table received new line items: ', lineItems);
    this.dataSource.data = lineItems;
    if (this.dataTable) {
      console.log('Data table is present, rendering rows');
      this.dataTable.renderRows();
    }
  }
}
