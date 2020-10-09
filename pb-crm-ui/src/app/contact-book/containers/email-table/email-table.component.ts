import {Component, Input, OnInit} from '@angular/core';
import {EmailModel} from '@hiddentemple/api-interfaces';

@Component({
  selector: 'app-email-table',
  template: `
    <table mat-table [dataSource]="emails" class="full-width-table">
      <!-- Address Column -->
      <ng-container matColumnDef="address">
        <th mat-header-cell *matHeaderCellDef>Address</th>
        <td mat-cell *matCellDef="let emails"> {{emails.address}}</td>
      </ng-container>

      <!-- Type Column -->
      <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef>Type</th>
        <td mat-cell *matCellDef="let emails">{{emails.type}}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let emails; columns: displayedColumns;"></tr>
    </table>
  `,
  styleUrls: ['email-table.component.css']
})


export class EmailTableComponent {
  displayedColumns: string[] = ['address', 'type'];

  @Input() emails: EmailModel[];

}
