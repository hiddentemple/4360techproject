import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../contact.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateContactDialogComponent } from '../../containers/create-contact-dialog/create-contact-dialog.component';
import { ContactModel } from '../../../api/api-interfaces/contact/models/contact.model';
import { FindAllContactResponse } from '../../../api/api-interfaces/contact/contracts/find-all.contact';


@Component({
  selector: 'app-contact-book-home',
  template: `
    <div class="container">
      <div class="row mt-2">
        <span><h1 class="">Contact Book</h1></span>
        <span class="add-spacer"></span>
        <span><app-create-contact-button (add)="addContact()"></app-create-contact-button></span>
      </div>

      <hr class="mt-0" />

      <app-contact-table [contacts]="contacts" (delete)="deleteContact($event.id)"></app-contact-table>
    </div>
  `,
  styles: [
      `
      .add-contact {
        margin: auto;
      }
    `,
      `
      .add-spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class ContactBookHomeComponent implements OnInit {
  contacts: FindAllContactResponse;

  constructor(
    private contactService: ContactService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
  }

  addContact() {
    const dialogRef = this.dialog.open(CreateContactDialogComponent);
    dialogRef.afterClosed().subscribe((newContact: ContactModel) => {
      console.log('Create contact dialog closed. Data:', newContact);
      if (newContact) {
        this.contactService.createContact(newContact)
          .subscribe( contact => {
            this.ngOnInit();
          });
      }
    });
  }

  deleteContact(id: string): any {
    console.log('Deleting Contact with ID: ' + id);
    this.contactService.deleteContact(id).subscribe( res => {
      this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
    });
  }
}
