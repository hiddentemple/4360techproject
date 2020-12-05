import {Component, Inject, OnInit} from '@angular/core';
import {ContactModel} from "@hiddentemple/api-interfaces";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface ContactFormDialogData { contact?: ContactModel }

@Component({
  selector: 'app-contact-form-dialog',
  template: `
    <div>
        <app-contact-form [contact]="data?.contact" (submitContact)="onSubmit($event)"></app-contact-form>
    </div>
  `,
  styles: [
  ]
})
export class ContactFormDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ContactFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactFormDialogData
  ) {
  }

  onSubmit(contact: ContactModel) {
    this.dialogRef.close(contact)
  }
}
