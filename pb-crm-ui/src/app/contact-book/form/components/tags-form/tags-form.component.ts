import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from "@angular/material/chips";
import {ContactFormService} from "../../contact-form.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AbstractControl, FormArray} from "@angular/forms";


@Component({
  selector: 'app-tags-form',
  template: `
    <mat-form-field class="col-12">
      <mat-chip-list #chipList aria-label="Add Tags">
        <mat-chip *ngFor="let tag of tags$ | async"
                  [selectable]="selectable"
                  [removable]="removable"
                  (removed)="remove(tag)">
          {{tag}}
          <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
        </mat-chip>
        <input placeholder="New tag..."
               [matChipInputFor]="chipList"
               [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
               [matChipInputAddOnBlur]="addOnBlur"
               (matChipInputTokenEnd)="add($event)">
      </mat-chip-list>
    </mat-form-field>
  `,
})
export class TagsFormComponent {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = true;

  get tags$(): Observable<string[]> {
    return this.formService.contactForm$.pipe(map(form => {
      const tags: FormArray = form.get("tags") as FormArray;
      if (tags){
        return Object.values(tags.controls).map(control => control.value)
      } else {
        return []
      }
    }))
  }

  constructor(private formService: ContactFormService) { }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.formService.addTag(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string) {
    this.formService.removeTag(tag)
  }
}
