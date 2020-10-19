import {Component, Input, OnInit} from '@angular/core';
import {PhoneModel} from '@hiddentemple/api-interfaces';

@Component({
  selector: 'app-phone-table',
  template: `
    <table mat-table [dataSource]="phones" class="full-width-table" >
      <!-- Phone Column -->
      <ng-container matColumnDef="number">
        <th mat-header-cell *matHeaderCellDef>Phone Number</th>
        <td mat-cell *matCellDef="let phone"> {{phone.phoneNumber}}</td>
      </ng-container>

      <!-- Type Column -->
      <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef>Type</th>
        <td mat-cell *matCellDef="let phone">{{getCategory(phone)}}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let phone; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [
    `.full-width-table {
      width: 100%;
    }`
  ]
})
export class PhoneTableComponent {
  displayedColumns: string[] = ['number', 'type'];

  @Input() phones: PhoneModel[];

  getCategory(phone: PhoneModel): string { return phone.category.description; }

}
