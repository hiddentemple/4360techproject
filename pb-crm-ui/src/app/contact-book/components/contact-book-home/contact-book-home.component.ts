import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateContactDialogComponent} from '../../containers/create-contact-dialog/create-contact-dialog.component';
import {ContactModel} from '../../../api/api-interfaces/contact/models/contact.model';
import {ContactCacheService} from "../../contact-cache.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TableSize} from "../../containers/contact-table/contact-table.component";
import {ComponentPortal, ComponentType, Portal, TemplatePortal} from "@angular/cdk/portal";
import {ContactDetailComponent} from "../../containers/contact-detail/contact-detail.component";
import {ContactFormComponent} from "../../containers/contact-form/contact-form.component";


@Component({
  selector: 'app-contact-book-home',
  templateUrl: './contact-book-home.component.html',
  styles: [
    `.add-spacer {
      flex: 1 1 auto;
    }`
  ],
})
export class ContactBookHomeComponent implements OnInit, AfterViewInit {
  contacts: ContactModel[];
  selectedContact: ContactModel;
  showTable: boolean = true;
  showDetail: boolean = false;
  tableSize: TableSize = TableSize.FULL;

  selectedPortal: Portal<any>;
  detailPortal: TemplatePortal<any>;
  createPortal: TemplatePortal<any>;
  editPortal: TemplatePortal<any>;

  @ViewChild('contactDetail') contactDetail: TemplateRef<unknown>;
  @ViewChild('createContactForm') createContactForm: TemplateRef<unknown>;
  @ViewChild('editContactForm') editContactForm: TemplateRef<unknown>;

  constructor(
    private dialog: MatDialog,
    private contactCache: ContactCacheService,
    private snackbar: MatSnackBar,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    this.contactCache.contacts$.subscribe(contacts => this.contacts = contacts);
  }

  ngAfterViewInit(): void {
    this.detailPortal = new TemplatePortal(this.contactDetail, this.viewContainerRef);
    this.createPortal = new TemplatePortal(this.createContactForm, this.viewContainerRef);
    this.editPortal = new TemplatePortal(this.editContactForm, this.viewContainerRef);
  }

  refresh() {
    this.contactCache.refresh();
  }

  openCreateContactForm() {
    this.selectedPortal = this.createPortal;
    this.openRightPanel();
  }

  closeRightPanelAndReset() {
    this.reset();
  }

  setViewContact(contact: ContactModel) {
    this.selectedContact = contact;
    this.selectedPortal = this.detailPortal;
    this.openRightPanel();
  }

  setEditContact(contact: ContactModel) {
    this.selectedContact = contact;
    this.selectedPortal = this.editPortal;
    this.openRightPanel();
  }

  createContract(contact: ContactModel) {
    this.contactCache.addContact(contact).subscribe(contact => {
      this.snackbar.open('Contact Created', 'Close', {duration: 1000});
      this.setViewContact(contact)
    })
  }

  editContact(contact: ContactModel) {
    this.contactCache.updateContact(contact).subscribe(updatedContact =>
      this.setViewContact(updatedContact)
    )
  }

  deleteContact(contact: ContactModel) {
    this.contactCache.deleteContact(contact.id).subscribe(() => {
        this.snackbar.open("Contact Deleted", "X", {duration: 1000});
        if (this.selectedContact === contact) {
          this.reset();
        }
      }
    )
  }

  private openRightPanel() {
    this.showDetail = true;
    this.tableSize = TableSize.COMPACT;
  }

  private reset() {
    this.showDetail = false;
    this.tableSize = TableSize.FULL;
    this.selectedContact = undefined;
    this.selectedPortal = undefined;
  }
}
