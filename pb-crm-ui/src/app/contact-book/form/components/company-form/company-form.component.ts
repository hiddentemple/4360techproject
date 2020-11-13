import {Component, Input, OnInit} from '@angular/core';
import {ContactFormModel} from "../../contact-form.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-company-form',
  template: `
    <div>
      <mat-accordion>
        <mat-expansion-panel (opened)="panelOpenState = true"
                             (closed)="panelOpenState = false">
          <mat-expansion-panel-header>
            <mat-panel-title>
              Self aware panel
            </mat-panel-title>
            <mat-panel-description>
              Currently I am {{panelOpenState ? 'open' : 'closed'}}
            </mat-panel-description>
          </mat-expansion-panel-header>
          <p>I'm visible because I am open</p>
        </mat-expansion-panel>
      </mat-accordion>

      <div>
        <h1>Company</h1>
        <span>
          <mat-button *ngIf="showCompany; else removeCompany" mat-button-icon (click)="openCompany()">
            <mat-icon>add</mat-icon>
          </mat-button>
          <ng-template #removeCompany>
            <mat-button mat-icon-button (click)="closeCompany()"><mat-icon>remove</mat-icon></mat-button>
          </ng-template>
        </span>
      </div>
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
    </div>

  `,
  styles: [
  ]
})
export class CompanyFormComponent {
  showCompany = false;
  @Input() contactForm: FormGroup;
  panelOpenState: boolean;

  get companyControl(): FormControl { return this.contactForm.get("company") as FormControl;  }
  get companyHasRequiredError(): boolean { return this.companyControl.hasError("required"); }

  openCompany() {
    this.showCompany = true;
  }

  closeCompany() {
    // If company has filled in fields, confirm close and then set them to empty
    // this.companyFormService.resetCompany()
    this.showCompany = false;
  }
}
