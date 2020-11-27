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
    <form [formGroup]="contactForm" class="row">
      <table mat-table formArrayName="phones" [dataSource]="phoneFormArrayControls$">

        <!-- Checkbox Column -->
        <ng-container matColumnDef="select">
          <td mat-cell *matCellDef="let phone; let i=index" [formGroupName]="i" class="col-1 p-1">
            <mat-checkbox (click)="$event.stopPropagation()"
                          (change)="$event ? selection.toggle(phone) : null"
                          [checked]="selection.isSelected(phone)"
                          formControlName="isPrimary"
                          matTooltip="Check to display in table">
            </mat-checkbox>
          </td>
        </ng-container>

        <!-- Country Code Column -->
        <ng-container matColumnDef="country code">
          <td mat-cell *matCellDef="let phone; let i=index" class="col-2 p-1">
            <mat-form-field [formGroupName]="i">
              <mat-label>Country Code</mat-label>
              <mat-select formControlName="countryCode" required [compareWith]="compareWith">
                <mat-option *ngFor="let country of countries" value="{{country.dial_code}}">
                  {{country.name}} ({{country.dial_code}})
                </mat-option>
              </mat-select>
            </mat-form-field>
          </td>
        </ng-container>

        <!-- Phone Number Column -->
        <ng-container matColumnDef="phoneNumber">
          <td mat-cell *matCellDef="let phone; let i=index" class="col-5 p-1">
            <mat-form-field [formGroupName]="i">
              <mat-label>Phone Number</mat-label>
              <input matInput type="text" placeholder="Ex. 303 867 5309" formControlName="phoneNumber">
              <mat-error *ngIf="phoneHasRequiredError(phone)">
                A phone is required
              </mat-error>
              <mat-error *ngIf="phoneHasPatternError(phone)">
                Not a valid phone number
              </mat-error>
            </mat-form-field>
          </td>
        </ng-container>

        <!-- Category Column -->
        <ng-container matColumnDef="category">
          <td mat-cell *matCellDef="let phone; let i=index" class="col-3 p-1">
            <mat-form-field [formGroupName]="i">
              <mat-label>Category</mat-label>
              <mat-select formControlName="category" required>
                <mat-option *ngFor="let category of phoneCategories" value="{{category}}">
                  {{category}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </td>
        </ng-container>

        <!-- Remove Phone Column -->
        <ng-container matColumnDef="remove">
          <td mat-cell *matCellDef="let phone; let i=index" class="col-1 p-1">
            <button mat-icon-button type="button" (click)="removePhoneInput(i)">
              <mat-icon color="accent">remove_circle_outline</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-row *matRowDef="let row; let i=index; columns: displayedColumns;"></tr>
      </table>

      <button mat-icon-button type="button" (click)="addPhone()" class="float-right">
        <mat-icon>add</mat-icon>
      </button>
    </form>
  `,
  styles: []
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

  constructor(private formService: ContactFormService, private dialog: MatDialog) {}

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
