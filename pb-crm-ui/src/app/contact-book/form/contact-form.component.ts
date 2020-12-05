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
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  title = 'Create a New Contact';
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

  // If set, then this is added to the submitted contact
  private id: string;

  @Input() set contact(contact: ContactModel) { this.setContact(contact); }
  @Output() submitContact = new EventEmitter<ContactModel>();
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private formService: ContactFormService) {}

  get personalInfoExpanded(): boolean { return this.openState.personalInfo }
  set personalInfoExpanded(isExpanded: boolean) { this.openState.personalInfo = isExpanded }

  get companyInfoExpanded(): boolean { return this.openState.companyInfo }
  set companyInfoExpanded(isExpanded: boolean) { this.openState.companyInfo = isExpanded }

  get notesExpanded(): boolean { return this.openState.notes }
  set notesExpanded(isExpanded: boolean) { this.openState.notes = isExpanded }

  get phonesExpanded(): boolean { return this.openState.phones }
  set phonesExpanded(isExpanded: boolean) { this.openState.phones = isExpanded }

  get emailsExpanded(): boolean { return this.openState.emails }
  set emailsExpanded(isExpanded: boolean) { this.openState.emails = isExpanded }

  get addressesExpanded(): boolean { return this.openState.addresses }
  set addressesExpanded(isExpanded: boolean) { this.openState.addresses = isExpanded }

  get webpagesExpanded(): boolean { return this.openState.webpages }
  set webpagesExpanded(isExpanded: boolean) { this.openState.webpages = isExpanded }

  get tagsExpanded(): boolean { return this.openState.tags }
  set tagsExpanded(isExpanded: boolean) { this.openState.tags = isExpanded }


  ngOnInit(): void {
    this.formService.contactForm$
      .pipe(tap(form => console.log("New Contact Form", form)))
      .subscribe(contactForm => this.contactForm = contactForm)
  }

  onSubmit() {
    const submittableContact: ContactModel = this.formService.getSubmittableContact();
    if (this.id) { submittableContact['id'] = this.id; }
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
    this.id = undefined;
    if (contact) {
      this.title = 'Edit Contact';
      this.id = contact.id;
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
