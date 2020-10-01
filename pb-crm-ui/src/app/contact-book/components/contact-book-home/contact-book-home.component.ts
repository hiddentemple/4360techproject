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
  template: `

    <div class="container">
      <div class="row mt-2">
        <span><h1 class="">Contact Book</h1></span>
        <span class="add-spacer"></span>
        <span>
          <button mat-icon-button
                  aria-label="Add Contact"
                  matTooltip="Add a new contact"
                  matTooltipPosition="left"
                  (click)="openContactForm()">
            <mat-icon color="primary">add_circle_outline</mat-icon>
          </button>
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
                               [size]="tableSize"
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
            <div>
              <ng-template [cdkPortalOutlet]="selectedPortal"></ng-template>
            </div>
          </as-split-area>
        </as-split>
      </div>
    </div>

    <ng-template #contactDetail>
      <app-contact-detail [contact]="selectedContact"></app-contact-detail>
    </ng-template>

    <ng-template #contactForm>
      <app-contact-form [contact]="selectedContact" (submitContact)="createContract($event)"></app-contact-form>
    </ng-template>
  `,
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
  formPortal: TemplatePortal<any>;

  @ViewChild('contactDetail') contactDetail: TemplateRef<unknown>;
  @ViewChild('contactForm') contactForm: TemplateRef<unknown>;

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
    this.formPortal = new TemplatePortal(this.contactForm, this.viewContainerRef);
  }

  refresh() {
    this.contactCache.refresh();
  }

  openContactForm() {
    this.selectedPortal = this.formPortal;
    this.openRightPanel();
  }

  openContactDetail() {
    this.selectedPortal = this.detailPortal;
    this.openRightPanel();
  }

  openRightPanel() {
    this.showDetail = true;
    this.tableSize = TableSize.COMPACT;
  }

  closeRightPanel() {
    this.showDetail = false;
    this.tableSize = TableSize.FULL;
    this.selectedContact = undefined;
    this.selectedPortal = undefined;
  }

  viewContact(id: string) {
    this.contactCache.getContact(id).subscribe(contact => {
      this.selectedContact = contact;
      this.openContactDetail();
    });
  }

  createContract(contact: ContactModel) {
    console.log('Request Contract')
    this.contactCache.addContact(contact).subscribe(id => {
      console.log("Created contact with id: ", id);
      this.snackbar.open('Contact Created', 'X', {duration: 1000});
      this.viewContact(id);
    })
  }

  deleteContact(id: string): any {
    this.contactCache.deleteContact(id).subscribe(() => {
        this.snackbar.open("Contact Deleted", "X", {duration: 1000});
        if (this.selectedContact?.id === id) {
          this.closeRightPanel();
          this.selectedContact = undefined;
        }
      }
    )
  }

  editContact(id: string) {
    console.log('Request edit contact with ID: ' + id)
  }
}
