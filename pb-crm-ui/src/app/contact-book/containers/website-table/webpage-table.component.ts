import {Component, Input, OnInit} from '@angular/core';
import {WebpageModel} from "@hiddentemple/api-interfaces";

@Component({
  selector: 'app-website-table',
  template: `
    <table mat-table [dataSource]="webpages" class="full-width-table">
      <!-- URL Column -->
      <ng-container matColumnDef="url">
        <th mat-header-cell *matHeaderCellDef>URL</th>
        <td mat-cell *matCellDef="let webpage"> {{webpage.url}}</td>
      </ng-container>

      <!-- Type Column -->
      <ng-container matColumnDef="category">
        <th mat-header-cell *matHeaderCellDef>Category</th>
        <td mat-cell *matCellDef="let webpage">{{webpage.category}}</td>
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
export class WebpageTableComponent{
  displayedColumns = ['url', 'category'];

  @Input() webpages: WebpageModel[];
}
