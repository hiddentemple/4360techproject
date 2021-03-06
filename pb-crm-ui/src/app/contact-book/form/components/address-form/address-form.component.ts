import {Component, Input} from '@angular/core';
import {ContactFormService} from "../../contact-form.service";
import {Observable} from "rxjs";
import {AbstractControl, FormArray, FormGroup} from "@angular/forms";
import {map} from "rxjs/operators";
import {AddressCategory} from "@hiddentemple/api-interfaces";
import {SelectionModel} from "@angular/cdk/collections";
import {getCountryNames} from "../../../../core/countries";
import {DeleteConfirmationComponent} from "../../../containers/delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {StatesMap} from "../../../../core/states";

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
                <mat-label>Street 2</mat-label>
                <input matInput class="full-width" type="text" formControlName="street2">
              </mat-form-field>
            </div>

            <div class="row">
              <!-- City -->
              <mat-form-field class="col-sm-12 col-md-6">
                <mat-label>City</mat-label>
                <input matInput required class="full-width" placeholder="Littleton" type="text" formControlName="city">

                <mat-error *ngIf="cityHasRequiredError(address)">
                  City is required
                </mat-error>
              </mat-form-field>

              <!-- State -->
              <mat-form-field class="col-sm-6 col-md-2">
                <mat-select placeholder="State" formControlName="state" required [compareWith]="stateCompareWith">
                  <mat-option *ngFor="let state of states" [value]="state.abbreviation">
                    {{ state.abbreviation }}
                  </mat-option>
                </mat-select>
                <mat-error *ngIf="stateHasRequiredError(address)">
                  State is required
                </mat-error>
              </mat-form-field>

              <!-- Zip Code -->
              <mat-form-field class="col-sm-6 col-md-4">
                <mat-label>Zip Code</mat-label>
                <input matInput required maxlength="9" placeholder="80124" formControlName="postalCode">

                <mat-error *ngIf="zipCodeHasRequiredError(address)">
                  Zipcode is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="row">
              <!-- Category -->
              <mat-form-field class="col-sm-12 col-md-5">
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

              <mat-form-field class="col-sm-10 col-md-5">
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
  stateCompareWith = (option, selection) => option.abbreviation === selection.abbreviation;

  get addressesControls$(): Observable<AbstractControl[]> {
    return this.formService.contactForm$.pipe(map(form =>
      (form.get("addresses") as FormArray).controls
    ))
  }

  constructor(private formService: ContactFormService, private dialog: MatDialog) {
  }

  addAddress() {
    this.formService.addAddress()
  }

  removeAddressInput(i: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formService.removeAddress(i)
      }
    });
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
