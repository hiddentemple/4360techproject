import {Component, OnInit, ViewChild} from '@angular/core';
import {ContactFormService} from "./contact-form.service";
import {FormGroup} from "@angular/forms";
import {tap} from "rxjs/operators";
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector: 'app-contact-form',
  template: `
    <div class="example-action-buttons">
      <button mat-button (click)="accordion.openAll()">Expand All</button>
      <button mat-button (click)="accordion.closeAll()">Collapse All</button>
    </div>
    <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
      <mat-accordion class="example-headers-align" multi>

        <!-- Personal Info -->
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>
              Personal data
            </mat-panel-title>
            <mat-panel-description>
              <mat-icon>account_circle</mat-icon>
            </mat-panel-description>
          </mat-expansion-panel-header>
          <app-name-form [contactForm]="contactForm"></app-name-form>
        </mat-expansion-panel>

        <!-- Company -->
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>
              Company
            </mat-panel-title>
            <mat-panel-description>
              <mat-icon>business</mat-icon>
            </mat-panel-description>
          </mat-expansion-panel-header>
          <app-company-form [contactForm]="contactForm"></app-company-form>
        </mat-expansion-panel>
      </mat-accordion>

      <button mat-raised-button color="primary" [disabled]="!contactForm.valid" type="submit" class="float-right">
        Submit
      </button>
    </form>
  `,
  styles: [
      `
      .example-action-buttons {
        padding-bottom: 20px;
      }

      .example-headers-align .mat-expansion-panel-header-title,
      .example-headers-align .mat-expansion-panel-header-description {
        flex-basis: 0;
      }

      .example-headers-align .mat-expansion-panel-header-description {
        justify-content: space-between;
        align-items: center;
      }

      .example-headers-align .mat-form-field + .mat-form-field {
        margin-left: 8px;
      }
    `
  ]
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private formService: ContactFormService) {
  }

  ngOnInit(): void {
    this.formService.contactForm$
      .pipe(tap(form => console.log("New Contact Form", form)))
      .subscribe(contactForm => this.contactForm = contactForm)
  }

  onSubmit() {
    console.log("Submit form", this.contactForm)
  }
}
