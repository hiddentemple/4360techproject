import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ContactModel} from '@hiddentemple/api-interfaces';
import {ContactCacheService} from '../../services/contact-cache.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TableSize} from '../../containers/contact-table/contact-table.component';
import {Portal, TemplatePortal} from '@angular/cdk/portal';
import {ContactActionCallback, ContactActionsService} from "../../services/contact-actions.service";
import {BreakpointService} from "../../../core/layout/breakpoint.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ContactCardDeckComponent} from "../../containers/contact-card-deck/contact-card-deck.component";
import {DialogInterface} from '../../../core/dialog/temp-dialog.interface';
import {DialogService} from '../../../core/dialog/dialog.service';
import {ImportFileService} from '../../containers/import-file/import-file.service';
import {ImportFileComponent} from '../../containers/import-file/import-file.component';
import {ContactFormComponent} from "../../form/contact-form.component";
import {ContactFormDialogComponent} from "../../form/contact-form-dialog.component";


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
  private _showDeck = false;
  private searchSubject = new BehaviorSubject<string>("");

  contacts: ContactModel[];
  selectedContact: ContactModel;
  showLeft = true;
  showRight = false;
  searchActive = false;
  isHandset: boolean;
  tableSize: TableSize = TableSize.FULL;

  selectedPortal: Portal<any>;
  detailPortal: TemplatePortal<any>;
  createPortal: TemplatePortal<any>;
  editPortal: TemplatePortal<any>;

  @ViewChild('contactDetail') contactDetail: TemplateRef<unknown>;
  @ViewChild('createContactForm') createContactForm: TemplateRef<unknown>;
  @ViewChild('editContactForm') editContactForm: TemplateRef<unknown>;
  @ViewChild(ContactCardDeckComponent) cardDeck: ContactCardDeckComponent;

  get deckOrTableTooltip(): string { return this._showDeck ? "Toggle table" : "Toggle deck"; }
  get deckOrTableIcon(): string { return this._showDeck ? "table_view": "dashboard"; }

  get showDeck(): boolean { return this.isHandset || this.searchActive || this._showDeck; }
  set showDeck(showDeck: boolean) { this._showDeck = showDeck; }

  get filterStr$(): Observable<string> { return this.searchSubject.asObservable(); }
  get filterStr(): string { return this.searchSubject.getValue(); }
  set filterStr(filterStr: string) {
    console.log("Set filter string to: ", filterStr)
    this.searchSubject.next(filterStr);
  }

  constructor(
    private dialog: MatDialog,
    private contactCache: ContactCacheService,
    private snackbar: MatSnackBar,
    private viewContainerRef: ViewContainerRef,
    private contactActions: ContactActionsService,
    private dialogService: DialogService,
    private importFileService: ImportFileService,
    private breakpointService: BreakpointService
  ) {}

  openImportDialog(): void {
    const importDialogData: DialogInterface = {
      title: 'Import Contact File',
      showSubmitBtn: true,
      showOkBtn: false,
      showCancelBtn: true,
      component: ImportFileComponent
    };

    const dialogRef = this.dialogService.openDialog(importDialogData, {  });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        // TODO better handling of file import
        await this.importFileService.onSubmit().then(r => console.log(r));
        this.snackbar.open('Contacts Imported', 'Close', {duration: 2000});
        this.refresh();
      } else {
        // cancel / close dialog
        console.log('User clicked cancel');
      }
    });
  }

  ngOnInit() {
    this.contactCache.contacts$.subscribe(contacts => this.contacts = contacts);
    this.breakpointService.isHandset$().subscribe(isHandset => this.isHandset = isHandset);
  }

  ngAfterViewInit(): void {
    this.detailPortal = new TemplatePortal(this.contactDetail, this.viewContainerRef);
    this.createPortal = new TemplatePortal(this.createContactForm, this.viewContainerRef);
    this.editPortal = new TemplatePortal(this.editContactForm, this.viewContainerRef);
  }

  refresh() {
    this.contactCache.refresh().subscribe(() => {
      if (this.cardDeck) { this.cardDeck.renderLayout(); }
    });
  }

  openCreateContactForm() {
    this.filterStr = undefined;
    // this.selectedPortal = this.createPortal;
    this.selectedContact = undefined;
    // this.openRightPanel();
    const dialogReg = this.dialog.open(ContactFormDialogComponent, {width: 'auto'})
    dialogReg.afterClosed().subscribe(result => {
      if (result) this.contactActions.createContact(result, async c => console.log(`Created contact: ${c}`))
    })
  }

  closeRightPanelAndReset() {
    this.reset();
  }

  setViewContact(contact: ContactModel) {
    this.selectedContact = contact;
    this.selectedPortal = this.detailPortal;
    this.openRightPanel();
  }

  openEditDialog(contact: ContactModel) {
    const editDialog = this.dialog.open(ContactFormDialogComponent, {
      data: {contact}
    })

    editDialog.afterClosed().subscribe(result => {
      const callback = async () => console.log("Edit dialog returned")
      if (result) this.contactActions.updateContact(result, callback)
    })
  }

  deleteContact(contact: ContactModel) {
    const callback: () => Promise<any> = async () => {
      if (this.selectedContact === contact) {
        this.reset();
      }
    };
    return this.contactActions.deleteContact(contact, callback);
  }

  onFilterBlur() {
    if (!this.filterStr || this.filterStr === "") { this.searchActive = false; }
  }

  onSearchKeyUp() {
    if (this.filterStr) {
      this.searchActive = this.filterStr !== "";
    }
  }

  toggleDeckOrTable() { this.showDeck = !this.showDeck; }

  private openRightPanel() {
    console.log('Opening right panel with active portal: ' + this.portalToDescription());
    if (this.isHandset) {
      this.showLeft = false;
    }
    this.showRight = true;
    this.tableSize = TableSize.COMPACT;
    if (this.cardDeck) {
      this.cardDeck.fillTotalWidth = true;
      this.cardDeck.renderLayout();
    }
  }

  private reset() {
    this.showLeft = true;
    this.showRight = false;
    this.tableSize = TableSize.FULL;
    this.selectedContact = undefined;
    this.selectedPortal = undefined;
    if (this.cardDeck) {
      this.cardDeck.fillTotalWidth = false;
      this.cardDeck.renderLayout();
    }
  }

  private portalToDescription(): string {
    if (!this.selectedPortal) { return 'undefined'; }
    if (this.selectedPortal === this.detailPortal) { return 'detail'; }
    if (this.selectedPortal === this.createPortal) { return 'create'; }
    if (this.selectedPortal === this.editPortal) { return 'edit'; }

    throw new Error('Invalid portalToDescription method - does not have mapping for selected portal');
  }
}
