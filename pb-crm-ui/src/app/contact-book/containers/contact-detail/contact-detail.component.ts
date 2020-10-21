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
      <button mat-icon-button
              matTooltip="Delete"
              matTooltipPosition="left"
              (click)="onDelete(contact)">
        <mat-icon>delete</mat-icon>
      </button>
      <div *ngIf="this._contact?.notes != null">
        <mat-form-field class="col-12">
          <mat-label>Notes</mat-label>
          <textarea matInput [value]="contact?.notes" readonly></textarea>
        </mat-form-field>
      </div>
    </div>
    <ng-template #contactDetail>
      <app-contact-detail [contact]="selectedContact"
                          (delete)="deleteContact($event)"
                          (edit)="setEditContact($event)" >
      </app-contact-detail>
    </ng-template>
  `,
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {
  contacts: ContactModel[];
  selectedContact: ContactModel;
  showTable = true;
  showDetail = false;
  tableSize: TableSize = TableSize.FULL;

  selectedPortal: Portal<any>;
  detailPortal: TemplatePortal<any>;
  createPortal: TemplatePortal<any>;
  editPortal: TemplatePortal<any>;

  @ViewChild('contactDetail') contactDetail: TemplateRef<unknown>;
  @ViewChild('createContactForm') createContactForm: TemplateRef<unknown>;
  @ViewChild('editContactForm') editContactForm: TemplateRef<unknown>;

  @Output() delete = new EventEmitter<ContactModel>();
  @Output() edit = new EventEmitter<ContactModel>();
  @Output() view = new EventEmitter<ContactModel>();

  @Input() size: TableSize;

  constructor(
    private dialog: MatDialog,
    private contactCache: ContactCacheService,
    private snackbar: MatSnackBar,
    //private viewContainerRef: ViewContainerRef
  ) {
  }
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

  onEdit(contact: ContactModel) { this.edit.emit(contact); }
  onDelete(contact: ContactModel) { this.delete.emit(contact); }

  setEditContact(contact: ContactModel) {
    this.selectedContact = contact;
    this.selectedPortal = this.editPortal;
    //this.openRightPanel();
  }

  setViewContact(contact: ContactModel) {
    this.selectedContact = contact;
    this.selectedPortal = this.detailPortal;
    //this.openRightPanel();
  }

  async editContact(contact: ContactModel) {
    await this.contactCache.updateContact(contact).then(updatedContact =>
      this.setViewContact(updatedContact)
    );
  }
  deleteContact(contact: ContactModel) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactCache.deleteContact(contact).subscribe(() => {
          this.snackbar.open('Contact Deleted', 'Close', {duration: 1000});
          if (this.selectedContact === contact) {
            this.reset();
          }
        });
      }
    });
  }
  private reset() {
    this.showDetail = false;
    this.tableSize = TableSize.FULL;
    this.selectedContact = undefined;
    this.selectedPortal = undefined;
  }
}
