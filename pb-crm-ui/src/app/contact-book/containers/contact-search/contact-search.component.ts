import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-contact-search',
  template: `
    <form ngForm (ngSubmit)="onSubmit()">
      <mat-form-field class="">
        <mat-label>Search</mat-label>
        <span matPrefix>
          <button type="submit">
            <mat-icon>search</mat-icon>
          </button>
        </span>
        <input type="text" matInput [formControl]="searchField">
      </mat-form-field>
    </form>
  `,
  styles: [
  ]
})
export class ContactSearchComponent implements OnInit {
  searchField = new FormControl('');

  @Output() search = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.searchField.value === '') {
      console.log('Tried to search for a contact when input was empty')
    } else {
      this.search.emit(this.searchField.value)
    }
  }
}
