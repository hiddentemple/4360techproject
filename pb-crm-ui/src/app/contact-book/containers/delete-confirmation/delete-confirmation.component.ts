import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  template: `
    <div mat-dialog-content>Are you sure you wish to delete this?</div>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">No</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Yes</button>
    </mat-dialog-actions>
  `,
  styles: [
  ]
})
export class DeleteConfirmationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
