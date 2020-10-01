import {Component, Input, OnInit} from '@angular/core';
import {EmailModel} from '../../../api/api-interfaces/contact/models/email.model';

@Component({
  selector: 'app-email-table',
  template: `
    <table mat-table [dataSource]="emails">
      <!-- ID Column -->
      <ng-container matColumnDef="address">
        <th mat-header-cell *matHeaderCellDef>Address</th>
        <td mat-cell *matCellDef="let email"> {{email.address}}</td>
      </ng-container>

      <!-- First Name Column -->
      <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef>Type</th>
        <td mat-cell *matCellDef="let email">{{email.type}}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let email; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: []
})


export class EmailTableComponent {
  displayedColumns: string[] = ['address', 'type'];

  @Input() emails: EmailModel[];

}
