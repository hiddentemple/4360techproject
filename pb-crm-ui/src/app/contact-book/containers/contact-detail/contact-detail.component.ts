import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContactModel} from '@hiddentemple/api-interfaces';

@Component({
  selector: 'app-contact-detail',
  template: `
    <div class="container-fluid">
      <div class="row">
        <h2>{{contact.firstName}} {{contact.lastName}}</h2>

        <span class="add-spacer"></span>

        <button mat-icon-button
                matTooltip="Edit"
                matTooltipPosition="right"
                (click)="onEdit(contact)">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button
                matTooltip="Delete"
                matTooltipPosition="left"
                (click)="onDelete(contact)">
          <mat-icon>delete</mat-icon>
        </button>
      </div>

      <h3 *ngIf="contact.company"><b>Company: </b>{{contact.company}}</h3>

      <h3 *ngIf="contact.jobTitle"><b>Job Title: </b>{{contact.jobTitle}}</h3>

      <h3 *ngIf="contact.department"><b>Department: </b>{{contact.department}}</h3>

      <h3 *ngIf="contact.organization"><b>Organization: </b>{{contact.organization}}</h3>

      <h3 *ngIf="contact.webpages"><b>Website: </b>{{contact.webpages}}</h3>

      <h3 *ngIf="contact.gender"><b>Gender: </b>{{contact.gender}}</h3>

      <app-phone-table *ngIf="contact?.phones.length > 0" [phones]="contact?.phones"></app-phone-table><br>
      <app-email-table *ngIf="contact?.emails.length > 0" [emails]="contact?.emails"></app-email-table><br>


      <div *ngIf="contact?.notes != null">

        <mat-form-field class="col-12">
          <mat-label>Notes</mat-label>
          <textarea matInput [value]="contact?.notes" readonly></textarea>
        </mat-form-field>
      </div>
    </div>
  `,
  styles: [
    `.add-spacer {
      flex: 1 1 auto;
    }`
  ]
})
export class ContactDetailComponent {
  private _contact: ContactModel;

  @Output() delete = new EventEmitter<ContactModel>();
  @Output() edit = new EventEmitter<ContactModel>();

  @Input() set contact(contact: ContactModel) {
    if (!contact) {
      console.log('Contact detail received falsy value, returning');
      return;
    }

    console.log('Contact detail received a value', contact);
    this._contact = contact;
  }

  get contact(): ContactModel {
    return this._contact;
  }

  onEdit(contact: ContactModel) { this.edit.emit(contact); }
  onDelete(contact: ContactModel) { this.delete.emit(contact); }
}
