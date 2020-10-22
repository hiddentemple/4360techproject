import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ContactModel} from '@hiddentemple/api-interfaces';
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {ContactCacheService} from "../../services/contact-cache.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TableSize} from "../contact-table/contact-table.component";
import {Portal, TemplatePortal} from "@angular/cdk/portal";

@Component({
  selector: 'app-contact-detail',
  template: `
    <div class="container-fluid">
      <div class="row">
        <h2>{{contact.firstName}} {{contact.lastName}}</h2>

        <span class="add-spacer"></span>

        <button mat-icon-button
                matTooltip="Edit"
                matTooltipPosition=""
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



      <h3 *ngIf="_contact.company">Company: {{contact.company}}</h3>
      <app-phone-table *ngIf="this._contact?.phones.length > 0" [phones]="contact?.phones"></app-phone-table><br>
      <app-email-table *ngIf="this._contact?.emails.length > 0" [emails]="contact?.emails"></app-email-table><br>

      <div *ngIf="this._contact?.notes != null">
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
  _contact: ContactModel;

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
