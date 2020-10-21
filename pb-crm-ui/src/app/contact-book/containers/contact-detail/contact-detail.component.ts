import {Component, Input} from '@angular/core';
import {ContactModel} from '@hiddentemple/api-interfaces';
import {ContactTableComponent} from '../contact-table/contact-table.component';

@Component({
  selector: 'app-contact-detail',
  providers: [ContactTableComponent],
  template: `
    <div class="container-fluid">
      <h2>{{contact.firstName}} {{contact.lastName}}</h2>
      <h3 *ngIf="_contact.company">Company: {{contact.company}}</h3>
      <app-phone-table *ngIf="this._contact?.phones.length > 0" [phones]="contact?.phones"></app-phone-table><br>
      <app-email-table *ngIf="this._contact?.emails.length > 0" [emails]="contact?.emails"></app-email-table><br>
      <button mat-icon-button
              matTooltip="Edit"
              matTooltipPosition=""
              (click)="onEdit(contact)">
        <mat-icon>edit</mat-icon>
      </button>
      <div *ngIf="this._contact?.notes != null">
        <mat-form-field class="col-12">
          <mat-label>Notes</mat-label>
          <textarea matInput [value]="contact?.notes" readonly></textarea>
        </mat-form-field>
      </div>
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
