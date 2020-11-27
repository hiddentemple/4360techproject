import {Component, Input} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from "@angular/forms";
import {ContactFormService} from "../../contact-form.service";
import {EmailCategory} from "@hiddentemple/api-interfaces";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SelectionModel} from "@angular/cdk/collections";
import {DeleteConfirmationComponent} from "../../../containers/delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-emails-form',
  template: `
    <form [formGroup]="contactForm" class="full-width">
      <div formArrayName="emails">
        <div class="row p-1" *ngFor="let email of emailFormArrayControls$ | async; let i=index">
          <div [formGroupName]="i">
            <!-- Checkbox Column -->
            <mat-checkbox (click)="$event.stopPropagation()"
                          (change)="$event ? selection.toggle(email) : null"
                          [checked]="selection.isSelected(email)"
                          formControlName="isPrimary"
                          matTooltip="Check to display in table"
                          class="col-1">
            </mat-checkbox>

            <!-- Phone Number Column -->
            <mat-form-field class="col-sm-12 col-md-5">
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

            <!-- Category Column -->
            <mat-form-field class="col-sm-12 col-md-5">
              <mat-label>Category</mat-label>
              <mat-select formControlName="category" required>
                <mat-option *ngFor="let category of emailCategories" value="{{category}}">
                  {{category}}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Remove Email Column -->
            <button mat-icon-button
                    type="button"
                    (click)="removeEmailInput(i)"
                    class="col-1 float-right"
                    matTooltip="Remove emil">
              <mat-icon color="accent">remove_circle_outline</mat-icon>
            </button>

            <!-- After singular Email -->
            <hr>
          </div>
        </div>
        <!-- After all emails -->
      </div>

      <div class="row">
        <button mat-icon-button type="button" (click)="addEmail()" class="float-right">
          <mat-icon>add</mat-icon>
        </button>
      </div>
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

  constructor(private formService: ContactFormService, private dialog: MatDialog) {
  }

  addEmail() {
    this.formService.addEmail();
  }

  removeEmailInput(i: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formService.removeEmail(i);
      }
    });
  }

  emailHasRequiredError(email: AbstractControl): boolean {
    return email.hasError("required");
  }

  emailHasEmailError(email: AbstractControl): boolean {
    return email.hasError("email");
  }
}
