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
  selector: 'app-address-list-item',
  template: `
<!--    <mat-list-item>-->
<!--      <h3>{{address.category}}</h3>-->
<!--      <p>-->
<!--        {{addressString}}-->
<!--      </p>-->
<!--    </mat-list-item>-->
  `,
  styles: [
  ]
})
export class AddressListItemComponent {
  @Input() address: AddressModel;

  get lines(): string[] { return addressToStrings(this.address) }

  get addressString(): string {
    return addressToStrings(this.address).join("\n")
  }

}
