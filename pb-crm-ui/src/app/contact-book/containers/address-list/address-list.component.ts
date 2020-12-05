import {Component, Input, OnInit} from '@angular/core';
import {AddressModel} from "@hiddentemple/api-interfaces";
import {isDefined, requireDefined} from "../../../core/utils/object.utils";

export function addressToStrings(address: AddressModel): string[] {
  requireDefined(address);
  const {street, city, state, postalCode} = address
  const lines = [street];
  if (isDefined(address.street2)) lines.push(address.street2)
  lines.push(`${city}, ${state} ${postalCode}`)
  return lines
}

@Component({
  selector: 'app-address-list',
  styles: [],
  template: `
    <table mat-table [dataSource]="addresses" style="width: 100%">
      <ng-container matColumnDef="addressString">
        <th mat-header-cell *matHeaderCellDef> Physical Address </th>
        <td mat-cell *matCellDef="let address">
          <div *ngFor="let addressLine of getLines(address)">
            {{addressLine}}<br>
          </div>
        </td>
      </ng-container>

      <ng-container matColumnDef="category">
        <th mat-header-cell *matHeaderCellDef> Category </th>
        <td mat-cell *matCellDef="let address">
          {{address.category}}
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

<!--    <mat-list>-->
<!--      <app-address-list-item *ngFor="let address of addresses" [address]="address"></app-address-list-item>-->
<!--    </mat-list>-->
  `
})
export class AddressListComponent implements OnInit {
  @Input() addresses: AddressModel[];
  displayedColumns: string[] = [
    "addressString",
    "category"
  ];

  constructor() { }

  ngOnInit(): void {}

  getLines(address: AddressModel) {
    return addressToStrings(address);
  }
}
