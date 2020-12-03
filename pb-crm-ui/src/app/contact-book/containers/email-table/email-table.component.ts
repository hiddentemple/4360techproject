import {Component, Input} from '@angular/core';
import {EmailModel} from '@hiddentemple/api-interfaces';

@Component({
  selector: 'app-email-table',
  template: `
    <table mat-table [dataSource]="emails" class="full-width-table">
      <!-- Address Column -->
      <ng-container matColumnDef="address">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let email"> {{email.address}}</td>
      </ng-container>

      <!-- Type Column -->
      <ng-container matColumnDef="category">
        <th mat-header-cell *matHeaderCellDef>Type</th>
        <td mat-cell *matCellDef="let email">{{email.category}}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let email; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [
    `.full-width-table {
      width: 100%;
    }`
  ]
})


export class EmailTableComponent {
  displayedColumns: string[] = ['address', 'category'];
  @Input() emails: EmailModel[];
}
