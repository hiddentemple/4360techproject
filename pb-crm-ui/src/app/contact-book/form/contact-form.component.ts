import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {ContactFormService} from "./contact-form.service";
import {FormGroup} from "@angular/forms";
import {tap} from "rxjs/operators";
import {MatAccordion} from "@angular/material/expansion";
import {ContactModel} from "@hiddentemple/api-interfaces";
import {ContactFormModel} from "./contact-form.model";

export interface ContactFormAccordionState {
  overrideToggle: boolean;
  personalInfo: boolean;
  companyInfo: boolean;
  notes: boolean;
  phones: boolean;
  emails: boolean;
  addresses: boolean;
  webpages: boolean;
  tags: boolean;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styles: [
      `
      .example-action-buttons {
        padding-bottom: 20px;
      }

      .example-headers-align .mat-expansion-panel-header-title,
      .example-headers-align .mat-expansion-panel-header-description {
        flex-basis: 0;
      }

      .example-headers-align .mat-expansion-panel-header-description {
        justify-content: space-between;
        align-items: center;
      }

      .example-headers-align .mat-form-field + .mat-form-field {
        margin-left: 8px;
      }
    `
  ]
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  openState: ContactFormAccordionState = {
    overrideToggle: false,
    personalInfo: true,
    companyInfo: false,
    notes: false,
    phones: false,
    emails: false,
    addresses: false,
    webpages: false,
    tags: false
  }

  @Input() set contact(contact: ContactModel) { this.setContact(contact); }

  @Output() submitContact = new EventEmitter<ContactModel>();

  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private formService: ContactFormService) {}

  get personalInfoExpanded(): boolean { return this.openState.personalInfo }
  get companyInfoExpanded(): boolean { return this.openState.companyInfo }
  get notesExpanded(): boolean { return this.openState.notes }
  get phonesExpanded(): boolean { return this.openState.phones }
  get emailsExpanded(): boolean { return this.openState.emails }
  get addressesExpanded(): boolean { return this.openState.addresses }
  get webpagesExpanded(): boolean { return this.openState.webpages }
  get tagsExpanded(): boolean { return this.openState.tags }

  ngOnInit(): void {
    this.formService.contactForm$
      .pipe(tap(form => console.log("New Contact Form", form)))
      .subscribe(contactForm => this.contactForm = contactForm)
  }

  onSubmit() {
    const submittableContact: ContactModel = this.formService.getSubmittableContact();
    console.group("Submit form")
    console.log("Form", this.contactForm)
    console.log("Generated contact", submittableContact)
    console.groupEnd()
    this.submitContact.emit(submittableContact);
  }

  openAll() {
    this.openState = {
      overrideToggle: true,
      personalInfo: true,
      companyInfo: true,
      notes: true,
      phones: true,
      emails: true,
      addresses: true,
      webpages: true,
      tags: true
    }
  }

  closeAll() {
    this.openState = {
      overrideToggle: false,
      personalInfo: false,
      companyInfo: false,
      notes: false,
      phones: false,
      emails: false,
      addresses: false,
      webpages: false,
      tags: false
    }
  }

  private setContact(contact: ContactModel) {
    if (contact) {
      this.formService.setContact(contact);
      this.openState = {
        overrideToggle: false,
        personalInfo: true,
        companyInfo: this.formService.anyHaveValue(ContactFormModel.companyKeys),
        notes: this.formService.hasValue('notes'),
        phones: this.formService.hasValue('phones'),
        emails: this.formService.hasValue('emails'),
        addresses: this.formService.hasValue('addresses'),
        webpages: this.formService.hasValue('webpages'),
        tags: this.formService.hasValue('tags'),
      }
    }
  }
}
