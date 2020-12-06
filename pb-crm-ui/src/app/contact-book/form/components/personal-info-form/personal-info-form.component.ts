import {Component, Input} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-personal-info',
  template: `
    <form [formGroup]="contactForm">
      <div class="row">
        <!-- First -->
        <mat-form-field class="col-sm-12 col-md-6">
          <!-- Input -->
          <mat-label>First Name</mat-label>
          <input matInput placeholder="Ex. Alan" formControlName="firstName">

          <!-- Errors -->
          <mat-error *ngIf="firstNameHasRequiredError">
            First name is required
          </mat-error>
          <mat-error *ngIf="firstNameHasMaxLengthError">
            First name is too long length
          </mat-error>
        </mat-form-field>

        <!-- Last -->
        <mat-form-field class="col-sm-12 col-md-6">
          <!-- Input -->
          <mat-label>Last Name</mat-label>
          <input matInput placeholder="Ex. Turing" formControlName="lastName">

          <!-- Errors -->
          <mat-error *ngIf="lastNameHasRequiredError">
            Last name is required
          </mat-error>
          <mat-error *ngIf="lastNameHasMaxLengthError">
            Last name is too long length
          </mat-error>
        </mat-form-field>
      </div>

      <div class="row">
        <!-- Gender -->
        <mat-form-field class="col-sm-12 col-md-6">
          <mat-label>Gender</mat-label>
          <input matInput maxlength="255" formControlName="gender">
        </mat-form-field>

        <!-- Nick Name -->
        <mat-form-field class="col-sm-12 col-md-6">
          <mat-label>Nick Name</mat-label>
          <input matInput maxlength="255" placeholder="Ex. Bobby" formControlName="nickName">
        </mat-form-field>
      </div>

      <div class="row">
        <!-- Birthday -->
        <mat-form-field class="col-sm-12 col-md-6">
          <mat-label>Birthday</mat-label>
          <input matInput [matDatepicker]="birthday" formControlName="birthday">
          <mat-datepicker-toggle matSuffix [for]="birthday"></mat-datepicker-toggle>
          <mat-datepicker #birthday></mat-datepicker>
        </mat-form-field>

        <!-- Anniversary -->
        <mat-form-field class="col-sm-12 col-md-6">
          <mat-label>Anniversary</mat-label>
          <input matInput [matDatepicker]="anniversary" formControlName="anniversary">
          <mat-datepicker-toggle matSuffix [for]="anniversary"></mat-datepicker-toggle>
          <mat-datepicker #anniversary></mat-datepicker>
        </mat-form-field>
      </div>
    </form>
  `,
  styles: []
})
export class PersonalInfoFormComponent {
  @Input() contactForm: FormGroup;

  get firstNameControl(): AbstractControl {
    return this.contactForm.get("firstName");
  }

  get lastNameControl(): AbstractControl {
    return this.contactForm.get("lastName");
  }

  get firstNameHasRequiredError(): boolean {
    return this.firstNameControl.hasError('required');
  }

  get firstNameHasMaxLengthError(): boolean {
    return !this.firstNameHasRequiredError && this.firstNameControl.hasError('maxLength');
  }

  get lastNameHasRequiredError(): boolean {
    return this.lastNameControl.hasError('required');
  }

  get lastNameHasMaxLengthError(): boolean {
    return !this.lastNameHasRequiredError && this.lastNameControl.hasError('maxLength');
  }
}
