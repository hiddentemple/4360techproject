import {Component, Input, OnInit} from '@angular/core';
import {ContactFormService} from "../../contact-form.service";
import {Observable} from "rxjs";
import {AbstractControl, FormArray, FormGroup} from "@angular/forms";
import {map} from "rxjs/operators";
import {AddressCategory} from "@hiddentemple/api-interfaces";
import {SelectionModel} from "@angular/cdk/collections";
import {getCountryNames, getSortedCountryCodes} from "../../../../core/countries";

export interface StateMapEntry { name: string; abbreviation: string; }

export const StatesMap: StateMapEntry[] = [
  {name: 'Alabama', abbreviation: 'AL'},
  {name: 'Alaska', abbreviation: 'AK'},
  {name: 'American Samoa', abbreviation: 'AS'},
  {name: 'Arizona', abbreviation: 'AZ'},
  {name: 'Arkansas', abbreviation: 'AR'},
  {name: 'California', abbreviation: 'CA'},
  {name: 'Colorado', abbreviation: 'CO'},
  {name: 'Connecticut', abbreviation: 'CT'},
  {name: 'Delaware', abbreviation: 'DE'},
  {name: 'District Of Columbia', abbreviation: 'DC'},
  {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
  {name: 'Florida', abbreviation: 'FL'},
  {name: 'Georgia', abbreviation: 'GA'},
  {name: 'Guam', abbreviation: 'GU'},
  {name: 'Hawaii', abbreviation: 'HI'},
  {name: 'Idaho', abbreviation: 'ID'},
  {name: 'Illinois', abbreviation: 'IL'},
  {name: 'Indiana', abbreviation: 'IN'},
  {name: 'Iowa', abbreviation: 'IA'},
  {name: 'Kansas', abbreviation: 'KS'},
  {name: 'Kentucky', abbreviation: 'KY'},
  {name: 'Louisiana', abbreviation: 'LA'},
  {name: 'Maine', abbreviation: 'ME'},
  {name: 'Marshall Islands', abbreviation: 'MH'},
  {name: 'Maryland', abbreviation: 'MD'},
  {name: 'Massachusetts', abbreviation: 'MA'},
  {name: 'Michigan', abbreviation: 'MI'},
  {name: 'Minnesota', abbreviation: 'MN'},
  {name: 'Mississippi', abbreviation: 'MS'},
  {name: 'Missouri', abbreviation: 'MO'},
  {name: 'Montana', abbreviation: 'MT'},
  {name: 'Nebraska', abbreviation: 'NE'},
  {name: 'Nevada', abbreviation: 'NV'},
  {name: 'New Hampshire', abbreviation: 'NH'},
  {name: 'New Jersey', abbreviation: 'NJ'},
  {name: 'New Mexico', abbreviation: 'NM'},
  {name: 'New York', abbreviation: 'NY'},
  {name: 'North Carolina', abbreviation: 'NC'},
  {name: 'North Dakota', abbreviation: 'ND'},
  {name: 'Northern Mariana Islands', abbreviation: 'MP'},
  {name: 'Ohio', abbreviation: 'OH'},
  {name: 'Oklahoma', abbreviation: 'OK'},
  {name: 'Oregon', abbreviation: 'OR'},
  {name: 'Palau', abbreviation: 'PW'},
  {name: 'Pennsylvania', abbreviation: 'PA'},
  {name: 'Puerto Rico', abbreviation: 'PR'},
  {name: 'Rhode Island', abbreviation: 'RI'},
  {name: 'South Carolina', abbreviation: 'SC'},
  {name: 'South Dakota', abbreviation: 'SD'},
  {name: 'Tennessee', abbreviation: 'TN'},
  {name: 'Texas', abbreviation: 'TX'},
  {name: 'Utah', abbreviation: 'UT'},
  {name: 'Vermont', abbreviation: 'VT'},
  {name: 'Virgin Islands', abbreviation: 'VI'},
  {name: 'Virginia', abbreviation: 'VA'},
  {name: 'Washington', abbreviation: 'WA'},
  {name: 'West Virginia', abbreviation: 'WV'},
  {name: 'Wisconsin', abbreviation: 'WI'},
  {name: 'Wyoming', abbreviation: 'WY'}
];


@Component({
  selector: 'app-addresses-form',
  template: `
    <form [formGroup]="contactForm">
      <div formArrayName="addresses">
        <div *ngFor="let address of addressesControls$ | async; let i=index">
          <div [formGroupName]="i">
            <!-- Street 1 -->
            <div class="row">
              <mat-form-field class="col-12">
                <mat-label>Street 1</mat-label>
                <input matInput
                       required
                       class="full-width"
                       placeholder="32 Baker Street"
                       type="text"
                       formControlName="street">

                <mat-error *ngIf="streetHasRequiredError(address)">
                  Street is required
                </mat-error>
              </mat-form-field>
            </div>

            <!-- Street 2 -->
            <div class="row">
              <mat-form-field class="col-12">
                <mat-label>Street 1</mat-label>
                <input matInput class="full-width" type="text" formControlName="street2">
              </mat-form-field>
            </div>

            <div class="row">
              <!-- City -->
              <mat-form-field class="col-6">
                <mat-label>City</mat-label>
                <input matInput required class="full-width" placeholder="Littleton" type="text" formControlName="city">

                <mat-error *ngIf="cityHasRequiredError(address)">
                  City is required
                </mat-error>
              </mat-form-field>

              <!-- State -->
              <mat-form-field class="col-2">
                <mat-select placeholder="State" formControlName="state" required>
                  <mat-option *ngFor="let state of states" [value]="state.abbreviation">
                    {{ state.abbreviation }}
                  </mat-option>
                </mat-select>
                <mat-error *ngIf="stateHasRequiredError(address)">
                  State is required
                </mat-error>
              </mat-form-field>

              <!-- Zip Code -->
              <mat-form-field class="col-4">
                <mat-label>Zip Code</mat-label>
                <input matInput required maxlength="9" placeholder="80124" formControlName="postalCode">

                <mat-error *ngIf="zipCodeHasRequiredError(address)">
                  Zipcode is required
                </mat-error>
              </mat-form-field>
            </div>


            <div class="row">
              <!-- Category -->
              <mat-form-field class="col-5">
                <mat-label>Country</mat-label>
                <mat-select formControlName="country" required>
                  <mat-option *ngFor="let country of countries" value="{{country}}">
                    {{country}}
                  </mat-option>
                </mat-select>

                <mat-error *ngIf="countryHasRequiredError(address)">
                  Category is required
                </mat-error>
              </mat-form-field>

              <mat-form-field class="col-5">
                <mat-label>Category</mat-label>
                <mat-select formControlName="category" required>
                  <mat-option *ngFor="let category of addressCategories" value="{{category}}">
                    {{category}}
                  </mat-option>
                </mat-select>

                <mat-error *ngIf="categoryHasRequiredError(address)">
                  Category is required
                </mat-error>
              </mat-form-field>

              <!-- Remove -->
              <button mat-icon-button type="button" (click)="removeAddressInput(i)" class="col-2">
                <mat-icon color="accent">remove_circle_outline</mat-icon>
              </button>
            </div>
          </div>
          <hr/>
        </div>
      </div>
    </form>
    <button mat-icon-button type="button" (click)="addAddress()" class="float-right">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: []
})
export class AddressFormComponent {
  @Input() contactForm: FormGroup;
  states = StatesMap;
  addressCategories = Object.values(AddressCategory);
  selection = new SelectionModel(false);
  countries: string[] = getCountryNames();

  get addressesControls$(): Observable<AbstractControl[]> {
    return this.formService.contactForm$.pipe(map(form =>
      (form.get("addresses") as FormArray).controls
    ))
  }

  constructor(private formService: ContactFormService) {
  }

  addAddress() {
    this.formService.addAddress()
  }

  removeAddressInput(i: number) {
    this.formService.removeAddress(i)
  }

  streetHasRequiredError(address: AbstractControl): boolean {
    return address.get("street").hasError("required");
  }

  cityHasRequiredError(address: AbstractControl) {
    return address.get("city").hasError("required");
  }

  stateHasRequiredError(address: AbstractControl) {
    return address.get("state").hasError("required");
  }
  zipCodeHasRequiredError(address: AbstractControl) {
    return address.get("postalCode").hasError("required");
  }

  categoryHasRequiredError(address: AbstractControl) {
    return address.get("category").hasError("required")
  }

  countryHasRequiredError(address: AbstractControl) {
    return address.get("country").hasError("required")
  }
}
