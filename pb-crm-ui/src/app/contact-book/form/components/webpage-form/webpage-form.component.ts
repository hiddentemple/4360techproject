import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, Form, FormArray, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {ContactFormService} from "../../contact-form.service";
import {map} from "rxjs/operators";
import {WebpageCategory} from "@hiddentemple/api-interfaces";

@Component({
  selector: 'app-webpage-form',
  template: `
    <form [formGroup]="contactForm">
      <table mat-table formArrayName="webpages" [dataSource]="webpageFormArrayControls$">
        <!-- URL Column -->
        <ng-container matColumnDef="url" >
          <td mat-cell *matCellDef="let webpage; let i=index" class="col-6 p-1">
            <mat-form-field [formGroupName]="i">
              <mat-label>URL</mat-label>
              <input matInput required type="url" placeholder="Ex. www.google.com" formControlName="url">
            </mat-form-field>
          </td>
        </ng-container>

        <!-- Category Column -->
        <ng-container matColumnDef="category">
          <td mat-cell *matCellDef="let webpage; let i=index" class="col-5 p-1">
            <mat-form-field [formGroupName]="i">
              <mat-label>Category</mat-label>
              <mat-select formControlName="category" required>
                <mat-option *ngFor="let category of websiteCategories" value="{{category}}">
                  {{category}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </td>
        </ng-container>

        <!-- Remove Webpage Column -->
        <ng-container matColumnDef="remove">
          <td mat-cell *matCellDef="let webpage; let i=index" class="col-1 p-1">
            <div>
              <button mat-icon-button type="button" (click)="removeWebpage(i)">
                <mat-icon color="accent">remove_circle_outline</mat-icon>
              </button>
            </div>
          </td>
        </ng-container>

        <tr mat-row *matRowDef="let row; let i=index; columns: displayedColumns;"></tr>
      </table>

      <button mat-icon-button type="button" (click)="addWebpage()" class="float-right">
        <mat-icon>add</mat-icon>
      </button>
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

  constructor(private formService: ContactFormService) { }

  addWebpage() {
    this.formService.addWebpage();
  }

  removeWebpage(i: number) {
    this.formService.removeWebpage(i)
  }
}
