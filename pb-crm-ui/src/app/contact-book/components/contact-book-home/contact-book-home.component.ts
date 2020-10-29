import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ContactModel} from '@hiddentemple/api-interfaces';
import {ContactCacheService} from '../../services/contact-cache.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TableSize} from '../../containers/contact-table/contact-table.component';
import {Portal, TemplatePortal} from '@angular/cdk/portal';
import {DeleteConfirmationComponent} from '../../containers/delete-confirmation/delete-confirmation.component';
import {ContactActionCallback, ContactActionsService} from "../../services/contact-actions.service";


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

  constructor(
    private dialog: MatDialog,
    private contactCache: ContactCacheService,
    private snackbar: MatSnackBar,
    private viewContainerRef: ViewContainerRef,
    private contactActions: ContactActionsService
  ) {}

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
    this.selectedContact = undefined;
    this.openRightPanel();
  }

  closeRightPanelAndReset() {
    this.reset();
  }

  setViewContact(contact: ContactModel) {
    // if (mobile) this.showTable = false;
    this.selectedContact = contact;
    this.selectedPortal = this.detailPortal;
    this.openRightPanel();
  }

  setEditContact(contact: ContactModel) {
    this.selectedContact = contact;
    this.selectedPortal = this.editPortal;
    this.openRightPanel();
  }

  async createContract(contact: ContactModel) {
    const callback: ContactActionCallback = async (contact) => this.setViewContact(contact);
    return this.contactActions.createContact(contact, callback);
  }

  async editContact(contact: ContactModel) {
    const callback: ContactActionCallback = async (contact) => this.setViewContact(contact);
    return this.contactActions.updateContact(contact, callback);
  }

  deleteContact(contact: ContactModel) {
    const callback: () => Promise<any> = async () => {
      if (this.selectedContact === contact) {
        this.reset();
      }
    }
    return this.contactActions.deleteContact(contact, callback);
  }

  private openRightPanel() {
    console.log('Opening right panel with active portal: ' + this.portalToDescription());
    this.showDetail = true;
    this.tableSize = TableSize.COMPACT;
  }

  private reset() {
    this.showDetail = false;
    this.tableSize = TableSize.FULL;
    this.selectedContact = undefined;
    this.selectedPortal = undefined;
  }

  private portalToDescription(): string {
    if (!this.selectedPortal) { return 'undefined'; }
    if (this.selectedPortal === this.detailPortal) { return 'detail'; }
    if (this.selectedPortal === this.createPortal) { return 'create'; }
    if (this.selectedPortal === this.editPortal) { return 'edit'; }


    throw new Error('Invalid portalToDescription method - does not have mapping for selected portal');
  }
}
