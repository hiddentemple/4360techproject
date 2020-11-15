import {Component, Input} from '@angular/core';
import {AbstractControl, Form, FormArray, FormGroup} from "@angular/forms";
import {ContactFormService} from "../../contact-form.service";
import {PhoneCategory} from "@hiddentemple/api-interfaces";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-phones-form',
  template: `
    <form [formGroup]="contactForm">
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

        <!-- Phone Number Column -->
        <ng-container matColumnDef="phoneNumber" >
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
          <td mat-cell *matCellDef="let phone; let i=index" class="col-5 p-1">
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
            <div>
              <button mat-icon-button type="button" (click)="removePhoneInput(i)">
                <mat-icon color="accent">remove_circle_outline</mat-icon>
              </button>
            </div>
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
  displayedColumns = ["select", "phoneNumber", "category", "remove"];
  selection = new SelectionModel(false);
  phoneCategories: PhoneCategory[] = Object.values(PhoneCategory);

  @Input() contactForm: FormGroup;

  get phoneFormArrayControls$(): Observable<AbstractControl[]> {
    return this.formService.contactForm$.pipe(map(contactForm => {
      return (contactForm.get("phones") as FormArray).controls
    }))
  }

  constructor(private formService: ContactFormService) {}

  addPhone() {
    this.formService.addPhone();
  }

  removePhoneInput(i: number) {
    this.formService.removePhone(i);
  }

  phoneHasRequiredError(phone: AbstractControl): boolean {
    return phone.hasError("required");
  }

  phoneHasPatternError(phone: AbstractControl): boolean {
    return phone.hasError("pattern");
  }
}
