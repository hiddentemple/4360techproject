import {Component, Input} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from "@angular/forms";
import {ContactFormService} from "../../contact-form.service";
import {EmailCategory} from "@hiddentemple/api-interfaces";

@Component({
  selector: 'app-emails-form',
  template: `
    <form [formGroup]="contactForm">
      <!-- Mobile Email Input -->
      <div formArrayName="emails">
        <div *ngFor="let email of emailFormArray.controls; let i=index">
          <!-- Angular assigns array index as group name by default 0, 1, 2, ... -->
          <div class="row" [formGroupName]="i">
            <div class="col-1">
              <button class="col-1" type="button" mat-icon-button (click)="removeEmailInput(i)">
                <mat-icon color="accent">remove_circle_outline</mat-icon>
              </button>
            </div>
            <div class="col-11">
              <div class="row">
                <!-- Address -->
                <mat-form-field class="col-sm-11 col-md-7">
                  <mat-label>Email Address</mat-label>
                  <input matInput type="text" placeholder="Ex. example@gmail.com" formControlName="address">
                  <mat-error *ngIf="emailHasRequiredError(email)">
                    Email is required
                  </mat-error>
                  <mat-error *ngIf="emailHasEmailError(email)">
                    Not a valid email
                  </mat-error>
                </mat-form-field>

                <!-- Category -->
                <mat-form-field class="col-sm-12 col-md-4">
                  <mat-label>Category</mat-label>
                  <mat-select formControlName="category" required>
                    <mat-option *ngFor="let category of emailCategories" value="{{category}}">
                      {{category}}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button mat-icon-button type="button" (click)="addEmail()" class="float-right">
        <mat-icon>add</mat-icon>
      </button>
    </form>
  `,
  styles: [
  ]
})
export class EmailsFormComponent {
  @Input() contactForm: FormGroup;

  get emailFormArray(): FormArray { return this.contactForm.get("emails") as FormArray; };
  get emailCategories() { return Object.values(EmailCategory); }

  constructor(private formService: ContactFormService) { }

  addEmail() { this.formService.addEmail(); }
  removeEmailInput(i: number) { this.formService.removeEmail(i); }

  emailHasRequiredError(email: AbstractControl): boolean { return email.hasError("required"); }
  emailHasEmailError(email: AbstractControl): boolean { return email.hasError("email"); }
}
