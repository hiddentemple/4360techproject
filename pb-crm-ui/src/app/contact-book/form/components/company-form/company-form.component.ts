import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-company-form',
  template: `
    <form [formGroup]="contactForm">
      <!-- Company Input -->
      <div class="row">
        <mat-form-field class="col-12">
          <mat-label>Company Name</mat-label>
          <input matInput maxlength="256" placeholder="Ex. Juan in a Million" formControlName="company">
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
  @Input() contactForm: FormGroup;
}
