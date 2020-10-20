import {Component, OnInit} from '@angular/core';
import {CategoryModel} from "@hiddentemple/api-interfaces";
import {CategoryCacheService} from "../contact-book/services/category-cache.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";


@Component({
  selector: 'app-dev',
  template: `
    <div class="container">
      <form [formGroup]="form">
        <div formArrayName="categories">
          <div *ngFor="let category of categoriesFormArray.controls; let i=index">
            <mat-form-field class="example-full-width">
              <mat-label>Assignee</mat-label>
              <input type="text"
                     matInput
                     [formGroupName]="i"
                     [matAutocomplete]="auto"
                     (focus)="onCategoryFocus(i)"
                     (blur)="onCategoryBlur(i)">
              <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
                <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
                  {{option.description}}
                </mat-option>
              </mat-autocomplete>
            </mat-form-field>
          </div>
        </div>
      </form>
    </div>
  `
})
export class DevComponent implements OnInit {
  categories: CategoryModel[];
  form: FormGroup;
  filteredOptions: Observable<CategoryModel[]>;

  get categoriesFormArray(): FormArray { return this.form.controls.categoires as FormArray; }

  constructor(categoryCache: CategoryCacheService) {
    categoryCache.categories$.subscribe(categories => this.categories = categories)
    this.form = new FormGroup({
      categories: new FormArray([this.initCategoryForm(), this.initCategoryForm()])
    })
  }

  ngOnInit(): void {

  }

  initCategoryForm(type: string = ''): FormControl {
    return new FormControl('')
  }

  displayFn(category: CategoryModel): string { return category.description};

  onCategoryFocus(i: number) {

  }

  onCategoryBlur(i: number) {

  }
}
