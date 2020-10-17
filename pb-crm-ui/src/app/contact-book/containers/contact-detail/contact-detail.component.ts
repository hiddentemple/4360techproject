import {Component, Input, OnInit} from '@angular/core';
import {ContactModel} from '@hiddentemple/api-interfaces';

@Component({
  selector: 'app-contact-detail',
  template: `
    <div class="container-fluid">
      <h2>{{contact.firstName}} {{contact.lastName}}</h2>
      <h3>Company: {{contact.company}}</h3>
      <app-phone-table *ngIf="this._contact?.phones.length > 0" [phones]="contact?.phones"></app-phone-table><br>
      <app-email-table *ngIf="this._contact?.emails.length > 0" [emails]="contact?.emails"></app-email-table><br>
      <div *ngIf="this._contact?.notes == null; else notes_NotEmpty"></div>
      <ng-template #notes_NotEmpty>
        <mat-form-field class="col-12">
          <mat-label>Notes</mat-label>
          <textarea matInput [value]="contact?.notes" readonly></textarea>
        </mat-form-field>
      </ng-template>

    </div>
  `,
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {

  _contact: ContactModel;

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
}
