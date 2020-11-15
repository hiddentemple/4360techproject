import {Component, Input, OnInit} from '@angular/core';
import {Form, FormArray, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-webpage-form',
  template: `
    <form>
      <!-- Website Input -->
      <div formArrayName="webpages">
        <div *ngFor="let webpage of webpagesFormArray.controls; let i=index">
          <!-- Angular assigns array index as group name by default 0, 1, 2, ... -->
          <div class="row" [formGroupName]="i">
            <div class="col-1">
              <button class="col-1" mat-icon-button type="button" (click)="removeWebpage(i)">
                <mat-icon color="accent">remove_circle_outline</mat-icon>
              </button>
            </div>
            <div class="col-11">
              <div class="row">
                <mat-form-field class="col-8">
                  <mat-label>URL</mat-label>
                  <input matInput type="text" placeholder="Ex. www.google.com" formControlName="url">

                  <mat-error *ngIf="phoneHasRequiredError(phone)">
                    A phone is required
                  </mat-error>
                  <mat-error *ngIf="phoneHasPatternError(phone)">
                    Not a valid phone number
                  </mat-error>
                </mat-form-field>

                <mat-form-field class="col-sm-12 col-md-4">
                  <mat-label>Type</mat-label>
                  <mat-select formControlName="type" required>
                    <mat-option *ngFor="let category of websiteCategories" value="{{category}}">
                      {{category}}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class WebpageFormComponent implements OnInit {
  @Input() contactForm: FormGroup;

  get webpagesFormArray(): FormArray { return this.contactForm.get("webpages") as FormArray; }

  constructor() { }

  ngOnInit(): void {
  }

  removeWebpage(i: number) {

  }
}
