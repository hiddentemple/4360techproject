import {Component, Input} from '@angular/core';
import {CategoryModel, isPrimary} from "@hiddentemple/api-interfaces";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-category-table',
  styles: [
  ],
  template: `
    <div class="mat-elevation-z8" style="width: 200px">
      <table mat-table [dataSource]="dataSource" style="width: 100%">

        <!-- Is Primary Column Column -->
        <ng-container matColumnDef="isPrimary">
          <th mat-header-cell *matHeaderCellDef>    </th>
          <td mat-cell *matCellDef="let category">
            <mat-icon *ngIf="isPrimary(category)">star_border</mat-icon>
          </td>
        </ng-container>

        <!-- Description Category -->
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let category"> {{category.description}}</td>
        </ng-container>

        <!-- Actions Column -->


        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

      </table>
    </div>
  `
})
export class CategoryTableComponent {
  displayedColumns = ['isPrimary', 'description']
  dataSource = new MatTableDataSource<CategoryModel>();

  @Input() set categories(categories: CategoryModel[]) {
    if (!categories || categories.length === 0) return;

    this.dataSource.data = categories;
  }
  constructor() { }

  isPrimary(category: CategoryModel): boolean { return isPrimary(category); }
}
