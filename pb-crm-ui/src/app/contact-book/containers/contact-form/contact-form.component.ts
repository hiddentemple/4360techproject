import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactModel} from '../../../api/api-interfaces/contact/models/contact.model';

export const PhoneRegex = /[0-9]{10}/;
export const PhoneValidator = Validators.pattern(PhoneRegex); // TODO validate length and numeric

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styles: []
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  @Input() set contact(contact: ContactModel) {
    if (!contact) { return; }

    console.log('Setting contact to', contact);

    this.contactForm.controls.firstName.setValue(contact.firstName);
    this.contactForm.controls.lastName.setValue(contact.lastName);
    this.contactForm.controls.companyName.setValue(contact.company);

    const emailControls: FormGroup[] = Object.values(contact.emails).map(
      email => this.initEmail(email.address, email.type)
    );
    this.contactForm.controls.emails = this.fb.array(emailControls);

    const phoneControls: FormGroup[] = Object.values(contact.phones).map(
      email => this.initPhone(String(email.number), email.type)
    );
    this.contactForm.controls.phones = this.fb.array(phoneControls);

  }

  @Output() submitContact = new EventEmitter<ContactModel>();

  constructor(private fb: FormBuilder) {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      companyName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      emails: this.fb.array([]),
      phones: this.fb.array([]),
    });
  }

  ngOnInit(): void {
  }

  getEmailFormArray(): FormArray {
    return this.contactForm.controls.emails as FormArray;
  }

  getPhoneFormArray(): FormArray {
    return this.contactForm.controls.phones as FormArray;
  }

  initEmail(address: string = '', type: string = ''): FormGroup {
    return this.fb.group({
      address: [address, [Validators.email, Validators.required]],
      type: [type]
    });
  }

  initPhone(number: string = '', type: string = ''): FormGroup {
    return this.fb.group({
      number: [number, [Validators.required, PhoneValidator]],
      type: [type]
    });
  }

  addEmailInput(): void {
    const control: FormArray = this.getEmailFormArray();
    control.push(this.initEmail());
  }

  addPhoneInput(): void {
    const control: FormArray = this.getPhoneFormArray();
    control.push(this.initPhone());
  }

  removeEmailInput(i: number): void {
    const control: FormArray = this.getEmailFormArray();
    control.removeAt(i);
  }

  removePhoneInput(i: number): void {
    const control: FormArray = this.getPhoneFormArray();
    control.removeAt(i);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitContact.emit(this.contactForm.value as ContactModel);
    } else {
      console.error('Try to submit when form is invalid.', this.contactForm);
    }
  }
}
