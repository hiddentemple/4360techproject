import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-company-form',
  template: `
    <form [formGroup]="contactForm">
      <!-- Company Input -->
      <mat-form-field class="col-sm-12 col-md-6">
        <mat-label>Company Name</mat-label>
        <input matInput maxlength="256" placeholder="Ex. Juan in a Million" formControlName="company">
      </mat-form-field>

      <!-- Job Title -->
      <mat-form-field class="col-sm-12 col-md-6">
        <mat-label>Job Title</mat-label>
        <input matInput maxlength="50" placeholder="Ex. Project Manager" formControlName="jobTitle">
      </mat-form-field>

      <!-- Department -->
      <mat-form-field class="col-sm-12 col-md-6">
        <mat-label>Department</mat-label>
        <input matInput maxlength="50" placeholder="Ex. Accounting" formControlName="department">
      </mat-form-field>


      <!-- Organization -->
      <mat-form-field class="col-sm-12 col-md-6">
        <mat-label>Organization</mat-label>
        <input matInput maxlength="50" placeholder="Ex. Tesla" formControlName="organization">
      </mat-form-field>

    </form>
  `,
  styles: []
})
export class CompanyFormComponent {
  @Input() contactForm: FormGroup;
}
