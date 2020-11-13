import {Component, Input, OnInit} from '@angular/core';
import {ContactFormModel} from "../../contact-form.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-company-form',
  template: `
    <form *ngIf="showCompany" [formGroup]="contactForm">
      <!-- Company Input -->
      <div class="row">
        <mat-form-field class="col-12">
          <mat-label>Company Name</mat-label>
          <input matInput maxlength="256" placeholder="Ex. Juan in a Million" formControlName="company">

          <mat-error *ngIf="companyHasRequiredError">
            Company Name is required
          </mat-error>
        </mat-form-field>
      </div>

      <!-- Job Title -->
      <div class="row">
        <mat-form-field class="col-12">
          <mat-label>Job Title</mat-label>
          <input matInput maxlength="50" placeholder="Ex. Project Manager" formControlName="jobTitle">
        </mat-form-field>
      </div>

      <!-- Department -->
      <div class="row">
        <mat-form-field class="col-12">
          <mat-label>Department</mat-label>
          <input matInput maxlength="50" placeholder="Ex. Accounting" formControlName="department">
        </mat-form-field>
      </div>

      <!-- Organization -->
      <div class="row">
        <mat-form-field class="col-12">
          <mat-label>Organization</mat-label>
          <input matInput maxlength="50" placeholder="Ex. Tesla" formControlName="organization">
        </mat-form-field>
      </div>
    </form>
  `,
  styles: []
})
export class CompanyFormComponent {
  showCompany = false;
  @Input() contactForm: FormGroup;
  panelOpenState: boolean;

  get companyControl(): FormControl {
    return this.contactForm.get("company") as FormControl;
  }

  get companyHasRequiredError(): boolean {
    return this.companyControl.hasError("required");
  }

  openCompany() {
    this.showCompany = true;
  }

  closeCompany() {
    // If company has filled in fields, confirm close and then set them to empty
    // this.companyFormService.resetCompany()
    this.showCompany = false;
  }
}
