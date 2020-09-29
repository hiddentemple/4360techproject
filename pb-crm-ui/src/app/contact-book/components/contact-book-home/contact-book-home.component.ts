import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../contact.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateContactDialogComponent} from '../../containers/create-contact-dialog/create-contact-dialog.component';
import {ContactModel} from '../../../api/api-interfaces/contact/models/contact.model';
import {FindAllContactResponse} from '../../../api/api-interfaces/contact/contracts/find-all.contact';
import {ContactCacheService} from "../../contact-cache.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-contact-book-home',
  template: `

    <div class="container">
      <div class="row mt-2">
        <span><h1 class="">Contact Book</h1></span>
        <span class="add-spacer"></span>
        <span>
          <app-create-contact-button (add)="addContact()"></app-create-contact-button>
          <button mat-icon-button
                  matTooltip="Refresh"
                  matTooltipPosition="left"
                  (click)="refresh()">
            <mat-icon color="primary">refresh</mat-icon>
          </button>
        </span>

      </div>

      <hr class="mt-0"/>
      <div>
        <as-split>
          <as-split-area *ngIf="showTable" [order]="0">
            <app-contact-table [contacts]="contacts"
                               (delete)="deleteContact($event)"
                               (edit)="editContact($event)"
                               (view)="viewContact($event)">
            </app-contact-table>
          </as-split-area>
          <as-split-area *ngIf="showDetail" [order]="1">
            <button mat-icon-button
                    matTooltip="Close Detail"
                    matTooltipPosition="left"
                    (click)="closeRightPanel()">
              <mat-icon>close</mat-icon>
            </button>
            <app-contact-detail [contact]="selectedContact"></app-contact-detail>
          </as-split-area>

        </as-split>
      </div>

    </div>
  `,
  styles: [
      `.add-spacer {
      flex: 1 1 auto;
    }`,
      `.split-view {
      height: auto;
    }`
  ],
})
export class ContactBookHomeComponent implements OnInit {
  contacts: ContactModel[];
  selectedContact: ContactModel;
  showTable: boolean = true;
  showDetail: boolean = false;

  constructor(
    private dialog: MatDialog,
    private contactCache: ContactCacheService,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.contactCache.contacts$.subscribe(contacts => this.contacts = contacts);
  }

  addContact() {
    const dialogRef = this.dialog.open(CreateContactDialogComponent);

    dialogRef.afterClosed().subscribe((newContact: ContactModel) => {
      console.log('Create contact dialog closed. Data:', newContact);
      if (newContact) {
        this.contactCache.addContact(newContact).subscribe(
          (wasAdded: boolean) => this.snackbar.open("Contact added", "X", {
            duration: 1000
          })
        );
      }
    });
  }

  deleteContact(id: string): any {
    console.log('Deleting Contact with ID: ' + id);
    this.contactCache.deleteContact(id).subscribe(
      (wasDeleted: boolean) => this.snackbar.open("Contact Deleted", "X", {
        duration: 1000
      })
    )
  }

  editContact(id: string) {
    console.log('Request edit contact with ID: ' + id)
  }

  viewContact(id: string) {
    console.log('Request view contact with ID: ' + id)

    this.contactCache.getContact(id).subscribe(contact => this.selectedContact = contact);
    this.openRightPanel();
  }

  refresh() {
    this.contactCache.refresh();
  }

  private openRightPanel() {
    this.showDetail = true;
  }

  private closeRightPanel() {
    this.showDetail = false;
  }
}
