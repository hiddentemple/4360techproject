import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-notes-form',
  template: `
    <form [formGroup]="contactForm">
      <div class="row">
        <mat-form-field class="col-12">
          <mat-label>Notes</mat-label>
          <textarea matInput placeholder="Ex. This is a note..." formControlName="notes"></textarea>
        </mat-form-field>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class NotesFormComponent {
  @Input() contactForm: FormGroup;
}
