import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-name-form',
  template: `
    <form [formGroup]="contactForm">
      <div class="row">
        <!-- First -->
        <mat-form-field class="col-sm-12 col-md-6">
          <!-- Input -->
          <mat-label>First Name</mat-label>
          <input matInput placeholder="Ex. John" formControlName="firstName" (blur)="trimFirstName()">

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
          <input matInput placeholder="Ex. John" formControlName="lastName" (blur)="trimLastName()">

          <!-- Errors -->
          <mat-error *ngIf="lastNameHasRequiredError">
            Last name is required
          </mat-error>
          <mat-error *ngIf="lastNameHasMaxLengthError">
            Last name is too long length
          </mat-error>
        </mat-form-field>
      </div>
    </form>
  `,
  styles: []
})
export class NameFormComponent {
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

  trimFirstName() {
    const firstName: string = this.firstNameControl.value;
    this.firstNameControl.setValue(firstName.trim());
  }

  trimLastName() {
    const lastName: string = this.lastNameControl.value;
    this.lastNameControl.setValue(lastName.trim());
  }
}
