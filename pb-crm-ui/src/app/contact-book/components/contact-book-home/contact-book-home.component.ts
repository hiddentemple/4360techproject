import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactModel } from '@hiddentemple/api-interfaces';
import { ContactCacheService } from '../../contact-cache.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableSize } from '../../containers/contact-table/contact-table.component';
import { Portal, TemplatePortal } from '@angular/cdk/portal';
import { DialogInterface } from '../../../core/dialog/temp-dialog.interface';
import { DialogService } from '../../../core/dialog/dialog.service';
import { ImportFileComponent } from '../../containers/import-file/import-file.component';


@Component({
  selector: 'app-contact-book-home',
  templateUrl: './contact-book-home.component.html',
  styles: [
      `.add-spacer {
      flex: 1 1 auto;
    }`,
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
    private dialogService: DialogService,
  ) {
  }

  openImportDialog(): void {
    const importDialogData: DialogInterface = {
      title: 'Import Contact File',
      showSubmitBtn: false,
      showOkBtn: true,
      showCancelBtn: true,
      component: ImportFileComponent
    };

    const dialogRef = this.dialogService.openDialog(
      importDialogData, {  });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // do something with ok/submit
      } else {
        // cancel / close dialog
        console.log('User clicked cancel');
      }
    });
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
    this.selectedContact = undefined;
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
      this.snackbar.open('Contact Created', 'Close', { duration: 1000 });
      this.setViewContact(contact);
    });
  }

  editContact(contact: ContactModel) {
    this.contactCache.updateContact(contact).subscribe(updatedContact =>
      this.setViewContact(updatedContact),
    );
  }

  deleteContact(contact: ContactModel) {
    this.contactCache.deleteContact(contact).subscribe(() => {
        this.snackbar.open('Contact Deleted', 'X', { duration: 1000 });
        if (this.selectedContact === contact) {
          this.reset();
        }
      },
    );
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
    if (!this.selectedPortal) {
      return 'undefined';
    }
    if (this.selectedPortal === this.detailPortal) {
      return 'detail';
    }
    if (this.selectedPortal === this.createPortal) {
      return 'create';
    }
    if (this.selectedPortal === this.editPortal) {
      return 'edit';
    }


    throw new Error('Invalid portalToDescription method - does not have mapping for selected portal');
  }
}
