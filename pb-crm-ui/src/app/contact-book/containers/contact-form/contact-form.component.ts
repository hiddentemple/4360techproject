import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  InjectionToken,
  Inject,
  OnDestroy,
  OnChanges, SimpleChanges,
} from '@angular/core';
import {AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ContactModel, EmailModel, PhoneModel } from 'api-interfaces';
import {BreakpointService} from '../../../core/layout/breakpoint.service';


export const PhoneRegex = /[0-9]{10}/;
export const PhoneValidator = Validators.pattern(PhoneRegex); // TODO validate length and numeric

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styles: []
})
export class ContactFormComponent implements OnInit, OnChanges {
  // private contactID: string;
  contactForm: FormGroup;
  isHandset = false;

  @Input() contact;
  @Output() submitContact = new EventEmitter<ContactModel>();

  get emailFormArray(): FormArray { return this.contactForm?.controls.emails as FormArray; }
  get phoneFormArray(): FormArray { return this.contactForm?.controls.phones as FormArray; }
  get firstNameFormControl(): FormControl { return this.contactForm?.controls.firstName as FormControl; }
  get lastNameFormControl(): FormControl { return this.contactForm?.controls.lastName as FormControl; }
  get companyFormControl(): FormControl { return this.contactForm?.controls.company as FormControl; }

  constructor(private fb: FormBuilder, private breakpointService: BreakpointService) {
  }

  ngOnInit(): void {
    this.breakpointService.isHandset$().subscribe((matches: boolean) => this.isHandset = matches);
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      company: new FormControl('', [Validators.maxLength(150)]),
      emails: this.fb.array([]),
      phones: this.fb.array([]),
    });
    if (this.contact){
      this.setContact();
    }
  }

  ngOnChanges({ contact }: SimpleChanges) {
    this.contact = contact.currentValue;
    this.setContact();
    console.log('CHANGES: ', this.contact);
  }


  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Contact Form Submit: ', this.contactForm.value);
      const contact: ContactModel = { id: this.contact.id, ...this.contactForm.value};
      this.submitContact.emit(contact);
    } else {
      console.error('Try to submit when form is invalid.', this.contactForm);
    }
  }

  setContact() {
    if (!this.contact) { return; }

    console.log('Setting this.contact to', this.contact);
    this.firstNameFormControl?.setValue(this.contact.firstName);
    this.lastNameFormControl?.setValue(this.contact.lastName);
    this.companyFormControl?.setValue(this.contact.company);
    console.log('CONTACT EMAILS: ', this.contact.emails);
    //TODO this is where it's not picking up the email
    const emailControls: FormGroup[] = Object.values(this.contact.emails).map(
      (email: EmailModel) => this.initEmail(email.address, email.type)
    );
    console.log('YOKO ONO', emailControls);
    this.contactForm.controls.emails = this.fb.array(emailControls);

    const phoneControls: FormGroup[] = Object.values(this.contact.phones).map(
      (phone: PhoneModel) => this.initPhone(String(phone.number), phone.type)
    );
    console.log('YONO OKO', phoneControls);
    this.contactForm.controls.phones = this.fb.array(phoneControls);
  }

  /** First Name **/
  firstNameHasRequiredError(): boolean {
    return this.firstNameFormControl.hasError('required') && !this.firstNameHasRequiredError;
  }

  firstNameHasMaxLengthError(): boolean {
    return this.firstNameFormControl?.hasError('maxLength');
  }

  /** Last Name **/
  lastNameHasRequiredError(): boolean {
    return this.lastNameFormControl?.hasError('required') && !this.lastNameHasRequiredError;
  }

  lastNameHasMaxLengthError(): boolean {
    return this.lastNameFormControl?.hasError('maxLength');
  }

  /** Email **/
  addEmailInput(): void { this.emailFormArray.push(this.initEmail()); }
  removeEmailInput(i: number): void { this.emailFormArray.removeAt(i); }
  hasEmails(): boolean { return this.emailFormArray.length > 0; }

  initEmail(address: string = '', type: string = ''): FormGroup {
    return this.fb.group({
      address: [address, [Validators.email, Validators.required]],
      type: [type]
    });
  }

  emailHasRequiredError(emailControl: AbstractControl): boolean {
    return emailControl.get('address').hasError('required');
  }

  emailHasEmailError(emailControl: AbstractControl): boolean {
    return emailControl.get('address').hasError('email');
  }

  /** Phone **/

  addPhoneInput(): void { this.phoneFormArray.push(this.initPhone()); }
  removePhoneInput(i: number): void { this.phoneFormArray.removeAt(i); }
  hasPhones(): boolean { return this.phoneFormArray.length > 0; }
  initPhone(number: string = '', type: string = ''): FormGroup {
    return this.fb.group({
      number: [number, [Validators.required, PhoneValidator]],
      type: [type]
    });
  }

  phoneHasRequiredError(phoneControl: AbstractControl): boolean {
    return phoneControl.get('number').hasError('required');
  }

  phoneHasPatternError(phoneControl: AbstractControl): boolean {
    return phoneControl.get('number').hasError('pattern');
  }




}
