import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ContactModel} from '@hiddentemple/api-interfaces';

@Component({
  selector: 'app-create-contact-dialog',
  template: `
    <h1 mat-dialog-title>Create a New Contact</h1>
    <div mat-dialog-content>
      <app-contact-form [contact]="data" (submitContact)="onSubmit($event)"></app-contact-form>
    </div>
    <!--    <div mat-dialog-actions>-->
    <!--      <button mat-button (click)="onNoClick()">Exit</button>-->
    <!--      <button mat-button color="primary" [mat-dialog-close]="data.animal" cdkFocusInitial>Create</button>-->
    <!--    </div>-->
  `,
  styles: [
  ]
})
export class CreateContactDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ContactModel,
    private dialogRef: MatDialogRef<CreateContactDialogComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(event: ContactModel) {
    this.dialogRef.close(event);
  }
}
