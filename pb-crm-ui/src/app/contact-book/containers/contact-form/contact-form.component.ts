import {Component, OnInit, Output, EventEmitter, Input, InjectionToken, Inject} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactModel} from '../../../api/api-interfaces/contact/models/contact.model';
import {BreakpointObserver} from "@angular/cdk/layout";
import {BreakpointService} from "../../../core/layout/breakpoint.service";
import {Observable} from "rxjs";
import {PortalInjector} from "@angular/cdk/portal";

export const PhoneRegex = /[0-9]{10}/;
export const PhoneValidator = Validators.pattern(PhoneRegex); // TODO validate length and numeric

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styles: []
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isHandset = false;

  @Input() set contact(contact: ContactModel) { this.setContact(contact); }
  @Output() submitContact = new EventEmitter<ContactModel>();

  constructor(private fb: FormBuilder, private breakpointService: BreakpointService) {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      company: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      emails: this.fb.array([]),
      phones: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.breakpointService.isHandset$().subscribe((matches: boolean) => this.isHandset = matches)
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log("Contact Form Submit: ", this.contactForm.value)
      this.submitContact.emit(this.contactForm.value as ContactModel);
    } else {
      console.error('Try to submit when form is invalid.', this.contactForm);
    }
  }

  setContact(contact: ContactModel) {
    if (!contact) { return; }

    console.log('Setting contact to', contact);

    this.contactForm.controls.firstName.setValue(contact.firstName);
    this.contactForm.controls.lastName.setValue(contact.lastName);
    this.contactForm.controls.company.setValue(contact.company);

    const emailControls: FormGroup[] = Object.values(contact.emails).map(
      email => this.initEmail(email.address, email.type)
    );
    this.contactForm.controls.emails = this.fb.array(emailControls);

    const phoneControls: FormGroup[] = Object.values(contact.phones).map(
      email => this.initPhone(String(email.number), email.type)
    );
    this.contactForm.controls.phones = this.fb.array(phoneControls);
  }

  /** Email **/

  getEmailFormArray(): FormArray { return this.contactForm.controls.emails as FormArray; }
  addEmailInput(): void { this.getEmailFormArray().push(this.initEmail()); }
  removeEmailInput(i: number): void { this.getEmailFormArray().removeAt(i);}
  hasEmails(): boolean { return this.getEmailFormArray().length > 0; }

  initEmail(address: string = '', type: string = ''): FormGroup {
    return this.fb.group({
      address: [address, [Validators.email, Validators.required]],
      type: [type]
    });
  }

  /** Phone **/

  getPhoneFormArray(): FormArray { return this.contactForm.controls.phones as FormArray; }
  addPhoneInput(): void { this.getPhoneFormArray().push(this.initPhone()); }
  removePhoneInput(i: number): void { this.getPhoneFormArray().removeAt(i); }
  hasPhones(): boolean { return this.getPhoneFormArray().length > 0; }
  initPhone(number: string = '', type: string = ''): FormGroup {
    return this.fb.group({
      number: [number, [Validators.required, PhoneValidator]],
      type: [type]
    });
  }


}
