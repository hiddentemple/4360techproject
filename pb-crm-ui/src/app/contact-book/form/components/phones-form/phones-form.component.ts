import {Component, Input} from '@angular/core';
import {AbstractControl, Form, FormArray, FormGroup} from "@angular/forms";
import {ContactFormService} from "../../contact-form.service";
import {PhoneCategory} from "@hiddentemple/api-interfaces";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SelectionModel} from "@angular/cdk/collections";
import {CountryCodeMap, getSortedCountryCodes, UnitedStatesCountryCode} from "../../../../core/countries";
import {DeleteConfirmationComponent} from "../../../containers/delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-phones-form',
  template: `
    <form [formGroup]="contactForm">
      <div formArrayName="phones">
        <div class="row p-1 " *ngFor="let phone of phoneFormArrayControls$ | async; let i=index">
          <div [formGroupName]="i">
            <!-- Checkbox Column -->
            <mat-checkbox (click)="$event.stopPropagation()"
                          (change)="$event ? selection.toggle(phone) : null"
                          [checked]="selection.isSelected(phone)"
                          formControlName="isPrimary"
                          matTooltip="Check to display in table"
                          class="col-1">
            </mat-checkbox>

            <!-- Country Code Column -->
            <mat-form-field class="col-sm-11 col-md-3">
              <mat-label>Country Code</mat-label>
              <mat-select formControlName="countryCode" required [compareWith]="compareWith">
                <mat-option *ngFor="let country of countries" value="{{country.dial_code}}">
                  {{country.name}} ({{country.dial_code}})
                </mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Phone Number Column -->
            <mat-form-field class="col-sm-12 col-md-4">
              <mat-label>Phone Number</mat-label>
              <input matInput type="text" placeholder="Ex. 303 867 5309" formControlName="phoneNumber">
              <mat-error *ngIf="phoneHasRequiredError(phone)">
                A phone is required
              </mat-error>
              <mat-error *ngIf="phoneHasPatternError(phone)">
                Not a valid phone number
              </mat-error>
            </mat-form-field>

            <!-- Category Column -->
            <mat-form-field class="col-sm-12 col-md-3">
              <mat-label>Category</mat-label>
              <mat-select formControlName="category" required>
                <mat-option *ngFor="let category of phoneCategories" value="{{category}}">
                  {{category}}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Remove Phone Column -->
            <button mat-icon-button
                    type="button"
                    (click)="removePhoneInput(i)"
                    class="col-1 float-right"
                    matTooltip="Remove phone">
              <mat-icon color="accent">remove_circle_outline</mat-icon>
            </button>

            <!-- After singular phone -->
            <hr>
          </div>
        </div>
        <!-- After all phones -->
      </div>

      <div class="row">
        <button mat-icon-button type="button" (click)="addPhone()" class="float-right">
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </form>
  `,
  styles: [

  ]
})
export class PhonesFormComponent {
  displayedColumns = ["select", "country code", "phoneNumber", "category", "remove"];
  selection = new SelectionModel(false);
  phoneCategories: PhoneCategory[] = Object.values(PhoneCategory);
  countries = getSortedCountryCodes();
  compareWith = (option, selection) => option.dial_code === selection.dial_code;

  @Input() contactForm: FormGroup;

  get phoneFormArrayControls$(): Observable<AbstractControl[]> {
    return this.formService.contactForm$.pipe(map(contactForm => {
      return (contactForm.get("phones") as FormArray).controls
    }))
  }

  constructor(private formService: ContactFormService, private dialog: MatDialog) {
  }

  addPhone() {
    this.formService.addPhone();
  }

  removePhoneInput(i: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formService.removePhone(i)
      }
    });
  }

  phoneHasRequiredError(phone: AbstractControl): boolean {
    return phone.hasError("required");
  }

  phoneHasPatternError(phone: AbstractControl): boolean {
    return phone.hasError("pattern");
  }
}
