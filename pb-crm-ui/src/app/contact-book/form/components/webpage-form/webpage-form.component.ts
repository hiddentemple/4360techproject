import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, Form, FormArray, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {ContactFormService} from "../../contact-form.service";
import {map} from "rxjs/operators";
import {WebpageCategory} from "@hiddentemple/api-interfaces";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationComponent} from "../../../containers/delete-confirmation/delete-confirmation.component";

@Component({
  selector: 'app-webpage-form',
  template: `
    <form [formGroup]="contactForm">
      <div formArrayName="webpages">
        <div class="row p-1" *ngFor="let phone of webpageFormArrayControls$ | async; let i=index">
          <div [formGroupName]="i">

            <!-- URL Column -->
            <mat-form-field class="col-12-sm col-md-6">
              <mat-label>URL</mat-label>
              <input matInput required type="url" placeholder="Ex. www.google.com" formControlName="url">
            </mat-form-field>

            <!-- Category Number Column -->
            <mat-form-field class="col-sm-12 col-md-5">
              <mat-label>Category</mat-label>
              <mat-select formControlName="category" required>
                <mat-option *ngFor="let category of websiteCategories" value="{{category}}">
                  {{category}}
                </mat-option>
              </mat-select>
            </mat-form-field>


            <!-- Remove Phone Column -->
            <button mat-icon-button
                    type="button"
                    (click)="removeWebpage(i)"
                    class="col-1 float-right"
                    matTooltip="Remove phone">
              <mat-icon color="accent">remove_circle_outline</mat-icon>
            </button>

            <!-- After singular webpage -->
            <hr>
          </div>
        </div>
        <!-- After all webpages -->
      </div>

      <div class="row">
        <button mat-icon-button type="button" (click)="addWebpage()" class="float-right">
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class WebpageFormComponent {
  @Input() contactForm: FormGroup;
  websiteCategories: WebpageCategory[] = Object.values(WebpageCategory);
  displayedColumns = ["url", "category", "remove"];

  get webpageFormArrayControls$(): Observable<AbstractControl[]> {
    return this.formService.contactForm$.pipe(map(form =>
      (form.get("webpages") as FormArray).controls
    ))
  }

  constructor(private formService: ContactFormService, private dialog: MatDialog) { }

  addWebpage() {
    this.formService.addWebpage();
  }

  removeWebpage(i: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formService.removeWebpage(i)
      }
    });
  }
}
