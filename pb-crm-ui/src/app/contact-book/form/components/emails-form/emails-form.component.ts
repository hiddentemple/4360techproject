import {Component, Input} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from "@angular/forms";
import {ContactFormService} from "../../contact-form.service";
import {EmailCategory} from "@hiddentemple/api-interfaces";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-emails-form',
  template: `
    <form [formGroup]="contactForm">
      <table mat-table formArrayName="emails" [dataSource]="emailFormArrayControls$">

        <!-- Checkbox Column -->
        <ng-container matColumnDef="select">
          <td mat-cell *matCellDef="let email; let i=index" [formGroupName]="i" class="col-1 p-1">
            <mat-checkbox (click)="$event.stopPropagation()"
                          (change)="$event ? selection.toggle(email) : null"
                          [checked]="selection.isSelected(email)"
                          formControlName="isPrimary"
                          matTooltip="Check to display in table">
            </mat-checkbox>
          </td>
        </ng-container>

        <!-- Email Address Column -->
        <ng-container matColumnDef="address">
          <td mat-cell *matCellDef="let email; let i=index" class="col-5 p-1">
            <mat-form-field [formGroupName]="i">
              <mat-label>Email Address</mat-label>
              <input matInput
                     type="text"
                     maxlength="255"
                     placeholder="Ex. example@gmail.com"
                     formControlName="address"
                     required>

              <mat-error *ngIf="emailHasRequiredError(email)">
                Email is required
              </mat-error>
              <mat-error *ngIf="emailHasEmailError(email)">
                Not a valid email
              </mat-error>
            </mat-form-field>
          </td>
        </ng-container>

        <!-- Category Column -->
        <ng-container matColumnDef="category">
          <td mat-cell *matCellDef="let email; let i=index" class="col-5 p-1">
            <mat-form-field [formGroupName]="i">
              <mat-label>Category</mat-label>
              <mat-select formControlName="category" required>
                <mat-option *ngFor="let category of emailCategories" value="{{category}}">
                  {{category}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </td>
        </ng-container>

        <!-- Remove Email Column -->
        <ng-container matColumnDef="remove">
          <td mat-cell *matCellDef="let email; let i=index" class="col-1 p-1">
            <div>
              <button mat-icon-button type="button" (click)="removeEmailInput(i)">
                <mat-icon color="accent">remove_circle_outline</mat-icon>
              </button>
            </div>
          </td>
        </ng-container>

        <tr mat-row *matRowDef="let row; let i=index; columns: displayedColumns;"></tr>
      </table>

      <button mat-icon-button type="button" (click)="addEmail()" class="float-right">
        <mat-icon>add</mat-icon>
      </button>
    </form>
  `,
  styles: []
})
export class EmailsFormComponent {
  displayedColumns = ["select", "address", "category", "remove"];
  emailCategories: EmailCategory[] = Object.values(EmailCategory);
  selection = new SelectionModel(false);

  @Input() contactForm: FormGroup;

  get emailFormArrayControls$(): Observable<AbstractControl[]> {
    return this.formService.contactForm$.pipe(map(form =>
      (form.get("emails") as FormArray).controls
    ))
  };

  constructor(private formService: ContactFormService) {
  }

  addEmail() {
    this.formService.addEmail();
  }

  removeEmailInput(i: number) {
    this.formService.removeEmail(i);
  }

  emailHasRequiredError(email: AbstractControl): boolean {
    return email.hasError("required");
  }

  emailHasEmailError(email: AbstractControl): boolean {
    return email.hasError("email");
  }
}
